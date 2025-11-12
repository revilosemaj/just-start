"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

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
      // Show button when user scrolls down more than 300px
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
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

  // Intersection Observer for scroll animations
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

    // Observe all sections
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
      setIsMenuOpen(false); // Close menu on mobile after clicking
    }
  };

  const scrollToTop = () => {
    if (isRocketLaunching) return; // Prevent multiple clicks

    setIsRocketLaunching(true);

    // Use scrollToSection which already works in the app
    setTimeout(() => {
      scrollToSection("hero");
    }, 800);

    setTimeout(() => {
      setIsRocketLaunching(false);
    }, 1500);
  };

  return (
    <>
      {/* Transparent Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* OJA Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl sm:text-2xl font-bold text-white hover:text-[#00ADB5] transition-colors"
          >
            OJA
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="group relative px-4 py-2 text-white transition-colors font-medium text-sm lg:text-base overflow-hidden"
            >
              <span className="relative z-10">About</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00ADB5] to-[#8a2be2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="group relative px-4 py-2 text-white transition-colors font-medium text-sm lg:text-base overflow-hidden"
            >
              <span className="relative z-10">Projects</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00ADB5] to-[#8a2be2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="group relative px-4 py-2 text-white transition-colors font-medium text-sm lg:text-base overflow-hidden"
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00ADB5] to-[#8a2be2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden relative z-50 text-white hover:text-[#00ADB5] transition-colors ${
              isMenuOpen ? "text-[#00ADB5]" : ""
            }`}
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                isMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Animated Backdrop */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0f] to-[#1a0033] backdrop-blur-md transition-opacity duration-500 ${
            isMenuOpen ? "opacity-95" : "opacity-0"
          }`}
        >
          {/* Animated Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ADB5]/20 rounded-full blur-3xl transition-all duration-700 ${
                isMenuOpen ? "scale-100 opacity-50" : "scale-50 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            />
            <div
              className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8a2be2]/20 rounded-full blur-3xl transition-all duration-700 ${
                isMenuOpen ? "scale-100 opacity-50" : "scale-50 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            />
          </div>
        </div>

        {/* Menu Content */}
        <div
          className={`relative z-10 h-full flex flex-col items-center justify-center px-6 transition-all duration-500 ${
            isMenuOpen ? "translate-y-0" : "translate-y-8"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`absolute top-6 right-6 text-white hover:text-[#00ADB5] transition-all duration-300 ${
              isMenuOpen
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 rotate-90 scale-0"
            }`}
            aria-label="Close menu"
            style={{ transitionDelay: isMenuOpen ? "400ms" : "0ms" }}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu Items */}
          <nav className="flex flex-col items-center space-y-8">
            <button
              onClick={() => scrollToSection("about")}
              className={`text-4xl sm:text-5xl font-bold text-white hover:text-[#00ADB5] transition-all duration-300 relative group ${
                isMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: isMenuOpen ? "300ms" : "0ms" }}
            >
              <span className="relative z-10">About</span>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#00ADB5] group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => scrollToSection("projects")}
              className={`text-4xl sm:text-5xl font-bold text-white hover:text-[#00ADB5] transition-all duration-300 relative group ${
                isMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: isMenuOpen ? "400ms" : "0ms" }}
            >
              <span className="relative z-10">Projects</span>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#00ADB5] group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className={`text-4xl sm:text-5xl font-bold text-white hover:text-[#00ADB5] transition-all duration-300 relative group ${
                isMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: isMenuOpen ? "500ms" : "0ms" }}
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#00ADB5] group-hover:w-full transition-all duration-300" />
            </button>
          </nav>
        </div>
      </div>

      <main className="relative">
        {/* Hero section */}
        <section
          id="hero"
          className="sticky top-0 h-screen flex items-center justify-center cosmic-bg"
        >
          {/* <div className="w-full h-full flex justify-center items-center relative z-10">
            <div className="flex-col items-center w-[41rem] justify-center bg-black text-center">
              <h1 className="text-7xl font-extrabold text-white mt-4">
                Oliver James Aco
              </h1>
              <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 dark:bg-white" />
              <p className="text-4xl mb-5 font-extrabold text-[#00ADB5]">
                Web Developer | React Developer
              </p>

              <button className="bg-white px-8 py-3 rounded-full flex m-auto mb-4 text-black hover:bg-[#00ADB5] hover:text-white">
                Download CV
              </button>
            </div>
          </div> */}
          <div className="aura-container w-full h-full flex justify-center items-center relative z-10 px-4">
            <div className="relative w-full max-w-[20rem] sm:max-w-[28rem] md:max-w-[32rem] lg:max-w-[38rem]">
              <div
                onMouseEnter={() => setIsHeroHovered(true)}
                onMouseLeave={() => setIsHeroHovered(false)}
                className="relative w-full aspect-square flex justify-center items-center bg-[url(/doodles_bg.png)] bg-no-repeat bg-cover rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] overflow-hidden cursor-pointer transition-all duration-300"
              >
                <Image
                  src="/hero_img.png"
                  width={550}
                  height={550}
                  alt="hero image"
                  className={`rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] absolute bottom-[-1.4rem] z-10 w-full h-auto max-w-[90%] sm:max-w-[85%] md:max-w-[80%] transition-opacity duration-500 ${
                    isHeroHovered ? "opacity-0" : "opacity-100"
                  }`}
                />
                <Image
                  src="/hero_img2.png"
                  width={550}
                  height={550}
                  alt="hero image hover"
                  className={`rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] absolute bottom-[-1.4rem] z-10 w-full h-auto max-w-[90%] sm:max-w-[85%] md:max-w-[80%] transition-opacity duration-500 ${
                    isHeroHovered ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
              {isHeroHovered && (
                <div className="absolute top-[20%] left-[50%] -translate-x-1/2 sm:top-[25%] sm:left-[55%] sm:-translate-x-0 md:top-[30%] md:left-[30%] lg:top-[35%] lg:left-[35%] z-30 pointer-events-none w-[90%] max-w-[280px] sm:w-auto sm:max-w-none">
                  <div className="comic-bubble hero-hover-text relative bg-gradient-to-br from-[#0a0a0f] via-[#0f0a1a] to-[#1a0033] backdrop-blur-md rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 shadow-2xl border border-[#00ADB5] sm:border-2 w-full">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 md:gap-2 drop-shadow-[0_0_6px_rgba(0,173,181,0.8)] sm:drop-shadow-[0_0_8px_rgba(0,173,181,0.8)]">
                      {["Hi!", "I'm", "Oliver.", "How's", "it", "going!"].map(
                        (word, index) => (
                          <span
                            key={index}
                            className={`inline-block transition-all duration-300 ${
                              index < visibleWords
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 translate-y-2 scale-50"
                            }`}
                          >
                            {word}
                          </span>
                        )
                      )}
                    </p>
                    {/* Bubble tail pointing down-left toward head - responsive sizing */}
                    <div className="absolute top-full left-[20%] sm:left-[25%] w-0 h-0 border-l-[8px] border-r-[8px] border-t-[14px] sm:border-l-[10px] sm:border-r-[10px] sm:border-t-[16px] md:border-l-[12px] md:border-r-[12px] md:border-t-[20px] border-l-transparent border-r-transparent border-t-[#00ADB5]"></div>
                    <div className="absolute top-full left-[20%] sm:left-[25%] translate-y-[-2px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[12px] sm:border-l-[8px] sm:border-r-[8px] sm:border-t-[14px] md:border-l-[10px] md:border-r-[10px] md:border-t-[18px] border-l-transparent border-r-transparent border-t-[#0a0a0f]"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        {/* About section */}
        <section
          ref={aboutRef}
          id="about"
          className="sticky top-0 min-h-screen flex flex-col lg:flex-row items-center justify-center cosmic-bg-about text-[#00ADB5] py-20 lg:py-0"
        >
          <div className="w-full h-full flex justify-center items-center px-4 sm:px-6 lg:px-8 mb-8 lg:mb-0">
            <div
              className={`flex flex-col items-start w-full max-w-[38rem] backdrop-blur-sm bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl transition-all duration-1000 ${
                visibleSections.has("about")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-white font-extrabold transition-all duration-1000 delay-100 ${
                  visibleSections.has("about")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                <span className="bg-gradient-to-r from-white via-[#00ADB5] to-white bg-clip-text text-transparent">
                  Let&apos;s talk about me
                </span>
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-[#00ADB5] to-[#8a2be2] mb-6 rounded-full" />
              <p
                className={`mb-4 text-justify text-sm sm:text-base text-white/90 leading-relaxed transition-all duration-1000 delay-200 ${
                  visibleSections.has("about")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Hi, I’m Oliver, a Web Developer from the Philippines with over
                seven years of experience in the IT industry. Throughout my
                career, I’ve held various roles including Web Developer,
                Software Engineering Analyst, and Frontend Developer (ReactJS),
                allowing me to build a strong foundation across the full
                software development lifecycle.
              </p>
              <p
                className={`mb-4 text-justify text-sm sm:text-base text-white/90 leading-relaxed transition-all duration-1000 delay-300 ${
                  visibleSections.has("about")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                My expertise spans requirement analysis, development, testing,
                and implementation, as well as collaboration with
                cross-functional teams to deliver high-quality, user-focused
                solutions. I’m also skilled in troubleshooting, debugging, and
                enhancing web applications to improve performance and
                functionality.
              </p>
              <p
                className={`mb-4 text-justify text-sm sm:text-base text-white/90 leading-relaxed transition-all duration-1000 delay-400 ${
                  visibleSections.has("about")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                Known for my solution-oriented mindset and positive attitude, I
                approach challenges with a focus on progress and teamwork. I’m
                now seeking opportunities that align with my technical expertise
                and long-term career goals—particularly in environments that
                value innovation, continuous learning, and professional growth.
              </p>
            </div>
          </div>
          <div
            className={`w-full h-full flex justify-center items-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-500 ${
              visibleSections.has("about")
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <div className="relative w-full max-w-[20rem] sm:max-w-[28rem] md:max-w-[32rem] lg:max-w-[38rem] aspect-square rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="aboutGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "rgba(0, 173, 181, 0.2)" }}
                    />
                    <stop
                      offset="50%"
                      style={{ stopColor: "rgba(138, 43, 226, 0.15)" }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "rgba(0, 78, 146, 0.2)" }}
                    />
                  </linearGradient>
                  <radialGradient id="glowGradient">
                    <stop
                      offset="0%"
                      style={{ stopColor: "#00ADB5", stopOpacity: 0.6 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#8a2be2", stopOpacity: 0.2 }}
                    />
                  </radialGradient>
                </defs>

                {/* Background */}
                <rect width="400" height="400" fill="url(#aboutGradient)" />

                {/* Central glowing orb */}
                <circle
                  cx="200"
                  cy="200"
                  r="80"
                  fill="url(#glowGradient)"
                  opacity="0.7"
                >
                  <animate
                    attributeName="r"
                    values="80;90;80"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.7;0.9;0.7"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Inner core */}
                <circle cx="200" cy="200" r="50" fill="#00ADB5" opacity="0.4">
                  <animate
                    attributeName="opacity"
                    values="0.4;0.6;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Orbiting rings */}
                <ellipse
                  cx="200"
                  cy="200"
                  rx="120"
                  ry="50"
                  fill="none"
                  stroke="#00ADB5"
                  strokeWidth="2"
                  opacity="0.4"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 200 200;360 200 200"
                    dur="15s"
                    repeatCount="indefinite"
                  />
                </ellipse>
                <ellipse
                  cx="200"
                  cy="200"
                  rx="140"
                  ry="60"
                  fill="none"
                  stroke="#8a2be2"
                  strokeWidth="1.5"
                  opacity="0.3"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="360 200 200;0 200 200"
                    dur="20s"
                    repeatCount="indefinite"
                  />
                </ellipse>

                {/* Floating particles */}
                {[
                  { angle: 0, radius: 100 },
                  { angle: 45, radius: 110 },
                  { angle: 90, radius: 105 },
                  { angle: 135, radius: 115 },
                  { angle: 180, radius: 100 },
                  { angle: 225, radius: 110 },
                  { angle: 270, radius: 105 },
                  { angle: 315, radius: 115 },
                ].map((particle, i) => {
                  const x =
                    200 +
                    particle.radius *
                      Math.cos((particle.angle * Math.PI) / 180);
                  const y =
                    200 +
                    particle.radius *
                      Math.sin((particle.angle * Math.PI) / 180);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#00ADB5"
                      opacity="0.7"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values={`${particle.angle} 200 200;${
                          particle.angle + 360
                        } 200 200`}
                        dur={`${12 + i * 1.5}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.5;1;0.5"
                        dur={`${2 + i * 0.2}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  );
                })}

                {/* Connecting lines */}
                <line
                  x1="100"
                  y1="200"
                  x2="150"
                  y2="200"
                  stroke="#00ADB5"
                  strokeWidth="1.5"
                  opacity="0.3"
                />
                <line
                  x1="250"
                  y1="200"
                  x2="300"
                  y2="200"
                  stroke="#00ADB5"
                  strokeWidth="1.5"
                  opacity="0.3"
                />
                <line
                  x1="200"
                  y1="100"
                  x2="200"
                  y2="150"
                  stroke="#8a2be2"
                  strokeWidth="1.5"
                  opacity="0.3"
                />
                <line
                  x1="200"
                  y1="250"
                  x2="200"
                  y2="300"
                  stroke="#8a2be2"
                  strokeWidth="1.5"
                  opacity="0.3"
                />

                {/* Corner accents */}
                <circle cx="80" cy="80" r="3" fill="#00ADB5" opacity="0.5">
                  <animate
                    attributeName="opacity"
                    values="0.3;0.8;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="320" cy="80" r="3" fill="#8a2be2" opacity="0.5">
                  <animate
                    attributeName="opacity"
                    values="0.3;0.8;0.3"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="80" cy="320" r="3" fill="#8a2be2" opacity="0.5">
                  <animate
                    attributeName="opacity"
                    values="0.3;0.8;0.3"
                    dur="2.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="320" cy="320" r="3" fill="#00ADB5" opacity="0.5">
                  <animate
                    attributeName="opacity"
                    values="0.3;0.8;0.3"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
          </div>
        </section>
        {/* Project section */}
        <section
          ref={projectsRef}
          id="projects"
          className="sticky top-0 min-h-screen flex flex-col items-center justify-center cosmic-bg-projects text-white py-12 sm:py-16 lg:py-20"
        >
          <div className="w-full h-full flex justify-center items-center px-4 sm:px-6 lg:px-8 xl:px-20">
            <div className="flex flex-col items-start w-full max-w-7xl">
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#00ADB5] font-extrabold mb-6 sm:mb-8 lg:mb-10 transition-all duration-1000 ${
                  visibleSections.has("projects")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-8"
                }`}
              >
                My recent work
              </h1>
              <div
                className={`flex mb-6 sm:mb-8 lg:mb-10 transition-all duration-1000 delay-200 ${
                  visibleSections.has("projects")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-6"
                }`}
              >
                <button className="px-3 sm:px-4 py-2 text-sm sm:text-base border-white border-2 rounded-full hover:text-[#00ADB5] hover:bg-white/10 text-white bg-transparent transition-colors">
                  All
                </button>
              </div>

              {/* Image Slider */}
              <div
                className={`relative w-full transition-all duration-1000 delay-300 ${
                  visibleSections.has("projects")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {/* Slider Container */}
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                  >
                    {/* Slide 1 */}
                    <div className="min-w-full h-[20rem] sm:h-[25rem] lg:h-[30rem] relative flex items-center justify-center p-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00ADB5]/20 via-[#8a2be2]/20 to-[#004e92]/20" />
                      <div className="relative z-10 text-center">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00ADB5] to-[#8a2be2] flex items-center justify-center shadow-2xl shadow-[#00ADB5]/50">
                          <svg
                            className="w-16 h-16 sm:w-20 sm:h-20 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            />
                          </svg>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                          Web Development
                        </h3>
                        <p className="text-white/70 text-sm sm:text-base">
                          Modern & Responsive Solutions
                        </p>
                      </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="min-w-full h-[20rem] sm:h-[25rem] lg:h-[30rem] relative flex items-center justify-center p-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#8a2be2]/20 via-[#00ADB5]/20 to-[#004e92]/20" />
                      <div className="relative z-10 text-center">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#8a2be2] to-[#00ADB5] flex items-center justify-center shadow-2xl shadow-[#8a2be2]/50">
                          <svg
                            className="w-16 h-16 sm:w-20 sm:h-20 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                          React Applications
                        </h3>
                        <p className="text-white/70 text-sm sm:text-base">
                          Interactive & Dynamic Experiences
                        </p>
                      </div>
                    </div>

                    {/* Slide 3 */}
                    <div className="min-w-full h-[20rem] sm:h-[25rem] lg:h-[30rem] relative flex items-center justify-center p-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#004e92]/20 via-[#00ADB5]/20 to-[#8a2be2]/20" />
                      <div className="relative z-10 text-center">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#004e92] to-[#00ADB5] flex items-center justify-center shadow-2xl shadow-[#004e92]/50">
                          <svg
                            className="w-16 h-16 sm:w-20 sm:h-20 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                          Next.js Projects
                        </h3>
                        <p className="text-white/70 text-sm sm:text-base">
                          Fast & Scalable Solutions
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={() =>
                      setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1))
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-[#00ADB5] transition-all duration-300 flex items-center justify-center shadow-lg"
                    aria-label="Previous slide"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-[#00ADB5] transition-all duration-300 flex items-center justify-center shadow-lg"
                    aria-label="Next slide"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                          currentSlide === index
                            ? "w-8 h-2 bg-[#00ADB5]"
                            : "w-2 h-2 bg-white/40 hover:bg-white/60"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contact section */}
        <section
          ref={contactRef}
          id="contact"
          className="sticky top-0 min-h-screen flex flex-col lg:flex-row items-center justify-center cosmic-bg-contact text-[#00ADB5] py-12 sm:py-16 lg:py-0"
        >
          <div
            className={`w-full h-full flex justify-center items-center px-4 sm:px-6 lg:px-8 mb-8 lg:mb-0 transition-all duration-1000 ${
              visibleSections.has("contact")
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex flex-col items-center w-full max-w-[38rem]">
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 text-center transition-all duration-1000 delay-100 ${
                  visibleSections.has("contact")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-8"
                }`}
              >
                Got project in mind?
              </h1>
              <div
                className={`bg-transparent w-full min-h-[15rem] sm:min-h-[18rem] lg:h-[20rem] flex justify-center items-center transition-all duration-1000 delay-300 overflow-hidden relative ${
                  visibleSections.has("contact")
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}
              >
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background gradient */}
                  <defs>
                    <linearGradient
                      id="cosmicGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "rgba(0, 173, 181, 0.1)" }}
                      />
                      <stop
                        offset="50%"
                        style={{ stopColor: "rgba(138, 43, 226, 0.1)" }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "rgba(0, 78, 146, 0.1)" }}
                      />
                    </linearGradient>
                    <radialGradient id="planetGradient">
                      <stop
                        offset="0%"
                        style={{ stopColor: "#00ADB5", stopOpacity: 0.8 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#004e92", stopOpacity: 0.4 }}
                      />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Background */}
                  <rect width="400" height="300" fill="url(#cosmicGradient)" />

                  {/* Stars - fixed positions for consistency */}
                  {[
                    { x: 50, y: 40, r: 1.2, op: 0.6, dur: 2 },
                    { x: 120, y: 60, r: 0.8, op: 0.4, dur: 1.5 },
                    { x: 280, y: 50, r: 1.5, op: 0.7, dur: 2.5 },
                    { x: 350, y: 80, r: 1, op: 0.5, dur: 1.8 },
                    { x: 80, y: 120, r: 0.9, op: 0.6, dur: 2.2 },
                    { x: 320, y: 140, r: 1.3, op: 0.5, dur: 1.7 },
                    { x: 60, y: 200, r: 1.1, op: 0.7, dur: 2.3 },
                    { x: 140, y: 240, r: 0.7, op: 0.4, dur: 1.6 },
                    { x: 300, y: 220, r: 1.4, op: 0.6, dur: 2.1 },
                    { x: 360, y: 260, r: 0.9, op: 0.5, dur: 1.9 },
                    { x: 40, y: 280, r: 1.2, op: 0.6, dur: 2.4 },
                    { x: 180, y: 30, r: 0.8, op: 0.5, dur: 1.8 },
                    { x: 250, y: 100, r: 1.1, op: 0.7, dur: 2 },
                    { x: 90, y: 160, r: 0.9, op: 0.4, dur: 1.5 },
                    { x: 330, y: 180, r: 1.3, op: 0.6, dur: 2.2 },
                    { x: 150, y: 270, r: 0.8, op: 0.5, dur: 1.9 },
                    { x: 220, y: 35, r: 1.2, op: 0.7, dur: 2.3 },
                    { x: 380, y: 120, r: 0.7, op: 0.4, dur: 1.6 },
                    { x: 30, y: 100, r: 1.4, op: 0.6, dur: 2.1 },
                    { x: 270, y: 250, r: 1, op: 0.5, dur: 1.7 },
                  ].map((star, i) => (
                    <circle
                      key={`star-${i}`}
                      cx={star.x}
                      cy={star.y}
                      r={star.r}
                      fill="#ffffff"
                      opacity={star.op}
                    >
                      <animate
                        attributeName="opacity"
                        values={`${star.op};${star.op + 0.3};${star.op}`}
                        dur={`${star.dur}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}

                  {/* Large planet/orb */}
                  <circle
                    cx="200"
                    cy="150"
                    r="60"
                    fill="url(#planetGradient)"
                    filter="url(#glow)"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="r"
                      values="60;65;60"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Inner glow */}
                  <circle cx="200" cy="150" r="40" fill="#00ADB5" opacity="0.3">
                    <animate
                      attributeName="opacity"
                      values="0.3;0.5;0.3"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Orbiting rings */}
                  <ellipse
                    cx="200"
                    cy="150"
                    rx="80"
                    ry="30"
                    fill="none"
                    stroke="#00ADB5"
                    strokeWidth="2"
                    opacity="0.4"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="0 200 150;360 200 150"
                      dur="20s"
                      repeatCount="indefinite"
                    />
                  </ellipse>
                  <ellipse
                    cx="200"
                    cy="150"
                    rx="100"
                    ry="40"
                    fill="none"
                    stroke="#8a2be2"
                    strokeWidth="1.5"
                    opacity="0.3"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="360 200 150;0 200 150"
                      dur="25s"
                      repeatCount="indefinite"
                    />
                  </ellipse>

                  {/* Floating particles */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * 360;
                    const radius = 90;
                    const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
                    const y = 150 + radius * Math.sin((angle * Math.PI) / 180);
                    return (
                      <circle
                        key={`particle-${i}`}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="#00ADB5"
                        opacity="0.6"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          values={`${angle} 200 150;${angle + 360} 200 150`}
                          dur={`${15 + i * 2}s`}
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.3;0.8;0.3"
                          dur={`${2 + i * 0.3}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    );
                  })}

                  {/* Abstract cosmic shapes */}
                  <path
                    d="M 100 80 Q 150 50, 200 80 T 300 80"
                    fill="none"
                    stroke="#00ADB5"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                  <path
                    d="M 100 220 Q 150 250, 200 220 T 300 220"
                    fill="none"
                    stroke="#8a2be2"
                    strokeWidth="2"
                    opacity="0.3"
                  />

                  {/* Central connection lines */}
                  <line
                    x1="120"
                    y1="150"
                    x2="180"
                    y2="150"
                    stroke="#00ADB5"
                    strokeWidth="1.5"
                    opacity="0.4"
                  />
                  <line
                    x1="220"
                    y1="150"
                    x2="280"
                    y2="150"
                    stroke="#00ADB5"
                    strokeWidth="1.5"
                    opacity="0.4"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            className={`w-full h-full flex justify-center items-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-200 ${
              visibleSections.has("contact")
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="w-full max-w-[38rem]">
              <form
                className="w-full h-full flex flex-col p-6 sm:p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission here
                }}
              >
                <div
                  className={`flex flex-col sm:flex-row justify-between w-full gap-4 sm:gap-4 mb-6 transition-all duration-1000 delay-400 ${
                    visibleSections.has("contact")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  <div className="flex flex-col flex-1">
                    <label className="text-sm sm:text-base mb-2 text-white font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-lg outline-none bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-[#00ADB5] focus:bg-white/15 focus:ring-2 focus:ring-[#00ADB5]/30 transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="text-sm sm:text-base mb-2 text-white font-medium">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-lg outline-none bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-[#00ADB5] focus:bg-white/15 focus:ring-2 focus:ring-[#00ADB5]/30 transition-all duration-300"
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col mb-6 transition-all duration-1000 delay-500 ${
                    visibleSections.has("contact")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  <label className="text-sm sm:text-base mb-2 text-white font-medium">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-lg outline-none bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-[#00ADB5] focus:bg-white/15 focus:ring-2 focus:ring-[#00ADB5]/30 resize-none transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className={`group relative mt-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white rounded-lg bg-gradient-to-r from-[#00ADB5] to-[#008B94] hover:from-[#00ADB5]/90 hover:to-[#008B94]/90 shadow-lg hover:shadow-[#00ADB5]/50 transition-all duration-300 overflow-hidden ${
                    visibleSections.has("contact")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: visibleSections.has("contact")
                      ? "600ms"
                      : "0ms",
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Send Message
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00ADB5] to-[#8a2be2] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t-1 border-[#00ADB5] cosmic-bg-contact">
        <div className="w-full min-h-16 sm:h-20 flex justify-center items-center text-white px-4">
          <p className="text-sm sm:text-base text-center">All right reserved</p>
        </div>
      </footer>

      {/* Scroll to Top Button with Rocket Animation */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
        {/* Rocket Launch Trail */}
        {isRocketLaunching && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-20 sm:h-24">
            <div className="absolute inset-0 bg-gradient-to-t from-[#00ADB5] via-[#8a2be2] to-transparent opacity-60 animate-[rocketTrail_1.5s_ease-out_forwards]" />
            {/* Particles */}
            {[
              { x: -15, delay: 0 },
              { x: -10, delay: 0.1 },
              { x: -5, delay: 0.2 },
              { x: 0, delay: 0.15 },
              { x: 5, delay: 0.25 },
              { x: 10, delay: 0.3 },
              { x: 15, delay: 0.2 },
              { x: 0, delay: 0.35 },
            ].map((particle, i) => (
              <div
                key={i}
                className="absolute bottom-0 left-1/2 w-1 h-1 bg-[#00ADB5] rounded-full opacity-80"
                style={{
                  left: `${50 + particle.x}%`,
                  animation: `particleFloat 1.5s ease-out ${particle.delay}s forwards`,
                }}
              />
            ))}
          </div>
        )}

        {/* Rocket Button */}
        <button
          onClick={scrollToTop}
          className={`group relative bg-gradient-to-br from-[#00ADB5] via-[#008B94] to-[#006B73] hover:from-[#00ADB5] hover:via-[#8a2be2] hover:to-[#00ADB5] text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-2xl hover:shadow-[#00ADB5]/50 transition-all duration-300 overflow-visible ${
            showScrollTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          } ${
            isRocketLaunching
              ? "animate-[rocketLaunch_1.5s_ease-out_forwards]"
              : ""
          }`}
          aria-label="Scroll to top"
          disabled={isRocketLaunching}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-[#00ADB5] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />

          {/* Rocket Ship Icon */}
          <div className="relative z-10">
            <svg
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
                isRocketLaunching
                  ? "rotate-[-45deg] scale-110"
                  : "group-hover:scale-110"
              }`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Rocket body */}
              <path d="M12 2L8 6h8l-4-4z" />
              <path d="M8 6v8l4 4 4-4V6" />
              <path d="M12 14v6" />
              {/* Rocket fins */}
              <path d="M8 6L6 8M16 6l2 2" />
              {/* Rocket window */}
              <circle cx="12" cy="9" r="1.5" fill="currentColor" />
            </svg>
          </div>

          {/* Fire trail on launch */}
          {isRocketLaunching && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-4">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-400 via-red-500 to-transparent rounded-full opacity-80 animate-pulse" />
              <div
                className="absolute inset-0 bg-gradient-to-t from-yellow-300 via-orange-400 to-transparent rounded-full opacity-60 animate-pulse"
                style={{ animationDelay: "0.1s" }}
              />
            </div>
          )}
        </button>
      </div>
    </>
  );
}
