import "server-only";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import type { ContentProvider, GalleryItem, Review, VideoItem } from "./types";

// See supabase/schema.sql for the tables and storage bucket this expects.
const BUCKET = "gallery";

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars are missing.");
  return createClient(url, key, { auth: { persistSession: false } });
}

type GalleryRow = { id: string; title: string; category: string; image_url: string; created_at: string };
type VideoRow = { id: string; title: string; youtube_id: string; description: string | null; created_at: string };

type ReviewRow = { id: string; name: string; event: string; rating: number; quote: string; created_at: string };

const toReview = (r: ReviewRow): Review => ({
  id: r.id,
  name: r.name,
  event: r.event,
  rating: r.rating,
  quote: r.quote,
  createdAt: r.created_at,
});

const toGallery = (r: GalleryRow): GalleryItem => ({
  id: r.id,
  title: r.title,
  category: r.category,
  imageUrl: r.image_url,
  createdAt: r.created_at,
});

const toVideo = (r: VideoRow): VideoItem => ({
  id: r.id,
  title: r.title,
  youtubeId: r.youtube_id,
  description: r.description ?? undefined,
  createdAt: r.created_at,
});

export const supabaseProvider: ContentProvider = {
  async listGallery() {
    const { data, error } = await client()
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as GalleryRow[]).map(toGallery);
  },

  async addGalleryItem({ title, category, file, imageUrl }) {
    const sb = client();
    let url = imageUrl;
    if (file && file.size > 0) {
      const ext = EXTENSIONS[file.type];
      if (!ext) throw new Error("Only JPG, PNG, WEBP or AVIF images are allowed.");
      const objectPath = `${randomUUID()}${ext}`;
      const { error } = await sb.storage.from(BUCKET).upload(objectPath, file, { contentType: file.type });
      if (error) throw error;
      url = sb.storage.from(BUCKET).getPublicUrl(objectPath).data.publicUrl;
    }
    if (!url) throw new Error("Please upload a photo or paste an image URL.");

    const { data, error } = await sb
      .from("gallery_items")
      .insert({ title, category, image_url: url })
      .select()
      .single();
    if (error) throw error;
    return toGallery(data as GalleryRow);
  },

  async deleteGalleryItem(id) {
    const sb = client();
    const { data } = await sb.from("gallery_items").select("image_url").eq("id", id).single();
    const { error } = await sb.from("gallery_items").delete().eq("id", id);
    if (error) throw error;
    const marker = `/storage/v1/object/public/${BUCKET}/`;
    const imageUrl = (data as { image_url?: string } | null)?.image_url;
    if (imageUrl?.includes(marker)) {
      await sb.storage.from(BUCKET).remove([imageUrl.split(marker)[1]]);
    }
  },

  async listVideos() {
    const { data, error } = await client()
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as VideoRow[]).map(toVideo);
  },

  async addVideo({ title, youtubeId, description }) {
    const { data, error } = await client()
      .from("videos")
      .insert({ title, youtube_id: youtubeId, description })
      .select()
      .single();
    if (error) throw error;
    return toVideo(data as VideoRow);
  },

  async deleteVideo(id) {
    const { error } = await client().from("videos").delete().eq("id", id);
    if (error) throw error;
  },

  async listReviews() {
    const { data, error } = await client()
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as ReviewRow[]).map(toReview);
  },

  async addReview(input) {
    const { data, error } = await client().from("reviews").insert(input).select().single();
    if (error) throw error;
    return toReview(data as ReviewRow);
  },

  async deleteReview(id) {
    const { error } = await client().from("reviews").delete().eq("id", id);
    if (error) throw error;
  },
};
