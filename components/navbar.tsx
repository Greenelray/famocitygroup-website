"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { isAdminEmail } from "@/lib/admin-emails";

const leftLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Courses", href: "/courses" }
];

const baseRightLinks = [
  { label: "Famosave", href: "/#famosave" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
  { label: "My Courses", href: "/my-courses" }
];

type NavbarProps = {
  userEmail?: string | null;
};

export function Navbar({ userEmail }: NavbarProps) {
  const pathname = usePathname();
  const rightLinks = isAdminEmail(userEmail)
    ? [...baseRightLinks, { label: "Admin", href: "/admin" }]
    : baseRightLinks;

  const mobileLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Courses", href: "/courses" },
  ...rightLinks
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash || "#home");
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const isLinkActive = (href: string) => {
    const [path, hash] = href.split("#");
    const normalizedPath = path || "/";

    if (hash) {
      return pathname === normalizedPath && currentHash === `#${hash}`;
    }

    return pathname === normalizedPath;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-[0_12px_36px_rgba(11,31,58,0.08)] backdrop-blur-xl">
      <motion.div
        animate={{
          paddingTop: scrolled ? "0.75rem" : "1rem",
          paddingBottom: scrolled ? "0.75rem" : "1rem"
        }}
        className="section-shell"
      >
        <div className="hidden items-center justify-between gap-6 xl:flex">
          <nav aria-label="Primary navigation left" className="flex min-w-0 flex-1 items-center justify-end gap-5 2xl:gap-7">
            {leftLinks.map((link, index) => (
              (() => {
                const active = isLinkActive(link.href);
                return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-xs font-semibold uppercase tracking-[0.18em] transition 2xl:text-sm 2xl:tracking-[0.22em] ${
                  active ? "text-[#0b1f3a]" : "text-slate-500 hover:text-[#0b1f3a]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-[#c8a951] transition-all ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
                );
              })()
            ))}
          </nav>

          <Link aria-label="Famocity home" className="flex shrink-0 flex-col items-center" href="/#home">
            <Image
              src="/famocity-header-logo-cropped.png"
              alt="Famocity Real Estate and Constructions Ltd logo"
              width={1177}
              height={278}
              className="h-10 w-auto max-w-[260px] 2xl:h-12 2xl:max-w-[320px]"
              priority
            />
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-end">
            <nav aria-label="Primary navigation right" className="flex min-w-0 items-center gap-4 2xl:gap-6">
              {rightLinks.map((link) => (
                (() => {
                  const active = isLinkActive(link.href);
                  return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-[11px] font-semibold uppercase tracking-[0.14em] transition 2xl:text-sm 2xl:tracking-[0.22em] ${
                    active ? "text-[#0b1f3a]" : "text-slate-500 hover:text-[#0b1f3a]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-[#c8a951] transition-all ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
                  );
                })()
              ))}
            </nav>

          </div>
        </div>

        <div className="flex items-center justify-between gap-3 xl:hidden">
          <Link aria-label="Famocity home" className="min-w-0" href="/#home">
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
            className="section-shell border-t border-slate-200 bg-white py-4 xl:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
              {mobileLinks.map((link) => (
                (() => {
                  const active = isLinkActive(link.href);
                  return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${
                    active
                      ? "bg-[#0b1f3a] text-white"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#0b1f3a]"
                  }`}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
                  );
                })()
              ))}
              <Link
                href="/courses"
                className="button-header-start mt-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0b1f3a] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-white"
                onClick={() => setOpen(false)}
              >
                Start Learning
                <ArrowRight size={14} />
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
