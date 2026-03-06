import "server-only";

import { randomUUID } from "crypto";
import { type SuggestionRecord, type ModerationData, type ServiceProposalInput, type SuggestionType } from "@/lib/community-types";
import { moderationDataPath, readJsonFile, writeJsonFile, communityDataPath } from "@/lib/storage";
import { addServiceFromProposal, applyServiceEdit, getCatalogServices } from "@/lib/catalog-store";
import { attemptGitSync } from "@/lib/git-sync";

const defaultModerationData: ModerationData = {
  suggestions: []
};

function cleanString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function cleanList(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const cleaned = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
  return cleaned.length > 0 ? cleaned : undefined;
}

function sanitizeProposal(input: ServiceProposalInput): ServiceProposalInput {
  return {
    id: cleanString(input.id),
    cloudProvider: input.cloudProvider,
    name: cleanString(input.name),
    shortName: cleanString(input.shortName),
    generalFunction: cleanString(input.generalFunction),
    description: cleanString(input.description),
    imageUrl: cleanString(input.imageUrl),
    keywords: cleanList(input.keywords),
    huaweiEquivalentShortNames: cleanList(input.huaweiEquivalentShortNames),
    differencesFromHuawei: cleanList(input.differencesFromHuawei),
    migrationToHuawei: cleanList(input.migrationToHuawei)
  };
}

function hasMeaningfulProposal(proposal: ServiceProposalInput): boolean {
  return Object.values(proposal).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  });
}

export async function getModerationData(): Promise<ModerationData> {
  return readJsonFile<ModerationData>(moderationDataPath, defaultModerationData);
}

async function saveModerationData(data: ModerationData): Promise<void> {
  await writeJsonFile(moderationDataPath, data);
}

export async function listSuggestions(): Promise<SuggestionRecord[]> {
  const data = await getModerationData();
  return [...data.suggestions].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export async function submitSuggestion(input: {
  type: SuggestionType;
  targetServiceId?: string;
  submitterName: string;
  submitterEmail?: string;
  summary: string;
  rationale: string;
  proposal: ServiceProposalInput;
}): Promise<SuggestionRecord> {
  const type = input.type;
  const submitterName = cleanString(input.submitterName);
  const submitterEmail = cleanString(input.submitterEmail);
  const summary = cleanString(input.summary);
  const rationale = cleanString(input.rationale);
  const targetServiceId = cleanString(input.targetServiceId);
  const proposal = sanitizeProposal(input.proposal);

  if (type !== "edit" && type !== "add") {
    throw new Error("Suggestion type must be edit or add.");
  }
  if (!submitterName || !summary || !rationale) {
    throw new Error("Submitter name, summary, and rationale are required.");
  }
  if (!hasMeaningfulProposal(proposal)) {
    throw new Error("At least one proposed service field is required.");
  }

  const services = await getCatalogServices();

  if (type === "edit") {
    if (!targetServiceId) {
      throw new Error("Editing an existing service requires a target service.");
    }
    if (!services.some((service) => service.id === targetServiceId)) {
      throw new Error("The selected service does not exist.");
    }
  }

  if (type === "add") {
    if (!proposal.cloudProvider || !proposal.name || !proposal.shortName || !proposal.generalFunction || !proposal.description || !proposal.keywords || !proposal.imageUrl) {
      throw new Error("New service suggestions must include provider, name, short name, general function, description, keywords, and image URL.");
    }
  }

  const data = await getModerationData();
  const suggestion: SuggestionRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
    type,
    targetServiceId,
    submitterName,
    submitterEmail,
    summary,
    rationale,
    proposal
  };

  data.suggestions.unshift(suggestion);
  await saveModerationData(data);
  return suggestion;
}

export async function reviewSuggestion(suggestionId: string, decision: "approved" | "denied", notes?: string): Promise<SuggestionRecord> {
  const data = await getModerationData();
  const suggestion = data.suggestions.find((item) => item.id === suggestionId);

  if (!suggestion) {
    throw new Error("Suggestion not found.");
  }
  if (suggestion.status !== "pending") {
    throw new Error("Suggestion has already been reviewed.");
  }

  let gitSync = {
    attempted: false,
    succeeded: false,
    message: "No Git sync attempted."
  };

  if (decision === "approved") {
    if (suggestion.type === "edit") {
      if (!suggestion.targetServiceId) {
        throw new Error("Missing target service id.");
      }
      await applyServiceEdit(suggestion.targetServiceId, suggestion.proposal);
    } else {
      await addServiceFromProposal(suggestion.proposal);
    }

    gitSync = await attemptGitSync([communityDataPath], suggestion.summary);
  }

  suggestion.status = decision;
  suggestion.review = {
    decision,
    reviewedAt: new Date().toISOString(),
    notes: cleanString(notes),
    gitSync
  };

  await saveModerationData(data);
  return suggestion;
}
