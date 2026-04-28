import { NextResponse } from "next/server";
import { createEnrollmentsCookie, getEnrollmentSlugs } from "@/lib/enrollments";
import { getCourseBySlug } from "@/lib/course-data";
import { verifyPaystackTransaction } from "@/lib/paystack";
import { getSessionUser } from "@/lib/session";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });

export async function GET(request: Request) {
  const url = new URL(request.url);
  const reference = url.searchParams.get("reference") ?? url.searchParams.get("trxref");

  if (!reference) {
    return redirect303(new URL("/my-courses?error=Missing+payment+reference.", request.url));
  }

  try {
    const result = await verifyPaystackTransaction(reference);
    const courseSlug = result.data?.metadata?.courseSlug;
    const verified = result.status && result.data?.status === "success" && courseSlug;
    const course = courseSlug ? await getCourseBySlug(courseSlug) : null;

    if (!verified || !course) {
      return redirect303(new URL("/my-courses?error=Payment+could+not+be+verified.", request.url));
    }

    if (isSupabaseConfigured()) {
      const session = await getSessionUser();

      if (!session?.id) {
        return redirect303(new URL("/login?error=Please+log+in+before+completing+course+access.&next=/my-courses", request.url));
      }

      const supabase = createSupabaseAdminClient();
      const amountNaira = Math.round((result.data?.amount ?? 0) / 100);
      const paidAt = new Date().toISOString();

      const purchaseResult = await supabase
        .from("purchases")
        .upsert(
          {
            user_id: session.id,
            course_slug: course.slug,
            course_title: course.title,
            paystack_reference: reference,
            amount_naira: amountNaira,
            currency: result.data?.currency ?? "NGN",
            status: "success",
            paid_at: paidAt
          },
          { onConflict: "paystack_reference" }
        )
        .select("id")
        .single();

      if (purchaseResult.error || !purchaseResult.data) {
        return redirect303(new URL("/my-courses?error=Payment+was+verified+but+could+not+be+saved.", request.url));
      }

      const enrollmentResult = await supabase.from("enrollments").upsert(
        {
          user_id: session.id,
          course_slug: course.slug,
          purchased_via: "paystack",
          purchase_id: purchaseResult.data.id
        },
        { onConflict: "user_id,course_slug" }
      );

      if (enrollmentResult.error) {
        return redirect303(new URL("/my-courses?error=Payment+was+verified+but+course+access+could+not+be+saved.", request.url));
      }

      return redirect303(new URL("/my-courses?purchase=success", request.url));
    }

    const existing = await getEnrollmentSlugs();
    const nextEnrollments = Array.from(new Set([...existing, course.slug]));
    const response = redirect303(new URL("/my-courses?purchase=success", request.url));
    response.cookies.set(createEnrollmentsCookie(nextEnrollments));
    return response;
  } catch {
    return redirect303(new URL("/my-courses?error=Unable+to+verify+payment+right+now.", request.url));
  }
}
