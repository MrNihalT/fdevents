"use client";

import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

// Skip the animation on the very first page load so it never delays the
// first paint (LCP); only in-app navigations get the transition.
let firstRender = true;

export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => !firstRender);
  useEffect(() => {
    firstRender = false;
  }, []);

  return (
    <>
      {animate && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[80] origin-top bg-wine"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      <motion.div
        initial={animate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
