import { NextRequest, NextResponse } from "next/server";
import { adminSessionCookieName, invalidateAdminSession } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(adminSessionCookieName)?.value;
  if (token) {
    await invalidateAdminSession(token);
  }

  const response = NextResponse.redirect(new URL("/admin?message=Logged+out.", request.url), { status: 303 });
  response.cookies.delete(adminSessionCookieName);
  return response;
}
