import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Wayanad`,
    short_name: site.shortName,
    description: site.description,
    id: "/",
    start_url: "/",
    scope: "/",
    lang: "en-IN",
    categories: ["lifestyle", "business"],
    display: "standalone",
    background_color: "#f4ebdb",
    theme_color: "#6e2432",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Our Services", url: "/services" },
      { name: "Plan an Event", url: "/contact" },
    ],
  };
}
