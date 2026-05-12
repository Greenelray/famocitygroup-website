import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminAccess } from "@/lib/admin";
import { isTrustedFormRequest } from "@/lib/request-security";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { uploadCourseImage } from "@/lib/storage";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });

type UpdateCourseRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function POST(request: Request, { params }: UpdateCourseRouteProps) {
  if (!isTrustedFormRequest(request)) {
    return redirect303(new URL("/admin?error=Could+not+verify+your+request.", request.url));
  }

  const adminAccess = await getAdminAccess();

  if (adminAccess.reason === "unauthenticated") {
    return redirect303(new URL("/login?next=/admin&error=Please+log+in+with+an+admin+account.", request.url));
  }

  if (!adminAccess.allowed) {
    return redirect303(new URL("/my-courses?error=You+do+not+have+admin+access.", request.url));
  }

  if (!isSupabaseConfigured()) {
    return redirect303(new URL("/admin?error=Supabase+is+not+configured+yet.", request.url));
  }

  const routeParams = await params;

  try {
    const supabase = createSupabaseAdminClient();
    const formData = await request.formData();
    const title = formData.get("title")?.toString().trim();
    const slug = formData.get("slug")?.toString().trim().toLowerCase();
    const tagline = formData.get("tagline")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const selarUrl = formData.get("selarUrl")?.toString().trim();
    const priceNaira = Number(formData.get("priceNaira")?.toString() ?? "0");
    const level = formData.get("level")?.toString().trim();
    const duration = formData.get("duration")?.toString().trim();
    const lessonCount = Number(formData.get("lessonCount")?.toString() ?? "0");

    if (
      !title ||
      !slug ||
      !tagline ||
      !description ||
      !selarUrl ||
      !level ||
      !duration ||
      Number.isNaN(priceNaira) ||
      Number.isNaN(lessonCount)
    ) {
      return redirect303(new URL(`/admin/courses/${routeParams.slug}?error=Missing+required+preview+details.`, request.url));
    }

    const existingCourse = await supabase
      .from("courses")
      .select("id, hero_image, thumbnail")
      .eq("slug", routeParams.slug)
      .single();

    if (existingCourse.error || !existingCourse.data) {
      return redirect303(new URL("/admin?error=That+course+could+not+be+found+for+editing.", request.url));
    }

    const thumbnail = formData.get("thumbnail");
    const heroImage = formData.get("heroImage");

    const thumbnailUrl =
      thumbnail instanceof File && thumbnail.size > 0
        ? await uploadCourseImage(thumbnail, slug, "thumbnail")
        : existingCourse.data.thumbnail;

    const heroImageUrl =
      heroImage instanceof File && heroImage.size > 0
        ? await uploadCourseImage(heroImage, slug, "hero")
        : existingCourse.data.hero_image;

    const courseResult = await supabase
      .from("courses")
      .update({
        slug,
        title,
        tagline,
        description,
        selar_url: selarUrl,
        price_naira: priceNaira,
        level,
        duration,
        lesson_count: Math.max(0, lessonCount),
        format: "Selar hosted course",
        hero_image: heroImageUrl,
        thumbnail: thumbnailUrl,
        outcomes: [],
        audience: [],
        is_published: true
      })
      .eq("id", existingCourse.data.id);

    if (courseResult.error) {
      if (courseResult.error.message?.includes("selar_url") || courseResult.error.message?.includes("lesson_count")) {
        return redirect303(new URL(`/admin/courses/${routeParams.slug}?error=Run+the+latest+Selar+preview+SQL+update+in+Supabase+before+saving+course+previews.`, request.url));
      }

      return redirect303(new URL(`/admin/courses/${routeParams.slug}?error=Could+not+update+the+course+record.`, request.url));
    }

    await supabase.from("course_modules").delete().eq("course_id", existingCourse.data.id);

    revalidateTag("courses", "max");
    return redirect303(new URL(`/admin/courses/${slug}?updated=success`, request.url));
  } catch {
    return redirect303(new URL(`/admin/courses/${routeParams.slug}?error=Course+update+failed.+Please+check+your+inputs+and+try+again.`, request.url));
  }
}
