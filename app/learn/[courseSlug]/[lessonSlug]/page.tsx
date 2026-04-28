import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Download, PlayCircle } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getLesson } from "@/lib/course-data";
import { hasEnrollment } from "@/lib/enrollments";
import { getSessionUser } from "@/lib/session";

type LessonPageProps = {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseSlug, lessonSlug } = await params;
  const lessonData = await getLesson(courseSlug, lessonSlug);

  if (!lessonData) {
    notFound();
  }

  const user = await getSessionUser();
  if (!user) {
    redirect(`/login?next=/learn/${courseSlug}/${lessonSlug}`);
  }

  const enrolled = await hasEnrollment(courseSlug);
  if (!enrolled) {
    redirect(`/courses/${courseSlug}`);
  }

  const { course, module, lesson } = lessonData;

  return (
    <main className="bg-white">
      <Navbar userEmail={user.email} />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell">
          <Link href="/my-courses" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#0b1f3a]">
            <ArrowLeft size={16} />
            Back to My Courses
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="space-y-6">
              <div className="premium-card">
                <span className="section-label">{course.title}</span>
                <h1 className="section-title text-3xl sm:text-4xl">{lesson.title}</h1>
                <p className="section-copy">{lesson.summary}</p>
              </div>

              <div className="glass-card overflow-hidden">
                <div className="aspect-video bg-slate-950">
                  <iframe
                    src={lesson.videoUrl}
                    title={lesson.title}
                    className="h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="border-t border-slate-200 px-6 py-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <PlayCircle size={16} className="text-[#c8a951]" />
                    {lesson.duration}
                  </div>
                </div>
              </div>

              <div className="premium-card">
                <span className="section-label">Lesson Notes</span>
                <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
                  {lesson.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9b7b26]">Current module</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">{module.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{module.summary}</p>
              </div>

              <div className="glass-card p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9b7b26]">Resources</p>
                <div className="mt-4 space-y-3">
                  {lesson.resources.map((resource) => (
                    <a
                      key={resource.title}
                      href={resource.href}
                      className="flex flex-col gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span>{resource.title}</span>
                      <Download size={16} className="text-[#c8a951]" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass-card p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9b7b26]">What&apos;s next</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Keep building through the rest of the module from your course dashboard. As you move to a database-backed version later, this area can also show progress, notes, and completed lessons.
                </p>
                <Link href={`/courses/${course.slug}`} className="premium-button-secondary mt-5 w-full sm:w-auto">
                  View full curriculum
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
