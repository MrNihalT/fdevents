import { services } from "@/data/services";

/** Slow-scrolling mustard ribbon of service names, like a vintage awning. */
export function ServiceMarquee() {
  const items = services.map((s) => s.name);
  return (
    <div className="overflow-hidden border-y-[1.5px] border-ink bg-mustard-soft py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((name) => (
              <li key={name} className="flex items-center">
                <span className="display px-7 text-3xl text-ink sm:text-4xl">
                  <em className="text-ink!">{name}</em>
                </span>
                <span className="text-xl text-wine">✺</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
