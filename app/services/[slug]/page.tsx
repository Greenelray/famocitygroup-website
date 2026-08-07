import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";
import { getSessionUser } from "@/lib/session";
import { businessPillars, getBusinessPillarBySlug } from "@/lib/site-data";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

const serviceProof = [
  "Clear communication before decisions are made.",
  "Practical guidance that fits real budgets and real goals.",
  "A structured Famocity process built around trust and long-term value."
];

export function generateStaticParams() {
  return businessPillars.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getBusinessPillarBySlug(slug);

  if (!pillar) {
    return {};
  }

  return {
    title: `${pillar.title} | Famocity Group Limited`,
    description: pillar.copy,
    alternates: {
      canonical: `/services/${pillar.slug}`
    }
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const pillar = getBusinessPillarBySlug(slug);

  if (!pillar) {
    notFound();
  }

  const user = await getSessionUser();
  const Icon = pillar.icon;

  return (
    <main className="bg-white">
      <Navbar userEmail={user?.email} />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div>
              <span className="section-label">{pillar.eyebrow}</span>
              <h1 className="section-title">{pillar.title}</h1>
              <p className="section-copy">{pillar.copy}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="premium-button-primary">
                  Start Conversation
                  <ArrowRight size={16} />
                </Link>
                <Link href="/services" className="premium-button-secondary">
                  View All Expertise
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card p-8 sm:p-10">
              {pillar.logo ? (
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <Image src={pillar.logo} alt={`${pillar.title} logo`} width={760} height={320} className="h-auto w-full" />
                </div>
              ) : (
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[#0b1f3a] text-[#c8a951]">
                  <Icon size={34} />
                </div>
              )}
              <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
                {pillar.longCopy.map((copy) => (
                  <p key={copy}>{copy}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block bg-white">
        <div className="section-shell">
          <Reveal>
            <span className="section-label">How We Help</span>
            <h2 className="section-title max-w-4xl">A more guided experience from first interest to next action.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {serviceProof.map((item, index) => (
              <Reveal key={item} delay={0.08 * index}>
                <div className="glass-card flex h-full gap-4 p-6">
                  <CheckCircle2 className="mt-1 shrink-0 text-[#c8a951]" size={20} />
                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
