"use client";

import Lenis from "lenis";
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Respects the visitor's "reduce motion" OS setting for every animation below,
 * and adds buttery smooth scrolling (Lenis, ~3 kB) for everyone else.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <ScrollProgress />
      {children}
    </MotionConfig>
  );
}

function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -80 } });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduce]);
  return null;
}

/** Thin mustard line at the very top that fills as you scroll. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-mustard"
    />
  );
}

/** Slides a line of text up from behind a mask — used for section titles. */
export function MaskReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className="block"
        initial={{ y: "105%", rotate: 2 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Photo reveal: a paper-coloured curtain lifts while the image settles from a
 * slight zoom. Transform-only, so it stays on the GPU.
 */
export function ImageCurtain({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div
        className="absolute inset-0"
        variants={{ hidden: { scale: 1.18 }, show: { scale: 1 } }}
        transition={{ duration: 1.6, ease, delay }}
      >
        {children}
      </motion.div>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 z-10 origin-top bg-parchment"
        variants={{ hidden: { scaleY: 1 }, show: { scaleY: 0 } }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay }}
      />
    </motion.div>
  );
}

/** Moves its children slower or faster than the page scroll. */
export function Parallax({ children, offset = 60, className = "" }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

/** Fades and lifts content in once it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Tag>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
};

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.ul
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.ul>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.li className={className} variants={item}>
      {children}
    </motion.li>
  );
}

/** Counts up from 0 when scrolled into view. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => `${Math.round(v).toLocaleString("en-IN")}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration: 2, ease });
    return () => controls.stop();
  }, [inView, to, value]);

  return (
    <motion.span ref={ref} aria-label={`${to}${suffix}`}>
      {text}
    </motion.span>
  );
}
