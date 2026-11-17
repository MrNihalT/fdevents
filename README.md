# FD Events — Website

Vintage-retro, premium, SEO-optimised website for **FD Events**, an event management team in Wayanad, Kerala.
Built with Next.js 16 (App Router, Cache Components), Tailwind CSS v4, Motion (Framer Motion) and Lenis smooth scroll.

**Design:** "Kerala heritage print": aged-paper cream, deep wine, mustard and warm ink; Bodoni Moda display type,
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
| Site photos (hero, services, about…) | `public/images/` — referenced as `photo("photo-…")` via `src/lib/images.ts` |

The WhatsApp number is `918590962100`. Every "Book / Enquire" button opens WhatsApp with a pre-filled message, and the
enquiry form sends the visitor's event details (name, date, venue, guests, services) as the message.

All photos are stored in the project (`public/images/`), not hot-linked. To replace one, drop your own JPG in
`public/images/` and point the code at it. After adding a new Unsplash photo id anywhere in `src/` or `content/`,
run `node scripts/download-images.mjs` to fetch a local copy.

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

## PWA installation and offline support

The app includes 192px/512px icons, a maskable icon, manifest shortcuts, and an installation control in the footer.
Chrome/Edge can offer a native install prompt when eligible; on iPhone/iPad use Safari → Share → Add to Home Screen.
Install UI depends on the browser. HTTPS (or localhost) is required.

The service worker registers in production only. It caches **only `/offline.html`**, a self-contained contact page.
It never caches page HTML, Next.js RSC responses, admin data, forms, uploads or third-party requests.
Full navigation while offline displays the contact page; the full gallery and videos require a connection.
Next.js client-side transitions may show their own connection error while offline; reload to reach the fallback.
To test: build and start production, open the site once online, wait for the service worker to activate, then go
 offline and reload a public page. Check DevTools → Application for the manifest, icons and service worker.
Run `node --test tests/pwa.test.mjs` for the worker policy checks (these do not replace browser lifecycle testing).
Bump `fd-events-offline-v1` in `public/sw.js` whenever the offline page's contact details change.

## SEO domain and launch steps

Temporary public address: **https://fdevents.vercel.app**.
When a custom domain is purchased, set **`NEXT_PUBLIC_SITE_URL`** in `.env.local` and in Vercel's project
Environment Variables to the final HTTPS origin (without a trailing slash), then rebuild/redeploy.
The fallback in `src/config/site.ts` is the temporary Vercel URL; update it too when switching domains.
Use Vercel's domain settings to permanently redirect the previous public host to the final domain.

The target search topics are event management and event management teams in Wayanad, catering teams in Wayanad,
and event management in Kerala. Correctly spelled Wayanad appears in readable headings, page titles, FAQs,
service descriptions and internal links. The “best” phrases are used as customer questions, without invented
rankings, awards or review counts. Metadata keywords are included, but Google does not use that tag for ranking.
The supplied competitor HTML was used only as a structural reference: none of its analytics IDs, verification
codes, reviews, business claims or photos were copied.

After deployment:

1. Add your own Google Search Console verification code as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy.
2. Submit `/sitemap.xml` and inspect the home, Wayanad, Kerala coverage and catering URLs in Search Console.
3. Create or update FD Events' Google Business Profile with matching name, address and phone numbers.
4. Replace the sample photos, videos and written example reviews with genuine FD Events work before launch.
5. Check the real hours, map pin and remaining Facebook/YouTube profile links; generic placeholder social URLs
   are excluded from structured data. No competitor rating or certification is asserted for FD Events.

The PWA and SEO changes do not guarantee a search position or rich-result display. A manifest is not a Google
ranking shortcut; useful content, accurate local information, genuine reviews and a crawlable live domain matter.

Production smoke check: start the app on port 3002, then run `node scripts/check-seo-pwa.mjs`.
Set `CHECK_ORIGIN` for another local port and `NEXT_PUBLIC_SITE_URL` for a new canonical domain.
