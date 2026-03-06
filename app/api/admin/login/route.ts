import { NextRequest, NextResponse } from "next/server";
import { adminSessionCookieName, createAdminSession, verifyAdminPassword } from "@/lib/admin-auth";
import { getExternalUrl } from "@/lib/request-origin";

function redirectWith(request: NextRequest, query: Record<string, string>) {
  const url = getExternalUrl(request, "/admin");
  Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, value));
  return url;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  if (!(await verifyAdminPassword(password))) {
    return NextResponse.redirect(redirectWith(request, { error: "Invalid password." }), { status: 303 });
  }

  const token = await createAdminSession();
  const response = NextResponse.redirect(redirectWith(request, { message: "Logged in." }), { status: 303 });
  response.cookies.set(adminSessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
  return response;
}
