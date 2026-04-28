import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });

export async function POST(request: Request) {
  const session = await getSessionUser();

  if (!session?.id) {
    return redirect303(new URL("/login?next=/profile&error=Please+log+in+first.", request.url));
  }

  if (!isSupabaseConfigured()) {
    return redirect303(new URL("/profile?error=Password+changes+need+Supabase+to+be+configured.", request.url));
  }

  const formData = await request.formData();
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (password.length < 8) {
    return redirect303(new URL("/profile?error=Use+a+password+with+at+least+8+characters.", request.url));
  }

  if (password !== confirmPassword) {
    return redirect303(new URL("/profile?error=The+password+confirmation+does+not+match.", request.url));
  }

  try {
    const supabase = createSupabaseAdminClient();
    const result = await supabase.auth.admin.updateUserById(session.id, { password });

    if (result.error) {
      return redirect303(new URL("/profile?error=Could+not+update+your+password.", request.url));
    }

    return redirect303(new URL("/profile?updated=password", request.url));
  } catch {
    return redirect303(new URL("/profile?error=Could+not+update+your+password.", request.url));
  }
}
