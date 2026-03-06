import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuthentication } from "@/lib/admin-auth";
import { reviewSuggestion } from "@/lib/moderation-store";
import { getExternalUrl } from "@/lib/request-origin";

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuthentication(request.cookies);
    const formData = await request.formData();
    const suggestionId = String(formData.get("suggestionId") ?? "");
    const decision = String(formData.get("decision") ?? "");
    const notes = String(formData.get("notes") ?? "");

    if (decision !== "approved" && decision !== "denied") {
      throw new Error("Invalid review decision.");
    }

    const suggestion = await reviewSuggestion(suggestionId, decision, notes);
    return NextResponse.redirect(getExternalUrl(request, `/admin?message=${encodeURIComponent(`Suggestion ${suggestion.status}.`)}`), { status: 303 });
  } catch (error) {
    return NextResponse.redirect(
      getExternalUrl(request, `/admin?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to review suggestion.")}`),
      { status: 303 }
    );
  }
}
