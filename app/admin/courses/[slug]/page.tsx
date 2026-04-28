import { redirect } from "next/navigation";
import { AdminCourseForm } from "@/components/admin-course-form";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getAdminAccess } from "@/lib/admin";
import { getCourseBySlug } from "@/lib/course-data";

type EditCoursePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ updated?: string; error?: string }>;
};

export default async function EditCoursePage({ params, searchParams }: EditCoursePageProps) {
  const adminAccess = await getAdminAccess();

  if (adminAccess.reason === "unauthenticated") {
    redirect("/login?next=/admin&error=Please+log+in+with+an+admin+account.");
  }

  if (!adminAccess.allowed) {
    redirect("/my-courses?error=You+do+not+have+admin+access.");
  }

  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  const query = await searchParams;

  if (!course) {
    redirect("/admin?error=That+course+could+not+be+found.");
  }

  return (
    <main className="bg-white">
      <Navbar userEmail={adminAccess.user.email} />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell">
          <span className="section-label">Edit Course</span>
          <h1 className="section-title">Update {course.title}</h1>
          <p className="section-copy">
            Edit the course details, add modules and lessons, and replace media where needed.
          </p>

          {query.updated === "success" ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Course updated successfully.
            </div>
          ) : null}

          {query.error ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {query.error}
            </div>
          ) : null}

          <div className="mt-8 rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <AdminCourseForm
              action={`/api/admin/update-course/${course.slug}`}
              submitLabel="Save changes"
              initialCourse={course}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
