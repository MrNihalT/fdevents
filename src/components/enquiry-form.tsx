"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { enquiryMessage, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

const eventTypes = [
  "Wedding",
  "Engagement",
  "Reception",
  "Mehandi night",
  "Birthday party",
  "House-warming",
  "Corporate event",
  "Stage program",
  "Other",
];

/** Collects event details and opens WhatsApp with them pre-filled. */
export function EnquiryForm({ defaultService }: { defaultService?: string }) {
  const [selected, setSelected] = useState<string[]>(defaultService ? [defaultService] : []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const message = enquiryMessage({
      name: get("name"),
      phone: get("phone"),
      eventType: get("eventType"),
      date: get("date"),
      location: get("location"),
      guests: get("guests"),
      services: selected,
      notes: get("notes"),
    });
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  const toggle = (name: string) =>
    setSelected((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));

  return (
    <form onSubmit={onSubmit} className="card-retro space-y-8 p-7 sm:p-12">
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Phone number" name="phone" type="tel" autoComplete="tel" />
        <label className="block">
          <span className="label">Event type *</span>
          <select name="eventType" required className="field" defaultValue="">
            <option value="" disabled>
              Choose an event
            </option>
            {eventTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <Field label="Event date" name="date" type="date" />
        <Field label="Location / venue" name="location" placeholder="e.g. Kalpetta" />
        <Field label="Approx. guests" name="guests" type="number" min={1} placeholder="e.g. 500" />
      </div>

      <fieldset>
        <legend className="label mb-4">Services needed</legend>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => {
            const on = selected.includes(s.name);
            return (
              <button
                type="button"
                key={s.slug}
                aria-pressed={on}
                onClick={() => toggle(s.name)}
                className={`rounded-full border-[1.5px] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.08em] transition-colors ${
                  on ? "border-wine bg-wine text-cream" : "border-rule text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="block">
        <span className="label">Anything else?</span>
        <textarea name="notes" rows={3} className="field resize-none" placeholder="Theme, budget, special requests…" />
      </label>

      <div>
        <button type="submit" className="btn btn-whatsapp w-full">
          <WhatsAppIcon className="h-4 w-4" /> Send enquiry on WhatsApp
        </button>
        <p className="mt-3 text-center text-sm text-muted">Opens WhatsApp with your details filled in — just tap send.</p>
      </div>
    </form>
  );
}

function Field({ label, required, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {required && " *"}
      </span>
      <input required={required} className="field" {...props} />
    </label>
  );
}
