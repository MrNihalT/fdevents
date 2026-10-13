"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { photo } from "@/lib/images";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";
import { SocialLinks } from "./social";

// `position` keeps faces in frame: phones show a narrow slice of the photo, desktops a wide one.
const slides = [
  {
    src: photo("photo-1735415899106-9ad3fbf85308"),
    caption: "Weddings",
    alt: "Bride in red and groom in a navy sherwani in an ornate heritage hall, a wedding by FD Events",
    position: "object-[72%_center] lg:object-center",
  },
  {
    src: photo("photo-1745573673583-a51f665ae48e"),
    caption: "Stage & Décor",
    alt: "Wedding stage decorated with red roses, white florals and golden drapes",
    position: "object-center",
  },
  {
    src: photo("photo-1750164871195-e7d59d2ebd98"),
    caption: "The Bride",
    alt: "Bride in a red and gold bridal outfit with traditional jewellery",
    position: "object-[45%_center] lg:object-[40%_center]",
  },
  {
    src: photo("photo-1759906763315-00afc998eb8e"),
    caption: "Receptions",
    alt: "Bride and groom under a tunnel of fairy lights",
    position: "object-[55%_center] lg:object-center",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;
const DURATION = 6500;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), DURATION);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <section
      ref={ref}
      className="relative isolate flex h-svh max-h-[1050px] min-h-[660px] items-end overflow-hidden bg-ink"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10 overflow-hidden lg:left-[30%]">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: DURATION / 1000 + 1.6, ease: "linear" }}
            >
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                priority={index === 0}
                quality={90}
                sizes="100vw"
                className={`object-cover [filter:sepia(0.12)_contrast(1.04)] ${slides[index].position}`}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        {/* Warm grade only where the text sits, so the photo stays bright and crisp */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10 lg:from-ink/60 lg:via-transparent lg:to-transparent" />
        <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-ink to-transparent lg:block" />
      </motion.div>

      {/* Social rail */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex">
        <span className="h-16 w-px bg-cream/40" />
        <div className="[&_ul]:flex-col">
          <SocialLinks tone="light" size="sm" />
        </div>
        <span className="h-16 w-px bg-cream/40" />
      </div>

      <motion.div style={{ opacity: fade }} className="mx-auto w-full max-w-[90rem] px-6 pb-10 sm:px-8 sm:pb-20 lg:pb-28 xl:pl-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="on-dark max-w-4xl text-cream">
            <h1 className="display text-[2.2rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]">
              <span className="sr-only">{site.name} — Wedding planners &amp; event management in Wayanad. </span>
              {[
                { text: "Celebrations,", em: false },
                { text: "beautifully", em: true },
                { text: "remembered.", em: false },
              ].map((w, i) => (
                <span key={w.text} className="block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.45 + i * 0.13, ease }}
                  >
                    {w.em ? <em>{w.text}</em> : w.text}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease }}
              className="mt-6 hidden max-w-lg text-lg text-cream/85 sm:block"
            >
              Weddings, receptions, catering and every detail in between — planned with old-fashioned care by{" "}
              {site.name}.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2, ease }}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
            >
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-cream">
                <WhatsAppIcon className="h-4 w-4" /> Plan your event
              </a>
              <Link href="/albums" className="btn btn-outline-light">
                See our albums
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 1.3, ease }}
            className="hidden flex-col items-end gap-8 lg:flex"
          >
            <div className="w-56 font-mono text-cream">
              <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.14em]">
                <span>
                  {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
                <span className="text-mustard-soft">{slides[index].caption}</span>
              </div>
              <div className="mt-3 flex gap-1.5">
                {slides.map((s, i) => (
                  <button
                    key={s.caption}
                    type="button"
                    aria-label={`Show slide ${i + 1}: ${s.caption}`}
                    onClick={() => setIndex(i)}
                    className="relative flex-1 py-2"
                  >
                    <span className="block h-[2px] bg-cream/25" />
                    {i === index && (
                      <motion.span
                        className="absolute left-0 top-2 h-[2px] bg-mustard-soft"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: DURATION / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
