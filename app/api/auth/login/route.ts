import { NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/session";
import { createSupabaseAuthClient, isSupabaseConfigured } from "@/lib/supabase";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const next = formData.get("next")?.toString() || "/my-courses";

  if (!name || !email) {
    return redirect303(new URL("/login?error=Please+enter+your+name+and+email.", request.url));
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

    const response = redirect303(new URL(next, request.url));
    response.cookies.set(
      createSessionCookie({
        id: data.user.id,
        name: data.user.user_metadata.full_name || name,
        email: data.user.email || email
      })
    );
    return response;
  }

  const response = redirect303(new URL(next, request.url));
  response.cookies.set(createSessionCookie({ name, email }));
  return response;
}
