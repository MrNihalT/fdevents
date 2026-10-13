import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd, breadcrumbJsonLd } from "./json-ld";
import { MaskReveal, Reveal } from "./motion";

type Crumb = { name: string; path: string };

/** Full-bleed banner used at the top of inner pages, with breadcrumbs (+ breadcrumb structured data). */
export function PageHero({
  tag,
  title,
  image,
  imageAlt = "",
  crumbs,
  children,
}: {
  tag: string;
  title: ReactNode;
  image: string;
  imageAlt?: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="relative isolate flex min-h-[66svh] items-end overflow-hidden bg-ink pb-16 pt-40 text-cream sm:min-h-[74svh] sm:pb-20">
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover [filter:sepia(0.12)_contrast(1.04)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/25" />
      </div>
      <Reveal className="on-dark mx-auto w-full max-w-[90rem] px-6 sm:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-cream/70">
            {trail.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i < trail.length - 1 ? (
                  <Link href={c.path} className="hover:text-mustard-soft">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-mustard-soft">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="tag mt-10">{tag}</p>
        <h1 className="display mt-5 max-w-5xl text-5xl sm:text-7xl lg:text-8xl">
          <MaskReveal delay={0.15}>{title}</MaskReveal>
        </h1>
        {children && <div className="mt-6 max-w-2xl text-lg text-cream/80">{children}</div>}
      </Reveal>
    </section>
  );
}
