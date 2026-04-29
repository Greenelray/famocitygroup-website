import { NextResponse } from "next/server";
import { getAdminAccess } from "@/lib/admin";
import { isTrustedFormRequest } from "@/lib/request-security";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { uploadCourseImage, uploadCourseVideo } from "@/lib/storage";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });

type CoursePayload = {
  modules: Array<{
    slug: string;
    title: string;
    summary: string;
    lessons: Array<{
      slug: string;
      title: string;
      duration: string;
      summary: string;
      body: string[];
      preview: boolean;
      videoMode: "upload" | "url";
      videoUrl: string;
      videoFieldName: string;
      resources: Array<{
        title: string;
        href: string;
      }>;
    }>;
  }>;
};

function parseLines(value: string | null) {
  return (value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parsePayload(formData: FormData) {
  const raw = formData.get("coursePayload")?.toString();
  if (!raw) {
    return null;
  }

  return JSON.parse(raw) as CoursePayload;
}

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
    const payload = parsePayload(formData);
    const title = formData.get("title")?.toString().trim();
    const slug = formData.get("slug")?.toString().trim().toLowerCase();
    const tagline = formData.get("tagline")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const priceNaira = Number(formData.get("priceNaira")?.toString() ?? "0");
    const level = formData.get("level")?.toString().trim();
    const duration = formData.get("duration")?.toString().trim();
    const format = formData.get("format")?.toString().trim();
    const outcomes = parseLines(formData.get("outcomes")?.toString() ?? null);
    const audience = parseLines(formData.get("audience")?.toString() ?? null);
    const thumbnail = formData.get("thumbnail");
    const heroImage = formData.get("heroImage");
    const modules = payload?.modules ?? [];

    const hasInvalidModules =
      !modules.length ||
      modules.some(
        (module) =>
          !module.slug.trim() ||
          !module.title.trim() ||
          !module.summary.trim() ||
          !module.lessons.length ||
          module.lessons.some((lesson) => {
            const needsUpload = lesson.videoMode === "upload";
            const uploadedVideo = formData.get(lesson.videoFieldName);
            return (
              !lesson.slug.trim() ||
              !lesson.title.trim() ||
              !lesson.duration.trim() ||
              !lesson.summary.trim() ||
              !lesson.body.length ||
              (needsUpload
                ? !(uploadedVideo instanceof File) || uploadedVideo.size === 0
                : !lesson.videoUrl.trim())
            );
          })
      );

    if (
      !payload ||
      !title ||
      !slug ||
      !tagline ||
      !description ||
      !level ||
      !duration ||
      !format ||
      !(thumbnail instanceof File) ||
      !(heroImage instanceof File) ||
      hasInvalidModules
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

    for (const [moduleIndex, module] of modules.entries()) {
      const moduleResult = await supabase
        .from("course_modules")
        .insert({
          course_id: courseResult.data.id,
          slug: module.slug,
          title: module.title,
          summary: module.summary,
          position: moduleIndex
        })
        .select("id")
        .single();

      if (moduleResult.error || !moduleResult.data) {
        return redirect303(new URL("/admin?error=Course+saved+but+the+module+could+not+be+created.", request.url));
      }

      for (const [lessonIndex, lesson] of module.lessons.entries()) {
        const videoUrl =
          lesson.videoMode === "upload"
            ? await uploadCourseVideo(formData.get(lesson.videoFieldName) as File, slug, lesson.slug)
            : lesson.videoUrl;

        const lessonResult = await supabase.from("course_lessons").insert({
          module_id: moduleResult.data.id,
          slug: lesson.slug,
          title: lesson.title,
          duration: lesson.duration,
          preview: lesson.preview,
          summary: lesson.summary,
          video_url: videoUrl,
          resources: lesson.resources,
          body: lesson.body,
          position: lessonIndex
        });

        if (lessonResult.error) {
          return redirect303(new URL("/admin?error=Course+and+module+saved+but+one+lesson+could+not+be+created.", request.url));
        }
      }
    }

    return redirect303(new URL("/admin?created=success", request.url));
  } catch {
    return redirect303(new URL("/admin?error=Course+upload+failed.+Please+check+your+files+and+try+again.", request.url));
  }
}
