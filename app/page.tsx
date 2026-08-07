import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import promisePhoto from "../md2.jpeg";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PremiumHeroScene } from "@/components/premium-hero-scene";
import { Reveal } from "@/components/reveal";
import { getSessionUser } from "@/lib/session";
import { businessPillars, propertyListings, savingsPlatform } from "@/lib/site-data";

const homepageProof = [
  "Five focused expertise areas under one group structure.",
  "Property, energy, interiors, agency, and technology support.",
  "Famosave remains the savings platform for ownership goals."
];

export default async function Home() {
  const user = await getSessionUser();
  const featuredProperty = propertyListings[0];

  return (
    <main className="relative overflow-x-hidden bg-white">
      <Navbar userEmail={user?.email} />

      <section id="home" className="relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="absolute inset-0">
          <Image src="/hero-real-estate.svg" alt="Famocity Group visual background" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(6,19,38,0.98)_0%,rgba(11,31,58,0.9)_46%,rgba(12,57,54,0.7)_100%)]" />
          <PremiumHeroScene />
          <div className="absolute bottom-0 left-0 h-44 w-full bg-gradient-to-t from-[#061326]/75 to-transparent" />
        </div>

        <div className="section-shell relative z-10 grid min-h-[82svh] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal>
            <div className="max-w-4xl">
              <span className="section-label border-white/15 bg-white/10 text-[#c8a951]">Famocity Group Limited</span>
              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.02] text-white sm:text-5xl lg:text-7xl">
                Building ownership, comfort, energy, and modern living.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                Famocity Group Limited brings together real estate, property agency, interior decor, solar energy, and Ouscraft Technology Hubs with Famosave as a focused savings platform.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/services" className="premium-button-accent min-h-12 px-8">
                  Explore Expertise
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/properties"
                  className="premium-button min-h-12 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white hover:bg-white/15"
                >
                  View Properties
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {homepageProof.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm leading-6 text-slate-100 backdrop-blur">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mx-auto w-full max-w-[29rem]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
                <Image src={promisePhoto} alt="Famocity Group representative" fill className="object-cover p-3" sizes="(max-width: 1024px) 100vw, 40vw" />
                <div className="absolute inset-3 rounded-[1.6rem] bg-gradient-to-t from-[#061326]/90 via-[#061326]/20 to-transparent" />
                <div className="absolute inset-x-8 bottom-8 rounded-[1.4rem] border border-white/10 bg-white/10 p-5 text-white backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#eadba6]">Group Promise</p>
                  <p className="mt-3 text-base leading-7 text-slate-100">
                    One parent brand, five specialist arms, and a clearer path for people who want to build value.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block bg-white">
        <div className="section-shell">
          <Reveal>
            <span className="section-label">Five Expertise</span>
            <h2 className="section-title max-w-4xl">Specialist arms with one professional standard.</h2>
            <p className="section-copy">
              Each Famocity expertise has its own page, logo, role, and path for clients who need deeper details.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {businessPillars.map((pillar, index) => (
              <Reveal key={pillar.slug} delay={0.06 * index}>
                <Link href={pillar.href} className="glass-card group block h-full p-5">
                  {pillar.logo ? (
                    <div className="flex h-32 items-center justify-center rounded-[1.2rem] bg-slate-50 p-4">
                      <Image src={pillar.logo} alt={`${pillar.title} logo`} width={360} height={180} className="max-h-full w-auto object-contain" />
                    </div>
                  ) : null}
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">{pillar.eyebrow}</p>
                  <h3 className="mt-3 text-lg font-semibold leading-7 text-slate-950">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{pillar.copy}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0b1f3a]">
                    Open page
                    <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block section-surface">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div>
              <span className="section-label">Featured Property</span>
              <h2 className="section-title">{featuredProperty.title}</h2>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
                <MapPin size={16} className="text-[#c8a951]" />
                {featuredProperty.location}
              </p>
              <p className="section-copy">{featuredProperty.summary}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7b26]">Price</p>
                  <p className="mt-2 text-2xl font-bold text-slate-950">{featuredProperty.price}</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7b26]">Size</p>
                  <p className="mt-2 text-2xl font-bold text-slate-950">{featuredProperty.size}</p>
                </div>
              </div>
              <Link href={`/properties/${featuredProperty.slug}`} className="premium-button-primary mt-8">
                View Property Details
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card overflow-hidden p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-100">
                <Image src={featuredProperty.src} alt={featuredProperty.alt} fill className="object-contain p-3" sizes="(max-width: 1024px) 100vw, 45vw" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block bg-white">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
              <Image src={savingsPlatform.logo || "/famosave-logo.png"} alt="Famosave logo" width={520} height={220} className="h-auto w-full max-w-md" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="section-label">{savingsPlatform.eyebrow}</span>
              <h2 className="section-title">{savingsPlatform.title} remains the savings platform.</h2>
              <p className="section-copy">{savingsPlatform.copy}</p>
              <Link href="/famosave" className="premium-button-secondary mt-8">
                Learn About Famosave
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block section-surface">
        <div className="section-shell">
          <Reveal>
            <div className="rounded-[2rem] bg-[#061326] p-8 text-white shadow-xl sm:p-10 lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#eadba6]">Start Here</p>
              <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">
                Tell Famocity Group what you want to build, buy, improve, power, or manage.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200">
                We will direct you to the right arm of the group and the right next step.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="premium-button-accent">
                  Contact Famocity
                  <ArrowRight size={16} />
                </Link>
                <a href="https://wa.me/2348148287468" target="_blank" rel="noreferrer" className="premium-button border border-white/20 bg-white/10 text-white">
                  WhatsApp
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
