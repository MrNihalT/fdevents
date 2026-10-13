import { GalleryGrid } from "@/components/gallery-grid";
import { JsonLd, imageGalleryJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/ornament";
import { PageHero } from "@/components/page-hero";
import { getGallery } from "@/lib/content";
import { unsplash } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Albums — Wedding & Event Photos, Wayanad",
  description:
    "Browse photo albums of weddings, stage décor, catering spreads, dessert tables, mehandi nights and parties created by FD Events across Wayanad, Kerala.",
  path: "/albums",
  image: unsplash("photo-1465495976277-4387d4b0b4c6"),
  imageAlt: "Wedding rings and bridal bouquet",
  keywords: ["wedding photos Wayanad", "stage decoration photos Kerala", "event gallery Wayanad"],
});

export default async function AlbumsPage() {
  const items = await getGallery();
  return (
    <>
      <JsonLd data={imageGalleryJsonLd(items)} />
      <PageHero
        tag="Our albums"
        title={
          <>
            Every celebration, <em>a story</em>
          </>
        }
        image={unsplash("photo-1465495976277-4387d4b0b4c6")}
        imageAlt="Wedding rings and bridal bouquet"
        crumbs={[{ name: "Albums", path: "/albums" }]}
      />
      <section className="mx-auto max-w-[90rem] px-6 py-28 sm:px-8">
        <Reveal>
          <SectionHeading tag="Browse by occasion" title={<>From our <em>albums</em></>}>
            Tap any photograph to view it in full.
          </SectionHeading>
        </Reveal>
        {items.length ? (
          <GalleryGrid items={items} />
        ) : (
          <p className="text-center text-muted">New albums are on their way.</p>
        )}
      </section>
    </>
  );
}
