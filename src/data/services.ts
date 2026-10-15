import { photo as img } from "@/lib/images";

export type Service = {
  slug: string;
  title: string;
  /** Short heading used in cards and menus. */
  name: string;
  icon: IconName;
  image: string;
  excerpt: string;
  description: string[];
  features: string[];
  keywords: string[];
};

export type IconName =
  | "rings"
  | "pot"
  | "stage"
  | "buffet"
  | "crescent"
  | "cake"
  | "henna"
  | "music"
  | "speaker"
  | "car"
  | "bus"
  | "shield"
  | "balloon"
  | "briefcase";

export const services: Service[] = [
  {
    slug: "wedding-management",
    name: "Weddings",
    title: "Wedding & Marriage Management in Wayanad",
    icon: "rings",
    image: img("photo-1587271636175-90d58cdad458"),
    excerpt:
      "Weddings planned end-to-end — nikah, walima, mylanchi, engagement and the reception night.",
    description: [
      "A wedding in Wayanad deserves the calm of the hills and the warmth of a Kerala welcome. Our team plans every ritual and every moment — venue booking, mandap and stage, catering, guest transport, music and photography coordination — so your family can simply celebrate.",
      "Malabar Muslim weddings — mylanchi nights, nikah and walima — Hindu weddings with sadya, Christian church weddings, grand receptions and destination weddings at resorts across Vythiri, Kalpetta and Sulthan Bathery: every wedding, planned with the same care.",
    ],
    features: [
      "Complete planning & on-day coordination",
      "Venue, resort & auditorium booking",
      "Nikah, walima, mylanchi & reception",
      "Engagement, haldi & sadya",
      "Theme-based stage and mandap décor",
      "Guest hospitality & accommodation",
      "Destination weddings in Wayanad",
    ],
    keywords: [
      "wedding planners in Wayanad",
      "marriage event management Kerala",
      "Muslim wedding planners Kerala",
      "nikah event management Wayanad",
      "destination wedding Wayanad",
    ],
  },
  {
    slug: "catering",
    name: "Catering",
    title: "Catering Services in Wayanad — Kerala Sadya to Multi-Cuisine",
    icon: "pot",
    image: img("photo-1701579231305-d84d8af9a3fd"),
    excerpt:
      "Authentic Kerala sadya, Malabar biryani, North Indian, Chinese and continental menus cooked fresh on site.",
    description: [
      "Our kitchen team has served everything from intimate family functions to receptions of 3,000+ guests. We cook fresh, serve hot and keep the hygiene standards your guests expect.",
      "Choose a traditional banana-leaf sadya with 26 dishes, a Malabar biryani feast, or a multi-cuisine spread tailored to your guest list.",
    ],
    features: [
      "Traditional Kerala sadya on banana leaf",
      "Malabar biryani & mandhi",
      "North Indian, Chinese & continental",
      "Trained, uniformed service staff",
      "Welcome drinks & live stations",
      "Hygienic, on-site live cooking",
    ],
    keywords: ["catering in Wayanad", "Kerala sadya catering", "wedding catering Kalpetta"],
  },
  {
    slug: "stage-events",
    name: "Stage & Décor",
    title: "Stage Programs, Stage Décor & Event Setup",
    icon: "stage",
    image: img("photo-1745573673043-43a4f3b91466"),
    excerpt:
      "Wedding stages, floral décor, entrance arches, lighting and complete stage programs for every kind of event.",
    description: [
      "From floral mandaps and reception backdrops to large stage programs and cultural shows, we design and build the setting that makes your event memorable.",
      "Our décor team works with fresh flowers, drapes, vintage props and warm lighting to create a look that is uniquely yours.",
    ],
    features: [
      "Wedding & reception stage design",
      "Fresh-flower and artificial décor",
      "Entrance arches & photo booths",
      "Cultural programs & anchoring",
      "LED walls and truss setups",
      "Pandal & shamiana works",
    ],
    keywords: ["stage decoration Wayanad", "wedding stage décor Kerala", "event setup Kalpetta"],
  },
  {
    slug: "buffet-counter",
    name: "Buffet Counter",
    title: "Buffet Counters & Live Food Stations",
    icon: "buffet",
    image: img("photo-1555244162-803834f70033"),
    excerpt:
      "Elegant buffet counters with chafing dishes, live stations and themed food displays.",
    description: [
      "A beautifully styled buffet keeps guests moving and the food at its best. We set up premium counters with themed décor, labelled dishes and attentive servers.",
      "Add live dosa, pasta, chaat or grill stations to turn dinner into an experience.",
    ],
    features: [
      "Premium chafing dishes & crockery",
      "Themed counter décor",
      "Live dosa, chaat & grill stations",
      "Welcome drink & mocktail counter",
      "Dedicated counter staff",
      "Flexible veg / non-veg menus",
    ],
    keywords: ["buffet counter Wayanad", "live food counter Kerala wedding"],
  },
  {
    slug: "islamic-counter",
    name: "Islamic Counter",
    title: "Islamic & Arabian Food Counter for Weddings",
    icon: "crescent",
    image: img("photo-1633945274405-b6c8069047b0"),
    excerpt:
      "Arabian-style counters with mandhi, kabsa, alfaham, shawarma, dates and traditional sulaimani.",
    description: [
      "Our Islamic counter brings Arabian hospitality to any wedding or reception — majlis-style seating, brass lanterns and a menu cooked to tradition.",
      "Every dish is prepared halal by our experienced Malabar cooks.",
    ],
    features: [
      "Mandhi, kabsa & alfaham",
      "Live shawarma & grill",
      "Dates, kahwa & sulaimani",
      "Majlis seating & Arabian décor",
      "100% halal preparation",
      "Malabar snacks counter",
    ],
    keywords: ["islamic counter Wayanad", "arabian food counter Kerala wedding", "mandhi catering Wayanad"],
  },
  {
    slug: "food-dessert-counter",
    name: "Food & Dessert",
    title: "Food & Dessert Counters",
    icon: "cake",
    image: img("photo-1488477181946-6428a0291777"),
    excerpt:
      "Dessert tables, ice-cream counters, payasam stations, chocolate fountains and wedding cakes.",
    description: [
      "Sweet endings, beautifully styled. Our dessert counters combine Kerala classics like palada and pal payasam with cupcakes, pastries, kulfi and chocolate fountains.",
      "We can also arrange custom wedding cakes and themed birthday cakes.",
    ],
    features: [
      "Payasam & traditional sweets",
      "Ice-cream & kulfi counters",
      "Chocolate fountain",
      "Cupcake and pastry tables",
      "Custom wedding & birthday cakes",
      "Fresh juice & mocktail bar",
    ],
    keywords: ["dessert counter Wayanad", "wedding dessert table Kerala"],
  },
  {
    slug: "mehandi",
    name: "Mehandi",
    title: "Mehandi Artists & Mehandi Night Arrangements",
    icon: "henna",
    image: img("photo-1597157639073-69284dc0fdaf"),
    excerpt:
      "Bridal mehandi, guest mehandi and complete mehandi-night setups with décor, music and snacks.",
    description: [
      "Our mehandi artists create intricate bridal designs — Arabic, Indo-Arabic, Rajasthani and minimal — using natural henna for a deep, lasting colour.",
      "We also arrange the whole mehandi night: colourful décor, seating, oppana or song team, and snack counters.",
    ],
    features: [
      "Bridal mehandi (hands & feet)",
      "Guest mehandi artists",
      "Natural, chemical-free henna",
      "Mehandi-night décor",
      "Oppana & music arrangements",
      "Snack & juice counters",
    ],
    keywords: ["mehandi artist Wayanad", "bridal mehandi Kerala", "mehandi night Wayanad"],
  },
  {
    slug: "song-team",
    name: "Song Team",
    title: "Song Team, Live Band & Entertainment",
    icon: "music",
    image: img("photo-1493225457124-a3eb161ffa5f"),
    excerpt:
      "Live singers, mappilappattu teams, gaana mela, live bands, DJ nights and cultural performances.",
    description: [
      "Music sets the mood. Choose from our live singers and orchestra, mappilappattu and oppana teams, chenda melam, and DJ nights for receptions.",
      "We tailor the playlist and performers to your family and your guests.",
    ],
    features: [
      "Live orchestra & singers",
      "Mappilappattu & oppana teams",
      "Chenda melam & panchavadyam",
      "DJ nights",
      "Kathakali & cultural dance",
      "Anchors & MCs",
    ],
    keywords: ["song team Wayanad", "live band for wedding Kerala", "mappilappattu team Wayanad"],
  },
  {
    slug: "sound-lighting",
    name: "Sound & Light",
    title: "Sound Arrangements & Event Lighting",
    icon: "speaker",
    image: img("photo-1598488035139-bdbb2231ce04"),
    excerpt:
      "Professional sound systems, wireless mics, line arrays, stage lights and generator backup.",
    description: [
      "Crystal-clear sound and beautiful lighting, operated by experienced technicians. We supply everything from a simple PA system for a family function to concert-grade line arrays.",
      "Warm fairy lights, moving heads and uplighting give your venue a magical glow after sunset.",
    ],
    features: [
      "PA & line-array sound systems",
      "Wireless & collar mics",
      "Stage, moving-head & par lights",
      "Fairy-light and venue lighting",
      "LED screens & projectors",
      "Generator backup",
    ],
    keywords: ["sound system rental Wayanad", "light and sound Kerala events"],
  },
  {
    slug: "premium-vehicles",
    name: "Premium Cars",
    title: "Premium Vehicles & Wedding Car Rental",
    icon: "car",
    image: img("photo-1631295868223-63265b40d9e4"),
    excerpt:
      "Luxury and vintage wedding cars, decorated bridal cars and premium vehicles with chauffeurs.",
    description: [
      "Arrive in style. Choose from luxury sedans, SUVs and vintage classics, decorated with fresh flowers and driven by professional chauffeurs.",
      "We also arrange cars for VIP guests and airport pick-ups from Kozhikode and Kannur.",
    ],
    features: [
      "Luxury sedans & SUVs",
      "Vintage & classic wedding cars",
      "Floral car decoration",
      "Uniformed chauffeurs",
      "Airport pick-up & drop",
      "Hourly & daily rental",
    ],
    keywords: ["wedding car rental Wayanad", "luxury car rent Kalpetta", "rent a car Wayanad"],
  },
  {
    slug: "bus-rental",
    name: "Bus Rental",
    title: "Bus & Tempo Traveller Rental for Guests",
    icon: "bus",
    image: img("photo-1570125909232-eb263c188f7e"),
    excerpt:
      "AC buses, tourist coaches and tempo travellers for guest transport and wedding parties.",
    description: [
      "Move your guests comfortably between home, venue and resort. Our fleet of AC and non-AC buses, coaches and tempo travellers is driven by experienced hill-route drivers.",
      "Ideal for wedding parties, family trips and corporate outings around Wayanad.",
    ],
    features: [
      "AC & non-AC buses",
      "12 to 50 seater options",
      "Tempo travellers",
      "Experienced ghat-road drivers",
      "Guest shuttle planning",
      "Tour packages in Wayanad",
    ],
    keywords: ["bus rental Wayanad", "tempo traveller Wayanad", "wedding bus hire Kerala"],
  },
  {
    slug: "security",
    name: "Security",
    title: "Event Security & Crowd Management",
    icon: "shield",
    image: img("photo-1557597774-9d273605dfa9"),
    excerpt:
      "Trained security staff, bouncers, parking management and crowd control for safe events.",
    description: [
      "Your guests' safety comes first. Our trained, uniformed security personnel handle entry, VIP protection, parking and crowd management so the celebration runs smoothly.",
      "We coordinate with venue management and local authorities for large gatherings.",
    ],
    features: [
      "Uniformed security guards",
      "Bouncers & VIP protection",
      "Parking & traffic management",
      "Entry and guest-list control",
      "CCTV arrangements",
      "First-aid coordination",
    ],
    keywords: ["event security Wayanad", "bouncers for wedding Kerala"],
  },
  {
    slug: "birthday-parties",
    name: "Parties",
    title: "Birthday, House-warming & Private Parties",
    icon: "balloon",
    image: img("photo-1530103862676-de8c9debad1d"),
    excerpt:
      "Theme birthdays, house-warming, anniversaries, naming ceremonies and baby showers.",
    description: [
      "Small celebrations deserve big care. We plan themed birthday parties, house-warming ceremonies, anniversaries, naming ceremonies and baby showers.",
      "Balloon décor, cakes, games, magicians, catering — all arranged by one team.",
    ],
    features: [
      "Theme & balloon décor",
      "Cakes & dessert tables",
      "Kids' games & magicians",
      "Photo booths",
      "Catering for any size",
      "Return gifts",
    ],
    keywords: ["birthday party planners Wayanad", "event management Kalpetta"],
  },
  {
    slug: "corporate-events",
    name: "Corporate",
    title: "Corporate Events, Conferences & Launches",
    icon: "briefcase",
    image: img("photo-1540575467063-178a50c2df87"),
    excerpt:
      "Conferences, product launches, team outings and resort retreats in Wayanad.",
    description: [
      "Wayanad's resorts are a favourite for corporate retreats. We handle venue, AV, stage, catering, transport and team-building activities.",
      "Professional, punctual and on-brand — every time.",
    ],
    features: [
      "Conferences & seminars",
      "Product launches",
      "Team outings & retreats",
      "Branding & stage setup",
      "AV & live streaming",
      "Group transport",
    ],
    keywords: ["corporate event management Wayanad", "resort retreats Wayanad"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const faqs = [
  {
    q: "Which areas do you cover?",
    a: "We are based in Wayanad and cover Kalpetta, Sulthan Bathery, Mananthavady, Vythiri, Meppadi and nearby districts including Kozhikode, Kannur and Malappuram.",
  },
  {
    q: "How early should we book for a wedding?",
    a: "For weddings we recommend booking 2–4 months in advance, especially during the peak season (November to May). Smaller events can often be arranged within a week.",
  },
  {
    q: "Can we book only one service, like catering or a car?",
    a: "Yes. You can book any single service — catering, buffet counter, sound, car or bus rental, mehandi, security — or let us handle the complete event.",
  },
  {
    q: "How do we get a quotation?",
    a: "Tap any WhatsApp button on this site, share your event date, location and guest count, and we will send a detailed quotation, usually within a few hours.",
  },
];
