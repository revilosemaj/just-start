"use client";

import { useRef } from "react";
import { gsap, useGSAP, motion, prefersReducedMotion } from "@/lib/gsap";
import { experience } from "@/lib/data";
import { SectionHead } from "./ui";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);

      // The timeline line draws itself as the section scrolls.
      gsap.fromTo(
        q(".tl-line"),
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: { trigger: q(".tl")[0], start: "top 70%", end: "bottom 70%", scrub: 0.6 },
        },
      );

      q<HTMLElement>(".tl-item").forEach((item) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 72%", once: true } });
        tl.from(item.querySelector(".tl-dot"), { scale: 0, duration: 0.5, ease: "back.out(3)" })
          .from(item.querySelector(".card"), { x: 60, opacity: 0, duration: motion.dur.reveal, ease: motion.ease.big }, "-=0.3")
          .from(item.querySelectorAll(".tag"), { y: 10, opacity: 0, duration: 0.4, stagger: 0.03, ease: motion.ease.enter }, "-=0.7");
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" className="relative py-28 md:py-36 grid-bg">
      <div className="container-x flex flex-col gap-16">
        <SectionHead kicker="Career path" title="Work Experience" />

        <div className="tl relative mx-auto w-full max-w-3xl pl-10 md:pl-14">
          {/* Dots sit 8px in and are 14px wide, so a 2px line at 14px runs through their centre. */}
          <span className="absolute left-[14px] top-7 bottom-7 w-0.5 bg-fg/10" aria-hidden />
          <span className="tl-line absolute left-[14px] top-7 bottom-7 w-0.5 bg-teal" aria-hidden />

          <ol className="flex flex-col gap-8">
            {experience.map((job) => (
              <li key={job.role + job.company} className="tl-item relative">
                <span className="tl-dot absolute -left-8 md:-left-12 top-7 h-3.5 w-3.5 rounded-full bg-teal shadow-[0_0_0_6px_color-mix(in_srgb,var(--teal)_20%,transparent)]" />
                <article className="card p-7 md:p-8 flex flex-col gap-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold leading-snug">{job.role}</h3>
                      <p className="text-muted">{job.company}</p>
                    </div>
                    <span className="tag whitespace-nowrap self-start !text-primary !border-primary/30 !bg-primary/10">{job.period}</span>
                  </div>
                  <p className="text-muted leading-relaxed">{job.body}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {job.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
