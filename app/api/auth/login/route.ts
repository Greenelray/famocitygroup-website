import { NextResponse } from "next/server";
import { syncProfile } from "@/lib/profile-access";
import { getSafeRedirectPath, isTrustedFormRequest } from "@/lib/request-security";
import { createSessionCookie } from "@/lib/session";
import { createSupabaseAuthClient, isSupabaseConfigured } from "@/lib/supabase";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });

export async function POST(request: Request) {
  if (!isTrustedFormRequest(request)) {
    return redirect303(new URL("/login?error=Could+not+verify+your+request.", request.url));
  }

  const formData = await request.formData();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const next = getSafeRedirectPath(formData.get("next")?.toString(), "/my-courses");

  if (!email) {
    return redirect303(new URL("/login?error=Please+enter+your+email+address.", request.url));
  }

  if (isSupabaseConfigured()) {
    if (!password) {
      return redirect303(new URL("/login?error=Please+enter+your+password.", request.url));
    }

    const supabase = createSupabaseAuthClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user) {
      return redirect303(new URL("/login?error=Invalid+email+or+password.", request.url));
    }

    await syncProfile({
      id: data.user.id,
      email: data.user.email || email,
      name: data.user.user_metadata.full_name || data.user.email || email
    });

    const response = redirect303(new URL(next, request.url));
    response.cookies.set(
      createSessionCookie({
        id: data.user.id,
        name: data.user.user_metadata.full_name || data.user.email || email,
        email: data.user.email || email
      })
    );
    return response;
  }

  const response = redirect303(new URL(next, request.url));
  response.cookies.set(createSessionCookie({ name: email, email }));
  return response;
}
