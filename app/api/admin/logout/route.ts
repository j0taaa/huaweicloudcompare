import { NextRequest, NextResponse } from "next/server";
import { adminSessionCookieName, invalidateAdminSession } from "@/lib/admin-auth";
import { getExternalUrl } from "@/lib/request-origin";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(adminSessionCookieName)?.value;
  if (token) {
    await invalidateAdminSession(token);
  }

  const response = NextResponse.redirect(getExternalUrl(request, "/admin?message=Logged+out."), { status: 303 });
  response.cookies.delete(adminSessionCookieName);
  return response;
}
