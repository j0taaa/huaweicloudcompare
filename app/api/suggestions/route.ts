import { NextResponse } from "next/server";
import { submitSuggestion } from "@/lib/moderation-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const suggestion = await submitSuggestion({
      type: body.type,
      targetServiceId: body.targetServiceId,
      submitterName: body.submitterName,
      submitterEmail: body.submitterEmail,
      summary: body.summary,
      rationale: body.rationale,
      proposal: body.proposal ?? {}
    });

    return NextResponse.json({ suggestionId: suggestion.id, status: suggestion.status }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to submit suggestion." },
      { status: 400 }
    );
  }
}
