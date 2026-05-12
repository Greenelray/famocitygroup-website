import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminAccess } from "@/lib/admin";
import { isTrustedFormRequest } from "@/lib/request-security";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { uploadCourseImage } from "@/lib/storage";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });

export async function POST(request: Request) {
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

  try {
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
    const thumbnail = formData.get("thumbnail");
    const heroImage = formData.get("heroImage");

    if (
      !title ||
      !slug ||
      !tagline ||
      !description ||
      !selarUrl ||
      !level ||
      !duration ||
      Number.isNaN(priceNaira) ||
      Number.isNaN(lessonCount) ||
      !(thumbnail instanceof File) ||
      !(heroImage instanceof File)
    ) {
      return redirect303(new URL("/admin?error=Please+complete+all+required+course+fields+before+uploading.", request.url));
    }

    const [thumbnailUrl, heroImageUrl] = await Promise.all([
      uploadCourseImage(thumbnail, slug, "thumbnail"),
      uploadCourseImage(heroImage, slug, "hero")
    ]);

    const supabase = createSupabaseAdminClient();
    const courseResult = await supabase
      .from("courses")
      .insert({
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
      .select("id")
      .single();

    if (courseResult.error || !courseResult.data) {
      if (courseResult.error?.message?.includes("selar_url") || courseResult.error?.message?.includes("lesson_count")) {
        return redirect303(new URL("/admin?error=Run+the+latest+Selar+preview+SQL+update+in+Supabase+before+saving+course+previews.", request.url));
      }

      return redirect303(new URL("/admin?error=Could+not+save+the+course+record.+Please+check+that+the+slug+is+unique.", request.url));
    }

    revalidateTag("courses", "max");
    return redirect303(new URL("/admin?created=success", request.url));
  } catch {
    return redirect303(new URL("/admin?error=Course+upload+failed.+Please+check+your+files+and+try+again.", request.url));
  }
}
