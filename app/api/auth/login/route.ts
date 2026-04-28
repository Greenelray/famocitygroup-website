import { NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/session";
import { createSupabaseAuthClient, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const next = formData.get("next")?.toString() || "/my-courses";

  if (!name || !email) {
    return NextResponse.redirect(new URL("/login?error=Please+enter+your+name+and+email.", request.url));
  }

  if (isSupabaseConfigured()) {
    if (!password) {
      return NextResponse.redirect(new URL("/login?error=Please+enter+your+password.", request.url));
    }

    const supabase = createSupabaseAuthClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user) {
      return NextResponse.redirect(new URL("/login?error=Invalid+email+or+password.", request.url));
    }

    const response = NextResponse.redirect(new URL(next, request.url));
    response.cookies.set(
      createSessionCookie({
        id: data.user.id,
        name: data.user.user_metadata.full_name || name,
        email: data.user.email || email
      })
    );
    return response;
  }

  const response = NextResponse.redirect(new URL(next, request.url));
  response.cookies.set(createSessionCookie({ name, email }));
  return response;
}
