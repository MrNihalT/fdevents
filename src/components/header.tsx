"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./logo";
import { SocialLinks } from "./social";

// Routes that open with a full-bleed image, so the header can sit transparently on top.
const HERO_ROUTES = ["/", "/about", "/services", "/albums", "/films", "/reviews", "/contact"];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const hasHero = HERO_ROUTES.includes(pathname) || pathname.startsWith("/services/");
  const solid = scrolled || !hasHero;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
          solid
            ? "bg-cream/95 py-3 shadow-[0_1.5px_0_var(--color-ink)] backdrop-blur-md"
            : "bg-gradient-to-b from-ink/55 to-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-6 sm:px-8">
          <Link href="/" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
            <Logo light={!solid} />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((l) => {
                const active = isActive(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`relative font-mono text-[0.78rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                        solid ? "text-ink hover:text-wine" : "text-cream hover:text-mustard-soft"
                      } ${active ? (solid ? "text-wine!" : "text-mustard-soft!") : ""}`}
                    >
                      {l.label}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-current"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden 2xl:block">
              <SocialLinks tone={solid ? "dark" : "light"} size="sm" />
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn hidden px-5! py-2.5! sm:inline-flex ${solid ? "btn-wine" : "btn-cream"}`}
            >
              Book Now
            </a>
            <button
              type="button"
              className={`grid h-11 w-11 place-items-center xl:hidden ${solid ? "text-ink" : "text-cream"}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 7h18M3 12h18M3 17h12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="wine-section fixed inset-0 z-[90] flex flex-col overflow-y-auto px-6 py-6"
          >
            <div className="flex items-center justify-between">
              <Logo light />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center text-cream"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <nav aria-label="Mobile" className="my-auto py-10">
              <ul className="divide-y divide-cream/15 border-y border-cream/15">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-3"
                    >
                      <span className="font-mono text-xs text-mustard-soft">{String(i + 1).padStart(2, "0")}</span>
                      <span className={`display text-4xl ${isActive(l.href) ? "font-accent italic text-mustard-soft" : "text-cream"}`}>
                        {l.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full">
                <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <a href={`tel:${site.phoneRaw}`} className="btn btn-outline-light w-full">
                <PhoneIcon className="h-4 w-4" /> {site.phone}
              </a>
              <div className="flex justify-center pt-2">
                <SocialLinks tone="light" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
