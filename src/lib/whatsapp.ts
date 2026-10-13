import { site } from "@/config/site";

/** Build a wa.me link that opens WhatsApp with a pre-filled message. */
export function whatsappLink(message: string = site.defaultWhatsAppMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function serviceEnquiryMessage(serviceTitle: string) {
  return `Hello ${site.name}! I'm interested in your *${serviceTitle}* service. Could you please share the details and pricing?`;
}

export type EnquiryDetails = {
  name: string;
  phone?: string;
  eventType: string;
  date?: string;
  location?: string;
  guests?: string;
  services?: string[];
  notes?: string;
};

export function enquiryMessage(d: EnquiryDetails) {
  const details = [
    `*Name:* ${d.name}`,
    d.phone && `*Phone:* ${d.phone}`,
    `*Event:* ${d.eventType}`,
    d.date && `*Date:* ${d.date}`,
    d.location && `*Location:* ${d.location}`,
    d.guests && `*Guests:* ${d.guests}`,
    d.services?.length && `*Services needed:* ${d.services.join(", ")}`,
    d.notes && `*Notes:* ${d.notes}`,
  ].filter(Boolean);
  return [`Hello ${site.name}! I'd like to plan an event.`, "", ...details].join("\n");
}
