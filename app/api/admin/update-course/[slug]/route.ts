import { NextResponse } from "next/server";
import { getAdminAccess } from "@/lib/admin";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { uploadCourseImage, uploadCourseVideo } from "@/lib/storage";

const redirect303 = (url: URL | string) => NextResponse.redirect(url, { status: 303 });

type UpdateCourseRouteProps = {
  params: Promise<{ slug: string }>;
};

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

function parsePayload(formData: FormData) {
  const raw = formData.get("coursePayload")?.toString();
  if (!raw) {
    return null;
  }
  return JSON.parse(raw) as CoursePayload;
}

function parseLines(value: string | null) {
  return (value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function POST(request: Request, { params }: UpdateCourseRouteProps) {
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

    if (
      !payload ||
      !title ||
      !slug ||
      !tagline ||
      !description ||
      !level ||
      !duration ||
      !format ||
      !payload.modules.length
    ) {
      return redirect303(new URL(`/admin/courses/${routeParams.slug}?error=Missing+course+payload.`, request.url));
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
      .eq("id", existingCourse.data.id);

    if (courseResult.error) {
      return redirect303(new URL(`/admin/courses/${routeParams.slug}?error=Could+not+update+the+course+record.`, request.url));
    }

    await supabase.from("course_modules").delete().eq("course_id", existingCourse.data.id);

    for (const [moduleIndex, module] of payload.modules.entries()) {
      const moduleResult = await supabase
        .from("course_modules")
        .insert({
          course_id: existingCourse.data.id,
          slug: module.slug,
          title: module.title,
          summary: module.summary,
          position: moduleIndex
        })
        .select("id")
        .single();

      if (moduleResult.error || !moduleResult.data) {
        return redirect303(new URL(`/admin/courses/${routeParams.slug}?error=Could+not+rebuild+the+course+modules.`, request.url));
      }

      for (const [lessonIndex, lesson] of module.lessons.entries()) {
        const videoUrl =
          lesson.videoMode === "upload"
            ? (() => {
                const uploadedVideo = formData.get(lesson.videoFieldName);
                return uploadedVideo instanceof File && uploadedVideo.size > 0
                  ? uploadCourseVideo(uploadedVideo, slug, lesson.slug)
                  : Promise.resolve(lesson.videoUrl);
              })()
            : Promise.resolve(lesson.videoUrl);

        const resolvedVideoUrl = await videoUrl;

        const lessonResult = await supabase.from("course_lessons").insert({
          module_id: moduleResult.data.id,
          slug: lesson.slug,
          title: lesson.title,
          duration: lesson.duration,
          preview: lesson.preview,
          summary: lesson.summary,
          video_url: resolvedVideoUrl,
          resources: lesson.resources,
          body: lesson.body,
          position: lessonIndex
        });

        if (lessonResult.error) {
          return redirect303(new URL(`/admin/courses/${routeParams.slug}?error=Could+not+save+one+of+the+lessons.`, request.url));
        }
      }
    }

    return redirect303(new URL(`/admin/courses/${slug}?updated=success`, request.url));
  } catch {
    return redirect303(new URL(`/admin/courses/${routeParams.slug}?error=Course+update+failed.+Please+check+your+inputs+and+try+again.`, request.url));
  }
}
