"use client";

import { AnimatePresence, motion, useSpring } from "motion/react";
import { useEffect, useId, useState } from "react";
import type { Review } from "@/lib/content/types";

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex gap-1 text-mustard ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 24 24" className="h-4 w-4" fill={n <= rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2">
          <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
        </svg>
      ))}
    </span>
  );
}

const DELAY = 7000;

/** Rotating testimonial with large quote, for the home page. Swipe, arrow keys or the arch buttons. */
export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [[index, dir], setState] = useState<[number, 1 | -1]>([0, 1]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reviews.length < 2) return;
    const t = setTimeout(() => setState(([i]) => [(i + 1) % reviews.length, 1]), DELAY);
    return () => clearTimeout(t);
  }, [index, paused, reviews.length]);

  if (!reviews.length) return null;
  const r = reviews[index];
  const go = (d: 1 | -1) => setState(([i]) => [(i + d + reviews.length) % reviews.length, d]);
  const jump = (i: number) => setState(([cur]) => [i, i >= cur ? 1 : -1]);

  return (
    <div
      className="relative mx-auto max-w-4xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client reviews"
    >
      <span aria-hidden="true" className="display block text-[9rem] leading-[0.6] text-wine/30">
        “
      </span>
      <div className="relative min-h-[19rem] touch-pan-y sm:min-h-[15rem]" aria-live={paused ? "polite" : "off"}>
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.figure
            key={r.id}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 40 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            drag={reviews.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 || info.velocity.x < -400) go(1);
              else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
            }}
            className="cursor-grab active:cursor-grabbing"
          >
            <Stars rating={r.rating} />
            <blockquote className="display mt-6 text-2xl leading-snug text-ink sm:text-[2.3rem]">&ldquo;{r.quote}&rdquo;</blockquote>
            <figcaption className="mt-8">
              <span className="display block text-3xl text-wine">{r.name}</span>
              <span className="mt-2 block font-mono text-xs uppercase tracking-[0.12em] text-muted">{r.event}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {reviews.length > 1 && (
        <div className="mt-12 flex items-center justify-center gap-3 sm:gap-8">
          <MedallionButton label="Previous review" onClick={() => go(-1)} flip />
          <div className="w-28 sm:w-52">
            <p className="flex items-baseline justify-center gap-2 font-mono text-xs tracking-[0.14em] text-muted">
              <span className="display text-3xl tracking-normal text-wine">{String(index + 1).padStart(2, "0")}</span>
              <span>/ {String(reviews.length).padStart(2, "0")}</span>
            </p>
            <div className="mt-3 flex gap-1">
              {reviews.map((rv, i) => (
                <button
                  key={rv.id}
                  type="button"
                  aria-label={`Show review ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => jump(i)}
                  className="group/seg relative flex-1 py-2"
                >
                  <span className={`block h-[2px] transition-colors ${i < index ? "bg-wine" : "bg-rule group-hover/seg:bg-wine/50"}`} />
                  {i === index && (
                    <span
                      key={index}
                      className="absolute left-0 top-2 h-[2px] w-full origin-left animate-progress bg-wine"
                      style={{ animationDuration: `${DELAY}ms`, animationPlayState: paused ? "paused" : "running" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          <MedallionButton label="Next review" onClick={() => go(1)} />
        </div>
      )}
    </div>
  );
}

/**
 * Medallion control in the style of the site's seal: circular typewriter text
 * that turns on hover, a wine disc that fills from the centre, an arrow that
 * loops through, and a gentle magnetic pull towards the cursor.
 */
function MedallionButton({ label, onClick, flip = false }: { label: string; onClick: () => void; flip?: boolean }) {
  const id = useId();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  // Repeated so it wraps the whole circle; letter-spacing evens out the two word lengths.
  const word = `${flip ? "Previous" : "Next"} story ✺ `;
  const ring = word.repeat(flip ? 2 : 3);
  const arrow = (
    <svg viewBox="0 0 32 12" className="h-3 w-8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6h29M25 1.5 30.5 6 25 10.5" />
    </svg>
  );

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.28);
        y.set((e.clientY - r.top - r.height / 2) * 0.28);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.92 }}
      className="group relative grid h-[5.5rem] w-[5.5rem] shrink-0 place-items-center rounded-full text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine sm:h-28 sm:w-28"
    >
      {/* Circular text: always drifting, and turns a third further on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[120deg]"
      >
        <svg viewBox="0 0 200 200" className={`h-full w-full animate-spin-slow text-wine ${flip ? "[animation-direction:reverse]" : ""}`}>
          <defs>
            <path id={id} d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
          </defs>
          <text
            fill="currentColor"
            style={{
              fontFamily: "var(--font-courier)",
              fontSize: 15,
              fontWeight: 700,
              textTransform: "uppercase",
              // Courier advances 0.6em (9px) per glyph; spread them over the 515px circumference.
              letterSpacing: `${(515 - ring.length * 9) / ring.length}px`,
            }}
          >
            <textPath href={`#${id}`}>
              {ring}
            </textPath>
          </text>
        </svg>
      </span>

      {/* Centre disc */}
      <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full border-[1.5px] border-ink bg-card shadow-[3px_3px_0_var(--color-mustard)] transition-[color,box-shadow] duration-500 group-hover:text-cream group-hover:shadow-[0_0_0_var(--color-mustard)] sm:h-14 sm:w-14">
        <span
          aria-hidden="true"
          className="absolute inset-0 scale-0 rounded-full bg-wine transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100"
        />
        {/* Arrow loops: the visible one slides out, its twin slides in from the other side */}
        <span aria-hidden="true" className={`relative block h-3 w-8 overflow-hidden ${flip ? "-scale-x-100" : ""}`}>
          <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[150%]">
            {arrow}
          </span>
          <span className="absolute inset-0 -translate-x-[150%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0">
            {arrow}
          </span>
        </span>
      </span>
    </motion.button>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="card-retro flex h-full flex-col p-8 sm:p-10">
      <div className="flex items-start justify-between">
        <Stars rating={review.rating} />
        <span aria-hidden="true" className="display text-7xl leading-[0.5] text-wine/25">
          “
        </span>
      </div>
      <blockquote className="mt-6 flex-1 text-lg italic leading-relaxed text-ink">{review.quote}</blockquote>
      <figcaption className="mt-8 border-t border-dashed border-rule pt-5">
        <span className="display block text-2xl text-wine">{review.name}</span>
        <span className="mt-1 block font-mono text-xs uppercase tracking-[0.12em] text-muted">{review.event}</span>
      </figcaption>
    </figure>
  );
}
