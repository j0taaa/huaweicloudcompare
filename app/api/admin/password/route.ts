import { NextRequest, NextResponse } from "next/server";
import { adminSessionCookieName, changeAdminPassword, requireAdminAuthentication } from "@/lib/admin-auth";
import { getExternalUrl } from "@/lib/request-origin";

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuthentication(request.cookies);
    const formData = await request.formData();
    const password = String(formData.get("password") ?? "");
    const token = await changeAdminPassword(password);

    const response = NextResponse.redirect(getExternalUrl(request, "/admin?message=Password+updated."), { status: 303 });
    response.cookies.set(adminSessionCookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    });
    return response;
  } catch (error) {
    return NextResponse.redirect(
      getExternalUrl(request, `/admin?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to change password.")}`),
      { status: 303 }
    );
  }
}
