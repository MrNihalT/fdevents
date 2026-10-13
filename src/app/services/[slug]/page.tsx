import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/enquiry-form";
import { PhoneIcon, ServiceIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd, serviceJsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Seal, SectionHeading } from "@/components/ornament";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { site } from "@/config/site";
import { getService, services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { serviceEnquiryMessage, whatsappLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.name} in Wayanad, Kerala`,
    description: `${service.excerpt} Free quotes from ${site.name}, Wayanad.`,
    path: `/services/${service.slug}`,
    image: service.image,
    imageAlt: service.title,
    keywords: service.keywords,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const position = services.indexOf(service);
  const related = [1, 2, 3].map((n) => services[(position + n) % services.length]);
  const enquireLink = whatsappLink(serviceEnquiryMessage(service.name));

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <PageHero
        tag={service.name}
        title={service.title}
        image={service.image}
        imageAlt={service.title}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
      />

      <section className="mx-auto grid max-w-[90rem] items-center gap-20 px-6 py-28 sm:px-8 lg:grid-cols-2 lg:py-36">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="stamp -rotate-2">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                quality={90}
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="film object-cover"
              />
            </div>
          </div>
          <Seal className="absolute -bottom-10 -right-6 h-32 w-32" />
        </Reveal>
        <Reveal delay={0.15}>
          <span className="grid h-16 w-16 place-items-center rounded-full border-[1.5px] border-ink bg-card text-wine">
            <ServiceIcon name={service.icon} className="h-8 w-8" />
          </span>
          <h2 className="display mt-8 text-3xl leading-tight text-ink sm:text-4xl">{service.excerpt}</h2>
          {service.description.map((p) => (
            <p key={p.slice(0, 24)} className="mt-6 text-muted">
              {p}
            </p>
          ))}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href={enquireLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <WhatsAppIcon className="h-4 w-4" /> Enquire on WhatsApp
            </a>
            <a href={`tel:${site.phoneRaw}`} className="btn btn-outline">
              <PhoneIcon className="h-4 w-4" /> Call now
            </a>
          </div>
        </Reveal>
      </section>

      <section className="wine-section py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal>
            <SectionHeading tag="What's included" title={<>The <em>details</em></>} light />
          </Reveal>
          <Stagger className="grid gap-px overflow-hidden border-[1.5px] border-cream/30 bg-cream/20 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => (
              <StaggerItem key={f} className="bg-wine-deep/90 p-8">
                <p className="font-mono text-xs text-mustard-soft">Nº {String(i + 1).padStart(2, "0")}</p>
                <p className="display mt-2 text-2xl text-cream">{f}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="paper-section py-28">
        <div className="mx-auto grid max-w-[90rem] gap-16 px-6 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="tag">Free quotation</p>
            <h2 className="display mt-6 text-5xl">
              Book {service.name.toLowerCase()} in <em>Wayanad</em>
            </h2>
            <p className="mt-6 text-muted">
              Serving {site.areaServed.slice(0, 6).join(", ")} and nearby. Share your date and guest count and we
              will reply on WhatsApp — usually within a few hours.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <EnquiryForm defaultService={service.name} />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-6 py-28 sm:px-8">
        <SectionHeading tag="You may also like" title={<>Other <em>services</em></>} />
        <Stagger className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <StaggerItem key={s.slug}>
              <ServiceCard service={s} index={services.indexOf(s)} />
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-16 text-center">
          <Link href="/services" className="btn btn-outline">
            All services
          </Link>
        </div>
      </section>
    </>
  );
}
