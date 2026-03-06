import { NextRequest, NextResponse } from "next/server";
import { adminSessionCookieName, changeAdminPassword, requireAdminAuthentication } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuthentication(request.cookies);
    const formData = await request.formData();
    const password = String(formData.get("password") ?? "");
    const token = await changeAdminPassword(password);

    const response = NextResponse.redirect(new URL("/admin?message=Password+updated.", request.url), { status: 303 });
    response.cookies.set(adminSessionCookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    });
    return response;
  } catch (error) {
    return NextResponse.redirect(new URL(`/admin?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to change password.")}`, request.url), { status: 303 });
  }
}
