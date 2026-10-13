import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { getGallery, getVideos } from "@/lib/content";

const absolute = (url: string) => (url.startsWith("/") ? `${site.url}${url}` : url);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [gallery, videos] = await Promise.all([getGallery(), getVideos()]);
  const latest = (items: { createdAt: string }[]) => (items[0] ? new Date(items[0].createdAt) : undefined);

  const pages: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1, lastModified: latest(gallery) },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${site.url}/albums`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: latest(gallery),
      images: gallery.map((g) => absolute(g.imageUrl)),
    },
    {
      url: `${site.url}/films`,
      changeFrequency: "weekly",
      priority: 0.7,
      lastModified: latest(videos),
      videos: videos.map((v) => ({
        title: v.title,
        thumbnail_loc: `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`,
        description: v.description || `${v.title} — ${site.name}, Wayanad`,
        player_loc: `https://www.youtube.com/embed/${v.youtubeId}`,
      })),
    },
    { url: `${site.url}/reviews`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];

  return [
    ...pages,
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [s.image],
    })),
  ];
}
