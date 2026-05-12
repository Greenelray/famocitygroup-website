import { ShieldCheck } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { listCourses } from "@/lib/course-data";
import { getSessionUser } from "@/lib/session";

export default async function CoursesPage() {
  const courses = await listCourses();
  const user = await getSessionUser();

  return (
    <main className="relative overflow-x-hidden bg-white">
      <Navbar userEmail={user?.email} />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell">
          <span className="section-label">Famocity Academy</span>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="section-title">Premium course previews before buyers continue to Selar.</h1>
              <p className="section-copy">
                Browse each Famocity course preview here, then open the specific Selar page attached to that course when you are ready to buy.
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">What students get</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {[
                  "A clear premium preview before purchase.",
                  "A separate Selar link attached to each course.",
                  "Selar-hosted checkout and course delivery for enrolled students."
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
