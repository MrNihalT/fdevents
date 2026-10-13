"use client";

import Image from "next/image";
import { useState } from "react";

const embedUrl = (id: string, autoplay = false) =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1${autoplay ? "&autoplay=1" : ""}`;

/**
 * Cinematic poster that swaps to the YouTube player on click — keeps the
 * home page fast (good for Core Web Vitals / SEO).
 */
export function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  // Not every upload has an HD thumbnail; fall back to the one YouTube always generates.
  const [thumb, setThumb] = useState("maxresdefault");

  return (
    <div className="relative aspect-video overflow-hidden bg-wine-deep shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]">
      {playing ? (
        <iframe
          src={embedUrl(id, true)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0"
          aria-label={`Play film: ${title}`}
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/${thumb}.jpg`}
            onError={() => setThumb("hqdefault")}
            alt=""
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="film object-cover group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-wine-deep/35 transition-colors duration-500 group-hover:bg-wine-deep/20" />
          <span className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cream/70 text-cream backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-mustard-soft group-hover:bg-mustard-soft/90 group-hover:text-wine-deep sm:h-28 sm:w-28">
            <span className="absolute inset-0 animate-ping rounded-full border border-cream/30" />
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

/** Plain lazy-loaded YouTube iframe, used on the Event Films page. */
export function YouTubeFrame({ id, title }: { id: string; title: string }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-wine-deep shadow-[0_30px_60px_-30px_rgb(0_0_0/0.55)]">
      <iframe
        src={embedUrl(id)}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
