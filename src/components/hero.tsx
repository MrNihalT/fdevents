"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { photo } from "@/lib/images";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";
import { SocialLinks } from "./social";

// Portrait photos: full-bleed on phones, framed in the arch on desktop.
// `position` keeps faces in frame for both crops.
const slides = [
  {
    src: photo("pexels-16987433"),
    caption: "The Nikah",
    alt: "Groom kissing the forehead of his bride in a navy and gold hijab at a Malabar Muslim wedding",
    position: "object-[50%_30%]",
  },
  {
    src: photo("pexels-10302294"),
    caption: "The Bride",
    alt: "Bride in a red hijab with a gold nath and traditional Malabar gold jewellery",
    position: "object-[40%_25%]",
  },
  {
    src: photo("pexels-38080274"),
    caption: "Receptions",
    alt: "Bride in red and groom in an ivory sherwani at a night reception lit by palms",
    position: "object-[50%_45%]",
  },
  {
    src: photo("pexels-17843095"),
    caption: "Together",
    alt: "Bride in a silver saree and veil holding her groom's hand at golden hour in Edappal, Kerala",
    position: "object-[60%_35%]",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;
const DURATION = 6500;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [index, setIndex] = useState(0);
  // Slides mount one step ahead of the one on screen, so the next photo is
  // already decoded when it fades in, without loading all four up front.
  const [mounted, setMounted] = useState(2);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const show = (i: number) => {
    setIndex(i);
    setMounted((m) => Math.max(m, i + 2));
  };

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      const next = (index + 1) % slides.length;
      setIndex(next);
      setMounted((m) => Math.max(m, next + 2));
    }, DURATION);
    return () => clearTimeout(t);
  }, [index, inView]);

  return (
    <section
      ref={ref}
      className="relative isolate flex h-svh max-h-[1050px] min-h-[640px] items-end overflow-hidden bg-ink lg:min-h-[720px] lg:items-center"
    >
      {/* Wine glow behind the arch */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 hidden bg-[radial-gradient(ellipse_45%_60%_at_74%_55%,rgb(110_36_50/0.55),transparent_70%)] lg:block"
      />

      {/* Photo: full-bleed on phones, an arch window on desktop */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10 lg:inset-auto lg:right-[max(3rem,calc((100vw-90rem)/2+4rem))] lg:top-[calc(50%+2.25rem)] lg:w-[min(34vw,calc((100svh-14rem)*0.75),33rem)] lg:-translate-y-1/2"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3.5 hidden rounded-t-full border border-mustard-soft/45 lg:block"
        />
        <span aria-hidden="true" className="absolute -top-11 left-1/2 hidden -translate-x-1/2 text-lg text-mustard-soft lg:block">
          ✺
        </span>
        {/* CSS (not JS) reveal, so the photo paints before hydration */}
        <div className="relative h-full animate-arch-reveal overflow-hidden bg-wine-deep lg:aspect-[3/4] lg:h-auto lg:rounded-t-full">
          {slides.slice(0, mounted).map((s, i) => (
            <div
              key={s.src}
              aria-hidden={i !== index}
              className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "low"}
                quality={85}
                sizes="(min-width: 1024px) min(34vw, 33rem), 100vw"
                className={`object-cover ${s.position} ${i === index ? "animate-kenburns" : ""}`}
              />
            </div>
          ))}

          {/* Phones: shade where the headline sits. Desktop: a soft foot for the caption. */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/25 lg:hidden" />
          <div className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-ink/80 to-transparent lg:block" />

          <div className="absolute inset-x-0 bottom-0 hidden px-8 pb-7 font-mono text-cream lg:block">
            <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.14em]">
              <span className="text-mustard-soft">{slides[index].caption}</span>
              <span>
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-3 flex gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.caption}
                  type="button"
                  aria-label={`Show slide ${i + 1}: ${s.caption}`}
                  aria-current={i === index}
                  onClick={() => show(i)}
                  className="relative flex-1 py-2"
                >
                  <span className="block h-[2px] bg-cream/25" />
                  {i === index && (
                    <span
                      key={index}
                      className="absolute left-0 top-2 h-[2px] w-full origin-left animate-progress bg-mustard-soft"
                      style={{ animationDuration: `${DURATION}ms`, animationPlayState: inView ? "running" : "paused" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social rail */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex">
        <span className="h-16 w-px bg-cream/40" />
        <div className="[&_ul]:flex-col">
          <SocialLinks tone="light" size="sm" />
        </div>
        <span className="h-16 w-px bg-cream/40" />
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="mx-auto w-full max-w-[90rem] px-6 pb-10 sm:px-8 sm:pb-16 lg:pb-0 lg:pt-20 xl:pl-24"
      >
        <div className="on-dark max-w-4xl text-cream lg:max-w-[50%] xl:max-w-[54%]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="tag mb-6 hidden sm:inline-flex"
          >
            Weddings &amp; events · Wayanad
          </motion.p>
          <h1 className="display text-[2.4rem] sm:text-5xl lg:text-[3.8rem] xl:text-[4.6rem]">
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
            Nikahs, receptions, catering and every detail in between — planned with old-fashioned care by{" "}
            {site.name}.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease }}
            className="mt-8 flex flex-col gap-3 pr-1 sm:mt-10 sm:flex-row sm:gap-4 sm:pr-0"
          >
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-cream">
              <WhatsAppIcon className="h-4 w-4" /> Plan your event
            </a>
            <Link href="/albums" className="btn btn-outline-light">
              See our albums
            </Link>
          </motion.div>

          {/* Phones: compact slide indicator */}
          <div className="mt-8 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cream/80 lg:hidden">
            <span className="text-mustard-soft">{slides[index].caption}</span>
            <span className="h-px flex-1 bg-cream/25" />
            <span>
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
