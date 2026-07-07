import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Phone } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";
import { getSessionUser } from "@/lib/session";
import { getPropertyBySlug, propertyListings } from "@/lib/site-data";

type PropertyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return propertyListings.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return {};
  }

  return {
    title: `${property.title} | Famocity Properties`,
    description: property.summary,
    alternates: {
      canonical: `/properties/${property.slug}`
    },
    openGraph: {
      title: `${property.title} | Famocity`,
      description: property.summary,
      images: [{ url: property.src, alt: property.alt }]
    }
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const user = await getSessionUser();
  const whatsappMessage = encodeURIComponent(
    `Hello Famocity, I am interested in ${property.title} at ${property.location}. Please send me more details.`
  );

  return (
    <main className="bg-white">
      <Navbar userEmail={user?.email} />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <div>
              <span className="section-label">Property Listing</span>
              <h1 className="section-title">{property.title}</h1>
              <p className="mt-4 flex items-center gap-2 text-base font-semibold text-slate-600">
                <MapPin size={18} className="text-[#c8a951]" />
                {property.location}
              </p>
              <p className="section-copy">{property.summary}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.3rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">Price</p>
                  <p className="mt-3 text-3xl font-bold text-slate-950">{property.price}</p>
                </div>
                <div className="rounded-[1.3rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">Plot Size</p>
                  <p className="mt-3 text-3xl font-bold text-slate-950">{property.size}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`https://wa.me/2348148287468?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="premium-button-primary"
                >
                  Ask On WhatsApp
                  <MessageCircle size={16} />
                </a>
                <Link href="/#contact" className="premium-button-secondary">
                  Contact Office
                  <Phone size={16} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card overflow-hidden p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-[linear-gradient(180deg,#eef4fb_0%,#d8e7f8_100%)]">
                <Image src={property.src} alt={property.alt} fill className="object-contain p-3" sizes="(max-width: 1024px) 100vw, 45vw" priority />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-block bg-white">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="sticky top-28">
              <span className="section-label">Why This Property</span>
              <h2 className="section-title">A clearer path before you commit.</h2>
              <p className="section-copy">
                Famocity helps buyers ask better questions, understand what they are buying, and move with stronger confidence.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {property.highlights.map((highlight, index) => (
              <Reveal key={highlight} delay={0.08 * index}>
                <div className="glass-card flex h-full gap-4 p-6">
                  <CheckCircle2 className="mt-1 shrink-0 text-[#c8a951]" size={20} />
                  <p className="text-sm leading-7 text-slate-600">{highlight}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block section-surface">
        <div className="section-shell">
          <Reveal>
            <div className="rounded-[2rem] bg-[#061326] p-8 text-white sm:p-10 lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#eadba6]">Next Step</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
                Speak with Famocity before you make your property decision.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">
                Ask about availability, verification, payment direction, location details, and inspection support.
              </p>
              <a
                href={`https://wa.me/2348148287468?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="premium-button-accent mt-8"
              >
                Start Property Inquiry
                <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
