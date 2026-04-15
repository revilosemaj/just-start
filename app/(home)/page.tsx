"use client";

import Nav from "@/components/Nav";
import FullScreenMenu from "@/components/FullScreenMenu";
import { useState, useEffect, useRef } from "react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Footer from "@/components/Footer";
import Main from "@/components/page-layouts/Main";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const servicesRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

      // Walk sections top-to-bottom; the last one whose top edge has passed
      // 40% down the viewport is the "active" section. This works reliably
      // regardless of section height.
      const ORDER = ["hero", "services", "projects", "experience", "testimonials", "education", "contact"];
      const threshold = window.innerHeight * 0.4;
      let current = "hero";
      for (const id of ORDER) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    const refs = [servicesRef, projectsRef, experienceRef, testimonialsRef, educationRef, contactRef];
    refs.forEach((ref) => { if (ref.current) observer.observe(ref.current); });
    return () => refs.forEach((ref) => { if (ref.current) observer.unobserve(ref.current); });
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <Nav
        scrollToSection={scrollToSection}
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        activeSection={activeSection}
      />
      <FullScreenMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />
      <Main
        servicesRef={servicesRef as React.RefObject<HTMLDivElement>}
        projectsRef={projectsRef as React.RefObject<HTMLDivElement>}
        experienceRef={experienceRef as React.RefObject<HTMLDivElement>}
        testimonialsRef={testimonialsRef as React.RefObject<HTMLDivElement>}
        educationRef={educationRef as React.RefObject<HTMLDivElement>}
        contactRef={contactRef as React.RefObject<HTMLDivElement>}
        visibleSections={visibleSections}
      />
      <Footer />
      <ScrollToTopButton
        isRocketLaunching={false}
        scrollToTop={() => scrollToSection("hero")}
        showScrollTop={showScrollTop}
      />
    </>
  );
}
