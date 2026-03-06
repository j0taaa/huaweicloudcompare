import { type CloudProvider, type ServiceInfo } from "@/data/services";

export type ServiceProposalInput = {
  id?: string;
  cloudProvider?: CloudProvider;
  name?: string;
  shortName?: string;
  generalFunction?: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
  huaweiEquivalentShortNames?: string[];
  differencesFromHuawei?: string[];
  migrationToHuawei?: string[];
};

export type SuggestionType = "edit" | "add";
export type SuggestionStatus = "pending" | "approved" | "denied";

export type SuggestionRecord = {
  id: string;
  createdAt: string;
  status: SuggestionStatus;
  type: SuggestionType;
  targetServiceId?: string;
  submitterName: string;
  submitterEmail?: string;
  summary: string;
  rationale: string;
  proposal: ServiceProposalInput;
  review?: {
    decision: Exclude<SuggestionStatus, "pending">;
    reviewedAt: string;
    notes?: string;
    gitSync?: {
      attempted: boolean;
      succeeded: boolean;
      message: string;
    };
  };
};

export type CommunityData = {
  overrides: Record<string, ServiceProposalInput>;
  additions: ServiceInfo[];
};

export type ModerationData = {
  suggestions: SuggestionRecord[];
};
