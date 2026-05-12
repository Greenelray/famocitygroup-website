import Image from "next/image";
import { notFound } from "next/navigation";
import { CoursePurchaseForm } from "@/components/course-purchase-form";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getCourseBySlug, getLessonCount } from "@/lib/course-data";
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

  return (
    <main className="relative overflow-x-hidden bg-white">
      <Navbar userEmail={user?.email} />

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
              <div className="w-full max-w-sm">
                <CoursePurchaseForm href={course.selarUrl} />
              </div>
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

      <Footer />
    </main>
  );
}
