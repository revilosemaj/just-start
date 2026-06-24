'use client';

import { useTheme } from '@/hooks/useTheme';
import { SITE_LOGO, NAV_LINKS } from '@/lib/content';

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
  const { isDark, toggle } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 items-center justify-center py-1.5 bg-white dark:bg-[rgba(17,17,17,0.85)] backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollToSection('hero')}
          className="text-xl font-bold text-[var(--primary)] tracking-widest"
        >
          {SITE_LOGO}
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative py-1.5 px-4 text-md font-medium transition-colors duration-300 transistion-background rounded-md ${
                activeSection === link.id
                  ? 'text-black dark:text-white'
                  : 'text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--accent)]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            className="bg-[var(--muted)] border-[var(--border)] rounded-lg w-10 h-10"
            onClick={toggle}
          >
            {' '}
            {isDark ? '☀️' : '🌙'}
          </button>
          <button
            className="bg-[var(--primary)] text-[var(--primary-foreground)] font-sm font-bold py-2 px-6 rounded-xl flex items-center justify-center"
            onClick={() => scrollToSection('contact')}
          >
            Let's Talk →
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
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
      </div>
    </nav>
  );
}
