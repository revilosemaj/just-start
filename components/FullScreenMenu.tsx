import { NAV_LINKS } from "@/lib/content";

const DELAYS = ["200ms", "300ms", "400ms", "500ms"];

export default function FullScreenMenu({
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  scrollToSection: (id: string) => void;
}) {
  return (
    <div
      className={`md:hidden fixed inset-0 z-40 transition-all duration-400 ${
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setIsMenuOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1a1f2e]/97 backdrop-blur-lg">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[#00ADB5]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#8a2be2]/6 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          isMenuOpen ? "translate-y-0" : "translate-y-8"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {NAV_LINKS.map((link, i) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className={`text-4xl sm:text-5xl font-bold text-white hover:text-[#00ADB5] transition-all duration-300 relative group ${
              isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: isMenuOpen ? DELAYS[i] : "0ms" }}
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00ADB5] group-hover:w-full transition-all duration-300" />
          </button>
        ))}
      </div>
    </div>
  );
}
