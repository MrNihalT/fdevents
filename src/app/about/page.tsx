import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/ornament";
import { PageHero } from "@/components/page-hero";
import { site } from "@/config/site";
import { about, specialities, reasonsToChoose, workingProcess } from "@/data/company";
import { whatsappLink } from "@/lib/whatsapp";
import { photo } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About FD Events — Wedding Planners in Wayanad",
  description:
    "Meet FD Events: a Wayanad team of planners, chefs, decorators, mehandi artists, musicians and drivers creating graceful weddings and celebrations for years.",
  path: "/about",
  image: photo("photo-1583939003579-730e3918a45a"),
  imageAlt: "Couple celebrating with guests at a wedding",
  keywords: ["about FD Events", "wedding planners Wayanad", "event management company Kalpetta"],
});

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
            Years of <em>graceful</em> celebrations
          </h2>
          <p className="mt-8 text-muted">{about.introduction}</p>
          <p className="mt-5 text-muted">{about.services}</p>
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

      <section className="paper-section py-24">
        <div className="mx-auto grid max-w-[90rem] gap-16 px-6 sm:px-8 lg:grid-cols-2">
          {[
            { title: "Our Specialities", items: specialities },
            { title: "Why Choose FD", items: reasonsToChoose },
          ].map(({ title, items }) => (
            <Reveal key={title}>
              <h2 className="display text-4xl text-wine sm:text-5xl">{title}</h2>
              <ul className="mt-8 divide-y divide-rule border-y border-rule">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-4 py-5 text-lg text-ink">
                    <span aria-hidden="true" className="text-wine">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wine-section py-28 lg:py-36">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-8">
          <Reveal>
            <SectionHeading tag="Our working process" title={<>Five steps to a <em>memorable</em> celebration</>} light />
          </Reveal>
          <Stagger className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
            {workingProcess.map((s, i) => (
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
