import { NextResponse } from "next/server";
import { fallbackCourses } from "@/lib/course-data";
import { getAdminAccess } from "@/lib/admin";
import { isTrustedFormRequest } from "@/lib/request-security";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";

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
    const supabase = createSupabaseAdminClient();

    for (const course of fallbackCourses) {
      const courseResult = await supabase
        .from("courses")
        .upsert(
          {
            slug: course.slug,
            title: course.title,
            tagline: course.tagline,
            description: course.description,
            price_naira: course.priceNaira,
            level: course.level,
            duration: course.duration,
            format: course.format,
            hero_image: course.heroImage,
            thumbnail: course.thumbnail,
            outcomes: course.outcomes,
            audience: course.audience,
            is_published: true
          },
          { onConflict: "slug" }
        )
        .select("id")
        .single();

      if (courseResult.error || !courseResult.data) {
        throw new Error("Could not save course.");
      }

      const courseId = courseResult.data.id;

      for (const [moduleIndex, module] of course.modules.entries()) {
        const moduleResult = await supabase
          .from("course_modules")
          .upsert(
            {
              course_id: courseId,
              slug: module.slug,
              title: module.title,
              summary: module.summary,
              position: moduleIndex
            },
            { onConflict: "course_id,slug" }
          )
          .select("id")
          .single();

        if (moduleResult.error || !moduleResult.data) {
          throw new Error("Could not save course module.");
        }

        const moduleId = moduleResult.data.id;

        for (const [lessonIndex, lesson] of module.lessons.entries()) {
          const lessonResult = await supabase.from("course_lessons").upsert(
            {
              module_id: moduleId,
              slug: lesson.slug,
              title: lesson.title,
              duration: lesson.duration,
              preview: Boolean(lesson.preview),
              summary: lesson.summary,
              video_url: lesson.videoUrl,
              resources: lesson.resources,
              body: lesson.body,
              position: lessonIndex
            },
            { onConflict: "module_id,slug" }
          );

          if (lessonResult.error) {
            throw new Error("Could not save lesson.");
          }
        }
      }
    }

    return redirect303(new URL("/admin?imported=success", request.url));
  } catch {
    return redirect303(new URL("/admin?error=Course+import+failed.+Please+check+that+the+course-content+schema+has+been+run+in+Supabase.", request.url));
  }
}
