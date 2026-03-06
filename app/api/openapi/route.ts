import { NextResponse } from "next/server";
import { getOpenApiSpec } from "@/lib/openapi";

export async function GET(request: Request) {
  const url = new URL(request.url);
  return NextResponse.json(getOpenApiSpec(url.origin));
}
