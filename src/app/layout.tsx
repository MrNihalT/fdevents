import type { Metadata, Viewport } from "next";
import { Courier_Prime, DM_Serif_Display, Gloock, Lora } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd, siteJsonLd } from "@/components/json-ld";
import { MotionProvider } from "@/components/motion";
import { WhatsAppFloat } from "@/components/whatsapp";
import { site } from "@/config/site";
import "./globals.css";

const gloock = Gloock({ variable: "--font-gloock", subsets: ["latin"], weight: "400", display: "swap" });
const dmSerifItalic = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});
const lora = Lora({ variable: "--font-lora", subsets: ["latin"], style: ["normal", "italic"], display: "swap" });
const courier = Courier_Prime({ variable: "--font-courier", subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Wedding & Event Planners in Wayanad, Kerala`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "event management Wayanad",
    "wedding planners Wayanad",
    "event management Kalpetta",
    "catering Wayanad",
    "wedding catering Kerala",
    "stage decoration Wayanad",
    "islamic counter",
    "buffet counter",
    "mehandi artist Wayanad",
    "song team Wayanad",
    "sound system rental Wayanad",
    "wedding car rental Wayanad",
    "bus rental Wayanad",
    "event security Kerala",
    "destination wedding Wayanad",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: `${site.name} — Event Management in Wayanad`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Event Management in Wayanad`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  formatDetection: { telephone: true, email: true, address: true },
  category: "Event Management",
  other: {
    "geo.region": "IN-KL",
    "geo.placename": "Wayanad, Kerala",
    "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#6e2432",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${gloock.variable} ${dmSerifItalic.variable} ${lora.variable} ${courier.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-[120] bg-wine px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <JsonLd data={siteJsonLd()} />
        <MotionProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </MotionProvider>
      </body>
    </html>
  );
}
