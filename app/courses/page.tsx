import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { listCourses } from "@/lib/course-data";

export default async function CoursesPage() {
  const courses = await listCourses();

  return (
    <main className="relative overflow-x-hidden bg-white">
      <Navbar />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell">
          <span className="section-label">Famocity Academy</span>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="section-title">Course experiences you own on your own website.</h1>
              <p className="section-copy">
                Browse premium Famocity learning programs, pay directly on the site, and unlock your student dashboard instantly after successful payment verification.
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">What students get</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {[
                  "Protected lesson access tied to each paid course.",
                  "A My Courses dashboard for returning students.",
                  "Paystack-ready checkout and payment verification flow."
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <ShieldCheck size={18} className="mt-1 text-[#c8a951]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-4 rounded-[1.8rem] bg-[#061326] p-6 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#eadba6]">Need a student account?</p>
              <h2 className="mt-3 text-xl font-semibold sm:text-2xl">Create your learner profile before checkout.</h2>
            </div>
            <Link href="/signup" className="premium-button-accent w-full sm:w-auto">
              Create account
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
