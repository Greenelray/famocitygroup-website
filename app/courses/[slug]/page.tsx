import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, BookOpenText, CheckCircle2, LockKeyhole, PlayCircle } from "lucide-react";
import { CoursePurchaseForm } from "@/components/course-purchase-form";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getCourseBySlug, getLessonCount } from "@/lib/course-data";
import { hasEnrollment } from "@/lib/enrollments";
import { getSessionUser } from "@/lib/session";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const user = await getSessionUser();
  const enrolled = await hasEnrollment(course.slug);
  const firstLesson = course.modules[0]?.lessons[0];

  return (
    <main className="relative overflow-x-hidden bg-white">
      <Navbar />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="section-label">Famocity Academy</span>
            <h1 className="section-title max-w-3xl">{course.title}</h1>
            <p className="section-copy">{course.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Level", value: course.level },
                { label: "Duration", value: course.duration },
                { label: "Lessons", value: `${getLessonCount(course)} lessons` }
              ].map((item) => (
                <div key={item.label} className="rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">{item.label}</p>
                  <p className="mt-3 text-base font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              {enrolled && firstLesson ? (
                <Link href={`/learn/${course.slug}/${firstLesson.slug}`} className="premium-button-primary w-full sm:w-auto">
                  Continue learning
                  <ArrowRight size={16} />
                </Link>
              ) : user ? (
                <div className="w-full max-w-sm">
                  <CoursePurchaseForm courseSlug={course.slug} />
                </div>
              ) : (
                <Link href={`/login?next=/courses/${course.slug}`} className="premium-button-primary w-full sm:w-auto">
                  Log in to buy this course
                  <ArrowRight size={16} />
                </Link>
              )}
              <Link href="/my-courses" className="premium-button-secondary w-full sm:w-auto">
                View my courses
              </Link>
            </div>
          </div>

          <div className="glass-card overflow-hidden p-3">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem]">
              <Image src={course.heroImage} alt={course.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061326]/85 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] border border-white/10 bg-white/10 p-5 text-white backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#eadba6]">Enrollment fee</p>
                <p className="mt-2 text-2xl font-bold sm:text-3xl">NGN {course.priceNaira.toLocaleString()}</p>
                <p className="mt-2 text-sm leading-6 text-slate-100">{course.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block bg-white">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="space-y-8">
            <div className="premium-card">
              <span className="section-label">What You&apos;ll Learn</span>
              <div className="mt-6 grid gap-4">
                {course.outcomes.map((item) => (
                  <div key={item} className="flex gap-3 rounded-[1.4rem] bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-[#c8a951]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-card">
              <span className="section-label">Course Curriculum</span>
              <div className="mt-6 space-y-5">
                {course.modules.map((module, moduleIndex) => (
                  <div key={module.slug} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9b7b26]">Module {moduleIndex + 1}</p>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-900">{module.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{module.summary}</p>

                    <div className="mt-5 space-y-3">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.slug} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <div className="flex gap-3">
                            <PlayCircle size={18} className="mt-1 shrink-0 text-[#c8a951]" />
                            <div>
                              <p className="font-semibold text-slate-900">{lesson.title}</p>
                              <p className="mt-1 text-sm leading-6 text-slate-600">{lesson.summary}</p>
                            </div>
                          </div>
                          <div className="pl-8 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:pl-0">
                            {lesson.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-7">
              <div className="flex items-center gap-3">
                <BookOpenText className="text-[#c8a951]" size={20} />
                <h2 className="text-2xl font-semibold text-slate-900">Who this is for</h2>
              </div>
              <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                {course.audience.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-7">
              <div className="flex items-center gap-3">
                <LockKeyhole className="text-[#c8a951]" size={20} />
                <h2 className="text-2xl font-semibold text-slate-900">Access flow</h2>
              </div>
              <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                <p>Create your learner account on Famocity.</p>
                <p>Pay securely through Paystack.</p>
                <p>Return instantly to your protected dashboard after payment verification.</p>
              </div>
            </div>

            {!user ? (
              <div className="glass-card bg-[#061326] p-7 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#eadba6]">Ready to join?</p>
                <h2 className="mt-3 text-2xl font-semibold">Create your account before checkout.</h2>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  This keeps each course linked to the right student dashboard and gives learners a secure return path.
                </p>
                <Link href={`/signup?next=/courses/${course.slug}`} className="premium-button-accent mt-5 w-full sm:w-auto">
                  Create account
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
