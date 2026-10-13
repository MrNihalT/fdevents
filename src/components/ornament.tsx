import type { ReactNode } from "react";
import { site } from "@/config/site";
import { MaskReveal } from "./motion";

/** Small letterpress-style divider: rule · star · rule. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`mx-auto flex w-44 items-center gap-3 text-mustard ${className}`}>
      <span className="h-px flex-1 bg-current" />
      <span className="text-sm leading-none">✺</span>
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}

/**
 * Section title block. `title` may contain an <em> for the wonky italic accent,
 * e.g. title={<>Our <em>Services</em></>}.
 */
export function SectionHeading({
  tag,
  title,
  children,
  light = false,
  align = "center",
  as: Heading = "h2",
}: {
  tag: string;
  title: ReactNode;
  children?: ReactNode;
  light?: boolean;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <header className={`mb-16 max-w-3xl ${centered ? "mx-auto text-center" : ""} ${light ? "on-dark" : ""}`}>
      <p className="tag">{tag}</p>
      <Heading className={`display mt-5 text-[2.6rem] sm:text-6xl md:text-7xl ${light ? "text-cream" : "text-ink"}`}>
        <MaskReveal>{title}</MaskReveal>
      </Heading>
      {children && (
        <div className={`mt-6 text-lg ${centered ? "mx-auto max-w-2xl" : "max-w-xl"} ${light ? "text-cream/75" : "text-muted"}`}>
          {children}
        </div>
      )}
    </header>
  );
}

/**
 * Rotating circular seal — "FD EVENTS ✺ WAYANAD ✺ SINCE 2012 ✺" around a monogram,
 * like the stamp on an old invitation.
 */
export function Seal({ className = "", light = false }: { className?: string; light?: boolean }) {
  const text = `${site.name} ✺ Wayanad ✺ Since ${site.established} ✺ `;
  return (
    <div aria-hidden="true" className={className}>
      <svg viewBox="0 0 200 200" className={`h-full w-full animate-spin-slow ${light ? "text-cream" : "text-wine"}`}>
        <defs>
          <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        {/* textLength spreads the words evenly around the full circle */}
        <text fill="currentColor" style={{ fontFamily: "var(--font-courier)", fontSize: 14, textTransform: "uppercase" }}>
          <textPath href="#seal-circle" textLength={488} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span
        className={`absolute inset-[26%] grid place-items-center rounded-full border font-accent text-3xl italic ${
          light ? "border-mustard-soft/70 bg-wine-deep/40 text-mustard-soft" : "border-wine/40 bg-card text-wine"
        }`}
      >
        FD
      </span>
    </div>
  );
}
