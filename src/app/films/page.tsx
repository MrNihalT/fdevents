import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { Ornament, SectionHeading } from "@/components/ornament";
import { PageHero } from "@/components/page-hero";
import { YouTubeFrame } from "@/components/youtube";
import { site } from "@/config/site";
import { getVideos } from "@/lib/content";
import { unsplash } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Event Films — Wedding Highlight Videos",
  description:
    "Watch wedding highlights, reception films and stage programs by FD Events, the Wayanad event management team. Real celebrations, beautifully remembered.",
  path: "/films",
  image: unsplash("photo-1743684821666-05b9c5046937"),
  imageAlt: "Bride and groom with garlands on the wedding stage",
  keywords: ["wedding highlights Kerala", "wedding video Wayanad", "event films Wayanad"],
});

export default async function FilmsPage() {
  const videos = await getVideos();
  const [featured, ...rest] = videos;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: videos.map((v, i) => ({
            "@type": "VideoObject",
            position: i + 1,
            name: v.title,
            description: v.description || `${v.title} — ${site.name}, Wayanad`,
            thumbnailUrl: `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`,
            embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
            uploadDate: v.createdAt,
          })),
        }}
      />
      <PageHero
        tag="Event films"
        title={
          <>
            Relive the <em>moments</em>
          </>
        }
        image={unsplash("photo-1743684821666-05b9c5046937")}
        imageAlt="Bride and groom with garlands on the wedding stage"
        crumbs={[{ name: "Event Films", path: "/films" }]}
      />

      {!featured && <p className="py-28 text-center text-muted">New films are on their way.</p>}

      {featured && (
        <section className="wine-section py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <Reveal>
              <SectionHeading
                tag="Featured film"
                title={<em>{featured.title}</em>}
                light
              >
                {featured.description}
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.1} className="relative">
              <div className="border-[1.5px] border-cream/80 p-2 shadow-[10px_10px_0_var(--color-mustard-soft)] sm:p-3">
                <YouTubeFrame id={featured.youtubeId} title={featured.title} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mx-auto max-w-[90rem] px-6 py-28 sm:px-8">
          <Reveal>
            <SectionHeading tag="The collection" title={<>More <em>event films</em></>} />
          </Reveal>
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
            {rest.map((v, i) => (
              <Reveal key={v.id} delay={(i % 2) * 0.12}>
                <YouTubeFrame id={v.youtubeId} title={v.title} />
                <p className="mt-6 font-mono text-xs text-wine">Film Nº {String(i + 2).padStart(2, "0")}</p>
                <h2 className="display mt-1 text-3xl">{v.title}</h2>
                {v.description && <p className="mt-2 text-[0.95rem] text-muted">{v.description}</p>}
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="paper-section py-20 text-center">
        <Reveal className="mx-auto max-w-xl px-6">
          <p className="font-accent text-4xl italic text-wine">More on YouTube</p>
          <Ornament className="mt-4" />
          <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-wine mt-8">
            Subscribe to our channel
          </a>
        </Reveal>
      </section>
    </>
  );
}
