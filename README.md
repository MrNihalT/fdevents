# FD Events — Website

Vintage-retro, premium, SEO-optimised website for **FD Events**, an event management team in Wayanad, Kerala.
Built with Next.js 16 (App Router, Cache Components), Tailwind CSS v4, Motion (Framer Motion) and Lenis smooth scroll.

**Design:** "Kerala heritage print": aged-paper cream, deep wine, mustard and warm ink; Fraunces display type,
Lora body and Courier Prime typewriter labels; postage-stamp photo frames, a rotating seal badge, halftone texture
and offset print-shadow buttons. Animations (masked headline reveals, photo curtain reveals, parallax, page
transitions, scroll progress) are transform-only and respect "reduce motion".

## Quick start

```bash
npm install
cp .env.example .env.local   # then set ADMIN_PASSWORD
npm run dev                  # http://localhost:3000
```

## Where to edit things

| What | File |
| --- | --- |
| Business name, phone, WhatsApp, address, socials, map location | `src/config/site.ts` |
| Services (text, photos, features, SEO keywords), FAQs | `src/data/services.ts` |
| Colours & fonts (vintage theme) | `src/app/globals.css`, `src/app/layout.tsx` |
| Album photos, event films (YouTube) & client reviews | **`/admin`** in the browser (or `content/*.json`) |

The WhatsApp number is `918590962100`. Every "Book / Enquire" button opens WhatsApp with a pre-filled message, and the
enquiry form sends the visitor's event details (name, date, venue, guests, services) as the message.

## Admin panel — `/admin`

Log in with `ADMIN_PASSWORD` to:

- upload work photos to the **Albums** (JPG/PNG/WEBP, up to 8 MB) with a title and category
- add **Event Films** by pasting any YouTube link (watch, youtu.be, shorts) — the first one is featured on the home page
- add **client reviews** (name, event, star rating, text) — shown on the home page carousel and `/reviews`
- delete any of the above

Changes show on the site immediately.

> **Sample content:** the albums use Unsplash stock photos, the films are public YouTube videos from other
> channels, and the reviews are written examples. All are placeholders. Replace them with FD Events' own work
> and real client reviews before going live.

## Storage: local now, Supabase later

Pages never talk to storage directly. They go through `src/lib/content`.

- **Now (default):** photos, films and reviews are stored in `content/` (`gallery.json`, `videos.json`, `reviews.json`, `uploads/`).
  This works on a VPS / any Node host (`npm run build && npm start`). It does **not** persist on serverless hosts like
  Vercel, so use Supabase there.
- **Supabase:** 
  1. Create a project and run `supabase/schema.sql` in the SQL editor.
  2. Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to the environment.
  3. Optionally import the current content: `node --env-file=.env.local scripts/seed-supabase.mjs`.
  4. Rebuild. The site switches to Supabase automatically (the admin header shows which storage is active).

## SEO included

- Keyword-led titles under 60 characters and ~150-character descriptions on every page (`src/lib/seo.ts`)
- A dedicated landing page per service (`/services/[slug]`), e.g. "Catering in Wayanad, Kerala"
- Per-page Open Graph / Twitter cards with real photos (nice previews on WhatsApp, Facebook, X)
- Structured data (JSON-LD): LocalBusiness + WebSite graph (address, geo, hours, contact point, services,
  social profiles), Service, FAQPage, BreadcrumbList, ImageGallery, VideoObject
- `sitemap.xml` with image and video entries, `robots.txt`, web manifest, Apple touch icon, geo meta tags
- Google Search Console verification via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- Performance: static prerendering, AVIF/WebP images at high quality, home-page film loads on click,
  security headers

Before launch: set `NEXT_PUBLIC_SITE_URL` to the real domain, fix the real address/email/social links in
`src/config/site.ts`, add the Search Console verification code, submit the sitemap in Google Search Console,
and create a Google Business Profile with the same name, address and phone (this matters most for local search).

---

Developed by [nihalt.in](https://nihalt.in)
