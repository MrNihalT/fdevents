"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

type Faq = { q: string; a: string };

export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-dashed divide-rule border-y-[1.5px] border-ink">
      {items.map((item, index) => (
        <FaqItem key={item.q} item={item} defaultOpen={index === 0} />
      ))}
    </div>
  );
}

function FaqItem({ item, defaultOpen }: { item: Faq; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="py-6">
      <h3>
        <button
          type="button"
          id={`${id}-question`}
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full cursor-pointer items-start justify-between gap-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
        >
          <span className="display text-2xl leading-snug text-ink">{item.q}</span>
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ rotate: open ? 45 : 0 }}
            transition={transition}
            className="mt-1 shrink-0 font-mono text-2xl text-wine"
          >
            +
          </motion.span>
        </button>
      </h3>
      <motion.div
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-question`}
        aria-hidden={!open}
        inert={!open}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={transition}
        className="overflow-hidden"
      >
        <p className="pt-4 text-muted">{item.a}</p>
      </motion.div>
    </div>
  );
}
