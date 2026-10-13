import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/services";
import { ServiceIcon } from "./icons";

const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

/** Service shown as a vintage postage stamp with a perforated edge. */
export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <div
        className={`stamp mx-auto max-w-[20rem] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-0 ${tilts[index % tilts.length]}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            quality={85}
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="film object-cover group-hover:scale-105"
          />
          <span className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-ink bg-card text-wine">
            <ServiceIcon name={service.icon} className="h-5 w-5" />
          </span>
        </div>
        <div className="flex items-baseline justify-between px-1 pt-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
          <span>Nº {String(index + 1).padStart(2, "0")}</span>
          <span>FD Events</span>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-[20rem] text-center">
        <h3 className="display text-[2rem] text-ink transition-colors group-hover:text-wine">{service.name}</h3>
        <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">{service.excerpt}</p>
        <span className="link-line mt-5 inline-block text-wine">Discover</span>
      </div>
    </Link>
  );
}
