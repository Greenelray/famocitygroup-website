import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";
import { getSessionUser } from "@/lib/session";
import { propertyListings } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Available Properties | Famocity",
  description:
    "Explore Famocity property listings, including Greenland Phase II and other Delta State real estate opportunities.",
  alternates: {
    canonical: "/properties"
  }
};

export default async function PropertiesPage() {
  const user = await getSessionUser();

  return (
    <main className="bg-white">
      <Navbar userEmail={user?.email} />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell">
          <Reveal>
            <span className="section-label">Available Properties</span>
            <h1 className="section-title max-w-4xl">Property opportunities with clearer guidance and stronger confidence.</h1>
            <p className="section-copy">
              Explore active Famocity property listings, review the key details, then speak with the team for the next step.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {propertyListings.map((property, index) => (
              <Reveal key={property.slug} delay={0.08 * index}>
                <article className="glass-card h-full overflow-hidden p-3">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-slate-100">
                    <Image
                      src={property.src}
                      alt={property.alt}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">Featured Listing</p>
                    <h2 className="mt-3 text-xl font-semibold text-slate-950">{property.title}</h2>
                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                      <MapPin size={15} className="text-[#c8a951]" />
                      {property.location}
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Price</p>
                        <p className="mt-1 font-bold text-slate-950">{property.price}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Size</p>
                        <p className="mt-1 font-bold text-slate-950">{property.size}</p>
                      </div>
                    </div>
                    <Link href={`/properties/${property.slug}`} className="premium-button-primary mt-5 w-full">
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-12 grid gap-5 rounded-[2rem] bg-[#061326] p-6 text-white sm:p-8 lg:grid-cols-3">
              {[
                "Property search guidance for buyers in and outside Delta State.",
                "Document and legitimacy checks before major decisions.",
                "Direct WhatsApp inquiry path for faster communication."
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <ShieldCheck size={18} className="mt-1 text-[#eadba6]" />
                  <p className="text-sm leading-7 text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
