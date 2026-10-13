import { site } from "@/config/site";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "./icons";

const links = [
  { name: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { name: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
  { name: "YouTube", href: site.social.youtube, Icon: YouTubeIcon },
];

/** Round outlined social buttons. `tone` picks colours for light or dark backgrounds. */
export function SocialLinks({ tone = "dark", size = "md" }: { tone?: "dark" | "light"; size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const icon = size === "sm" ? "h-4 w-4" : "h-[1.15rem] w-[1.15rem]";
  const colors =
    tone === "light"
      ? "border-cream/40 text-cream hover:border-mustard-soft hover:bg-mustard-soft hover:text-wine-deep"
      : "border-ink/30 text-ink hover:border-wine hover:bg-wine hover:text-cream";
  return (
    <ul className="flex items-center gap-2.5">
      {links.map(({ name, href, Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${name}`}
            className={`grid place-items-center rounded-full border transition-colors duration-300 ${box} ${colors}`}
          >
            <Icon className={icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
