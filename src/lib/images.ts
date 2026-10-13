/**
 * High-resolution Unsplash source. next/image downsizes it per device and
 * re-encodes as AVIF/WebP, so the source should be large and high quality.
 */
export const unsplash = (id: string, width = 2560) =>
  `https://images.unsplash.com/${id}?w=${width}&q=90&auto=format&fit=crop`;
