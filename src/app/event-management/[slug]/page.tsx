import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/enquiry-form";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd, faqJsonLd, locationJsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Seal, SectionHeading } from "@/components/ornament";
import { PageHero } from "@/components/page-hero";
import { ReviewCard } from "@/components/reviews";
import { ServiceCard } from "@/components/service-card";
import { site } from "@/config/site";
import { getLocation, locations } from "@/data/locations";
import { getService, services } from "@/data/services";
import { getReviews } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";

const featured = ["wedding-management", "catering", "islamic-counter", "stage-events", "mehandi", "bus-rental"]
  .map(getService)
  .filter((s) => s !== undefined);

// Every slug is prerendered below, so navigations get static HTML; skip the
// dev-only "params outside <Suspense>" instant-navigation check.
export const instant = false;

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/event-management/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) return {};
  return pageMetadata({
    title: l.title,
    description: l.description,
    path: `/event-management/${l.slug}`,
    image: l.image,
    imageAlt: l.imageAlt,
    keywords: l.keywords,
  });
}

export default async function LocationPage({ params }: PageProps<"/event-management/[slug]">) {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) notFound();

  const reviews = (await getReviews()).filter((r) => r.event.toLowerCase().includes(l.name.toLowerCase())).slice(0, 2);
  const nearby = l.nearby.map(getLocation).filter((n) => n !== undefined);
  const enquire = whatsappLink(
    `Hello ${site.name}! I'm planning an event in ${l.name} and would like a quotation. Date: , Guests: , Event: `,
  );

  return (
    <>
      <JsonLd data={locationJsonLd(l)} />
      <JsonLd data={faqJsonLd(l.faqs)} />
      <PageHero
        tag={`${l.name} · ${l.district}`}
        title={l.title}
        image={l.image}
        imageAlt={l.imageAlt}
        crumbs={[
          { name: "Areas we serve", path: "/event-management" },
          { name: l.name, path: `/event-management/${l.slug}` },
        ]}
      >
        {l.description}
      </PageHero>

      <section className="mx-auto grid max-w-[90rem] items-center gap-20 px-6 py-28 sm:px-8 lg:grid-cols-2 lg:py-36">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="stamp -rotate-2">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={l.image}
                alt={l.imageAlt}
                fill
                quality={85}
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>
          <Seal className="absolute -bottom-10 right-0 h-28 w-28 sm:-right-6 sm:h-32 sm:w-32" />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="tag">Planning in {l.name}</p>
          <h2 className="display mt-6 text-4xl text-ink sm:text-5xl">
            Your {l.name} celebration, <em>handled</em> end to end.
          </h2>
          {l.intro.map((p) => (
            <p key={p.slice(0, 24)} className="mt-6 text-lg text-muted">
              {p}
            </p>
          ))}
          <p className="mt-6 border-l-2 border-mustard pl-4 font-mono text-sm text-ink">{l.travel}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href={enquire} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <WhatsAppIcon className="h-4 w-4" /> Get a {l.name} quote
            </a>
            <a href={`tel:${site.phoneRaw}`} className="btn btn-outline">
              <PhoneIcon className="h-4 w-4" /> {site.phone}
            </a>
          </div>
        </Reveal>
      </section>

      <section className="wine-section py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal>
            <SectionHeading tag={`What we do in ${l.name}`} title={<>Made for <em>{l.name}</em></>} light />
          </Reveal>
          <Stagger className="grid gap-px overflow-hidden border-[1.5px] border-cream/30 bg-cream/20 sm:grid-cols-2 lg:grid-cols-3">
            {l.highlights.map((h, i) => (
              <StaggerItem key={h} className="bg-wine-deep/90 p-8">
                <p className="font-mono text-xs text-mustard-soft">Nº {String(i + 1).padStart(2, "0")}</p>
                <p className="display mt-2 text-2xl text-cream">{h}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-6 py-28 sm:px-8 lg:py-36">
        <Reveal>
          <SectionHeading tag="Services" title={<>Event services in <em>{l.name}</em></>}>
            Book the complete event or only what you need — every service is run by our own team.
          </SectionHeading>
        </Reveal>
        <Stagger className="grid gap-x-12 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <StaggerItem key={s.slug}>
              <ServiceCard service={s} index={services.indexOf(s)} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {reviews.length > 0 && (
        <section className="paper-section border-y-[1.5px] border-ink py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <SectionHeading tag="Families we've served" title={<>Kind words from <em>{l.name}</em></>} />
            <div className="grid gap-10 md:grid-cols-2">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-6 py-28 sm:px-8">
        <SectionHeading tag="Questions" title={<>Planning in {l.name}: <em>FAQs</em></>} />
        <div className="divide-y divide-dashed divide-rule border-y-[1.5px] border-ink">
          {l.faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                <h3 className="display text-2xl text-ink">{f.q}</h3>
                <span
                  aria-hidden="true"
                  className="mt-1 font-mono text-2xl text-wine transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="paper-section border-t-[1.5px] border-ink py-28">
        <div className="mx-auto grid max-w-[90rem] gap-16 px-6 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="tag">Free quotation</p>
            <h2 className="display mt-6 text-5xl">
              Plan your event in <em>{l.name}</em>
            </h2>
            <p className="mt-6 text-muted">
              Share your date, venue and guest count — we reply on WhatsApp, usually within a few hours.
            </p>
            {nearby.length > 0 && (
              <div className="mt-10">
                <p className="label">We also plan events in</p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                  {nearby.map((n) => (
                    <li key={n.slug}>
                      <Link href={`/event-management/${n.slug}`} className="link-line text-wine">
                        {n.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
          <Reveal delay={0.15}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
