import Link from "next/link";
import { redirect } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getSafeRedirectPath } from "@/lib/request-security";
import { getSessionUser } from "@/lib/session";

type SignupPageProps = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
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
            <span className="section-label">Create Account</span>
            <h1 className="section-title text-4xl">Open your Famocity Academy profile.</h1>
            <p className="section-copy">
              Your learner profile is what ties each successful payment to the right course dashboard.
            </p>

            {params.error ? (
              <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {params.error}
              </div>
            ) : null}

            <form action="/api/auth/signup" method="POST" className="mt-8 space-y-4">
              <input type="hidden" name="next" value={next} />
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                  placeholder="Your full name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                <input
                  name="password"
                  type="password"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                  placeholder="Create a password"
                  minLength={8}
                />
              </label>
              <button type="submit" className="premium-button-primary w-full">
                Create account
              </button>
            </form>

            <p className="mt-5 text-sm text-slate-600">
              Already have an account?{" "}
              <Link href={`/login${next !== "/my-courses" ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-semibold text-[#0b1f3a]">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
