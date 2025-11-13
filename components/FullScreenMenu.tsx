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
  );
}
