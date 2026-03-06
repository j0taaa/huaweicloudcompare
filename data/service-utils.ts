import { categoryRank, getFunctionCategory } from "@/data/category-utils";
import { type CloudProvider, type HuaweiService, type NonHuaweiService, type ServiceInfo } from "@/data/services";

export type ServiceMatrixRow = {
  category: string;
  generalFunction: string;
  aws: NonHuaweiService[];
  azure: NonHuaweiService[];
  gcp: NonHuaweiService[];
  huawei: HuaweiService[];
  searchableText: string;
};

export type ServiceMatchResult = {
  service: ServiceInfo;
  score: number;
  matchedOn: string;
};

type ServiceAlias = {
  kind: "name" | "shortName" | "id" | "generalFunction" | "keyword";
  value: string;
};

const providerNameByKey: Record<CloudProvider, string> = {
  aws: "AWS",
  azure: "Azure",
  gcp: "Google Cloud",
  huawei: "Huawei Cloud"
};

const providerPrefixPattern = /^(aws|azure|gcp|google|google cloud|amazon|amazon web services|microsoft|huawei|huawei cloud)\s+/i;
const ignorableMatchTokens = new Set(["a", "an", "and", "for", "of", "on", "the", "to", "service", "services"]);

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function compactText(value: string): string {
  return normalizeText(value).replace(/\s+/g, "");
}

function tokenize(value: string): string[] {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 1 && !ignorableMatchTokens.has(token));
}

function acronym(value: string): string {
  return tokenize(value)
    .map((token) => token[0])
    .join("");
}

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function getProviderStrippedId(service: ServiceInfo): string {
  return service.id.replace(providerPrefixPattern, "").replace(/^(aws|azure|gcp|huawei)-/, "");
}

