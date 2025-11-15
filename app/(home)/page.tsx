"use client";

import Nav from "@/components/Nav";
import FullScreenMenu from "@/components/FullScreenMenu";
import { useState, useEffect, useRef } from "react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Footer from "@/components/Footer";
import Main from "@/components/PageSections/Main";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isRocketLaunching, setIsRocketLaunching] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [visibleWords, setVisibleWords] = useState(0);

  // Word-by-word animation effect
  useEffect(() => {
    if (isHeroHovered) {
      setVisibleWords(0);
      const words = ["Hi!", "I'm", "Oliver.", "How's", "it", "going!"];
      const timeouts: NodeJS.Timeout[] = [];

      // Reset and start animation
      const initialTimeout = setTimeout(() => {
        setVisibleWords(1); // Show first word immediately after a brief delay
      }, 100);
      timeouts.push(initialTimeout);

      // Show remaining words sequentially
      words.slice(1).forEach((_, index) => {
        const timeout = setTimeout(() => {
          setVisibleWords(index + 2); // +2 because index starts at 0 and we already showed word 1
        }, 100 + (index + 1) * 200); // 200ms delay between each word
        timeouts.push(timeout);
      });

      return () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
      };
    } else {
      setVisibleWords(0);
    }
  }, [isHeroHovered]);

  // Refs for each section
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    const sections = [
      aboutRef.current,
      projectsRef.current,
      contactRef.current,
    ].filter(Boolean) as HTMLElement[];

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    if (isRocketLaunching) return;

    setIsRocketLaunching(true);

    setTimeout(() => {
      scrollToSection("hero");
    }, 800);

    setTimeout(() => {
      setIsRocketLaunching(false);
    }, 1500);
  };

  return (
    <>
      <Nav
        scrollToSection={scrollToSection}
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        isRocketLaunching={isRocketLaunching}
      />

      <FullScreenMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />

      <Main
        setIsHeroHovered={setIsHeroHovered}
        isHeroHovered={isHeroHovered}
        visibleWords={visibleWords}
        aboutRef={aboutRef as React.RefObject<HTMLDivElement>}
        visibleSections={visibleSections}
        projectsRef={projectsRef as React.RefObject<HTMLDivElement>}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        contactRef={contactRef as React.RefObject<HTMLDivElement>}
      />

      <Footer />

      <ScrollToTopButton
        isRocketLaunching={isRocketLaunching}
        scrollToTop={scrollToTop}
        showScrollTop={showScrollTop}
      />
    </>
  );
}
