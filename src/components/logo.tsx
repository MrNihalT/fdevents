export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={`relative grid h-12 w-12 place-items-center rounded-full border-[1.5px] font-accent text-xl italic transition-colors duration-500 ${
          light ? "border-cream text-cream" : "border-wine bg-wine text-cream"
        }`}
      >
        <span className="absolute inset-[3px] rounded-full border border-current opacity-40" />
        FD
      </span>
      <span className="leading-none" translate="no">
        <span
          className={`display block whitespace-nowrap text-[1.85rem] transition-colors duration-500 ${light ? "text-cream" : "text-ink"}`}
        >
          FD <em className={light ? "text-mustard-soft!" : ""}>Events</em>
        </span>
      </span>
    </span>
  );
}
