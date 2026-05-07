import Image from "next/image";

type PageLoadingProps = {
  eyebrow?: string;
  message?: string;
  title?: string;
};

export function PageLoading({
  eyebrow = "Famocity Loading",
  message = "Preparing your next view with premium speed and structure.",
  title = "Loading your experience."
}: PageLoadingProps) {
  return (
    <main className="section-surface min-h-screen pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div className="section-shell">
        <div className="premium-card mx-auto max-w-4xl overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(11,31,58,0.06),rgba(200,169,81,0.92),rgba(11,31,58,0.12))]" />

          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="section-label">{eyebrow}</span>
              <h1 className="section-title text-4xl sm:text-5xl">{title}</h1>
              <p className="section-copy max-w-xl">{message}</p>

              <div className="mt-8 flex items-center gap-3">
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    className="h-3 w-3 animate-pulse rounded-full bg-[#c8a951]"
                    style={{ animationDelay: `${index * 180}ms` }}
                  />
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="glass-card premium-shimmer rounded-[2rem] p-6">
                <div className="rounded-[1.6rem] bg-[linear-gradient(135deg,#0b1f3a_0%,#123a67_100%)] px-5 py-6 shadow-[0_20px_40px_rgba(11,31,58,0.22)]">
                  <Image
                    src="/famocity-header-logo-cropped.png"
                    alt="Famocity"
                    width={1177}
                    height={278}
                    className="h-12 w-auto max-w-[250px]"
                    priority
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <div className="h-4 w-28 animate-pulse rounded-full bg-[#c8a951]/20" />
                  <div className="h-5 w-full animate-pulse rounded-full bg-slate-200" />
                  <div className="h-5 w-4/5 animate-pulse rounded-full bg-slate-200" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="h-24 animate-pulse rounded-[1.4rem] bg-slate-100" />
                    <div className="h-24 animate-pulse rounded-[1.4rem] bg-slate-100" />
                  </div>
                  <div className="h-12 w-full animate-pulse rounded-full bg-[linear-gradient(135deg,#0b1f3a_0%,#123a67_100%)] opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
