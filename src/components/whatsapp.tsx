"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

/**
 * Fixed WhatsApp button. It sits on the page gutter (and above the iPhone home
 * bar), and only appears once the visitor scrolls past the first screen, so it
 * never covers the hero's own call-to-action buttons.
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with FD Events on WhatsApp"
      tabIndex={visible ? undefined : -1}
      className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-50 grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full bg-whatsapp text-white shadow-[0_10px_28px_-8px_rgb(0_0_0/0.45)] ring-1 ring-white/15 transition-[opacity,transform,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 sm:h-14 sm:w-14 lg:right-8 lg:bottom-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  );
}
