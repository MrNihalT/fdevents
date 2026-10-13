import type { Metadata } from "next";
import { site } from "@/config/site";

type PageSeo = {
  /** Under ~45 chars — the " | FD Events" suffix is added by the root title template. */
  title: string;
  /** 140–160 chars, written for humans: it is the snippet shown in Google. */
  description: string;
  path: string;
  /** Unsplash/remote image used for link previews (WhatsApp, Facebook, X). */
  image?: string;
  imageAlt?: string;
  keywords?: string[];
};

/** Social-preview crop (1200×630) of a high-resolution Unsplash source. */
function ogCrop(src: string) {
  if (!src.includes("images.unsplash.com")) return src;
  const url = new URL(src);
  url.searchParams.set("w", "1200");
  url.searchParams.set("h", "630");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("q", "85");
  return url.toString();
}

/** Consistent title, description, canonical URL and social cards for a page. */
export function pageMetadata({ title, description, path, image, imageAlt, keywords }: PageSeo): Metadata {
  const images = image ? [{ url: ogCrop(image), width: 1200, height: 630, alt: imageAlt ?? title }] : undefined;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      url: path,
      title: `${title} | ${site.name}`,
      description,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      ...(images && { images: images.map((i) => i.url) }),
    },
  };
}
