// Central business details. Change these once and the whole site (SEO tags,
// structured data, footer, WhatsApp links) updates.

export const site = {
  name: "FD Events",
  shortName: "FD Events",
  tagline: "Timeless Celebrations, Crafted in the Hills of Wayanad",
  description:
    "FD Events is Wayanad's full-service event management team — weddings, nikah & receptions across Kerala, with catering, stage décor, Islamic counters, mehandi, sound, cars and buses.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  phone: "+91 85909 62100",
  phoneRaw: "+918590962100",
  whatsapp: "918590962100",
  email: "hello@fdevents.in",
  address: {
    street: "Main Road",
    locality: "Kalpetta",
    region: "Kerala",
    district: "Wayanad",
    postalCode: "673121",
    country: "IN",
  },
  geo: { latitude: 11.6085, longitude: 76.0827 },
  areaServed: [
    "Wayanad",
    "Kalpetta",
    "Sulthan Bathery",
    "Mananthavady",
    "Meppadi",
    "Vythiri",
    "Panamaram",
    "Kozhikode",
    "Kannur",
    "Malappuram",
  ],
  hours: "Mo-Su 08:00-21:00",
  instagramHandle: "fd_events.in",
  // Replace the bare facebook.com / youtube.com links with the real pages when they exist.
  social: {
    instagram: "https://www.instagram.com/fd_events.in/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
  established: 2012,
  defaultWhatsAppMessage:
    "Hello FD Events! I found you on your website and would like to enquire about an event. Please share the details.",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/albums", label: "Albums" },
  { href: "/films", label: "Event Films" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;
