"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP, motion, prefersReducedMotion } from "@/lib/gsap";
import { footer, site, nav } from "@/lib/data";

/**
 * Footer with a giant wordmark that rises through a mask, and a pointer-driven
 * particle canvas (pointer-events: none) for a little play, like Palmo's footer.
 */
export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap.from(q(".wordmark"), {
        yPercent: 60,
        opacity: 0,
        duration: 1.4,
        ease: motion.ease.big,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
      gsap.from(q(".foot-item"), {
        y: 20,
        opacity: 0,
        duration: motion.dur.base,
        ease: motion.ease.enter,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });
    },
    { scope: root },
  );

  // Particle field: peach dots drift up; pointer movement spawns more near the cursor.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const el = root.current!;
    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number };
    let parts: P[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;
    let visible = false;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = el.clientWidth;
      h = el.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = (x: number, y: number, n = 1) => {
      for (let i = 0; i < n; i++)
        parts.push({ x, y, vx: (Math.random() - 0.5) * 0.8, vy: -0.4 - Math.random() * 0.8, r: 1 + Math.random() * 2.5, life: 1 });
      if (parts.length > 260) parts = parts.slice(-260);
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      if (Math.random() < 0.35) spawn(Math.random() * w, h + 4);
      const color = getComputedStyle(el).getPropertyValue("--primary").trim() || "#ffe0c2";
      ctx.fillStyle = color;
      parts = parts.filter((p) => p.life > 0 && p.y > -10);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.004;
        ctx.globalAlpha = Math.max(0, p.life) * 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      spawn(e.clientX - r.left, e.clientY - r.top, 2);
    };
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0.05 });

    resize();
    io.observe(el);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line pt-20 pb-8">
      <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />

      <div className="container-x relative flex flex-col gap-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="foot-item flex flex-col gap-3">
            <span className="text-xs tracking-[0.35em] uppercase text-primary">{site.domain}</span>
            <p className="max-w-xs text-muted">{site.description}</p>
          </div>
          <nav className="foot-item flex flex-wrap gap-6 text-sm text-muted">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-primary transition-colors">
                {n.label}
              </a>
            ))}
            <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              LinkedIn
            </a>
          </nav>
        </div>

        <div className="overflow-hidden">
          <div className="wordmark display text-center text-[24vw] leading-[0.85] text-primary/90 select-none">OJACO</div>
        </div>

        <div className="foot-item flex flex-col gap-2 rounded-xl bg-fg/5 px-6 py-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>{footer.copyright}</span>
          <span>{footer.built}</span>
        </div>
      </div>
    </footer>
  );
}
