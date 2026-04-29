import { NextResponse } from "next/server";
import { isTrustedFormRequest } from "@/lib/request-security";
import { clearSessionCookie } from "@/lib/session";

export async function POST(request: Request) {
  if (!isTrustedFormRequest(request)) {
    return NextResponse.redirect(new URL("/login?error=Could+not+verify+your+request.", request.url), {
      status: 303
    });
  }

  const response = NextResponse.redirect(new URL("/", request.url), { status: 303 });
  response.cookies.set(clearSessionCookie());
  response.cookies.set({
    name: "famocity_enrollments",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
  return response;
}
