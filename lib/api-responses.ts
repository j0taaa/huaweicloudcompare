import { NextResponse } from "next/server";
import {
  buildServiceMatrixRows,
  findBestServiceMatch,
  findHuaweiEquivalentServices,
  findMappedSourceServices,
  getProviderDisplayName
} from "@/data/service-utils";
import { type CloudProvider, type HuaweiService, type NonHuaweiService, type ServiceInfo } from "@/data/services";
import { getCatalogServices } from "@/lib/catalog-store";

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function toPublicService(service: ServiceInfo) {
  return {
    id: service.id,
    provider: service.cloudProvider,
    providerName: getProviderDisplayName(service.cloudProvider),
    generalFunction: service.generalFunction,
    name: service.name,
    shortName: service.shortName,
    icon: service.imageUrl,
    description: service.description,
    keywords: service.keywords
  };
}

function toComparisonService(service: NonHuaweiService | HuaweiService) {
  return {
    ...toPublicService(service),
    cloudProvider: service.cloudProvider
  };
}

export async function handleProviderLookup(provider: CloudProvider, serviceQuery?: string) {
  const query = safeDecode(serviceQuery ?? "").trim();

  if (!query) {
    return NextResponse.json(
      {
        error: "Missing service name in route parameter.",
        expected: `/api/${provider}/{service-name}`
      },
      { status: 400 }
    );
  }

  const services = await getCatalogServices();
  const match = findBestServiceMatch(services, provider, query);
  if (!match) {
    return NextResponse.json(
      {
        error: `No ${getProviderDisplayName(provider)} service matched "${query}".`,
        provider,
        query
      },
      { status: 404 }
    );
  }

  if (match.service.cloudProvider === "huawei") {
    const relatedServices = findMappedSourceServices(services, match.service);

    return NextResponse.json({
      query,
      provider,
      providerName: getProviderDisplayName(provider),
      matchedOn: match.matchedOn,
      score: match.score,
      service: toComparisonService(match.service),
      huaweiEquivalentServices: [toPublicService(match.service)],
      migrationToHuawei: [],
      differencesFromHuawei: [],
      relatedServicesFromOtherProviders: relatedServices.map((service) => ({
        ...toPublicService(service),
        huaweiEquivalentShortNames: service.huaweiEquivalentShortNames,
        migrationToHuawei: service.migrationToHuawei,
        differencesFromHuawei: service.differencesFromHuawei
      }))
    });
  }

  const huaweiEquivalentServices = findHuaweiEquivalentServices(services, match.service);

  return NextResponse.json({
    query,
    provider,
    providerName: getProviderDisplayName(provider),
    matchedOn: match.matchedOn,
    score: match.score,
    service: {
      ...toComparisonService(match.service),
      huaweiEquivalentShortNames: match.service.huaweiEquivalentShortNames,
      migrationToHuawei: match.service.migrationToHuawei,
      differencesFromHuawei: match.service.differencesFromHuawei
    },
    huaweiEquivalentServices: huaweiEquivalentServices.map(toPublicService)
  });
}

export async function handleRowSearch(rawQuery: string | null) {
  const query = (rawQuery ?? "").trim();
  const services = await getCatalogServices();
  const rows = buildServiceMatrixRows(services, query).map((row) => ({
    category: row.category,
    generalFunction: row.generalFunction,
    providers: {
      aws: row.aws.map(toPublicService),
      azure: row.azure.map(toPublicService),
      gcp: row.gcp.map(toPublicService),
      huawei: row.huawei.map(toPublicService)
    }
  }));

  return NextResponse.json({
    query,
    count: rows.length,
    rows
  });
}
