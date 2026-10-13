import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ContentProvider, GalleryItem, Review, VideoItem } from "./types";

// Files live outside /public so uploads added after `next build` are still
// served (via the /media route handler).
const CONTENT_DIR = path.join(process.cwd(), "content");
export const UPLOADS_DIR = path.join(CONTENT_DIR, "uploads");
const GALLERY_FILE = path.join(CONTENT_DIR, "gallery.json");
const VIDEOS_FILE = path.join(CONTENT_DIR, "videos.json");
const REVIEWS_FILE = path.join(CONTENT_DIR, "reviews.json");

async function readJson<T>(file: string): Promise<T[]> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as T[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeJson<T>(file: string, data: T[]) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

export const localProvider: ContentProvider = {
  listGallery: () => readJson<GalleryItem>(GALLERY_FILE),

  async addGalleryItem({ title, category, file, imageUrl }) {
    let url = imageUrl;
    if (file && file.size > 0) {
      const ext = EXTENSIONS[file.type];
      if (!ext) throw new Error("Only JPG, PNG, WEBP or AVIF images are allowed.");
      const name = `${randomUUID()}${ext}`;
      await mkdir(UPLOADS_DIR, { recursive: true });
      await writeFile(path.join(UPLOADS_DIR, name), Buffer.from(await file.arrayBuffer()));
      url = `/media/${name}`;
    }
    if (!url) throw new Error("Please upload a photo or paste an image URL.");

    const item: GalleryItem = {
      id: randomUUID(),
      title,
      category,
      imageUrl: url,
      createdAt: new Date().toISOString(),
    };
    const items = await readJson<GalleryItem>(GALLERY_FILE);
    await writeJson(GALLERY_FILE, [item, ...items]);
    return item;
  },

  async deleteGalleryItem(id) {
    const items = await readJson<GalleryItem>(GALLERY_FILE);
    const target = items.find((i) => i.id === id);
    await writeJson(GALLERY_FILE, items.filter((i) => i.id !== id));
    if (target?.imageUrl.startsWith("/media/")) {
      await unlink(path.join(UPLOADS_DIR, path.basename(target.imageUrl))).catch(() => {});
    }
  },

  listVideos: () => readJson<VideoItem>(VIDEOS_FILE),

  async addVideo({ title, youtubeId, description }) {
    const item: VideoItem = {
      id: randomUUID(),
      title,
      youtubeId,
      description,
      createdAt: new Date().toISOString(),
    };
    const items = await readJson<VideoItem>(VIDEOS_FILE);
    await writeJson(VIDEOS_FILE, [item, ...items]);
    return item;
  },

  async deleteVideo(id) {
    const items = await readJson<VideoItem>(VIDEOS_FILE);
    await writeJson(VIDEOS_FILE, items.filter((i) => i.id !== id));
  },

  listReviews: () => readJson<Review>(REVIEWS_FILE),

  async addReview(input) {
    const item: Review = { id: randomUUID(), ...input, createdAt: new Date().toISOString() };
    const items = await readJson<Review>(REVIEWS_FILE);
    await writeJson(REVIEWS_FILE, [item, ...items]);
    return item;
  },

  async deleteReview(id) {
    const items = await readJson<Review>(REVIEWS_FILE);
    await writeJson(REVIEWS_FILE, items.filter((i) => i.id !== id));
  },
};
