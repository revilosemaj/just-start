"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, motion, prefersReducedMotion } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis";
import { nav, site } from "@/lib/data";
import { useAppState } from "./AppState";
import { SwapText } from "./ui";

export default function Header() {
  const { ready } = useAppState();
  const header = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Restore theme preference.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("theme");
    } catch {}
    if (saved !== "light") return;
    document.documentElement.dataset.theme = "light";
    const id = requestAnimationFrame(() => setTheme("light"));
    return () => cancelAnimationFrame(id);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  // Entrance after the preloader.
  useGSAP(
    () => {
      if (!ready) return;
      if (prefersReducedMotion()) {
        gsap.set(header.current, { y: 0, opacity: 1 });
        return;
      }
      gsap.fromTo(
        header.current,
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: motion.dur.slow, ease: motion.ease.big, delay: 0.2 },
      );
    },
    { dependencies: [ready] },
  );

  // Solid, blurred bar once the page has scrolled past the top.
  useEffect(() => {
    const el = header.current!;
    const update = () => {
      el.dataset.scrolled = window.scrollY > 24 ? "true" : "false";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Header adapts its colours when it passes over an "alt" (light) section.
  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>("[data-section-theme='light']");
    const set = (v: "light" | "dark") => {
      if (header.current) header.current.dataset.over = v;
    };
    sections.forEach((sec) =>
      ScrollTrigger.create({
        trigger: sec,
        start: "top 48px",
        end: "bottom 48px",
        // Refresh after the pinned portfolio so the pin spacer is accounted for.
        refreshPriority: -1,
        onEnter: () => set("light"),
        onEnterBack: () => set("light"),
        onLeave: () => set("dark"),
        onLeaveBack: () => set("dark"),
      }),
    );
  });

  // Curved full-screen menu.
  useGSAP(
    () => {
      const el = overlay.current!;
      const links = el.querySelectorAll(".menu-link");
      if (open) {
        lenisRef.current?.stop();
        gsap.timeline()
          .set(el, { pointerEvents: "auto" })
          .fromTo(
            el,
            // y: 0 neutralises the px offset GSAP folds in from the SSR inline translateY(-100%).
            { y: 0, yPercent: -100, borderBottomLeftRadius: "50% 30vh", borderBottomRightRadius: "50% 30vh" },
            { y: 0, yPercent: 0, borderBottomLeftRadius: "0% 0vh", borderBottomRightRadius: "0% 0vh", duration: 0.9, ease: motion.ease.inOut },
          )
          .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: motion.ease.enter, stagger: 0.07 }, "-=0.35");
      } else {
        lenisRef.current?.start();
        gsap.timeline()
          .to(links, { yPercent: -110, duration: 0.4, ease: "power2.in", stagger: 0.04 })
          .to(el, { y: 0, yPercent: -100, borderBottomLeftRadius: "50% 30vh", borderBottomRightRadius: "50% 30vh", duration: 0.7, ease: motion.ease.inOut }, "-=0.2")
          .set(el, { pointerEvents: "none" });
      }
    },
    { dependencies: [open], scope: overlay },
  );

  return (
    <>
      <header
        ref={header}
        data-over="dark"
        data-scrolled="false"
        className="fixed inset-x-0 top-0 z-[60] opacity-0"
      >
        <div className="container-x flex h-20 items-center justify-between">
          <a href="#top" className="hdr-fg swap-trigger font-bold tracking-widest text-lg">
            <SwapText text={site.domain} />
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hdr-fg swap-trigger text-[15px] font-medium">
                <SwapText text={n.label} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="hdr-ghost grid h-10 w-10 place-items-center rounded-xl border"
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                </svg>
              )}
            </button>
            <a href="#contact" className="hdr-pill hidden sm:inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold hover:-translate-y-0.5">
              Let&apos;s Talk <span aria-hidden>→</span>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="hdr-ghost md:hidden grid h-10 w-10 place-items-center rounded-xl border"
            >
              <span className="relative block h-3 w-4">
                <span
                  className="absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-300"
                  style={{ transform: open ? "translateY(5px) rotate(45deg)" : "none" }}
                />
                <span
                  className="absolute left-0 bottom-0 h-0.5 w-full bg-current transition-transform duration-300"
                  style={{ transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu overlay */}
      <div
        ref={overlay}
        className="fixed inset-0 z-[55] bg-[#1e1a17] text-primary pointer-events-none flex flex-col items-center justify-center gap-2"
        style={{ transform: "translateY(-100%)" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 grid place-items-center opacity-[0.06] display text-[40vw] leading-none select-none"
        >
          OJA
        </div>
        {nav.map((n) => (
          <span key={n.href} className="overflow-hidden">
            <a
              href={n.href}
              onClick={() => setOpen(false)}
              className="menu-link block display text-5xl sm:text-7xl py-1 hover:text-white transition-colors"
            >
              {n.label}
            </a>
          </span>
        ))}
        <span className="overflow-hidden mt-8">
          <a href={`mailto:${site.email}`} className="menu-link block text-sm tracking-widest text-white/60">
            {site.email}
          </a>
        </span>
      </div>
    </>
  );
}
