"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
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

/** Rotating testimonial with large quote, for the home page. */
export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reviews.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % reviews.length), 7000);
    return () => clearTimeout(t);
  }, [index, paused, reviews.length]);

  if (!reviews.length) return null;
  const r = reviews[index];
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + reviews.length) % reviews.length);

  return (
    <div
      className="relative mx-auto max-w-4xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span aria-hidden="true" className="display block text-[9rem] leading-[0.6] text-wine/30">
        “
      </span>
      <div className="relative min-h-[18rem] sm:min-h-[15rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={r.id}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
        <div className="mt-10 flex items-center justify-center gap-6">
          <ArrowButton label="Previous review" onClick={() => go(-1)} d="M15 5l-7 7 7 7" />
          <div className="flex gap-2">
            {reviews.map((rv, i) => (
              <button
                key={rv.id}
                type="button"
                aria-label={`Show review ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-wine" : "w-1.5 bg-rule hover:bg-wine/60"}`}
              />
            ))}
          </div>
          <ArrowButton label="Next review" onClick={() => go(1)} d="M9 5l7 7-7 7" />
        </div>
      )}
    </div>
  );
}

function ArrowButton({ label, onClick, d }: { label: string; onClick: () => void; d: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-12 w-12 place-items-center rounded-full border-[1.5px] border-ink text-ink transition-colors hover:bg-ink hover:text-cream"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d={d} />
      </svg>
    </button>
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
