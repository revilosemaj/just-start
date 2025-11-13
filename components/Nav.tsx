export default function Nav({
  scrollToSection,
  setIsMenuOpen,
  isMenuOpen,
}: {
  scrollToSection: (id: string) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  isMenuOpen: boolean;
}) {
  return (
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
  );
}
