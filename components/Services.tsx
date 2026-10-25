"use client";

import { useRef } from "react";
import { gsap, useGSAP, motion, prefersReducedMotion } from "@/lib/gsap";
import { services } from "@/lib/data";
import { Kicker, Reveal, SwapText } from "./ui";

const icons: Record<string, React.ReactNode> = {
  brush: <path d="M3 21c3 0 5-2 5-5 0-1.5-1-2-2-2s-2 .5-2 2c0 1.3-.5 2.5-1 5zM14.5 3.5l6 6L11 19l-6-6z" />,
  terminal: <path d="M4 17l6-5-6-5M12 19h8M3 3h18v18H3z" />,
  globe: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />,
};

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);

      // Word ticker inside the heading: cycles the three service names.
      // One looping proxy tween drives every frame, so the resting state is
      // always "one word at 0, the rest parked below" — including on repeat.
      const words = q(".ticker-word");
      const box = q(".ticker-box")[0];
      const colors = ["var(--primary)", "var(--teal)", "#e5542e"];
      const fgs = ["var(--primary-fg)", "#081a1b", "#fff"];
      const n = words.length;
      const hold = 1.8;
      const move = 0.6;
      const cycle = hold + move;
      const ease = gsap.parseEase(motion.ease.move);
      const state = { t: 0 };
      let shown = 0;
      gsap.set(words, { yPercent: 110, visibility: "visible" });
      gsap.set(words[0], { yPercent: 0 });
      gsap.to(state, {
        t: n,
        duration: n * cycle,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          const idx = Math.floor(state.t) % n;
          const next = (idx + 1) % n;
          const frac = state.t - Math.floor(state.t);
          const raw = Math.max(0, (frac * cycle - hold) / move);
          const p = ease(Math.min(1, raw));
          words.forEach((w, i) => gsap.set(w, { yPercent: i === idx ? -110 * p : i === next ? 110 * (1 - p) : 110 }));
          const target = raw > 0 ? next : idx;
          if (target !== shown) {
            shown = target;
            gsap.set(box, { backgroundColor: colors[shown], color: fgs[shown] });
          }
        },
      });

      // Cards rise in, slightly tilted.
      gsap.from(q(".service-card"), {
        y: 70,
        rotate: (i) => (i % 2 ? 4 : -4),
        opacity: 0,
        duration: motion.dur.reveal,
        ease: motion.ease.big,
        stagger: motion.stagger.card,
        clearProps: "transform",
        scrollTrigger: { trigger: q(".cards")[0], start: motion.trigger.enter, once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="relative py-28 md:py-36">
      <div className="container-x flex flex-col gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <Kicker>My services</Kicker>
          <Reveal as="h2" className="display text-4xl md:text-6xl">
            Specialized In
          </Reveal>
          <div className="ticker-box mt-2 inline-flex h-[2.6em] items-center overflow-hidden rounded-xl bg-primary px-5 text-primary-fg display text-2xl md:text-4xl transition-[background-color,color] duration-[600ms]">
            <span className="relative block h-[1.2em] overflow-hidden text-left">
              {/* Invisible in-flow copy of the longest title sizes the slot. */}
              <span aria-hidden className="invisible block whitespace-nowrap leading-[1.2em]">
                {services.reduce((a, b) => (b.title.length > a.length ? b.title : a), "")}
              </span>
              {services.map((s) => (
                <span key={s.title} className="ticker-word absolute inset-0 whitespace-nowrap leading-[1.2em]">
                  {s.title}
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className="cards grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="card service-card swap-trigger relative overflow-hidden p-8 flex flex-col gap-5">
              <span aria-hidden className="deco absolute -right-6 -bottom-6 display text-[7rem] leading-none opacity-0 text-primary-fg/10 select-none">
                {s.title.slice(0, 2)}
              </span>
              <span className="icon-box grid h-12 w-12 place-items-center rounded-xl border border-line bg-fg/5 text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {icons[s.icon]}
                </svg>
              </span>
              <h3 className="text-xl font-bold">
                <SwapText text={s.title} />
              </h3>
              <p className="muted-text text-muted leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
