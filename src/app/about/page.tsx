import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/ornament";
import { PageHero } from "@/components/page-hero";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { photo } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About FD Events — Wedding Planners in Wayanad",
  description:
    "Meet FD Events: a Wayanad team of planners, chefs, decorators, mehandi artists, musicians and drivers creating graceful weddings and celebrations since 2012.",
  path: "/about",
  image: photo("photo-1583939003579-730e3918a45a"),
  imageAlt: "Couple celebrating with guests at a wedding",
  keywords: ["about FD Events", "wedding planners Wayanad", "event management company Kalpetta"],
});

const steps = [
  { title: "Consultation", text: "We meet — or chat on WhatsApp — to understand your dates, traditions, guests and budget." },
  { title: "Design", text: "You receive a clear plan and itemised quotation: menu, décor, music, vehicles and staff." },
  { title: "Preparation", text: "We book venues, source fresh ingredients and build your stage and décor." },
  { title: "Celebration", text: "On the day, our coordinators run everything so your family can simply enjoy." },
];

const img = photo;

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="Our story"
        title={
          <>
            Celebrations with a <em>Kerala heart</em>
          </>
        }
        image={photo("photo-1583939003579-730e3918a45a")}
        imageAlt="Couple celebrating with guests at a wedding"
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <section className="mx-auto grid max-w-[90rem] items-center gap-20 px-6 py-28 sm:px-8 lg:grid-cols-2 lg:py-36">
        <Reveal>
          <p className="tag">Rooted in Wayanad</p>
          <h2 className="display mt-6 text-5xl sm:text-6xl">
            A decade of <em>graceful</em> celebrations
          </h2>
          <p className="mt-8 text-muted">
            {site.name} began in {site.established} as a small catering and décor team in Wayanad. Today we are a
            complete event management house with our own chefs, décor artists, mehandi artists, song team, sound
            technicians, drivers and security staff.
          </p>
          <p className="mt-5 text-muted">
            We believe a celebration should feel personal. So we listen first — to your family&apos;s traditions, your
            guests and your budget — and then craft an event that feels timeless.
          </p>
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-wine mt-10">
            <WhatsAppIcon className="h-4 w-4" /> Talk to our planner
          </a>
        </Reveal>
        <Reveal delay={0.15} className="grid grid-cols-2 gap-5">
          {[
            "photo-1555244162-803834f70033",
            "photo-1519225421980-715cb0215aed",
            "photo-1493225457124-a3eb161ffa5f",
            "photo-1631295868223-63265b40d9e4",
          ].map((id, i) => (
            <div key={id} className={`stamp ${i % 2 ? "translate-y-12 rotate-2" : "-rotate-2"}`}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={img(id)} alt="" fill quality={85} sizes="(min-width: 1024px) 22vw, 45vw" className="film object-cover" />
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="wine-section py-28 lg:py-36">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-8">
          <Reveal>
            <SectionHeading tag="How we work" title={<>Four <em>graceful</em> steps</>} light />
          </Reveal>
          <Stagger className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <StaggerItem key={s.title} className="border-t-[1.5px] border-cream/40 pt-8">
                <span className="font-mono text-sm text-mustard-soft">Nº {String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-4 text-3xl">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] text-cream/70">{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="paper-section py-28">
        <div className="mx-auto max-w-5xl px-6 text-center sm:px-8">
          <Reveal>
            <SectionHeading tag="Where we work" title={<>Serving Wayanad <em>&amp; beyond</em></>} />
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {site.areaServed.map((a, i) => (
                <li key={a} className="display flex items-center gap-8 text-3xl text-ink">
                  {a}
                  {i < site.areaServed.length - 1 && <span className="text-base text-wine">✺</span>}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
