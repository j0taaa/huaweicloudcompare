import { type NextRequest } from "next/server";

type RequestLike = Pick<NextRequest, "headers" | "url"> | Request;

export function getExternalOrigin(request: RequestLike): string {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");

  if (host) {
    const protocol = forwardedProto ?? (host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
    return `${protocol}://${host}`;
  }

  return new URL(request.url).origin;
}

export function getExternalUrl(request: RequestLike, pathnameWithSearch: string): URL {
  return new URL(pathnameWithSearch, getExternalOrigin(request));
}
