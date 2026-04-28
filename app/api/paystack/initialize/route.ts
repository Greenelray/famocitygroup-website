import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/lib/course-data";
import { getSessionUser } from "@/lib/session";
import { initializePaystackTransaction, isPaystackConfigured } from "@/lib/paystack";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return redirect303(new URL("/login?next=/courses", request.url));
  }

  if (!isPaystackConfigured()) {
    return redirect303(new URL("/my-courses?error=Paystack+keys+are+not+configured+yet.", request.url));
  }

  const formData = await request.formData();
  const courseSlug = formData.get("courseSlug")?.toString();
  const course = courseSlug ? await getCourseBySlug(courseSlug) : null;

  if (!course) {
    return redirect303(new URL("/courses?error=Course+not+found.", request.url));
  }

  const callbackUrl = new URL("/api/paystack/callback", request.url).toString();

  try {
    const result = await initializePaystackTransaction({
      email: user.email,
      amount: course.priceNaira * 100,
      callback_url: callbackUrl,
      metadata: {
        courseSlug: course.slug,
        courseTitle: course.title,
        customerName: user.name
      }
    });

    if (!result.status || !result.data?.authorization_url) {
      return redirect303(new URL(`/courses/${course.slug}?error=Could+not+start+payment.`, request.url));
    }

    return NextResponse.redirect(result.data.authorization_url, { status: 303 });
  } catch {
    return redirect303(new URL(`/courses/${course.slug}?error=Payment+initialization+failed.`, request.url));
  }
}
