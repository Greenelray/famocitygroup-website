import { NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/session";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const next = formData.get("next")?.toString() || "/my-courses";

  if (!name || !email) {
    return redirect303(new URL("/signup?error=Please+enter+your+name+and+email.", request.url));
  }

  if (isSupabaseConfigured()) {
    if (!password || password.length < 8) {
      return redirect303(new URL("/signup?error=Please+use+a+password+with+at+least+8+characters.", request.url));
    }

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: name
      }
    });

    if (error || !data.user) {
      return redirect303(new URL("/signup?error=We+could+not+create+that+account.+Please+try+a+different+email.", request.url));
    }

    await supabase.from("profiles").upsert({
      id: data.user.id,
      full_name: name,
      email
    });

    const response = redirect303(new URL(next, request.url));
    response.cookies.set(
      createSessionCookie({
        id: data.user.id,
        name,
        email
      })
    );
    return response;
  }

  const response = redirect303(new URL(next, request.url));
  response.cookies.set(createSessionCookie({ name, email }));
  return response;
}
