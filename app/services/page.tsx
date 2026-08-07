import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";
import { getSessionUser } from "@/lib/session";
import { businessPillars } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Expertise | Famocity Group Limited",
  description:
    "Explore Famocity Group Limited expertise across real estate, property agency, interior decor, solar energy, and Ouscraft Technology Hubs.",
  alternates: {
    canonical: "/services"
  }
};

export default async function ServicesPage() {
  const user = await getSessionUser();

  return (
    <main className="bg-white">
      <Navbar userEmail={user?.email} />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell">
          <Reveal>
            <span className="section-label">Expertise</span>
            <h1 className="section-title max-w-4xl">Five specialist arms under Famocity Group Limited.</h1>
            <p className="section-copy">
              Famocity Group brings real estate, property agency, interior decor, solar energy, and technology into one professional structure.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {businessPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.slug} delay={0.08 * index}>
                  <Link href={pillar.href} className="glass-card group block h-full p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b1f3a] text-[#c8a951]">
                      <Icon size={22} />
                    </div>
                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">{pillar.eyebrow}</p>
                    <h2 className="mt-3 text-xl font-semibold text-slate-950">{pillar.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{pillar.copy}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0b1f3a]">
                      Learn more
                      <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
