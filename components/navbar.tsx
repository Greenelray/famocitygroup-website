"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const leftLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" }
];

const rightLinks = [
  { label: "Famosave", href: "#famosave" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" }
];

const mobileLinks = [...leftLinks, ...rightLinks];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-[0_12px_36px_rgba(11,31,58,0.08)] backdrop-blur-xl">
      <motion.div
        animate={{
          paddingTop: scrolled ? "0.75rem" : "1rem",
          paddingBottom: scrolled ? "0.75rem" : "1rem"
        }}
        className="section-shell"
      >
        <div className="hidden items-center justify-between gap-8 lg:flex">
          <nav aria-label="Primary navigation left" className="flex min-w-0 flex-1 items-center justify-end gap-8 xl:gap-10">
            {leftLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-sm font-semibold uppercase tracking-[0.22em] transition ${
                  index === 0 ? "text-[#0b1f3a]" : "text-slate-500 hover:text-[#0b1f3a]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-[#c8a951] transition-all ${
                    index === 0 ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <Link aria-label="Famocity home" className="flex shrink-0 flex-col items-center" href="#home">
            <Image
              src="/famocity-header-logo-cropped.png"
              alt="Famocity Real Estate and Constructions Ltd logo"
              width={1177}
              height={278}
              className="h-16 w-auto xl:h-20"
              priority
            />
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-start gap-8 xl:gap-10">
            <nav aria-label="Primary navigation right" className="flex items-center gap-8 xl:gap-10">
              {rightLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 transition hover:text-[#0b1f3a]"
                >
                  {link.label}
                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-[#c8a951] transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <Link
              href="#contact"
              className="button-invest inline-flex items-center justify-center gap-2 rounded-full border border-[#0b1f3a]/12 bg-[#0b1f3a] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#102848]"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 lg:hidden">
          <Link aria-label="Famocity home" className="min-w-0" href="#home">
            <Image
              src="/famocity-header-logo-cropped.png"
              alt="Famocity Real Estate and Constructions Ltd logo"
              width={1177}
              height={278}
              className="h-12 w-auto max-w-[16rem] sm:h-14"
              priority
            />
          </Link>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="button-menu inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>

      <div className="h-[3px] w-full bg-[linear-gradient(90deg,rgba(11,31,58,0.08),rgba(200,169,81,0.95),rgba(11,31,58,0.12))]" />

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="section-shell border-t border-slate-200 bg-white py-4 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
              {mobileLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:bg-slate-50 hover:text-[#0b1f3a]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="button-invest mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0b1f3a] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white"
                onClick={() => setOpen(false)}
              >
                Get Started
                <ArrowRight size={14} />
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
