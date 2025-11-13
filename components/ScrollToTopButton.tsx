export default function ScrollToTopButton({
  isRocketLaunching,
  scrollToTop,
  showScrollTop,
}: {
  isRocketLaunching: boolean;
  scrollToTop: () => void;
  showScrollTop: boolean;
}) {
  return (
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
  );
}
