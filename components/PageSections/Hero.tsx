import Image from "next/image";

export default function Hero({
  setIsHeroHovered,
  isHeroHovered,
  visibleWords,
}: {
  setIsHeroHovered: (isHovered: boolean) => void;
  isHeroHovered: boolean;
  visibleWords: number;
}) {
  return (
    <section
      id="hero"
      className="sticky top-0 h-screen flex items-center justify-center cosmic-bg"
    >
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
  );
}
