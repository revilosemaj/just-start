"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, SplitText, motion, prefersReducedMotion } from "@/lib/gsap";
import { hero, site } from "@/lib/data";
import { useAppState } from "./AppState";

export default function Hero() {
  const { ready } = useAppState();
  const root = useRef<HTMLElement>(null);
  const tiltWrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [gyro, setGyro] = useState(false);
  const [showToast, setShowToast] = useState(true);

  // Load timeline: plays once the preloader hands over.
  useGSAP(
    () => {
      if (!ready) return;
      const q = gsap.utils.selector(root);
      if (prefersReducedMotion()) {
        gsap.set(q(".fx"), { clearProps: "all", opacity: 1 });
        return;
      }

      const para = SplitText.create(q(".hero-body")[0], { type: "lines", mask: "lines" });
      const path = q<SVGPathElement>(".underline path")[0];
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      const tl = gsap.timeline({ defaults: { ease: motion.ease.enter } });
      tl.from(q(".kicker"), { opacity: 0, x: -20, duration: motion.dur.base }, 0)
        .from(q(".hero-line"), { yPercent: 110, rotate: 3, duration: motion.dur.reveal, stagger: motion.stagger.line }, 0.1)
        .from(q(".hero-tagline"), { yPercent: 110, duration: motion.dur.slow }, 0.45)
        .to(path, { strokeDashoffset: 0, duration: motion.dur.slow, ease: "power2.out" }, 0.9)
        .from(para.lines, { yPercent: 110, duration: motion.dur.slow, stagger: 0.06 }, 0.6)
        .from(q(".social"), { scale: 0, opacity: 0, duration: motion.dur.base, ease: "back.out(2)", stagger: 0.08, clearProps: "all" }, 1)
        .from(card.current, { y: 80, rotate: -8, opacity: 0, duration: motion.dur.reveal, ease: motion.ease.big }, 0.2)
        .from(q(".frame"), { scale: 0.8, opacity: 0, rotate: 0, duration: motion.dur.reveal, ease: motion.ease.big, stagger: 0.1 }, 0.4)
        .from(q(".scroll-hint"), { opacity: 0, y: 10, duration: motion.dur.base }, 1.3);

      // Idle float on the portrait.
      gsap.to(card.current, { y: -10, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.6 });
      // Scroll hint loop.
      gsap.to(q(".scroll-hint-bar"), { scaleY: 0, transformOrigin: "bottom", duration: 1.2, ease: "power2.inOut", repeat: -1, yoyo: true });

      // Hero parallax on scroll: content drifts slower than the page.
      gsap.to(q(".hero-copy"), { y: -60, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(tiltWrap.current, { y: 40, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    },
    { dependencies: [ready], scope: root },
  );

  // Pointer tilt (desktop) and gyroscope tilt (mobile).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wrap = tiltWrap.current!;
    const rx = gsap.quickTo(wrap, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(wrap, "rotationY", { duration: 0.6, ease: "power3.out" });
    gsap.set(wrap, { transformPerspective: 900 });

    const onMove = (e: PointerEvent) => {
      const r = root.current!.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * 18);
      rx(-py * 14);
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      setGyro(true);
      ry(gsap.utils.clamp(-20, 20, e.gamma * 0.6));
      rx(gsap.utils.clamp(-20, 20, (e.beta - 45) * -0.4));
    };

    const section = root.current!;
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    if ("DeviceOrientationEvent" in window) window.addEventListener("deviceorientation", onOrient);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

  return (
    <section ref={root} id="top" className="relative min-h-screen grid-bg overflow-hidden flex items-center pt-24 pb-16">
      {/* soft glow */}
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-[120px]" />

      <div className="container-x grid gap-14 md:grid-cols-[1fr_1.2fr] items-center">
        {/* Portrait */}
        <div ref={tiltWrap} className="relative mx-auto w-[min(78vw,20rem)] md:w-[22rem] aspect-square" style={{ transformStyle: "preserve-3d" }}>
          <div className="frame absolute inset-0 rounded-3xl border border-teal/40 rotate-[-4deg]" style={{ transform: "translateZ(-30px) rotate(-4deg)" }} />
          <div className="frame absolute inset-0 rounded-3xl border border-primary/30 rotate-[3deg]" style={{ transform: "translateZ(-15px) rotate(3deg)" }} />
          <div ref={card} className="relative h-full w-full overflow-hidden rounded-3xl bg-card border border-line shadow-2xl" style={{ transform: "translateZ(20px)" }}>
            <Image src={hero.portrait} alt={site.name} fill priority sizes="(min-width: 768px) 22rem, 78vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
          </div>
        </div>

        {/* Copy */}
        <div className="hero-copy flex flex-col gap-5">
          <span className="kicker fx">{hero.kicker}</span>

          <h1 className="display text-[13vw] sm:text-6xl md:text-7xl lg:text-[5.2rem]">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-line fx block">
                {hero.firstName} <span className="grad-text">{hero.lastName}</span>
              </span>
            </span>
          </h1>

          <div className="overflow-hidden">
            <p className="hero-tagline fx relative inline-block text-lg md:text-xl font-semibold text-primary pb-2">
              {hero.tagline}
              <svg className="underline absolute left-0 -bottom-1 w-full h-3" viewBox="0 0 300 12" preserveAspectRatio="none" fill="none">
                <path d="M2 8 C 60 2, 120 11, 180 6 S 260 3, 298 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </p>
          </div>

          <p className="hero-body fx max-w-xl text-muted leading-relaxed">{hero.body}</p>

          <div className="flex items-center gap-3 pt-2">
            <Social href={site.github} label="GitHub">
              <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
            </Social>
            <Social href={site.linkedin} label="LinkedIn">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" />
            </Social>
            <Social href={`mailto:${site.email}`} label="Email">
              <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2 0 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </Social>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint fx absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-muted">
        Scroll
        <span className="scroll-hint-bar block h-10 w-px bg-primary" />
      </div>

      {/* Gyro toast (Palmo-style) */}
      {showToast && (
        <div className="hidden md:flex absolute left-6 bottom-6 items-center gap-3 rounded-xl border border-line bg-card/90 backdrop-blur px-4 py-2.5 text-xs text-muted">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-primary/15 text-primary">◎</span>
          <span className="font-semibold text-fg tracking-wider">{gyro ? "GYRO ACTIVE" : "TILT"}</span>
          <span className="text-line">|</span>
          <span>{gyro ? "Move your phone to tilt the card" : "Move your mouse, or open on mobile for gyro tilt"}</span>
          <button onClick={() => setShowToast(false)} aria-label="Dismiss" className="ml-2 opacity-60 hover:opacity-100">
            ✕
          </button>
        </div>
      )}
    </section>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={label}
      className="social grid h-11 w-11 place-items-center rounded-full border border-fg/10 bg-fg/5 text-fg transition-[translate,background-color,color,border-color] duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-fg hover:border-primary"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        {children}
      </svg>
    </a>
  );
}
