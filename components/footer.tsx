import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import logo from "../logo.png";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" }
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/18CrQum8bN/?mibextid=wwXIfr",
    icon: <Facebook size={16} />
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/famocityrealestateltd?igsh=NXhrdjJya2lwcWQ%3D&utm_source=qr",
    icon: <Instagram size={16} />
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@famocity.real.est?_r=1&_t=ZS-959O5OJReaO",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M14.21 3h2.55a4.93 4.93 0 0 0 1.45 3.16A4.9 4.9 0 0 0 21 7.5v2.61a7.44 7.44 0 0 1-4.22-1.31v6.13a5.93 5.93 0 1 1-5.93-5.93c.27 0 .53.02.79.06v2.69a3.27 3.27 0 1 0 2.57 3.18V3Z" />
      </svg>
    )
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@am_the_best_realtor?si=Jhd3qv0-1SP-nHyk",
    icon: <Youtube size={16} />
  }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#0b1f3a] text-white">
      <div className="section-shell grid gap-12 py-14 lg:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <div className="inline-flex p-1">
            <Image
              src={logo}
              alt="Famocity logo"
              width={160}
              height={80}
              className="h-16 w-auto drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
            />
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/72">
            Famocity Real Estate and Construction Limited is building a future where ownership, structure,
            and smart saving create lasting value.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[#c8a951]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">Contact</h3>
          <div className="mt-5 space-y-4 text-sm text-white/75">
            <p className="flex items-start gap-3">
              <Phone className="mt-1 text-[#c8a951]" size={16} />
              <span>08138576412, 07038320560, 08108554219</span>
            </p>
            <p className="flex items-start gap-3">
              <Mail className="mt-1 text-[#c8a951]" size={16} />
              <span>famocityprime@gmail.com</span>
            </p>
            <p className="flex items-start gap-3">
              <MapPin className="mt-1 text-[#c8a951]" size={16} />
              <span>Grace plaza NUT junction, Abraka, New Agbor-Sapele Road, Delta State</span>
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:border-[#c8a951]/40 hover:text-[#c8a951]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
