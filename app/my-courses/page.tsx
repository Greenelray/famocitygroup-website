import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { Footer } from "@/components/footer";
import { LogoutButton } from "@/components/logout-button";
import { Navbar } from "@/components/navbar";
import { isAdminEmail } from "@/lib/admin-emails";
import { listCourses } from "@/lib/course-data";
import { getEnrollmentSlugs } from "@/lib/enrollments";
import { getSessionUser } from "@/lib/session";

type MyCoursesPageProps = {
  searchParams: Promise<{ purchase?: string; error?: string }>;
};

export default async function MyCoursesPage({ searchParams }: MyCoursesPageProps) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?next=/my-courses");
  }

  const params = await searchParams;
  const enrollmentSlugs = await getEnrollmentSlugs();
  const courses = await listCourses();
  const enrolledCourses = courses.filter((course) => enrollmentSlugs.includes(course.slug));
  const isAdmin = isAdminEmail(user.email);

  return (
    <main className="bg-white">
      <Navbar userEmail={user.email} />

      <section className="section-surface min-h-screen pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="section-label">My Courses</span>
              <h1 className="section-title">Welcome back, {user.name.split(" ")[0]}.</h1>
              <p className="section-copy">
                This dashboard shows every course unlocked for <span className="break-all">{user.email}</span>.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/profile" className="premium-button-secondary w-full sm:w-auto">
                View Profile
              </Link>
              {isAdmin ? (
                <Link href="/admin" className="premium-button-primary w-full sm:w-auto">
                  Open Admin Dashboard
                </Link>
              ) : null}
              <LogoutButton />
            </div>
          </div>

          {params.purchase === "success" ? (
            <div className="mt-8 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
              Payment verified successfully. Your course has been added to this dashboard.
            </div>
          ) : null}

          {params.error ? (
            <div className="mt-8 rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
              {params.error}
            </div>
          ) : null}

          {enrolledCourses.length ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[2rem] bg-[#061326] p-6 text-white shadow-xl sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#eadba6]">No courses unlocked yet</p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Your student portal is ready.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">
                Once you purchase a Famocity course, it will appear here automatically after payment verification.
              </p>
              <Link href="/courses" className="premium-button-accent mt-6 w-full sm:w-auto">
                Explore courses
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
