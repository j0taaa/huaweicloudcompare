import "server-only";

import { services as baseServices, type CloudProvider, type NonHuaweiService, type ServiceInfo } from "@/data/services";
import type { CommunityData, ServiceProposalInput } from "@/lib/community-types";
import { communityDataPath, readJsonFile, writeJsonFile } from "@/lib/storage";

const defaultCommunityData: CommunityData = {
  overrides: {},
  additions: []
};

function isCloudProvider(value: string): value is CloudProvider {
  return value === "aws" || value === "azure" || value === "gcp" || value === "huawei";
}

function cleanString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function cleanStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const cleaned = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
  return cleaned.length > 0 ? cleaned : undefined;
}

function sanitizeProposalInput(input: ServiceProposalInput): ServiceProposalInput {
  const proposal: ServiceProposalInput = {};

  if (input.id) proposal.id = input.id.trim();
  if (input.cloudProvider) proposal.cloudProvider = input.cloudProvider;
  if (input.name) proposal.name = input.name.trim();
  if (input.shortName) proposal.shortName = input.shortName.trim();
  if (input.generalFunction) proposal.generalFunction = input.generalFunction.trim();
  if (input.description) proposal.description = input.description.trim();
  if (input.imageUrl) proposal.imageUrl = input.imageUrl.trim();
  if (input.keywords && input.keywords.length > 0) proposal.keywords = input.keywords.map((item) => item.trim()).filter(Boolean);
  if (input.huaweiEquivalentShortNames && input.huaweiEquivalentShortNames.length > 0) {
    proposal.huaweiEquivalentShortNames = input.huaweiEquivalentShortNames.map((item) => item.trim()).filter(Boolean);
  }
  if (input.differencesFromHuawei && input.differencesFromHuawei.length > 0) {
    proposal.differencesFromHuawei = input.differencesFromHuawei.map((item) => item.trim()).filter(Boolean);
  }
  if (input.migrationToHuawei && input.migrationToHuawei.length > 0) {
    proposal.migrationToHuawei = input.migrationToHuawei.map((item) => item.trim()).filter(Boolean);
  }

  return proposal;
}

function toSanitizedServiceInfo(value: unknown): ServiceInfo | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;

  const id = cleanString(record.id);
  const cloudProvider = cleanString(record.cloudProvider);
  const name = cleanString(record.name);
  const shortName = cleanString(record.shortName);
  const generalFunction = cleanString(record.generalFunction);
  const description = cleanString(record.description);
  const imageUrl = cleanString(record.imageUrl);
  const keywords = cleanStringArray(record.keywords);

  if (!id || !cloudProvider || !isCloudProvider(cloudProvider) || !name || !shortName || !generalFunction || !description || !keywords || !imageUrl) {
    return null;
  }

  if (cloudProvider === "huawei") {
    return {
      id,
      cloudProvider,
      name,
      shortName,
      generalFunction,
      description,
      imageUrl,
      keywords
    };
  }

  const huaweiEquivalentShortNames = cleanStringArray(record.huaweiEquivalentShortNames);
  const differencesFromHuawei = cleanStringArray(record.differencesFromHuawei);
  const migrationToHuawei = cleanStringArray(record.migrationToHuawei);

  if (!huaweiEquivalentShortNames || !differencesFromHuawei || !migrationToHuawei) {
    return null;
  }

  return {
    id,
    cloudProvider,
    name,
    shortName,
    generalFunction,
    description,
    imageUrl,
    keywords,
    huaweiEquivalentShortNames,
    differencesFromHuawei,
    migrationToHuawei
  } satisfies NonHuaweiService;
}

function mergeService(base: ServiceInfo, override?: ServiceProposalInput): ServiceInfo {
  if (!override) return base;

  const merged = {
    ...base,
    ...sanitizeProposalInput(override)
  } as ServiceInfo;

  if (merged.cloudProvider === "huawei") {
    return {
      id: merged.id,
      cloudProvider: "huawei",
      name: merged.name,
      shortName: merged.shortName,
      generalFunction: merged.generalFunction,
      description: merged.description,
      imageUrl: merged.imageUrl,
      keywords: merged.keywords
    };
  }

  return {
    id: merged.id,
    cloudProvider: merged.cloudProvider,
    name: merged.name,
    shortName: merged.shortName,
    generalFunction: merged.generalFunction,
    description: merged.description,
    imageUrl: merged.imageUrl,
    keywords: merged.keywords,
    huaweiEquivalentShortNames: merged.huaweiEquivalentShortNames,
    differencesFromHuawei: merged.differencesFromHuawei,
    migrationToHuawei: merged.migrationToHuawei
  };
}

