export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  createdAt: string;
};

export type VideoItem = {
  id: string;
  title: string;
  youtubeId: string;
  description?: string;
  createdAt: string;
};

export type Review = {
  id: string;
  name: string;
  event: string;
  rating: number;
  quote: string;
  createdAt: string;
};

export type NewReview = Omit<Review, "id" | "createdAt">;

export type NewGalleryItem = {
  title: string;
  category: string;
  /** Either an uploaded file or an existing image URL. */
  file?: File;
  imageUrl?: string;
};

export type NewVideoItem = {
  title: string;
  youtubeId: string;
  description?: string;
};

/**
 * Storage backend for the editable content (photos, videos, reviews).
 * `local` keeps everything in /content as JSON files; `supabase` uses
 * Postgres tables and a Storage bucket. Pages never talk to either directly.
 */
export interface ContentProvider {
  listGallery(): Promise<GalleryItem[]>;
  addGalleryItem(input: NewGalleryItem): Promise<GalleryItem>;
  deleteGalleryItem(id: string): Promise<void>;
  listVideos(): Promise<VideoItem[]>;
  addVideo(input: NewVideoItem): Promise<VideoItem>;
  deleteVideo(id: string): Promise<void>;
  listReviews(): Promise<Review[]>;
  addReview(input: NewReview): Promise<Review>;
  deleteReview(id: string): Promise<void>;
}

export const galleryCategories = [
  "Weddings",
  "Stage & Decor",
  "Catering",
  "Desserts",
  "Mehandi",
  "Music & Sound",
  "Vehicles",
  "Parties",
] as const;
