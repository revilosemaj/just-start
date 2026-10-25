"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { lenisRef, scrollDuration } from "@/lib/lenis";

export default function ScrollTop() {
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    let shown = false;
    gsap.set(el, { scale: 0, opacity: 0 });
    // Plain scroll listener: a ScrollTrigger range ends at max scroll, which
    // would hide the button at the very bottom of the page.
    const update = () => {
      const next = window.scrollY > window.innerHeight * 0.6;
      if (next === shown) return;
      shown = next;
      gsap.to(el, {
        scale: next ? 1 : 0,
        opacity: next ? 1 : 0,
        duration: 0.4,
        ease: "back.out(1.7)",
        clearProps: next ? "translate" : "",
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  });

  return (
    <button
      ref={ref}
      aria-label="Back to top"
      onClick={() => (lenisRef.current ? lenisRef.current.scrollTo(0, { duration: scrollDuration(window.scrollY) }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="fixed right-6 bottom-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-fg shadow-lg transition-[translate] hover:-translate-y-1"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
