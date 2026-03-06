import { NextResponse } from "next/server";
import { getOpenApiSpec } from "@/lib/openapi";
import { getExternalOrigin } from "@/lib/request-origin";

export async function GET(request: Request) {
  return NextResponse.json(getOpenApiSpec(getExternalOrigin(request)));
}
