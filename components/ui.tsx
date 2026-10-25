"use client";

import { useRef } from "react";
import { gsap, useGSAP, lineReveal, motion, prefersReducedMotion } from "@/lib/gsap";

/** Wraps each character so CSS can slide a duplicate up on hover. */
export function SwapText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`swap ${className}`} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          data-char={ch === " " ? " " : ch}
          style={{ ["--i" as string]: i }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

/** Small uppercase label with lines that grow out from the text. */
export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current, {
        opacity: 0,
        y: 10,
        duration: motion.dur.base,
        ease: motion.ease.enter,
        scrollTrigger: { trigger: ref.current, start: motion.trigger.enter, once: true },
      });
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className={`kicker ${className}`}>
      {children}
    </span>
  );
}

/** Headline or paragraph that rises through line masks when it enters the viewport. */
export function Reveal({
  as: Tag = "h2",
  children,
  className = "",
  delay = 0,
}: {
  as?: "h1" | "h2" | "h3" | "p" | "div";
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current!;
      const { split } = lineReveal(el, { delay });
      return () => split.revert();
    },
    { scope: ref },
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}

/** Section header used by every block: kicker + big title. */
export function SectionHead({
  kicker,
  title,
  align = "center",
  children,
}: {
  kicker: string;
  title: string;
  align?: "center" | "left";
  children?: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : "items-start"}`}>
      <Kicker>{kicker}</Kicker>
      <Reveal as="h2" className="display text-4xl md:text-6xl">
        {title}
      </Reveal>
      {children}
    </div>
  );
}
