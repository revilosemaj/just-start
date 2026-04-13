"use client";

import { SITE_LOGO, NAV_LINKS } from "@/lib/content";

export default function Nav({
  scrollToSection,
  setIsMenuOpen,
  isMenuOpen,
  activeSection,
}: {
  scrollToSection: (id: string) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  isMenuOpen: boolean;
  activeSection: string;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1f2e]/80 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("hero")}
          className="text-xl font-bold text-white hover:text-[#00ADB5] transition-colors tracking-widest"
        >
          {SITE_LOGO}
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                activeSection === link.id
                  ? "text-[#00ADB5]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-4 right-4 h-px bg-[#00ADB5] rounded-full transition-all duration-300"
                style={{ opacity: activeSection === link.id ? 1 : 0, transform: activeSection === link.id ? "scaleX(1)" : "scaleX(0)" }}
              />
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white/60 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}
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
  );
}
