"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryItem } from "@/lib/content/types";

/** Album view: category tabs, masonry photos and a full-screen lightbox. */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const categories = useMemo(() => ["All", ...new Set(items.map((i) => i.category))], [items]);
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const visible = active === "All" ? items : items.filter((i) => i.category === active);

  const step = useCallback(
    (dir: 1 | -1) => setLightbox((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, step]);

  const current = lightbox !== null ? visible[lightbox] : null;

  return (
    <div>
      {categories.length > 2 && (
        <div role="tablist" aria-label="Albums" className="mb-14 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`relative pb-1.5 font-mono text-sm uppercase tracking-[0.12em] transition-colors ${
                active === c ? "text-wine" : "text-muted hover:text-ink"
              }`}
            >
              {c}
              {active === c && <motion.span layoutId="album-tab" className="absolute inset-x-0 bottom-0 h-[1.5px] bg-wine" />}
            </button>
          ))}
        </div>
      )}

      <motion.ul layout className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden text-left"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={800}
                  height={i % 3 === 0 ? 1050 : 600}
                  quality={85}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="film h-auto w-full object-cover group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block font-mono text-xs uppercase tracking-[0.12em] text-mustard-soft">
                    {item.category}
                  </span>
                  <span className="display mt-1 block text-2xl text-cream">{item.title}</span>
                </span>
                <span className="pointer-events-none absolute inset-3 border border-cream/0 transition-colors duration-500 group-hover:border-cream/40" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-h-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.imageUrl}
                alt={current.title}
                width={1600}
                height={1100}
                quality={90}
                sizes="90vw"
                className="h-auto max-h-[80vh] w-auto object-contain"
              />
              <figcaption className="mt-4 text-center">
                <span className="block font-mono text-xs uppercase tracking-[0.12em] text-mustard-soft">
                  {current.category} · {lightbox! + 1} / {visible.length}
                </span>
                <span className="display mt-1 block text-2xl text-cream">{current.title}</span>
              </figcaption>
            </motion.figure>
            <LightboxButton label="Close" className="right-4 top-4" onClick={() => setLightbox(null)} d="M6 6l12 12M18 6 6 18" />
            <LightboxButton label="Previous photo" className="left-2 top-1/2 sm:left-6" onClick={() => step(-1)} d="M15 5l-7 7 7 7" />
            <LightboxButton label="Next photo" className="right-2 top-1/2 sm:right-6" onClick={() => step(1)} d="M9 5l7 7-7 7" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LightboxButton({ label, className, onClick, d }: { label: string; className: string; onClick: () => void; d: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute grid h-12 w-12 place-items-center rounded-full border border-mustard-soft/50 text-cream transition-colors hover:bg-mustard-soft hover:text-wine-deep ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d={d} />
      </svg>
    </button>
  );
}
