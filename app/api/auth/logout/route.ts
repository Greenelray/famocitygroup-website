import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/session";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url));
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
