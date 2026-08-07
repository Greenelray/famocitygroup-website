import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, PiggyBank, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";
import { getSessionUser } from "@/lib/session";
import { savingsPlatform } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Famosave | Famocity Group Limited",
  description:
    "Famosave is Famocity Group Limited's savings platform for disciplined planning toward land ownership and long-term asset goals.",
  alternates: {
    canonical: "/famosave"
  }
};

const benefits = [
  {
    title: "Goal-led saving",
    copy: "Save with a clear direction instead of treating ownership like a vague future plan.",
    icon: PiggyBank
  },
  {
    title: "Better discipline",
    copy: "Build consistency around land, property, and asset goals with practical structure.",
    icon: BadgeCheck
  },
  {
    title: "Famocity guidance",
    copy: "Connect your savings intention with property guidance from the wider Famocity team.",
    icon: ShieldCheck
  }
];

export default async function FamosavePage() {
  const user = await getSessionUser();

  return (
    <main className="bg-white">
      <Navbar userEmail={user?.email} />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <div>
              <span className="section-label">{savingsPlatform.eyebrow}</span>
              <h1 className="section-title">{savingsPlatform.title} helps turn ownership goals into a plan.</h1>
              <p className="section-copy">{savingsPlatform.copy}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="premium-button-primary">
                  Ask About Famosave
                  <ArrowRight size={16} />
                </Link>
                <Link href="/properties" className="premium-button-secondary">
                  View Properties
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card p-8 sm:p-10">
              <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm">
                <Image
                  src={savingsPlatform.logo ?? "/famosave-logo.png"}
                  alt="Famosave logo"
                  width={760}
                  height={320}
                  className="h-auto w-full"
                />
              </div>
              <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
                {savingsPlatform.longCopy.map((copy) => (
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
            <span className="section-label">Why It Matters</span>
            <h2 className="section-title max-w-4xl">A savings platform should make your next big move feel clearer.</h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <Reveal key={benefit.title} delay={0.08 * index}>
                  <div className="glass-card h-full p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b1f3a] text-[#c8a951]">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-slate-950">{benefit.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{benefit.copy}</p>
                  </div>
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
