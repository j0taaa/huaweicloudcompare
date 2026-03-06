"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { getFunctionCategory } from "@/data/category-utils";
import { type ServiceInfo } from "@/data/services";

type ProviderKey = "aws" | "azure" | "gcp";

const providerMeta = {
  aws: {
    name: "AWS",
    logo: "/logos/aws.svg",
    tint: "bg-[#FF9900]/[0.07]",
    border: "border-[#FF9900]/35"
  },
  azure: {
    name: "Azure",
    logo: "/logos/azure.svg",
    tint: "bg-[#0078D4]/[0.08]",
    border: "border-[#0078D4]/35"
  },
  gcp: {
    name: "Google Cloud",
    logo: "/logos/gcp.svg",
    tint: "bg-[#4285F4]/[0.08]",
    border: "border-[#4285F4]/35"
  },
  huawei: {
    name: "Huawei Cloud",
    logo: "/logos/huawei.svg",
    tint: "bg-[#CF0A2C]/[0.08]",
    border: "border-[#CF0A2C]/35"
  }
} as const;

type ServiceMapping = {
  category: string;
  capability: string;
  aws: string[];
  azure: string[];
  gcp: string[];
  huawei: string[];
  details: {
    summary: string;
    relativeComparison: { aws: string; azure: string; gcp: string };
    huaweiStrengths: string[];
    notableDifferences: string[];
    migrationTips: string[];
  };
};

function buildServiceMappings(services: ServiceInfo[]): ServiceMapping[] {
  const grouped = new Map<string, ServiceMapping>();

  services.forEach((service) => {
    const key = service.generalFunction;
    if (!grouped.has(key)) {
      grouped.set(key, {
        category: getFunctionCategory(key),
        capability: key,
        aws: [],
        azure: [],
        gcp: [],
        huawei: [],
        details: {
          summary: `Mapped equivalents for ${key.toLowerCase()} across major cloud providers.`,
          relativeComparison: {
            aws: "Service model, defaults, and integrations differ from Huawei Cloud.",
            azure: "Service model, defaults, and integrations differ from Huawei Cloud.",
            gcp: "Service model, defaults, and integrations differ from Huawei Cloud."
          },
          huaweiStrengths: ["Integrated with broader Huawei Cloud ecosystem.", "Migration path available via mapped capability rows."],
          notableDifferences: ["Naming, pricing, and operational workflows vary by provider.", "Identity and network defaults often require explicit remapping."],
          migrationTips: ["Start with pilot workloads and benchmark performance.", "Validate IAM, network, and observability controls before cutover."]
        }
      });
    }

    const mapping = grouped.get(key)!;
    if (service.cloudProvider === "aws") mapping.aws.push(service.name);
    if (service.cloudProvider === "azure") mapping.azure.push(service.name);
    if (service.cloudProvider === "gcp") mapping.gcp.push(service.name);
    if (service.cloudProvider === "huawei") mapping.huawei.push(service.name);
  });

  return Array.from(grouped.values());
}

const providerDefaultIcon: Record<ProviderKey | "huawei", string> = {
  aws: "/logos/aws.svg",
  azure: "/logos/azure.svg",
  gcp: "/logos/gcp.svg",
  huawei: "/logos/huawei.svg"
};

export function DirectComparisonPage({
  services,
  providerParam,
  initialQuery
}: {
  services: ServiceInfo[];
  providerParam?: string;
  initialQuery?: string;
}) {
  const query = (initialQuery ?? "").trim();
  const provider = (providerParam === "azure" || providerParam === "gcp" ? providerParam : "aws") as ProviderKey;
  const normalizedQuery = query.toLowerCase();

  const serviceMappings = useMemo(() => buildServiceMappings(services), [services]);
  const serviceIconByName = useMemo(() => new Map(services.map((service) => [service.name, service.imageUrl])), [services]);

  const matchedMappings = useMemo(() => {
    if (!normalizedQuery) return [];
    return serviceMappings.filter((mapping) => {
      const candidates = [mapping.capability, ...mapping.aws, ...mapping.azure, ...mapping.gcp, ...mapping.huawei];
      return candidates.some((candidate) => candidate.toLowerCase().includes(normalizedQuery));
    });
  }, [normalizedQuery, serviceMappings]);

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-6 py-8 md:px-10">
        <header className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Direct comparison page</p>
            <h1 className="text-2xl font-bold text-slate-900">{providerMeta[provider].name} vs Huawei Cloud</h1>
          </div>
          <Link href="/" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Back to full table
          </Link>
        </header>

        {query.length === 0 ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">No search query provided. Go back and search for a service or capability first.</p>
        ) : null}

        {matchedMappings.map((mapping) => (
          <article key={mapping.capability} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">{mapping.category}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{mapping.capability}</h2>
              <p className="mt-3 max-w-3xl text-base text-slate-600 md:text-lg">{mapping.details.summary}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <ProviderColumn provider={provider} mapping={mapping} serviceIconByName={serviceIconByName} />
              <ProviderColumn provider="huawei" mapping={mapping} serviceIconByName={serviceIconByName} main />
            </div>
          </article>
        ))}

        {query.length > 0 && matchedMappings.length === 0 ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">No mapping found for &quot;{query}&quot;.</p>
        ) : null}
      </div>
    </main>
  );
}

function ProviderColumn({
  provider,
  mapping,
  serviceIconByName,
  main = false
}: {
  provider: ProviderKey | "huawei";
  mapping: ServiceMapping;
  serviceIconByName: Map<string, string>;
  main?: boolean;
}) {
  const services = provider === "aws" ? mapping.aws : provider === "azure" ? mapping.azure : provider === "gcp" ? mapping.gcp : mapping.huawei;
  const relative = provider === "aws" ? mapping.details.relativeComparison.aws : provider === "azure" ? mapping.details.relativeComparison.azure : provider === "gcp" ? mapping.details.relativeComparison.gcp : null;

  return (
    <div className={`rounded-2xl border p-5 ${providerMeta[provider].border} ${providerMeta[provider].tint}`}>
      <div className="mb-4 flex items-center gap-2">
        <Image src={providerMeta[provider].logo} alt={`${providerMeta[provider].name} logo`} width={20} height={20} />
        <h3 className="font-semibold text-slate-900">{providerMeta[provider].name}</h3>
      </div>

      <div className="space-y-3 border-b border-slate-300/40 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Service</p>
        {services.map((service) => (
          <div key={service} className="flex items-center gap-2">
            <Image src={serviceIconByName.get(service) ?? providerDefaultIcon[provider]} alt={`${service} icon`} width={18} height={18} className="rounded-sm" />
            <span className="text-sm font-medium text-slate-800">{service}</span>
          </div>
        ))}
      </div>

      {!main && relative ? (
        <div className="mt-4 space-y-2 border-b border-slate-300/40 pb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Comparison vs Huawei</p>
          <p className="text-sm leading-relaxed text-slate-700">{relative}</p>
        </div>
      ) : null}

      <div className="mt-4 space-y-2 border-b border-slate-300/40 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{main ? "Huawei strengths" : "Key differences"}</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {(main ? mapping.details.huaweiStrengths : mapping.details.notableDifferences).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Migration notes</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {mapping.details.migrationTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
