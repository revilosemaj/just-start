"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP, motion, prefersReducedMotion } from "@/lib/gsap";
import { testimonials } from "@/lib/data";

/**
 * "Alt" section: peach background with scalloped edges that rises over the
 * dark sections around it. The header inverts while over it.
 */
export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);

      // Parallax lift so the scalloped section overlaps the previous block.
      gsap.from(root.current, {
        y: 80,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 40%", scrub: true },
      });

      gsap.from(q(".t-title"), {
        yPercent: 110,
        duration: motion.dur.reveal,
        ease: motion.ease.enter,
        scrollTrigger: { trigger: q(".t-title")[0], start: motion.trigger.enter, once: true },
      });

      gsap.from(q(".t-card"), {
        y: 70,
        rotate: (i) => (i % 2 ? 3 : -3),
        opacity: 0,
        duration: motion.dur.reveal,
        ease: motion.ease.big,
        stagger: motion.stagger.card,
        scrollTrigger: { trigger: track.current, start: motion.trigger.enter, once: true },
      });
    },
    { scope: root },
  );

  // Arrow navigation slides the track one card at a time.
  useGSAP(
    () => {
      const t = track.current!;
      const card = t.querySelector<HTMLElement>(".t-card");
      if (!card) return;
      const gap = parseFloat(getComputedStyle(t).gap || "24");
      const step = card.offsetWidth + gap;
      const max = Math.max(0, t.scrollWidth - t.parentElement!.clientWidth);
      const x = Math.min(index * step, max);
      gsap.to(t, { x: -x, duration: 0.8, ease: motion.ease.inOut });
    },
    { dependencies: [index] },
  );

  const last = testimonials.length - 1;

  return (
    <section
      ref={root}
      id="testimonials"
      data-section-theme="light"
      className="scallop-top scallop-bottom relative z-10 my-[6vw] bg-alt text-alt-fg py-24 md:py-32"
    >
      <div className="container-x flex flex-col gap-12">
        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] tracking-[0.35em] uppercase text-alt-muted">My clients</span>
            <div className="overflow-hidden">
              <h2 className="t-title display text-4xl md:text-6xl">Testimonials</h2>
            </div>
          </div>
          <div className="flex gap-3">
            <Arrow dir="prev" disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))} />
            <Arrow dir="next" disabled={index === last} onClick={() => setIndex((i) => Math.min(last, i + 1))} />
          </div>
        </div>

        <div className="overflow-visible">
          <div ref={track} className="flex gap-6 will-change-transform">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="t-card screws relative w-[85vw] sm:w-[26rem] shrink-0 rounded-3xl border-2 border-alt-fg/70 bg-alt p-8 pt-12 flex flex-col gap-6"
              >
                <span className="screw" aria-hidden />
                <span aria-hidden className="display text-6xl leading-none text-alt-fg/80 -mb-4">
                  “
                </span>
                <blockquote className="leading-relaxed text-alt-fg/85">{t.quote}</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-alt-fg/15 pt-5">
                  <span className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-alt-fg/60">
                    <Image src={t.avatar} alt={`${t.name} profile`} fill sizes="44px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block font-bold">{t.name}</span>
                    <span className="block text-sm text-alt-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="grid h-12 w-12 place-items-center rounded-full bg-alt-fg text-alt transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "prev" ? <path d="M19 12H5M12 19l-7-7 7-7" /> : <path d="M5 12h14M12 5l7 7-7 7" />}
      </svg>
    </button>
  );
}
