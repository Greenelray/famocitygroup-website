import Image from "next/image";
import footerLogo from "../logo.png";

type PageLoadingProps = {
  message?: string;
};

export function PageLoading({
  message = "Loading..."
}: PageLoadingProps) {
  return (
    <section className="px-5 pb-12 pt-32 sm:px-6 sm:pb-16 sm:pt-36 lg:px-8">
      <div className="mx-auto flex min-h-[42vh] max-w-6xl items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="loader-logo-wrap">
            <div className="loader-glow" />
            <div className="loader-ring loader-ring-one" />
            <div className="loader-ring loader-ring-two" />
            <div className="loader-logo-card">
              <Image
                src={footerLogo}
                alt="Famocity logo"
                width={160}
                height={80}
                className="loader-logo-image"
                priority
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="loader-dot" />
            <span className="loader-dot" />
            <span className="loader-dot" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
            {message}
          </p>
        </div>
      </div>
    </section>
  );
}
