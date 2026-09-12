import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import founderStoryPhoto from "../../manager3.jpeg";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";
import { getSessionUser } from "@/lib/session";
import { businessPillars, savingsPlatform } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About | Famocity Group Ltd",
  description:
    "Learn about Famocity Group Ltd, its five expertise areas, and the structure behind the brand.",
  alternates: {
    canonical: "/about"
  }
};

export default async function AboutPage() {
  const user = await getSessionUser();

  return (
    <main className="bg-white">
      <Navbar userEmail={user?.email} />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div>
              <span className="section-label">About The Group</span>
              <h1 className="section-title">Famocity Group Ltd is built around practical value creation.</h1>
              <p className="section-copy">
                Famocity Group Ltd brings focused business arms together under one parent brand: real estate, property agency, interior decor, solar energy, and technology. Famosave remains the savings platform that supports disciplined ownership goals.
              </p>
              <div className="mt-8 grid gap-3">
                {[
                  "A parent brand built for ownership, comfort, energy, and modern living.",
                  "Five expertise areas with their own identity and client focus.",
                  "A clear structure that helps people know where to start."
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-base leading-7 text-slate-600">
                    <CheckCircle2 className="mt-1 shrink-0 text-[#c8a951]" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card overflow-hidden p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-100">
                <Image src={founderStoryPhoto} alt="Famocity Group story" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block bg-white">
        <div className="section-shell">
          <Reveal>
            <span className="section-label">Group Structure</span>
            <h2 className="section-title max-w-4xl">Five expertise areas, one coordinated brand standard.</h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {businessPillars.map((pillar, index) => (
              <Reveal key={pillar.slug} delay={0.06 * index}>
                <Link href={pillar.href} className="glass-card block h-full p-5">
                  {pillar.logo ? (
                    <div className="flex h-28 items-center justify-center rounded-[1.2rem] bg-slate-50 p-4">
                      <Image src={pillar.logo} alt={`${pillar.title} logo`} width={320} height={160} className="max-h-full w-auto object-contain" />
                    </div>
                  ) : null}
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{pillar.copy}</p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-10 rounded-[2rem] bg-[#061326] p-8 text-white sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#eadba6]">{savingsPlatform.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold">{savingsPlatform.title}</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">{savingsPlatform.copy}</p>
              <Link href="/famosave" className="premium-button-accent mt-7">
                Open Famosave
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
