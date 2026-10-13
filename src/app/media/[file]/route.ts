import { readFile } from "node:fs/promises";
import path from "node:path";
import { UPLOADS_DIR } from "@/lib/content/local";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

/** Serves photos uploaded through the admin panel (local storage mode). */
export async function GET(_req: Request, ctx: RouteContext<"/media/[file]">) {
  const { file } = await ctx.params;
  const name = path.basename(file);
  const type = TYPES[path.extname(name).toLowerCase()];
  if (!type || name !== file) return new Response("Not found", { status: 404 });

  try {
    const data = await readFile(path.join(UPLOADS_DIR, name));
    return new Response(new Uint8Array(data), {
      headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