function makeGeneratedId(provider: CloudProvider, shortName: string, name: string): string {
  const base = `${shortName || name}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${provider}-${base || "service"}`;
}

export async function getCommunityData(): Promise<CommunityData> {
  const raw = await readJsonFile<CommunityData>(communityDataPath, defaultCommunityData);

  const overrides = Object.fromEntries(
    Object.entries(raw.overrides ?? {}).map(([serviceId, proposal]) => [serviceId, sanitizeProposalInput(proposal ?? {})])
  );
  const additions = Array.isArray(raw.additions) ? raw.additions.map(toSanitizedServiceInfo).filter(Boolean) as ServiceInfo[] : [];

  return { overrides, additions };
}

export async function saveCommunityData(data: CommunityData): Promise<void> {
  await writeJsonFile(communityDataPath, data);
}

export async function getCatalogServices(): Promise<ServiceInfo[]> {
  const communityData = await getCommunityData();
  const mergedBase = baseServices.map((service) => mergeService(service, communityData.overrides[service.id]));
  const mergedAdditions = communityData.additions.map((service) => mergeService(service, communityData.overrides[service.id]));
  return [...mergedBase, ...mergedAdditions];
}

export async function applyServiceEdit(targetServiceId: string, proposal: ServiceProposalInput): Promise<ServiceInfo> {
  const communityData = await getCommunityData();
  const baseTarget = baseServices.find((service) => service.id === targetServiceId);
  const additionTargetIndex = communityData.additions.findIndex((service) => service.id === targetServiceId);
  const target = baseTarget ?? (additionTargetIndex >= 0 ? communityData.additions[additionTargetIndex] : undefined);

  if (!target) {
    throw new Error(`Unknown service id: ${targetServiceId}`);
  }

  const sanitized = sanitizeProposalInput(proposal);
  delete sanitized.id;
  delete sanitized.cloudProvider;

  if (baseTarget) {
    communityData.overrides[targetServiceId] = {
      ...(communityData.overrides[targetServiceId] ?? {}),
      ...sanitized
    };
  } else {
    communityData.additions[additionTargetIndex] = mergeService(target, sanitized);
  }

  await saveCommunityData(communityData);
  return baseTarget ? mergeService(target, communityData.overrides[targetServiceId]) : communityData.additions[additionTargetIndex];
}

export async function addServiceFromProposal(proposal: ServiceProposalInput): Promise<ServiceInfo> {
  const sanitized = sanitizeProposalInput(proposal);
  const cloudProvider = sanitized.cloudProvider;
  const name = sanitized.name;
  const shortName = sanitized.shortName;
  const generalFunction = sanitized.generalFunction;
  const description = sanitized.description;
  const keywords = sanitized.keywords;
  const imageUrl = sanitized.imageUrl;

  if (!cloudProvider || !name || !shortName || !generalFunction || !description || !keywords || !imageUrl) {
    throw new Error("New services require provider, name, short name, general function, description, keywords, and image URL.");
  }

  const communityData = await getCommunityData();
  const allServices = [...baseServices, ...communityData.additions];
  const requestedId = cleanString(sanitized.id);
  const id = requestedId ?? makeGeneratedId(cloudProvider, shortName, name);

  if (allServices.some((service) => service.id === id)) {
    throw new Error(`Service id already exists: ${id}`);
  }

  let newService: ServiceInfo;

  if (cloudProvider === "huawei") {
    newService = {
      id,
      cloudProvider,
      name,
      shortName,
      generalFunction,
      description,
      imageUrl,
      keywords
    };
  } else {
    if (!sanitized.huaweiEquivalentShortNames || !sanitized.differencesFromHuawei || !sanitized.migrationToHuawei) {
      throw new Error("Non-Huawei services also require Huawei equivalents, differences, and migration notes.");
    }

    newService = {
      id,
      cloudProvider,
      name,
      shortName,
      generalFunction,
      description,
      imageUrl,
      keywords,
      huaweiEquivalentShortNames: sanitized.huaweiEquivalentShortNames,
      differencesFromHuawei: sanitized.differencesFromHuawei,
      migrationToHuawei: sanitized.migrationToHuawei
    } satisfies NonHuaweiService;
  }

  communityData.additions.push(newService);
  await saveCommunityData(communityData);
  return newService;
}
