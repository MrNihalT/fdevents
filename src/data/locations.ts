import { photo as img } from "@/lib/images";

/**
 * Local landing pages (/event-management/[slug]). Each one is written for that
 * place — venues, travel, seasons, customs — so it answers a real local search
 * ("event management in Kozhikode", "wedding planners Sulthan Bathery")
 * instead of repeating the same text with a different town name.
 */
export type Location = {
  slug: string;
  /** Place name as people type it into Google. */
  name: string;
  /** "Wayanad district", "Kozhikode district"… for structured data and copy. */
  district: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  intro: string[];
  /** What we usually arrange here — shown as a numbered list. */
  highlights: string[];
  /** Travel note from our Kalpetta base. */
  travel: string;
  faqs: { q: string; a: string }[];
  keywords: string[];
  nearby: string[];
};

export const locations: Location[] = [
  {
    slug: "wayanad",
    name: "Wayanad",
    district: "Wayanad district",
    title: "Event Management & Wedding Planners in Wayanad",
    description:
      "Wayanad's own event management team — weddings, engagements & receptions, catering, stage décor, mehandi and resort events, planned end-to-end from Kalpetta. Free quotes.",
    image: img("pexels-16987433"),
    imageAlt: "Groom kissing his bride's forehead at a wedding planned in Wayanad",
    intro: [
      "We were born in Wayanad, and every celebration we plan carries a little of its mist, its tea gardens and its unhurried hospitality. Since 2012 our team has planned home weddings in Meenangadi, engagements in Kalpetta town halls, receptions in Sulthan Bathery auditoriums and destination weddings in the resorts of Vythiri and Lakkidi.",
      "Because we live here, we know which roads close in the monsoon, which halls have reliable power back-up, how long guests need to climb the Thamarassery churam, and which cooks make the best Malabar biryani for 1,500 guests. That local knowledge is what makes a Wayanad wedding feel effortless.",
    ],
    highlights: [
      "Weddings planned around your family's own traditions",
      "Engagements, mehandi and haldi nights, receptions and sadya catering",
      "Resort and destination weddings in Vythiri, Lakkidi and Meppadi",
      "Guest buses and tempo travellers from Kozhikode airport and railway station",
      "Monsoon-ready marquees, generators and covered walkways",
      "Islamic, Arabian and buffet counters, cooked by our own team",
    ],
    travel: "Our office is in Kalpetta, so every corner of Wayanad is within about an hour.",
    faqs: [
      {
        q: "What is the best time of year for a wedding in Wayanad?",
        a: "November to May is the peak season — cool, dry and green. Monsoon weddings (June to September) are beautiful too; we plan covered seating, rain-proof stages and generator back-up for them.",
      },
      {
        q: "What kinds of weddings and events do you plan in Wayanad?",
        a: "Every kind of celebration — engagements, mehandi nights, weddings, receptions and family functions. We plan each around your family's own traditions, menu and stage style, and run sadya, buffet and Arabian counters in-house.",
      },
      {
        q: "Can you arrange a destination wedding at a Wayanad resort?",
        a: "Yes. We shortlist resorts in Vythiri, Lakkidi, Meppadi and Sulthan Bathery for your guest count and budget, then handle décor, catering, guest transport from Kozhikode and stays.",
      },
    ],
    keywords: [
      "event management in Wayanad",
      "best event management Wayanad",
      "wedding planners in Wayanad",
      "destination wedding Wayanad",
      "wedding decorators Wayanad",
      "catering in Wayanad",
    ],
    nearby: ["kalpetta", "sulthan-bathery", "mananthavady", "vythiri"],
  },
  {
    slug: "kalpetta",
    name: "Kalpetta",
    district: "Wayanad district",
    title: "Event Management in Kalpetta — Weddings & Parties",
    description:
      "Event planners based in Kalpetta, Wayanad: weddings, receptions, birthday parties and corporate events with in-house catering, décor and sound. Free WhatsApp quotes.",
    image: img("pexels-36740097"),
    imageAlt: "Smiling bride lifting her red dupatta at a wedding in Kalpetta, Wayanad",
    intro: [
      "Kalpetta is home. Our office and stores are here, which means site visits on the same day you call, décor samples you can see in person, and a team that can reach your venue in minutes if anything changes on the day.",
      "Most Kalpetta weddings happen in town auditoriums and convention centres or at home with a pandal in the courtyard. We handle both: hall booking and layout, pandal and stage, lighting, sound, and catering that runs smoothly whether you are seating 200 guests or 2,000.",
    ],
    highlights: [
      "Same-day site visits and décor previews in Kalpetta",
      "Auditorium weddings and home pandal weddings",
      "Wedding stage, reception stage and photo-booth décor",
      "Birthday parties, house-warmings and family functions",
      "Corporate meets, launches and office events",
      "Sound, lighting and LED walls from our own stock",
    ],
    travel: "Our base — we are usually at your venue within 15 minutes.",
    faqs: [
      {
        q: "Can I visit your office in Kalpetta to discuss my event?",
        a: "Yes. Message us on WhatsApp to fix a time — we can show stage décor photos, menu options and samples of linen and lighting in person.",
      },
      {
        q: "Do you do small functions in Kalpetta, like birthdays or engagements?",
        a: "Yes. From a 30-guest birthday to an engagement for 300, we can provide décor, food and sound — or just one of them.",
      },
    ],
    keywords: ["event management Kalpetta", "wedding planners Kalpetta", "event planners in Kalpetta", "birthday party decoration Kalpetta"],
    nearby: ["wayanad", "vythiri", "mananthavady", "sulthan-bathery"],
  },
  {
    slug: "sulthan-bathery",
    name: "Sulthan Bathery",
    district: "Wayanad district",
    title: "Wedding & Event Planners in Sulthan Bathery",
    description:
      "Weddings, receptions and catering in Sulthan Bathery, Wayanad — stage décor, food counters, sound and guest transport by FD Events. Free quotes on WhatsApp.",
    image: img("pexels-38080274"),
    imageAlt: "Bride and groom at a night reception in Sulthan Bathery",
    intro: [
      "Sulthan Bathery celebrates big. Receptions here often run late into the night with large guest lists from across Wayanad and the Nilgiris border, so we plan for crowd flow, parking and food service that never makes guests wait.",
      "We regularly set up reception stages, Arabian and buffet food counters and live song teams in Bathery's auditoriums and open grounds — and arrange guest buses from Gudalur, Mysuru-side villages and Kozhikode.",
    ],
    highlights: [
      "Large receptions with smooth buffet and counter service",
      "Song team, live band and entertainment bookings",
      "Islamic and Arabian counters — mandhi, alfaham, kabsa",
      "Parking marshals and event security for big crowds",
      "Guest buses from Gudalur, Kozhikode and nearby villages",
    ],
    travel: "About 25 km from our Kalpetta office — around 40 minutes.",
    faqs: [
      {
        q: "Can you manage a reception for 2,000+ guests in Sulthan Bathery?",
        a: "Yes. We plan multiple serving lines and counters, crowd and parking marshals, and back-up power, so large receptions run on time.",
      },
      {
        q: "Do you arrange live music for weddings?",
        a: "Yes — our song team, live singers and partner bands perform for mehandi nights, weddings and receptions.",
      },
    ],
    keywords: ["wedding planners Sulthan Bathery", "event management Sulthan Bathery", "reception catering Sulthan Bathery", "song team Wayanad"],
    nearby: ["wayanad", "kalpetta", "mananthavady"],
  },
  {
    slug: "mananthavady",
    name: "Mananthavady",
    district: "Wayanad district",
    title: "Event Management in Mananthavady, Wayanad",
    description:
      "Weddings, mehandi nights, receptions and family functions in Mananthavady — décor, catering, sound and transport by FD Events, Wayanad. Free quotes.",
    image: img("pexels-29169318"),
    imageAlt: "Bride's hands with mehandi and gold bangles at a mehandi night in Mananthavady",
    intro: [
      "Mananthavady's weddings are as varied as its families — mehandi nights, morning ceremonies, evening receptions and home functions, sometimes all in the same week. We plan each one around the family's own traditions, menus and stage style.",
      "Many Mananthavady families celebrate at home, so we often set up pandals, lighting and kitchens in courtyards and estates, working around narrow roads and hill-side plots that need careful planning for guest parking and catering trucks.",
    ],
    highlights: [
      "Mehandi nights with henna artists",
      "Receptions in halls and open venues",
      "Home weddings with pandal, lighting and on-site kitchen",
      "Estate and plantation venues on hill-side plots",
      "Sound and light for evening functions",
    ],
    travel: "About 35 km from Kalpetta — under an hour's drive.",
    faqs: [
      {
        q: "Can you set up a wedding at our home in Mananthavady?",
        a: "Yes. We visit the site first, then plan the pandal, stage, lighting, kitchen area, parking and power so the house still works for the family on the day.",
      },
      {
        q: "Do you provide mehandi artists in Mananthavady?",
        a: "Yes — bridal and guest mehandi artists for mehandi nights, plus décor, music and snacks counters for the evening.",
      },
    ],
    keywords: ["event management Mananthavady", "wedding planners Mananthavady", "mehandi artist Mananthavady", "home wedding pandal Wayanad"],
    nearby: ["wayanad", "kalpetta", "sulthan-bathery", "kannur"],
  },
  {
    slug: "vythiri",
    name: "Vythiri",
    district: "Wayanad district",
    title: "Resort & Destination Weddings in Vythiri, Wayanad",
    description:
      "Plan a resort or destination wedding in Vythiri and Lakkidi — venue shortlisting, décor, catering, guest stays and transport from Kozhikode by FD Events.",
    image: img("pexels-17843095"),
    imageAlt: "Bride and groom holding hands at golden hour at a resort wedding",
    intro: [
      "Vythiri and Lakkidi are where Wayanad's resort weddings happen — misty mornings, valley views and guests who arrive for a whole weekend. These weddings need more than décor: room blocks, airport pick-ups, welcome dinners and plans for the weather.",
      "We shortlist resorts to fit your guest count and budget, then design the full weekend — haldi or mehandi by the pool, the wedding in the morning, reception under the stars — with our own catering team working alongside the resort kitchen.",
    ],
    highlights: [
      "Resort shortlisting and room-block coordination",
      "Weekend itineraries: welcome dinner, mehandi, wedding, reception",
      "Guest transfers from Kozhikode airport and railway station",
      "Outdoor and lawn décor with rain back-up plans",
      "Corporate retreats and off-site team events",
    ],
    travel: "About 12 km from Kalpetta, on the Kozhikode road.",
    faqs: [
      {
        q: "How many guests can a Vythiri resort wedding host?",
        a: "Most resort weddings here are 100–400 guests, with some larger venues for up to 1,000. We match the resort to your list and arrange nearby stays for overflow guests.",
      },
      {
        q: "Do you arrange airport pick-up for wedding guests?",
        a: "Yes — cars, tempo travellers and buses from Kozhikode (Calicut) airport and railway station, with a coordinator tracking every arrival.",
      },
    ],
    keywords: ["destination wedding Wayanad", "resort wedding Vythiri", "wedding planners Vythiri", "Wayanad resort wedding packages"],
    nearby: ["wayanad", "kalpetta", "kozhikode"],
  },
  {
    slug: "kozhikode",
    name: "Kozhikode",
    district: "Kozhikode district",
    title: "Wedding & Event Management in Kozhikode (Calicut)",
    description:
      "Event management in Kozhikode — weddings, receptions, Arabian counters, stage décor and catering by FD Events. Free quotes on WhatsApp.",
    image: img("pexels-10302294"),
    imageAlt: "Bride in red with traditional gold jewellery at a wedding in Kozhikode",
    intro: [
      "Kozhikode weddings are about food and hospitality first — and that is exactly where our team is strongest. We bring our Arabian counters, Malabar biryani cooks and buffet service to auditoriums, convention centres and beachside venues across Calicut.",
      "For families splitting celebrations between Kozhikode and Wayanad — a wedding in the city and a reception in the hills, or the other way round — one team handling both ends means one plan, one menu and no gaps in between.",
    ],
    highlights: [
      "Wedding and reception planning across Calicut",
      "Malabar biryani, mandhi and Arabian counters",
      "Convention centre and auditorium setups",
      "Weddings split between Kozhikode and Wayanad",
      "Guest buses up the churam to Wayanad venues",
    ],
    travel: "About 2 hours from Kalpetta via the Thamarassery churam — we plan travel for crew and guests around it.",
    faqs: [
      {
        q: "Do you work in Kozhikode city or only in Wayanad?",
        a: "We work across Kozhikode district — city auditoriums and convention centres, Thamarassery, Koduvally, Mukkam and the coast.",
      },
      {
        q: "Can you handle a wedding in Kozhikode and a reception in Wayanad?",
        a: "Yes. We plan both events together — décor, catering, guest transport between them and timings around the churam.",
      },
    ],
    keywords: ["event management Kozhikode", "wedding planners Calicut", "wedding decorators Kozhikode", "Arabian counter Kozhikode"],
    nearby: ["wayanad", "malappuram", "vythiri"],
  },
  {
    slug: "malappuram",
    name: "Malappuram",
    district: "Malappuram district",
    title: "Wedding Planners & Event Management in Malappuram",
    description:
      "Weddings, receptions and family functions in Malappuram — stage décor, catering, music and logistics by FD Events. Free quotes.",
    image: img("pexels-38080278"),
    imageAlt: "Bride in red and gold bridal wear under evening lights at a Malappuram wedding",
    intro: [
      "Malappuram celebrates big — lively mehandi nights with music, wedding ceremonies, and receptions that welcome thousands of guests.",
      "We plan the full sequence: stage décor, seating layouts designed with the family, sadya, buffet and Arabian counters, snack and juice counters for the night before, and crowd and parking management for the reception.",
    ],
    highlights: [
      "Mehandi nights with live music and song team",
      "Wedding stage and décor",
      "Receptions for very large guest lists",
      "Seating and serving layouts planned with the family",
      "Islamic, Arabian, juice and snack counters",
    ],
    travel: "About 3 hours from Kalpetta — our crew travels a day ahead for large setups.",
    faqs: [
      {
        q: "Do you plan complete weddings in Malappuram?",
        a: "Yes — engagement, mehandi night, wedding and reception, with décor, catering, music and logistics from one team.",
      },
      {
        q: "Can you plan the seating and food service for a very large reception?",
        a: "Yes. We design the hall or pandal layout — seating, entrances, serving lines and counters — with the family, so thousands of guests are served without waiting.",
      },
    ],
    keywords: ["wedding planners Malappuram", "event management Malappuram", "wedding decorators Malappuram", "mehandi decoration Malappuram"],
    nearby: ["kozhikode", "wayanad"],
  },
  {
    slug: "kannur",
    name: "Kannur",
    district: "Kannur district",
    title: "Wedding & Event Management in Kannur",
    description:
      "Weddings, receptions and catering in Kannur — stage décor, Malabar and Arabian counters, sound and guest transport by FD Events from Wayanad. Free quotes.",
    image: img("pexels-26990498"),
    imageAlt: "Bride in blush pink and groom in an ivory sherwani at a reception in Kannur",
    intro: [
      "Kannur families often connect with Wayanad through Mananthavady and the Kottiyoor and Boys Town ghat roads, and many of our clients hold one function on each side. We bring the same team, menus and décor style to both.",
      "From auditorium receptions in Kannur town and Thalassery to home weddings in the hills of Iritty, we handle stage décor, catering with Thalassery-style biryani and Arabian counters, sound, lighting and guest transport.",
    ],
    highlights: [
      "Receptions in Kannur town, Thalassery and Iritty",
      "Thalassery biryani and Arabian counters",
      "Stage décor and lighting",
      "Functions split between Kannur and Wayanad",
      "Guest buses via the Mananthavady ghat roads",
    ],
    travel: "About 3 hours from Kalpetta via Mananthavady.",
    faqs: [
      {
        q: "Do you take events in Kannur and Thalassery?",
        a: "Yes — Kannur town, Thalassery, Iritty and nearby areas, especially for families with functions in both Kannur and Wayanad.",
      },
    ],
    keywords: ["event management Kannur", "wedding planners Kannur", "wedding catering Thalassery", "reception decoration Kannur"],
    nearby: ["mananthavady", "wayanad", "kozhikode"],
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
