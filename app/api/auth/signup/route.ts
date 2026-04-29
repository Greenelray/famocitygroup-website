import { NextResponse } from "next/server";
import { syncProfile } from "@/lib/profile-access";
import { getSafeRedirectPath, isTrustedFormRequest } from "@/lib/request-security";
import { createSessionCookie } from "@/lib/session";
import { createSupabaseAuthClient, isSupabaseConfigured } from "@/lib/supabase";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });

export async function POST(request: Request) {
  if (!isTrustedFormRequest(request)) {
    return redirect303(new URL("/signup?error=Could+not+verify+your+request.", request.url));
  }

  const formData = await request.formData();
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const next = getSafeRedirectPath(formData.get("next")?.toString(), "/my-courses");

  if (!name || !email) {
    return redirect303(new URL("/signup?error=Please+enter+your+name+and+email.", request.url));
  }

  if (isSupabaseConfigured()) {
    if (!password || password.length < 8) {
      return redirect303(new URL("/signup?error=Please+use+a+password+with+at+least+8+characters.", request.url));
    }

    const supabase = createSupabaseAuthClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });

    if (error || !data.user) {
      return redirect303(new URL("/signup?error=We+could+not+create+that+account.+Please+try+a+different+email.", request.url));
    }

    if (!data.session) {
      return redirect303(
        new URL("/login?message=Check+your+email+to+verify+your+account+before+logging+in.", request.url)
      );
    }

    await syncProfile({
      id: data.user.id,
      email,
      name
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
