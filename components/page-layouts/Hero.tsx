import Image from "next/image";
import { HERO, SOCIAL_LINKS } from "@/lib/content";

const SOCIAL_ICON_PATHS: Record<string, string> = {
  GitHub:   "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  LinkedIn: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  Email:    "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a1f2e 0%, #1e2435 50%, #1a1f2e 100%)" }}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00ADB5]/6 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#8a2be2]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 w-full py-28 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* Photo card */}
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 rounded-2xl border border-[#00ADB5]/20 rotate-[-4deg] scale-[0.98]" />
            <div className="relative w-56 h-64 sm:w-64 sm:h-72 lg:w-72 lg:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 rotate-[3deg] hover:rotate-0 transition-transform duration-500 bg-white/5">
              <Image
                src="/hero_img.png"
                fill
                alt={HERO.imageAlt}
                className="object-cover object-top"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col items-start text-center lg:text-left w-full">
            <div className="section-label mb-4 mx-auto lg:mx-0">{HERO.sectionLabel}</div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-3 leading-tight tracking-tight">
              {HERO.firstName}{" "}
              <span className="text-[#00ADB5]">{HERO.lastName}</span>
            </h1>

            <p className="text-[#00ADB5]/80 text-base sm:text-lg font-medium mb-5 tracking-wide">
              {HERO.subtitle}
            </p>

            <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
              {HERO.bio}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mx-auto lg:mx-0">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/50 hover:text-[#00ADB5] hover:border-[#00ADB5]/40 hover:bg-[#00ADB5]/10 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d={SOCIAL_ICON_PATHS[social.label]} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
