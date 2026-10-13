import { EnquiryForm } from "@/components/enquiry-form";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd, faqJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/ornament";
import { SocialLinks } from "@/components/social";
import { PageHero } from "@/components/page-hero";
import { site } from "@/config/site";
import { faqs } from "@/data/services";
import { whatsappLink } from "@/lib/whatsapp";
import { photo } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Bookings — Event Planners in Wayanad",
  description:
    "Call or WhatsApp FD Events on +91 85909 62100 to plan your wedding, reception or party in Wayanad. Free quotations, usually within a few hours.",
  path: "/contact",
  image: photo("photo-1519741497674-611481863552"),
  imageAlt: "Bride holding a bouquet",
  keywords: ["contact event management Wayanad", "book wedding planner Kalpetta", "event planner phone number Wayanad"],
});

export default function ContactPage() {
  const { address } = site;
  const mapQuery = encodeURIComponent(`${address.locality}, ${address.district}, Kerala`);

  const details = [
    { icon: PhoneIcon, label: "Call us", value: site.phone, href: `tel:${site.phoneRaw}` },
    { icon: WhatsAppIcon, label: "WhatsApp", value: site.phone, href: whatsappLink(), external: true },
    { icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
    {
      icon: PinIcon,
      label: "Visit",
      value: `${address.street}, ${address.locality}, ${address.district} ${address.postalCode}`,
    },
    { icon: ClockIcon, label: "Hours", value: "Every day · 8 AM – 9 PM" },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <PageHero
        tag="Get in touch"
        title={
          <>
            Let&apos;s plan something <em>beautiful</em>
          </>
        }
        image={photo("photo-1519741497674-611481863552")}
        imageAlt="Bride holding a bouquet"
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="mx-auto grid max-w-[90rem] gap-16 px-6 py-28 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="tag">Contact details</p>
          <h2 className="display mt-6 text-5xl">
            We&apos;re just a <em>message</em> away
          </h2>
          <ul className="mt-12 divide-y divide-rule border-y border-rule">
            {details.map(({ icon: Icon, label, value, href, external }) => {
              const body = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-[1.5px] border-ink bg-card text-wine">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="label">{label}</span>
                    <span className="display mt-1 block text-xl text-ink">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center gap-5 py-5 transition-colors hover:bg-parchment/70"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center gap-5 py-5">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="label mt-10">Follow our celebrations</p>
          <div className="mt-4">
            <SocialLinks />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <EnquiryForm />
        </Reveal>
      </section>

      <section className="px-6 sm:px-8">
        <Reveal className="relative mx-auto max-w-[90rem]">
          <iframe
            title={`Map showing ${site.name}, ${address.locality}`}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] w-full [filter:sepia(0.35)_saturate(0.8)] sm:aspect-[21/9]"
          />
        </Reveal>
      </section>

      <section className="paper-section mt-28 py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <Reveal>
            <SectionHeading tag="Good to know" title={<>Frequently <em>asked</em></>} />
          </Reveal>
          <div className="divide-y divide-rule border-y border-rule">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                    <span className="display text-2xl text-ink">{f.q}</span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-[1.5px] border-ink text-ink transition-transform duration-500 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 pr-12 text-muted">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
