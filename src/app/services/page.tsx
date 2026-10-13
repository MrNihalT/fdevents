import { WhatsAppIcon } from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Ornament, SectionHeading } from "@/components/ornament";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/data/services";
import { whatsappLink } from "@/lib/whatsapp";
import { photo } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Event Management Services in Wayanad",
  description:
    "Weddings, catering, stage décor, buffet & Islamic counters, dessert tables, mehandi, song team, sound, premium cars, bus rental and security — all in Wayanad.",
  path: "/services",
  image: photo("photo-1519225421980-715cb0215aed"),
  imageAlt: "Floral table styling at a wedding reception",
  keywords: ["event management services Wayanad", "wedding services Kerala", "catering and decoration Wayanad"],
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="What we offer"
        title={
          <>
            Everything your celebration <em>deserves</em>
          </>
        }
        image={photo("photo-1519225421980-715cb0215aed")}
        imageAlt="Floral table styling at a wedding reception"
        crumbs={[{ name: "Services", path: "/services" }]}
      />
      <section className="paper-section py-28">
        <div className="mx-auto max-w-[90rem] px-6 sm:px-8">
          <Reveal>
            <SectionHeading tag="All under one roof" title={<>Our <em>services</em></>}>
              Book a complete event package or pick only what you need — each one handled by our own team.
            </SectionHeading>
          </Reveal>
          <Stagger className="grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s, i) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <section className="py-24 text-center">
        <Reveal className="mx-auto max-w-xl px-6">
          <p className="font-accent text-4xl italic text-wine">Not sure where to begin?</p>
          <h2 className="display mt-3 text-4xl">Talk to our planner</h2>
          <Ornament className="mt-6" />
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-8">
            <WhatsAppIcon className="h-4 w-4" /> Ask us on WhatsApp
          </a>
        </Reveal>
      </section>
    </>
  );
}
