import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, Settings, Wallet } from "lucide-react";
import { AdminCourseForm } from "@/components/admin-course-form";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getAdminAccess } from "@/lib/admin";
import { listCourses } from "@/lib/course-data";
import { isSupabaseConfigured } from "@/lib/supabase";

type AdminPageProps = {
  searchParams: Promise<{ imported?: string; created?: string; deleted?: string; error?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const adminAccess = await getAdminAccess();

  if (adminAccess.reason === "unauthenticated") {
    redirect("/login?next=/admin&error=Please+log+in+with+an+admin+account.");
  }

  if (!adminAccess.allowed) {
    redirect("/my-courses?error=You+do+not+have+admin+access.");
  }

  const courses = await listCourses();
  const supabaseConfigured = isSupabaseConfigured();
  const params = await searchParams;

  return (
    <main className="bg-white">
      <Navbar userEmail={adminAccess.user.email} />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell">
          <span className="section-label">Admin Starter</span>
          <h1 className="section-title">Course platform control center.</h1>
          <p className="section-copy">
            This version keeps the website as a premium course preview while sending buyers to each course&apos;s live Selar checkout link. Add the Selar public URL per course in the admin form below.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Signed in as <span className="font-semibold text-slate-800">{adminAccess.user.email}</span>
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="glass-card p-7">
              <Settings className="text-[#c8a951]" size={22} />
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">Current setup</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Course content can now be imported into Supabase and read from the database, with <code>lib/course-data.ts</code> kept as a fallback.
              </p>
            </div>

            <div className="glass-card p-7">
              <Wallet className="text-[#c8a951]" size={22} />
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">Sales channel</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Your course purchase flow now points visitors to Selar instead of processing checkout directly on this website.
              </p>
            </div>

            <div className="glass-card p-7">
              <CheckCircle2 className="text-[#c8a951]" size={22} />
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">Next upgrade</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                The next step after import is a full browser-based editor for courses, modules, and lessons.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Create a new course</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                Upload the course preview details, pricing, images, and the Selar public link here. Each course can now carry its own Selar URL for the Buy button.
              </p>
            </div>

          {params.created === "success" ? (
            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Course created successfully. It should now be visible in the course catalog.
            </div>
          ) : null}

          {params.deleted === "success" ? (
            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Course deleted successfully.
            </div>
          ) : null}

            <AdminCourseForm action="/api/admin/create-course" submitLabel="Upload course" />
          </div>

          <div className="mt-10 rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Supabase course import</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                  Import the current course content into Supabase so the live course pages read from the database instead of code-only fallback data.
                </p>
              </div>
              <form action="/api/admin/sync-courses" method="POST">
                <button
                  type="submit"
                  className="premium-button-primary w-full disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto"
                  disabled={!supabaseConfigured}
                >
                  Import courses to Supabase
                </button>
              </form>
            </div>

            {!supabaseConfigured ? (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                Add your Supabase keys to your environment variables before importing content on live.
              </div>
            ) : null}

            {params.imported === "success" ? (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Course content imported successfully. Your course pages can now read from Supabase.
              </div>
            ) : null}

            {params.error ? (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {params.error}
              </div>
            ) : null}
          </div>

          <div className="mt-10 rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-2xl font-semibold text-slate-900">Current course inventory</h2>
            <div className="mt-5 space-y-4">
              {courses.map((course) => (
                <div key={course.slug} className="rounded-2xl bg-slate-50 px-4 py-4 sm:px-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{course.title}</p>
                      <p className="break-all text-sm text-slate-600">{course.slug}</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <Link href={`/courses/${course.slug}`} className="text-sm font-semibold text-[#0b1f3a]">
                        Preview course
                      </Link>
                      <Link href={`/admin/courses/${course.slug}`} className="text-sm font-semibold text-[#9b7b26]">
                        Edit course
                      </Link>
                      <form action={`/api/admin/delete-course/${course.slug}`} method="POST">
                        <button type="submit" className="text-left text-sm font-semibold text-rose-600">
                          Delete course
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
