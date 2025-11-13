export default function Projects({
  projectsRef,
  visibleSections,
  currentSlide,
  setCurrentSlide,
}: {
  projectsRef: React.RefObject<HTMLDivElement>;
  visibleSections: Set<string>;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
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
                  setCurrentSlide((prev: number) => (prev === 2 ? 0 : prev + 1))
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
  );
}
