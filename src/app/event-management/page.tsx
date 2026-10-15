import Image from "next/image";
import Link from "next/link";
import { JsonLd, faqJsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/ornament";
import { PageHero } from "@/components/page-hero";
import { site } from "@/config/site";
import { locations } from "@/data/locations";
import { photo } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

const image = photo("pexels-38080272");
const imageAlt = "Bride and groom at a night wedding reception in Kerala";

export const metadata = pageMetadata({
  title: "Event Management Across Kerala — Areas We Serve",
  description:
    "FD Events plans weddings, receptions and events across North Kerala — Wayanad, Kalpetta, Sulthan Bathery, Kozhikode, Malappuram and Kannur. Free quotes.",
  path: "/event-management",
  image,
  imageAlt,
  keywords: [
    "event management Kerala",
    "best event management company in Kerala",
    "wedding planners Kerala",
    "event management North Kerala",
    "Malabar wedding planners",
  ],
});

const faqs = [
  {
    q: "Which parts of Kerala does FD Events cover?",
    a: "We are based in Kalpetta, Wayanad, and plan events across Wayanad and North Kerala — Kozhikode, Malappuram and Kannur — and travel further for weddings that need the full team.",
  },
  {
    q: "What kinds of weddings and events do you plan?",
    a: "Every kind of celebration — engagements, mehandi nights, weddings, receptions and family functions — each planned around your family's own traditions, menu and décor.",
  },
];

export default function AreasPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        tag="Areas we serve"
        title={
          <>
            Event management across <em>Kerala</em>
          </>
        }
        image={image}
        imageAlt={imageAlt}
        crumbs={[{ name: "Areas we serve", path: "/event-management" }]}
      >
        From our home in Wayanad to Kozhikode, Malappuram and Kannur — one team for weddings, engagements, receptions and
        every event in between.
      </PageHero>

      <section className="mx-auto max-w-[90rem] px-6 py-28 sm:px-8 lg:py-36">
        <Reveal>
          <SectionHeading tag="Choose your town" title={<>Where we <em>celebrate</em></>}>
            {site.name} has planned celebrations across North Kerala since {site.established}. Pick a place to see how
            we plan events there.
          </SectionHeading>
        </Reveal>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((l) => (
            <StaggerItem key={l.slug}>
              <Link
                href={`/event-management/${l.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-t-full bg-ink"
              >
                <Image
                  src={l.image}
                  alt={l.imageAlt}
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                  className="object-cover object-[50%_30%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mustard-soft">{l.district}</p>
                  <h2 className="display mt-1 text-3xl">{l.name}</h2>
                  <p className="mt-2 text-sm text-cream/75">{l.travel}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="paper-section border-t-[1.5px] border-ink py-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <SectionHeading tag="Questions" title={<>Good to <em>know</em></>} />
          <div className="divide-y divide-dashed divide-rule border-y-[1.5px] border-ink">
            {faqs.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="display text-2xl text-ink">{f.q}</h3>
                <p className="mt-3 text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
