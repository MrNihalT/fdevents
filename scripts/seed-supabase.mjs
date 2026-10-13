// One-time import of content/*.json into Supabase.
// Usage: node --env-file=.env.local scripts/seed-supabase.mjs
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const gallery = JSON.parse(await readFile("content/gallery.json", "utf8"));
const videos = JSON.parse(await readFile("content/videos.json", "utf8"));
const reviews = JSON.parse(await readFile("content/reviews.json", "utf8"));

const skipped = gallery.filter((g) => g.imageUrl.startsWith("/media/"));
if (skipped.length) console.warn(`Skipping ${skipped.length} locally uploaded photos — re-upload them from /admin.`);

const { error: e1 } = await sb.from("gallery_items").insert(
  gallery
    .filter((g) => !g.imageUrl.startsWith("/media/"))
    .map((g) => ({ title: g.title, category: g.category, image_url: g.imageUrl, created_at: g.createdAt })),
);
const { error: e2 } = await sb.from("videos").insert(
  videos.map((v) => ({ title: v.title, youtube_id: v.youtubeId, description: v.description, created_at: v.createdAt })),
);
const { error: e3 } = await sb.from("reviews").insert(
  reviews.map((r) => ({ name: r.name, event: r.event, rating: r.rating, quote: r.quote, created_at: r.createdAt })),
);
if (e1 || e2 || e3) throw e1 || e2 || e3;
console.log(`Imported ${gallery.length - skipped.length} photos, ${videos.length} videos and ${reviews.length} reviews.`);
