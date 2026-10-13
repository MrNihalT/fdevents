/**
 * Local copy of a stock photo in public/images (downloaded by
 * scripts/download-images.mjs). next/image resizes it per device and
 * serves AVIF/WebP, so the original is kept large and high quality.
 */
export const photo = (id: string) => `/images/${id}.jpg`;
