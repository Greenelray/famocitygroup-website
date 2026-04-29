import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getSafeRedirectPath } from "@/lib/request-security";
import { getSessionUser } from "@/lib/session";

type LoginPageProps = {
  searchParams: Promise<{ next?: string; error?: string; message?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = getSafeRedirectPath(params.next, "/my-courses");
  const user = await getSessionUser();

  if (user) {
    redirect(next);
  }

  return (
    <main className="bg-white">
      <Navbar />

      <section className="section-surface min-h-screen pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell max-w-xl">
          <div className="premium-card">
            <span className="section-label">Student Login</span>
            <h1 className="section-title text-4xl">Access your course dashboard.</h1>
            <p className="section-copy">
              Sign in with the same email you used for your Famocity learning account.
            </p>

            {params.message ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {params.message}
              </div>
            ) : null}

            <LoginForm initialError={params.error} next={next} />

            <p className="mt-5 text-sm text-slate-600">
              New here?{" "}
              <Link href={`/signup${next !== "/my-courses" ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-semibold text-[#0b1f3a]">
                Create a learner account
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
