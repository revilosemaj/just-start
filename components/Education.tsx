"use client";

import { useRef } from "react";
import { gsap, useGSAP, motion, prefersReducedMotion } from "@/lib/gsap";
import { education, skills } from "@/lib/data";
import { SectionHead } from "./ui";

export default function Education() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);

      // Education entries pop in along a small timeline.
      gsap.from(q(".edu-item"), {
        x: -40,
        opacity: 0,
        duration: motion.dur.slow,
        ease: motion.ease.big,
        stagger: 0.15,
        scrollTrigger: { trigger: q(".edu")[0], start: motion.trigger.enter, once: true },
      });

      // Skill bars fill and numbers count up, scrubbed by scroll (Palmo HUD feel).
      q<HTMLElement>(".skill").forEach((row) => {
        const bar = row.querySelector<HTMLElement>(".skill-bar")!;
        const num = row.querySelector<HTMLElement>(".skill-num")!;
        const pct = Number(row.dataset.pct);
        const obj = { v: 0 };
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: pct / 100,
            transformOrigin: "left",
            ease: "none",
            scrollTrigger: { trigger: row, start: "top 85%", end: "top 45%", scrub: 0.5 },
          },
        );
        gsap.to(obj, {
          v: pct,
          ease: "none",
          scrollTrigger: { trigger: row, start: "top 85%", end: "top 45%", scrub: 0.5 },
          onUpdate: () => (num.textContent = `${Math.round(obj.v)}%`),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="education" className="relative py-28 md:py-36">
      <div className="container-x flex flex-col gap-16">
        <SectionHead kicker="Learning path" title="Education & Skills" />

        <div className="grid gap-14 md:grid-cols-2">
          {/* Education */}
          <div className="edu flex flex-col gap-8">
            <h3 className="text-xs tracking-[0.3em] uppercase text-muted">Education</h3>
            <ol className="relative flex flex-col gap-8 border-l border-fg/10 pl-8">
              {education.map((e) => (
                <li key={e.title} className="edu-item relative">
                  <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full bg-teal shadow-[0_0_0_5px_color-mix(in_srgb,var(--teal)_20%,transparent)]" />
                  <p className="text-sm text-muted">{e.period}</p>
                  <p className="mt-1 text-lg font-bold">{e.title}</p>
                  <p className="text-fg/80">{e.subtitle}</p>
                  <p className="text-sm text-muted">{e.school}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-8">
            <h3 className="text-xs tracking-[0.3em] uppercase text-muted">Technical skills</h3>
            <ul className="flex flex-col gap-6">
              {skills.map((s) => (
                <li key={s.label} className="skill flex flex-col gap-2" data-pct={s.pct}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{s.label}</span>
                    <span className="skill-num tabular-nums font-bold text-primary">0%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-fg/10">
                    <span className="skill-bar block h-full w-full rounded-full bg-gradient-to-r from-[#644a40] via-[#c4956a] to-primary" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
