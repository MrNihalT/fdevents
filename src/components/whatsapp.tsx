import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

/** Fixed WhatsApp button — just the logo, no animation. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with FD Events on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_-6px_rgb(0_0_0/0.35)] transition-transform duration-200 hover:scale-105"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
