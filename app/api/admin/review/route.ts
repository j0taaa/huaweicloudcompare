import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuthentication } from "@/lib/admin-auth";
import { reviewSuggestion } from "@/lib/moderation-store";

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
    return NextResponse.redirect(new URL(`/admin?message=${encodeURIComponent(`Suggestion ${suggestion.status}.`)}`, request.url), { status: 303 });
  } catch (error) {
    return NextResponse.redirect(new URL(`/admin?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to review suggestion.")}`, request.url), { status: 303 });
  }
}
