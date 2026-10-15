import Image from "next/image";
import Link from "next/link";
import type { GalleryItem } from "@/lib/content/types";
import { ImageCurtain } from "./motion";

// Editorial mosaic: big feature, tall, and wide tiles that fill a 4×3 grid.
const layout = [
  "col-span-2 row-span-2",
  "",
  "row-span-2",
  "",
  "",
  "col-span-2",
  "",
];

/** A curated selection of recent work photos for the home page. */
export function WorkGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid grid-flow-dense auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] md:grid-cols-4 md:gap-4">
      {items.slice(0, layout.length).map((item, i) => (
        <div key={item.id} className={layout[i]}>
          <Link href="/albums" className="group relative block h-full overflow-hidden bg-parchment">
            <ImageCurtain className="absolute! inset-0" delay={(i % 4) * 0.08}>
              <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes={layout[i].includes("col-span-2") ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
              quality={85}
              className="film object-cover object-[50%_30%] group-hover:scale-105"
              />
            </ImageCurtain>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-mustard-soft">{item.category}</p>
              <p className="display mt-1 text-xl text-cream sm:text-2xl">{item.title}</p>
            </div>
            <span className="pointer-events-none absolute inset-3 border border-cream/0 transition-colors duration-500 group-hover:border-cream/40" />
          </Link>
        </div>
      ))}
    </div>
  );
}
