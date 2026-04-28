import Link from "next/link";
import { redirect } from "next/navigation";
import { KeyRound, UserRound } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PasswordUpdateForm } from "@/components/password-update-form";
import { isAdminEmail } from "@/lib/admin-emails";
import { getStudentProfile } from "@/lib/profile";

type ProfilePageProps = {
  searchParams: Promise<{ updated?: string; error?: string }>;
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const profile = await getStudentProfile();

  if (!profile) {
    redirect("/login?next=/profile");
  }

  const params = await searchParams;
  const isAdmin = isAdminEmail(profile.email);

  return (
    <main className="bg-white">
      <Navbar userEmail={profile.email} />

      <section className="section-surface min-h-screen pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell">
          <span className="section-label">Student Profile</span>
          <h1 className="section-title">Manage your account.</h1>
          <p className="section-copy">
            View your student details, update your profile, and change your password securely.
          </p>

          {params.updated === "profile" ? (
            <div className="mt-8 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
              Your profile details were updated successfully.
            </div>
          ) : null}

          {params.updated === "password" ? (
            <div className="mt-8 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
              Your password was updated successfully.
            </div>
          ) : null}

          {params.error ? (
            <div className="mt-8 rounded-[1.5rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
              {params.error}
            </div>
          ) : null}

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className="glass-card p-7">
                <div className="flex items-center gap-3">
                  <UserRound className="text-[#c8a951]" size={22} />
                  <h2 className="text-2xl font-semibold text-slate-900">Your details</h2>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-slate-50 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">Full name</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{profile.fullName}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">Email</p>
                    <p className="mt-2 break-all text-base font-semibold text-slate-900">{profile.email}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">Courses unlocked</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">{profile.enrolledCount}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">Purchases</p>
                      <p className="mt-2 text-base font-semibold text-slate-900">{profile.purchaseCount}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">Account type</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{isAdmin ? "Admin student account" : "Student account"}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/my-courses" className="premium-button-secondary w-full sm:w-auto">
                    Back to My Courses
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-7">
                <h2 className="text-2xl font-semibold text-slate-900">Update profile details</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Keep your student profile name current so your dashboard and records stay accurate.
                </p>

                <form action="/api/account/update-profile" method="POST" className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
                    <input
                      name="fullName"
                      type="text"
                      required
                      defaultValue={profile.fullName}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#c8a951]"
                    />
                  </label>

                  <button type="submit" className="premium-button-primary w-full sm:w-auto">
                    Save profile
                  </button>
                </form>
              </div>

              <div className="glass-card p-7">
                <div className="flex items-center gap-3">
                  <KeyRound className="text-[#c8a951]" size={22} />
                  <h2 className="text-2xl font-semibold text-slate-900">Change password</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Choose a strong password and use the eye icon in each field if you want to see what you are typing.
                </p>

                <div className="mt-6">
                  <PasswordUpdateForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