function getServiceAliases(service: ServiceInfo): ServiceAlias[] {
  const aliases: ServiceAlias[] = [
    { kind: "name", value: service.name },
    { kind: "shortName", value: service.shortName },
    { kind: "id", value: service.id },
    { kind: "id", value: getProviderStrippedId(service) },
    { kind: "generalFunction", value: service.generalFunction },
    ...service.keywords.map((keyword) => ({ kind: "keyword" as const, value: keyword }))
  ];

  const seen = new Set<string>();
  return aliases.filter((alias) => {
    const key = `${alias.kind}:${alias.value}`;
    if (!alias.value || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getServiceTokenPool(service: ServiceInfo): Set<string> {
  return new Set(tokenize(getServiceAliases(service).map((alias) => alias.value).join(" ")));
}

function scoreServiceMatch(service: ServiceInfo, rawQuery: string): Omit<ServiceMatchResult, "service"> | null {
  let bestScore = 0;
  let matchedOn = "";

  const queryVariants = unique([normalizeText(rawQuery), normalizeText(rawQuery.replace(providerPrefixPattern, ""))]).filter(Boolean);
  if (queryVariants.length === 0) return null;

  for (const query of queryVariants) {
    const queryCompact = compactText(query);
    const queryTokens = tokenize(query);
    const queryAcronym = acronym(query);

    for (const alias of getServiceAliases(service)) {
      const aliasNormalized = normalizeText(alias.value);
      const aliasCompact = compactText(aliasNormalized);
      const aliasAcronym = acronym(aliasNormalized);
      const isPrimary = alias.kind === "name" || alias.kind === "shortName" || alias.kind === "id";

      if (!aliasNormalized) continue;

      if (aliasNormalized === query) {
        const exactScore = isPrimary ? 1000 : alias.kind === "generalFunction" ? 840 : 780;
        if (exactScore > bestScore) {
          bestScore = exactScore;
          matchedOn = alias.value;
        }
        continue;
      }

      if (aliasCompact === queryCompact) {
        const compactScore = isPrimary ? 980 : alias.kind === "generalFunction" ? 830 : 760;
        if (compactScore > bestScore) {
          bestScore = compactScore;
          matchedOn = alias.value;
        }
        continue;
      }

      if (queryCompact.length >= 2 && (aliasAcronym === queryCompact || aliasCompact === queryAcronym)) {
        const acronymScore = isPrimary ? 950 : 820;
        if (acronymScore > bestScore) {
          bestScore = acronymScore;
          matchedOn = alias.value;
        }
        continue;
      }

      if (query.length >= 3 && (aliasNormalized.includes(query) || query.includes(aliasNormalized))) {
        const substringScore = isPrimary ? 880 : 740;
        if (substringScore > bestScore) {
          bestScore = substringScore;
          matchedOn = alias.value;
        }
        continue;
      }

      if (queryCompact.length >= 3 && (aliasCompact.includes(queryCompact) || queryCompact.includes(aliasCompact))) {
        const compactSubstringScore = isPrimary ? 860 : 720;
        if (compactSubstringScore > bestScore) {
          bestScore = compactSubstringScore;
          matchedOn = alias.value;
        }
      }
    }

    const tokenPool = getServiceTokenPool(service);
    const overlapCount = queryTokens.filter((token) => tokenPool.has(token)).length;

    if (queryTokens.length > 0 && overlapCount > 0) {
      const coverage = overlapCount / queryTokens.length;
      const tokenScore = 640 + overlapCount * 70 + Math.round(coverage * 120);
      if (coverage >= 0.66 || overlapCount >= 2 || queryTokens.length === 1) {
        if (tokenScore > bestScore) {
          bestScore = tokenScore;
          matchedOn = overlapCount === queryTokens.length ? "token match" : "partial token match";
        }
      }
    }
  }

  if (bestScore < 700) return null;
  return { score: bestScore, matchedOn };
}

export function getProviderDisplayName(provider: CloudProvider): string {
  return providerNameByKey[provider];
}

export function findHuaweiEquivalentServices(catalogServices: ServiceInfo[], source: NonHuaweiService): HuaweiService[] {
  const wanted = new Set(source.huaweiEquivalentShortNames.map((name) => name.toLowerCase()));
  return catalogServices.filter(
    (service): service is HuaweiService => service.cloudProvider === "huawei" && wanted.has(service.shortName.toLowerCase())
  );
}

export function findMappedSourceServices(catalogServices: ServiceInfo[], huaweiService: HuaweiService): NonHuaweiService[] {
  const shortName = huaweiService.shortName.toLowerCase();
  return catalogServices.filter(
    (service): service is NonHuaweiService =>
      service.cloudProvider !== "huawei" && service.huaweiEquivalentShortNames.some((candidate) => candidate.toLowerCase() === shortName)
  );
}

export function findServiceComparison(catalogServices: ServiceInfo[], serviceId?: string): { source?: NonHuaweiService; huawei: HuaweiService[] } {
  if (!serviceId) return { huawei: [] };

  const source = catalogServices.find(
    (service): service is NonHuaweiService => service.cloudProvider !== "huawei" && service.id === serviceId
  );
  if (!source) return { huawei: [] };

  return { source, huawei: findHuaweiEquivalentServices(catalogServices, source) };
}

export function findBestServiceMatch(catalogServices: ServiceInfo[], provider: CloudProvider, query: string): ServiceMatchResult | null {
  const candidates = catalogServices.filter((service) => service.cloudProvider === provider);
  let best: ServiceMatchResult | null = null;

  for (const service of candidates) {
    const match = scoreServiceMatch(service, query);
    if (!match) continue;

    if (!best || match.score > best.score || (match.score === best.score && service.name.localeCompare(best.service.name) < 0)) {
      best = { service, score: match.score, matchedOn: match.matchedOn };
    }
  }

  return best;
}

export function buildServiceMatrixRows(catalogServices: ServiceInfo[], query = ""): ServiceMatrixRow[] {
  const normalizedQuery = query.trim().toLowerCase();
  const grouped = new Map<string, ServiceMatrixRow>();

  catalogServices.forEach((service) => {
    const key = service.generalFunction;
    if (!grouped.has(key)) {
      grouped.set(key, {
        category: getFunctionCategory(key),
        generalFunction: key,
        aws: [],
        azure: [],
        gcp: [],
        huawei: [],
        searchableText: ""
      });
    }

    const row = grouped.get(key)!;
    if (service.cloudProvider === "aws") row.aws.push(service);
    if (service.cloudProvider === "azure") row.azure.push(service);
    if (service.cloudProvider === "gcp") row.gcp.push(service);
    if (service.cloudProvider === "huawei") row.huawei.push(service);
  });

  return Array.from(grouped.values())
    .map((row) => ({
      ...row,
      searchableText: [
        row.generalFunction,
        ...row.aws.map((service) => `${service.name} ${service.shortName} ${service.keywords.join(" ")}`),
        ...row.azure.map((service) => `${service.name} ${service.shortName} ${service.keywords.join(" ")}`),
        ...row.gcp.map((service) => `${service.name} ${service.shortName} ${service.keywords.join(" ")}`),
        ...row.huawei.map((service) => `${service.name} ${service.shortName} ${service.keywords.join(" ")}`)
      ]
        .join(" ")
        .toLowerCase()
    }))
    .sort((left, right) => {
      const categoryDifference = categoryRank(left.category) - categoryRank(right.category);
      if (categoryDifference !== 0) return categoryDifference;
      return left.generalFunction.localeCompare(right.generalFunction);
    })
    .filter((row) => (normalizedQuery ? row.searchableText.includes(normalizedQuery) : true));
}
