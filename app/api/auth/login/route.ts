import { NextResponse } from "next/server";
import { syncProfile } from "@/lib/profile-access";
import { getSafeRedirectPath, isTrustedFormRequest } from "@/lib/request-security";
import { createSessionCookie } from "@/lib/session";
import { createSupabaseAuthClient, isSupabaseConfigured } from "@/lib/supabase";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });
const isJsonRequest = (request: Request) => request.headers.get("x-famocity-request") === "json";

function jsonError(message: string, status = 400) {
  return NextResponse.json(
    {
      ok: false,
      error: message
    },
    { status }
  );
}

export async function POST(request: Request) {
  try {
    if (!isTrustedFormRequest(request)) {
      if (isJsonRequest(request)) {
        return jsonError("Could not verify your request.", 403);
      }

      return redirect303(new URL("/login?error=Could+not+verify+your+request.", request.url));
    }

    const formData = await request.formData();
    const email = formData.get("email")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString();
    const next = getSafeRedirectPath(formData.get("next")?.toString(), "/my-courses");

    if (!email) {
      if (isJsonRequest(request)) {
        return jsonError("Please enter your email address.");
      }

      return redirect303(new URL("/login?error=Please+enter+your+email+address.", request.url));
    }

    if (isSupabaseConfigured()) {
      if (!password) {
        if (isJsonRequest(request)) {
          return jsonError("Please enter your password.");
        }

        return redirect303(new URL("/login?error=Please+enter+your+password.", request.url));
      }

      const supabase = createSupabaseAuthClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error || !data.user) {
        if (isJsonRequest(request)) {
          return jsonError("Invalid email or password.", 401);
        }

        return redirect303(new URL("/login?error=Invalid+email+or+password.", request.url));
      }

      await syncProfile({
        id: data.user.id,
        email: data.user.email || email,
        name: data.user.user_metadata.full_name || data.user.email || email
      });

      const response = isJsonRequest(request)
        ? NextResponse.json({
            ok: true,
            redirectTo: next
          })
        : redirect303(new URL(next, request.url));
      response.cookies.set(
        createSessionCookie({
          id: data.user.id,
          name: data.user.user_metadata.full_name || data.user.email || email,
          email: data.user.email || email
        })
      );
      return response;
    }

    const response = isJsonRequest(request)
      ? NextResponse.json({
          ok: true,
          redirectTo: next
        })
      : redirect303(new URL(next, request.url));
    response.cookies.set(createSessionCookie({ name: email, email }));
    return response;
  } catch (error) {
    console.error("Login route failed.", error);

    if (isJsonRequest(request)) {
      return jsonError("We could not log you in right now.", 500);
    }

    return redirect303(new URL("/login?error=We+could+not+log+you+in+right+now.", request.url));
  }
}
