import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { localProvider } from "./local";
import { supabaseProvider } from "./supabase";
import type { ContentProvider } from "./types";

export const usingSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
);

/** Switches to Supabase automatically once its env vars are set. */
export const content: ContentProvider = usingSupabase ? supabaseProvider : localProvider;

export const GALLERY_TAG = "gallery";
export const VIDEOS_TAG = "videos";
export const REVIEWS_TAG = "reviews";

export async function getGallery() {
  "use cache";
  cacheLife("hours");
  cacheTag(GALLERY_TAG);
  return content.listGallery();
}

export async function getVideos() {
  "use cache";
  cacheLife("hours");
  cacheTag(VIDEOS_TAG);
  return content.listVideos();
}

export async function getReviews() {
  "use cache";
  cacheLife("hours");
  cacheTag(REVIEWS_TAG);
  return content.listReviews();
}

/** Accepts a full YouTube URL (watch, youtu.be, shorts, embed) or a bare ID. */
export function parseYouTubeId(input: string): string | null {
  const value = input.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.hostname === "youtu.be") return url.pathname.slice(1, 12) || null;
    if (url.hostname.endsWith("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v) return v;
      const match = url.pathname.match(/\/(?:shorts|embed|live)\/([\w-]{11})/);
      if (match) return match[1];
    }
  } catch {}
  return null;
}
