import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { ServiceMarquee } from "@/components/marquee";
import { CountUp, ImageCurtain, Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Seal, SectionHeading } from "@/components/ornament";
import { ReviewCarousel } from "@/components/reviews";
import { ServiceCard } from "@/components/service-card";
import { WorkGrid } from "@/components/work-grid";
import { YouTubeLite } from "@/components/youtube";
import { site } from "@/config/site";
import { getService, services } from "@/data/services";
import { getGallery, getReviews, getVideos } from "@/lib/content";
import { unsplash } from "@/lib/images";

const featured = ["wedding-management", "catering", "stage-events", "islamic-counter", "mehandi", "premium-vehicles"]
  .map(getService)
  .filter((s) => s !== undefined);

const stats = [
  { value: new Date().getFullYear() - site.established, suffix: "+", label: "Years of celebrations" },
  { value: 1500, suffix: "+", label: "Events crafted" },
  { value: services.length, suffix: "", label: "Services, one team" },
];

export default async function Home() {
  const [gallery, videos, reviews] = await Promise.all([getGallery(), getVideos(), getReviews()]);
  const film = videos[0];

  return (
    <>
      <Hero />
      <ServiceMarquee />

      {/* Introduction */}
      <section className="mx-auto grid max-w-[90rem] items-center gap-24 px-6 py-28 sm:px-8 lg:grid-cols-2 lg:py-40">
        <Reveal className="relative mx-auto w-full max-w-md pb-16 lg:max-w-lg">
          <Parallax offset={30} className="stamp w-[80%] -rotate-3">
            <ImageCurtain className="aspect-[4/5]">
              <Image
                src={unsplash("photo-1606216794074-735e91aa2c92", 1600)}
                alt="Couple at a garden wedding reception planned by FD Events in Wayanad"
                fill
                quality={90}
                sizes="(min-width: 1024px) 34vw, 80vw"
                className="film object-cover"
              />
            </ImageCurtain>
          </Parallax>
          <Parallax offset={-50} className="stamp absolute! bottom-0 right-0 w-[52%] rotate-[4deg]">
            <ImageCurtain className="aspect-square" delay={0.2}>
              <Image
                src={unsplash("photo-1597157639073-69284dc0fdaf", 1200)}
                alt="Bridal mehandi by FD Events artists"
                fill
                quality={90}
                sizes="(min-width: 1024px) 22vw, 50vw"
                className="film object-cover"
              />
            </ImageCurtain>
          </Parallax>
          <Seal className="absolute -right-4 -top-8 h-32 w-32 sm:h-36 sm:w-36" />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="tag">Welcome to {site.name}</p>
          <h2 className="display mt-6 text-5xl text-ink sm:text-7xl">
            Old-world grace, <em>Wayanad</em> warmth.
          </h2>
          <p className="mt-8 text-lg text-muted">
            In the misty hills of Wayanad, {site.name} has spent over a decade creating weddings and celebrations
            that feel personal, graceful and unforgettable. From a traditional wedding at home to a grand resort
            reception, our team handles every detail — so your family can simply be present.
          </p>
          <p className="mt-5 text-lg text-muted">
            Décor, catering, Islamic and buffet counters, mehandi, music, sound, premium cars, buses and security —
            all crafted in-house, all with the same care.
          </p>

          <dl className="mt-12 grid grid-cols-3 border-y-[1.5px] border-ink">
            {stats.map((s, i) => (
              <div key={s.label} className={`flex flex-col-reverse py-6 ${i ? "border-l border-dashed border-rule pl-5" : ""}`}>
                <dt className="mt-2 font-mono text-[0.7rem] uppercase leading-snug tracking-[0.1em] text-muted">{s.label}</dt>
                <dd className="display text-4xl text-wine sm:text-6xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
          <Link href="/about" className="btn btn-outline mt-10">
            Read our story
          </Link>
        </Reveal>
      </section>

      {/* Services */}
      <section className="paper-section border-y-[1.5px] border-ink py-28 lg:py-36">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-8">
          <Reveal>
            <SectionHeading tag="What we do" title={<>Our signature <em>services</em></>}>
              Book a complete celebration or only what you need — each service delivered by our own team.
            </SectionHeading>
          </Reveal>
          <Stagger className="grid gap-x-12 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s, i) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-20 text-center">
            <Link href="/services" className="btn btn-wine">
              View all {services.length} services
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Selected work */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-[90rem] px-6 py-28 sm:px-8 lg:py-36">
          <Reveal className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-end">
            <SectionHeading tag="Selected work" title={<>Moments we&apos;ve <em>crafted</em></>} align="left" />
            <Link href="/albums" className="link-line mb-16 shrink-0 text-wine">
              Explore all albums
            </Link>
          </Reveal>
          <WorkGrid items={gallery} />
        </section>
      )}

      {/* Featured film */}
      {film && (
        <section className="wine-section relative overflow-hidden py-28 lg:py-36">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <Reveal>
              <SectionHeading tag="Event films" title={<>Watch the <em>story</em> unfold</>} light>
                {film.title}
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="border-[1.5px] border-cream/80 p-2 shadow-[10px_10px_0_var(--color-mustard-soft)] sm:p-3">
                <YouTubeLite id={film.youtubeId} title={film.title} />
              </div>
            </Reveal>
            <Reveal className="mt-16 text-center">
              <Link href="/films" className="btn btn-cream">
                More event films
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Client reviews */}
      {reviews.length > 0 && (
        <section className="paper-section py-28 lg:py-36">
          <div className="mx-auto max-w-[90rem] px-6 sm:px-8">
            <Reveal className="text-center">
              <p className="tag">Kind words from our families</p>
              <h2 className="sr-only">Client reviews</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-6">
              <ReviewCarousel reviews={reviews} />
            </Reveal>
            <Reveal className="mt-14 text-center">
              <Link href="/reviews" className="link-line text-wine">
                Read all reviews
              </Link>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
