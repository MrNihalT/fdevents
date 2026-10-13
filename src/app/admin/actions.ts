"use server";

import { updateTag } from "next/cache";
import { isAdmin, signIn, signOut } from "@/lib/auth";
import { GALLERY_TAG, REVIEWS_TAG, VIDEOS_TAG, content, parseYouTubeId } from "@/lib/content";
import { galleryCategories } from "@/lib/content/types";

export type FormState = { ok?: boolean; message?: string };

const MAX_UPLOAD = 8 * 1024 * 1024;

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Not signed in.");
}

const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

export async function loginAction(_: FormState, form: FormData): Promise<FormState> {
  const ok = await signIn(text(form, "password"));
  return ok ? { ok: true } : { message: "Wrong password." };
}

export async function logoutAction() {
  await signOut();
}

export async function addPhotoAction(_: FormState, form: FormData): Promise<FormState> {
  try {
    await requireAdmin();
    const title = text(form, "title");
    const category = text(form, "category");
    const file = form.get("file");
    const upload = file instanceof File && file.size > 0 ? file : undefined;

    if (!title) return { message: "Please add a title." };
    if (!(galleryCategories as readonly string[]).includes(category)) return { message: "Choose a category." };
    if (!upload) return { message: "Please choose a photo to upload." };
    if (upload.size > MAX_UPLOAD) return { message: "Photo must be under 8 MB." };

    await content.addGalleryItem({ title, category, file: upload });
    updateTag(GALLERY_TAG);
    return { ok: true, message: "Photo added to the gallery." };
  } catch (e) {
    return { message: (e as Error).message };
  }
}

export async function deletePhotoAction(id: string) {
  await requireAdmin();
  await content.deleteGalleryItem(id);
  updateTag(GALLERY_TAG);
}

export async function addVideoAction(_: FormState, form: FormData): Promise<FormState> {
  try {
    await requireAdmin();
    const title = text(form, "title");
    const youtubeId = parseYouTubeId(text(form, "url"));
    if (!title) return { message: "Please add a title." };
    if (!youtubeId) return { message: "That doesn't look like a YouTube link." };

    await content.addVideo({ title, youtubeId, description: text(form, "description") || undefined });
    updateTag(VIDEOS_TAG);
    return { ok: true, message: "Video added." };
  } catch (e) {
    return { message: (e as Error).message };
  }
}

export async function deleteVideoAction(id: string) {
  await requireAdmin();
  await content.deleteVideo(id);
  updateTag(VIDEOS_TAG);
}

export async function addReviewAction(_: FormState, form: FormData): Promise<FormState> {
  try {
    await requireAdmin();
    const name = text(form, "name");
    const quote = text(form, "quote");
    const rating = Number(text(form, "rating"));
    if (!name || !quote) return { message: "Please add the client's name and review." };
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return { message: "Rating must be 1–5." };

    await content.addReview({ name, event: text(form, "event"), rating, quote });
    updateTag(REVIEWS_TAG);
    return { ok: true, message: "Review added." };
  } catch (e) {
    return { message: (e as Error).message };
  }
}

export async function deleteReviewAction(id: string) {
  await requireAdmin();
  await content.deleteReview(id);
  updateTag(REVIEWS_TAG);
}
