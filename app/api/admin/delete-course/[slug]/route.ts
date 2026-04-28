import { NextResponse } from "next/server";
import { getAdminAccess } from "@/lib/admin";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";

type DeleteCourseRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function POST(request: Request, { params }: DeleteCourseRouteProps) {
  const adminAccess = await getAdminAccess();

  if (adminAccess.reason === "unauthenticated") {
    return NextResponse.redirect(new URL("/login?next=/admin&error=Please+log+in+with+an+admin+account.", request.url));
  }

  if (!adminAccess.allowed) {
    return NextResponse.redirect(new URL("/my-courses?error=You+do+not+have+admin+access.", request.url));
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(new URL("/admin?error=Supabase+is+not+configured+yet.", request.url));
  }

  const routeParams = await params;

  try {
    const supabase = createSupabaseAdminClient();
    const deleteResult = await supabase.from("courses").delete().eq("slug", routeParams.slug);

    if (deleteResult.error) {
      return NextResponse.redirect(new URL("/admin?error=Could+not+delete+that+course.", request.url));
    }

    return NextResponse.redirect(new URL("/admin?deleted=success", request.url));
  } catch {
    return NextResponse.redirect(new URL("/admin?error=Course+deletion+failed.", request.url));
  }
}
