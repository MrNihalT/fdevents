import { site } from "@/config/site";
import { faqs, services, type Service } from "@/data/services";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const businessId = `${site.url}/#business`;
const websiteId = `${site.url}/#website`;

/**
 * Site-wide graph: the business (LocalBusiness), its website, and how they relate.
 * Google uses this for the knowledge panel, local results and sitelinks.
 */
export function siteJsonLd() {
  const { address } = site;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        additionalType: "https://en.wikipedia.org/wiki/Event_management",
        name: site.name,
        alternateName: "FD Events Wayanad",
        slogan: site.tagline,
        description: site.description,
        url: site.url,
        telephone: site.phoneRaw,
        email: site.email,
        logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
        image: [`${site.url}/opengraph-image`, ...services.slice(0, 4).map((s) => `${site.url}${s.image}`)],
        priceRange: "₹₹",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Bank transfer",
        foundingDate: String(site.established),
        address: {
          "@type": "PostalAddress",
          streetAddress: address.street,
          addressLocality: address.locality,
          addressRegion: address.region,
          postalCode: address.postalCode,
          addressCountry: address.country,
        },
        geo: { "@type": "GeoCoordinates", ...site.geo },
        hasMap: `https://www.google.com/maps?q=${site.geo.latitude},${site.geo.longitude}`,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "08:00",
          closes: "21:00",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phoneRaw,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Malayalam"],
        },
        areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
        knowsAbout: services.map((s) => s.name),
        // Only real profile URLs — a bare "facebook.com/" would confuse Google's entity matching.
        sameAs: Object.values(site.social).filter((u) => new URL(u).pathname.length > 1),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Event Management Services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}` },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en-IN",
        publisher: { "@id": businessId },
      },
    ],
  };
}

export function serviceJsonLd(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.name,
    description: s.excerpt,
    image: `${site.url}${s.image}`,
    url: `${site.url}/services/${s.slug}`,
    provider: { "@id": businessId },
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Event management offered in one town or district — for the local landing pages. */
export function locationJsonLd(l: { slug: string; name: string; district: string; title: string; description: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/event-management/${l.slug}#service`,
    name: l.title,
    serviceType: "Event management and wedding planning",
    description: l.description,
    image: `${site.url}${l.image}`,
    url: `${site.url}/event-management/${l.slug}`,
    provider: { "@id": businessId },
    areaServed: {
      "@type": "Place",
      name: `${l.name}, Kerala`,
      containedInPlace: { "@type": "AdministrativeArea", name: `${l.district}, Kerala, India` },
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function imageGalleryJsonLd(items: { title: string; imageUrl: string; category: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${site.name} albums`,
    url: `${site.url}/albums`,
    author: { "@id": businessId },
    image: items.map((i) => ({
      "@type": "ImageObject",
      contentUrl: i.imageUrl.startsWith("/") ? `${site.url}${i.imageUrl}` : i.imageUrl,
      caption: i.title,
      keywords: i.category,
    })),
  };
}
