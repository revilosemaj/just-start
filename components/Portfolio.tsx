"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, motion, DESKTOP, NO_REDUCED } from "@/lib/gsap";
import { projects } from "@/lib/data";
import { Kicker, Reveal } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Pinned horizontal scroller on desktop (the Palmo "Our Story" pattern),
 * a plain vertical grid on smaller screens and for reduced motion.
 */
export default function Portfolio() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(`${DESKTOP} and ${NO_REDUCED}`, () => {
        const t = track.current!;
        const bars = q<HTMLElement>(".hud-bar");
        const distance = () => t.scrollWidth - window.innerWidth + 96;

        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: stage.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.round(self.progress * (projects.length - 1));
              if (counter.current) counter.current.textContent = pad(i + 1);
              bars.forEach((b, bi) => b.classList.toggle("bg-primary", bi <= i));
              bars.forEach((b, bi) => b.classList.toggle("bg-fg/15", bi > i));
            },
          },
        });

        // Cards drift in from the right as the track first enters.
        gsap.from(q(".project-card"), {
          x: 120,
          opacity: 0,
          rotate: 3,
          duration: motion.dur.reveal,
          ease: motion.ease.big,
          stagger: 0.08,
          scrollTrigger: { trigger: stage.current, start: "top 70%", once: true },
        });

        return () => tween.kill();
      });

      mm.add(`(max-width: 1023px), ${"(prefers-reduced-motion: reduce)"}`, () => {
        gsap.from(q(".project-card"), {
          y: 60,
          opacity: 0,
          duration: motion.dur.slow,
          ease: motion.ease.enter,
          stagger: 0.1,
          scrollTrigger: { trigger: track.current, start: motion.trigger.enter, once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="portfolio" className="relative">
      <div ref={stage} className="lg:h-screen lg:flex lg:flex-col lg:justify-center py-24 lg:py-0 overflow-hidden">
        <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <Kicker>My works</Kicker>
            <Reveal as="h2" className="display text-4xl md:text-6xl">
              Featured Portfolios
            </Reveal>
          </div>

          {/* HUD: counter + progress bars (desktop only) */}
          <div className="hidden lg:flex flex-col items-end gap-3">
            <div className="display text-2xl tabular-nums">
              <span ref={counter}>01</span>
              <span className="text-muted"> / {pad(projects.length)}</span>
            </div>
            <div className="flex gap-1.5">
              {projects.map((p, i) => (
                <span key={p.title} className={`hud-bar h-1 w-8 rounded-full transition-colors duration-300 ${i === 0 ? "bg-primary" : "bg-fg/15"}`} />
              ))}
            </div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted">Scroll to explore</p>
          </div>
        </div>

        <div
          ref={track}
          className="mt-12 grid gap-6 px-6 md:grid-cols-2 lg:flex lg:flex-nowrap lg:gap-8 lg:pl-[max(1.5rem,calc((100vw-76rem)/2))] lg:pr-24 will-change-transform"
        >
          {projects.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="project-card card group relative flex flex-col overflow-hidden lg:w-[34vw] lg:min-w-[26rem] lg:shrink-0"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-fg/5">
                <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="(min-width:1024px) 34vw, 90vw" className="shot object-cover object-top" />
                <span className="visit absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-fg">
                  Visit Site <span aria-hidden>↗</span>
                </span>
                <span className="absolute left-4 top-4 display text-4xl text-white/70 mix-blend-difference">{pad(i + 1)}</span>
              </div>
              <div className="flex flex-col gap-3 p-6">
                <span className="text-[11px] tracking-[0.25em] uppercase text-teal">{p.category}</span>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
