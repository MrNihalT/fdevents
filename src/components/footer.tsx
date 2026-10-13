import Link from "next/link";
import { navLinks, site } from "@/config/site";
import { services } from "@/data/services";
import { whatsappLink } from "@/lib/whatsapp";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./logo";
import { Seal } from "./ornament";
import { SocialLinks } from "./social";

export function Footer() {
  const { address } = site;
  return (
    <footer className="wine-section on-dark relative mt-auto overflow-hidden">
      {/* Closing call-to-action */}
      <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-6 pb-20 pt-24 sm:px-8 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="tag">Let&apos;s celebrate together</p>
          <h2 className="display mt-6 max-w-4xl text-5xl text-cream sm:text-7xl lg:text-8xl">
            Your story, <em>beautifully</em> told.
          </h2>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
            </a>
            <a href={`tel:${site.phoneRaw}`} className="btn btn-outline-light">
              <PhoneIcon className="h-4 w-4" /> {site.phone}
            </a>
          </div>
        </div>
        <Seal light className="relative hidden h-52 w-52 lg:block" />
      </div>

      <div className="mx-auto max-w-[90rem] px-6 sm:px-8">
        <div className="grid gap-12 border-t border-dashed border-cream/25 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1.3fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-[0.95rem] text-cream/70">{site.description}</p>
            <div className="mt-8">
              <p className="label text-cream/60!">Follow our celebrations</p>
              <div className="mt-4">
                <SocialLinks tone="light" />
              </div>
            </div>
          </div>

          <FooterList title="Services">
            {services.slice(0, 8).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-cream/75 transition-colors hover:text-mustard-soft">
                  {s.name}
                </Link>
              </li>
            ))}
          </FooterList>

          <FooterList title="Explore">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream/75 transition-colors hover:text-mustard-soft">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterList>

          <address className="not-italic">
            <h3 className="tag">Contact</h3>
            <ul className="mt-6 space-y-4 text-[0.95rem] text-cream/80">
              <li className="flex gap-3">
                <PinIcon className="mt-1 h-4 w-4 shrink-0 text-mustard-soft" />
                <span>
                  {address.street}, {address.locality},<br />
                  {address.district}, {address.region} {address.postalCode}
                </span>
              </li>
              <li className="flex gap-3">
                <PhoneIcon className="mt-1 h-4 w-4 shrink-0 text-mustard-soft" />
                <a href={`tel:${site.phoneRaw}`} className="hover:text-mustard-soft">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <WhatsAppIcon className="mt-1 h-4 w-4 shrink-0 text-mustard-soft" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-mustard-soft">
                  WhatsApp {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MailIcon className="mt-1 h-4 w-4 shrink-0 text-mustard-soft" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-mustard-soft">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <ClockIcon className="mt-1 h-4 w-4 shrink-0 text-mustard-soft" />
                <span>Open every day · 8 AM – 9 PM</span>
              </li>
            </ul>
          </address>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-dashed border-cream/25 py-7 font-mono text-xs uppercase tracking-[0.12em] text-cream/55 sm:flex-row">
          <p>
            © <CopyrightYear /> {site.name} · Wayanad, Kerala
          </p>
          <p>
            Developed by{" "}
            <a
              href="https://nihalt.in"
              target="_blank"
              rel="noopener"
              className="text-mustard-soft underline decoration-mustard-soft/50 underline-offset-4 hover:text-cream"
            >
              nihalt.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="tag">{title}</h3>
      <ul className="mt-6 space-y-2.5 text-[0.95rem]">{children}</ul>
    </div>
  );
}

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}
