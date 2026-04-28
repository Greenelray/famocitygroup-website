import { NextResponse } from "next/server";
import { createSessionCookie, getSessionUser } from "@/lib/session";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  const session = await getSessionUser();

  if (!session) {
    return NextResponse.redirect(new URL("/login?next=/profile&error=Please+log+in+first.", request.url));
  }

  const formData = await request.formData();
  const fullName = formData.get("fullName")?.toString().trim();

  if (!fullName) {
    return NextResponse.redirect(new URL("/profile?error=Please+enter+your+full+name.", request.url));
  }

  if (!isSupabaseConfigured() || !session.id) {
    const response = NextResponse.redirect(new URL("/profile?updated=profile", request.url));
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

    const response = NextResponse.redirect(new URL("/profile?updated=profile", request.url));
    response.cookies.set(
      createSessionCookie({
        id: session.id,
        email: session.email,
        name: fullName
      })
    );
    return response;
  } catch {
    return NextResponse.redirect(new URL("/profile?error=Could+not+update+your+profile+right+now.", request.url));
  }
}
