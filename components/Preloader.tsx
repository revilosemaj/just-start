"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, motion, prefersReducedMotion } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis";
import { useAppState } from "./AppState";
import { site } from "@/lib/data";

const DIGITS = Array.from({ length: 10 }, (_, i) => i);

/**
 * Full-screen preloader: rolling 0→100 counter, logo that fills from the
 * bottom, then the panel slides away and hands control to the hero.
 */
export default function Preloader() {
  const { setReady } = useAppState();
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  // Cycle the document title with the site's service names (Palmo does this with verbs).
  useEffect(() => {
    let i = 0;
    const base = `${site.domain} | `;
    const id = window.setInterval(() => {
      i = (i + 1) % site.titleVerbs.length;
      document.title = base + site.titleVerbs[i];
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const el = root.current!;
      const cols = el.querySelectorAll<HTMLElement>(".digit-col > span");
      const setNumber = (n: number) => {
        const s = String(Math.round(n)).padStart(3, "0");
        cols.forEach((col, i) => {
          col.style.transform = `translateY(-${Number(s[i])}em)`;
        });
      };

      if (prefersReducedMotion()) {
        setNumber(100);
        setReady(true);
        setDone(true);
        return;
      }

      lenisRef.current?.stop();
      const counter = { v: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          lenisRef.current?.start();
          setDone(true);
        },
      });

      tl.to(counter, { v: 100, duration: 1.9, ease: "power3.inOut", onUpdate: () => setNumber(counter.v) }, 0)
        .fromTo(".logo-fill", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.9, ease: "power3.inOut" }, 0)
        .to(".loader-content", { yPercent: -30, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.15")
        .add(() => setReady(true), "-=0.1")
        .to(el, { yPercent: -100, duration: motion.dur.slow, ease: motion.ease.inOut }, "-=0.35")
        .to(el, { borderBottomLeftRadius: "50% 30vh", borderBottomRightRadius: "50% 30vh", duration: motion.dur.slow, ease: motion.ease.inOut }, "<");
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[100] bg-[#1e1a17] text-primary flex items-center justify-center overflow-hidden"
    >
      <div className="loader-content flex flex-col items-center gap-6">
        <div className="relative display text-[18vw] md:text-[9rem] leading-none select-none">
          <span className="text-white/10">OJA.</span>
          <span className="logo-fill absolute inset-0 grad-text">OJA.</span>
        </div>
        <p className="text-xs tracking-[0.4em] uppercase text-white/40">{site.name}</p>
      </div>

      <div className="absolute left-6 bottom-6 md:left-10 md:bottom-8 flex items-end gap-1 display text-[18vw] md:text-[8rem] leading-none text-primary">
        {[0, 1, 2].map((c) => (
          <span key={c} className="digit-col">
            <span>
              {DIGITS.map((d) => (
                <span key={d} className="block h-[1em]">
                  {d}
                </span>
              ))}
            </span>
          </span>
        ))}
        <span className="text-[0.25em] mb-[0.2em] text-white/50">%</span>
      </div>
    </div>
  );
}
