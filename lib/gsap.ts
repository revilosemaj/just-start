"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Motion tokens shared by every section. */
export const motion = {
  dur: { fast: 0.3, base: 0.6, slow: 1, reveal: 1.2 },
  ease: { enter: "power3.out", move: "power2.inOut", big: "expo.out", inOut: "expo.inOut" },
  stagger: { char: 0.05, line: 0.08, card: 0.12 },
  trigger: { enter: "top 80%" },
};

export const REDUCED = "(prefers-reduced-motion: reduce)";
export const NO_REDUCED = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 1024px)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(REDUCED).matches;

/**
 * Masked line reveal. Splits the element into lines (each wrapped in an
 * overflow-hidden mask) and slides them up. Returns the tween so callers can
 * add it to a timeline.
 */
export function lineReveal(
  el: Element,
  opts: { delay?: number; scroll?: boolean; stagger?: number } = {},
) {
  const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
  const tween = gsap.from(split.lines, {
    yPercent: 110,
    rotate: 2,
    duration: motion.dur.reveal,
    ease: motion.ease.enter,
    stagger: opts.stagger ?? motion.stagger.line,
    delay: opts.delay ?? 0,
    ...(opts.scroll === false
      ? {}
      : { scrollTrigger: { trigger: el, start: motion.trigger.enter, once: true } }),
  });
  return { split, tween };
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
