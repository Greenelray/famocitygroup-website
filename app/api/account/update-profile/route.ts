import { NextResponse } from "next/server";
import { createSessionCookie, getSessionUser } from "@/lib/session";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });

export async function POST(request: Request) {
  const session = await getSessionUser();

  if (!session) {
    return redirect303(new URL("/login?next=/profile&error=Please+log+in+first.", request.url));
  }

  const formData = await request.formData();
  const fullName = formData.get("fullName")?.toString().trim();

  if (!fullName) {
    return redirect303(new URL("/profile?error=Please+enter+your+full+name.", request.url));
  }

  if (!isSupabaseConfigured() || !session.id) {
    const response = redirect303(new URL("/profile?updated=profile", request.url));
    response.cookies.set(
      createSessionCookie({
        id: session.id,
        email: session.email,
        name: fullName
      })
    );
    return response;
  }

  try {
    const supabase = createSupabaseAdminClient();
    await supabase.from("profiles").update({ full_name: fullName }).eq("id", session.id);
    await supabase.auth.admin.updateUserById(session.id, {
      user_metadata: {
        full_name: fullName
      }
    });

    const response = redirect303(new URL("/profile?updated=profile", request.url));
    response.cookies.set(
      createSessionCookie({
        id: session.id,
        email: session.email,
        name: fullName
      })
    );
    return response;
  } catch {
    return redirect303(new URL("/profile?error=Could+not+update+your+profile+right+now.", request.url));
  }
}
