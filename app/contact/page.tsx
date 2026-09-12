import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Reveal } from "@/components/reveal";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Contact | Famocity Group Ltd",
  description:
    "Contact Famocity Group Ltd for real estate, property agency, interior decor, solar energy, technology, Famosave, and course enquiries.",
  alternates: {
    canonical: "/contact"
  }
};

const contactCards = [
  {
    title: "Call",
    value: "08148287468, 07038320560, 08124592833",
    icon: Phone
  },
  {
    title: "Email",
    value: "famocityprime@gmail.com",
    icon: Mail
  },
  {
    title: "Office",
    value: "Grace plaza NUT junction, Abraka, New Agbor-Sapele Road, Delta State",
    icon: MapPin
  }
];

export default async function ContactPage() {
  const user = await getSessionUser();

  return (
    <main className="bg-white">
      <Navbar userEmail={user?.email} />

      <section className="section-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div>
              <span className="section-label">Contact Famocity</span>
              <h1 className="section-title">Tell us what you want to build, buy, power, design, or improve.</h1>
              <p className="section-copy">
                Reach the Famocity Group Ltd team for property enquiries, agency support, interior decor,
                solar facilitation, technology solutions, Famosave, and course questions.
              </p>

              <div className="mt-8 grid gap-4">
                {contactCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <div key={card.title} className="glass-card flex gap-4 p-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0b1f3a] text-[#c8a951]">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">{card.title}</p>
                        <p className="mt-2 text-sm leading-7 text-slate-700">{card.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                href="https://wa.me/2348148287468"
                target="_blank"
                rel="noreferrer"
                className="premium-button-accent mt-8"
              >
                Chat On WhatsApp
                <MessageCircle size={16} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b26]">Send a message</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">We will help you choose the right next step.</h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
