import { NextResponse } from "next/server";
import { getAdminAccess } from "@/lib/admin";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { uploadCourseImage, uploadCourseVideo } from "@/lib/storage";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });

function parseLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
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
    const priceNaira = Number(formData.get("priceNaira")?.toString() ?? "0");
    const level = formData.get("level")?.toString().trim();
    const duration = formData.get("duration")?.toString().trim();
    const format = formData.get("format")?.toString().trim();
    const outcomes = parseLines(formData.get("outcomes")?.toString() ?? "");
    const audience = parseLines(formData.get("audience")?.toString() ?? "");
    const moduleTitle = formData.get("moduleTitle")?.toString().trim();
    const moduleSlug = formData.get("moduleSlug")?.toString().trim().toLowerCase();
    const moduleSummary = formData.get("moduleSummary")?.toString().trim();
    const lessonTitle = formData.get("lessonTitle")?.toString().trim();
    const lessonSlug = formData.get("lessonSlug")?.toString().trim().toLowerCase();
    const lessonDuration = formData.get("lessonDuration")?.toString().trim();
    const lessonSummary = formData.get("lessonSummary")?.toString().trim();
    const lessonBody = parseLines(formData.get("lessonBody")?.toString() ?? "");
    const lessonPreview = formData.get("lessonPreview") === "on";
    const resourceTitle = formData.get("resourceTitle")?.toString().trim();
    const resourceHref = formData.get("resourceHref")?.toString().trim();
    const thumbnail = formData.get("thumbnail");
    const heroImage = formData.get("heroImage");
    const lessonVideo = formData.get("lessonVideo");

    if (
      !title ||
      !slug ||
      !tagline ||
      !description ||
      !level ||
      !duration ||
      !format ||
      !moduleTitle ||
      !moduleSlug ||
      !moduleSummary ||
      !lessonTitle ||
      !lessonSlug ||
      !lessonDuration ||
      !lessonSummary ||
      !lessonBody.length ||
      !(thumbnail instanceof File) ||
      !(heroImage instanceof File) ||
      !(lessonVideo instanceof File)
    ) {
      return redirect303(new URL("/admin?error=Please+complete+all+required+course+fields+before+uploading.", request.url));
    }

    const [thumbnailUrl, heroImageUrl, videoUrl] = await Promise.all([
      uploadCourseImage(thumbnail, slug, "thumbnail"),
      uploadCourseImage(heroImage, slug, "hero"),
      uploadCourseVideo(lessonVideo, slug, lessonSlug)
    ]);

    const resources =
      resourceTitle && resourceHref
        ? [
            {
              title: resourceTitle,
              href: resourceHref
            }
          ]
        : [];

    const supabase = createSupabaseAdminClient();
    const courseResult = await supabase
      .from("courses")
      .insert({
        slug,
        title,
        tagline,
        description,
        price_naira: priceNaira,
        level,
        duration,
        format,
        hero_image: heroImageUrl,
        thumbnail: thumbnailUrl,
        outcomes,
        audience,
        is_published: true
      })
      .select("id")
      .single();

    if (courseResult.error || !courseResult.data) {
      return redirect303(new URL("/admin?error=Could+not+save+the+course+record.+Please+check+that+the+slug+is+unique.", request.url));
    }

    const moduleResult = await supabase
      .from("course_modules")
      .insert({
        course_id: courseResult.data.id,
        slug: moduleSlug,
        title: moduleTitle,
        summary: moduleSummary,
        position: 0
      })
      .select("id")
      .single();

    if (moduleResult.error || !moduleResult.data) {
      return redirect303(new URL("/admin?error=Course+saved+but+the+module+could+not+be+created.", request.url));
    }

    const lessonResult = await supabase.from("course_lessons").insert({
      module_id: moduleResult.data.id,
      slug: lessonSlug,
      title: lessonTitle,
      duration: lessonDuration,
      preview: lessonPreview,
      summary: lessonSummary,
      video_url: videoUrl,
      resources,
      body: lessonBody,
      position: 0
    });

    if (lessonResult.error) {
      return redirect303(new URL("/admin?error=Course+and+module+saved+but+the+lesson+could+not+be+created.", request.url));
    }

    return redirect303(new URL("/admin?created=success", request.url));
  } catch {
    return redirect303(new URL("/admin?error=Course+upload+failed.+Please+check+your+files+and+try+again.", request.url));
  }
}
