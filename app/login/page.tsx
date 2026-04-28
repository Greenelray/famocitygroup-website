import Link from "next/link";
import { redirect } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getSessionUser } from "@/lib/session";

type LoginPageProps = {
  searchParams: Promise<{ next?: string; error?: string; message?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const user = await getSessionUser();

  if (user) {
    redirect(params.next || "/my-courses");
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

            {params.error ? (
              <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {params.error}
              </div>
            ) : null}

            {params.message ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {params.message}
              </div>
            ) : null}

            <form action="/api/auth/login" method="POST" className="mt-8 space-y-4">
              <input type="hidden" name="next" value={params.next || "/my-courses"} />
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
                  placeholder="Your password"
                />
              </label>
              <button type="submit" className="premium-button-primary w-full">
                Log in
              </button>
            </form>

            <p className="mt-5 text-sm text-slate-600">
              New here?{" "}
              <Link href={`/signup${params.next ? `?next=${encodeURIComponent(params.next)}` : ""}`} className="font-semibold text-[#0b1f3a]">
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
