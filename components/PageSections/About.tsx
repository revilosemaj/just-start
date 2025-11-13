export default function About({
  aboutRef,
  visibleSections,
}: {
  aboutRef: React.RefObject<HTMLDivElement>;
  visibleSections: Set<string>;
}) {
  return (
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
            Hi, I’m Oliver, a Web Developer from the Philippines with over seven
            years of experience in the IT industry. Throughout my career, I’ve
            held various roles including Web Developer, Software Engineering
            Analyst, and Frontend Developer (ReactJS), allowing me to build a
            strong foundation across the full software development lifecycle.
          </p>
          <p
            className={`mb-4 text-justify text-sm sm:text-base text-white/90 leading-relaxed transition-all duration-1000 delay-300 ${
              visibleSections.has("about")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            My expertise spans requirement analysis, development, testing, and
            implementation, as well as collaboration with cross-functional teams
            to deliver high-quality, user-focused solutions. I’m also skilled in
            troubleshooting, debugging, and enhancing web applications to
            improve performance and functionality.
          </p>
          <p
            className={`mb-4 text-justify text-sm sm:text-base text-white/90 leading-relaxed transition-all duration-1000 delay-400 ${
              visibleSections.has("about")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            Known for my solution-oriented mindset and positive attitude, I
            approach challenges with a focus on progress and teamwork. I’m now
            seeking opportunities that align with my technical expertise and
            long-term career goals—particularly in environments that value
            innovation, continuous learning, and professional growth.
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

            {/* Technology Icons */}
            {[
              { icon: "nextjs.png", angle: 0, radius: 120, color: "#000000" },
              {
                icon: "tailwind.png",
                angle: 24,
                radius: 130,
                color: "#06B6D4",
              },
              { icon: "react.png", angle: 48, radius: 125, color: "#61DAFB" },
              { icon: "nodejs.png", angle: 72, radius: 135, color: "#339933" },
              { icon: "docker.png", angle: 96, radius: 120, color: "#2496ED" },
              {
                icon: "jenkins.png",
                angle: 120,
                radius: 130,
                color: "#D24939",
              },
              { icon: "git.png", angle: 168, radius: 135, color: "#FC6D26" },
              { icon: "html.png", angle: 192, radius: 120, color: "#E34F26" },
              { icon: "css.png", angle: 216, radius: 130, color: "#1572B6" },
              { icon: "js.png", angle: 240, radius: 125, color: "#F7DF1E" },
              {
                icon: "typescript.png",
                angle: 264,
                radius: 135,
                color: "#3178C6",
              },
              {
                icon: "postgres.png",
                angle: 312,
                radius: 130,
                color: "#4169E1",
              },
              { icon: "aws.png", angle: 336, radius: 125, color: "#FF9900" },
            ].map((tech, i) => {
              const centerX = 200;
              const centerY = 200;
              // Position icon at radius distance to the right of center
              const startX = centerX + tech.radius;
              const startY = centerY;
              const iconSize = 32;
              return (
                <g key={i}>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values={`${tech.angle} ${centerX} ${centerY};${
                      tech.angle + 360
                    } ${centerX} ${centerY}`}
                    dur={`${20 + i * 2}s`}
                    repeatCount="indefinite"
                  />
                  {/* Icon background circle */}
                  <circle
                    cx={startX}
                    cy={startY}
                    r="20"
                    fill="rgba(0, 173, 181, 0.1)"
                    stroke={tech.color}
                    strokeWidth="1.5"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.4;0.8;0.4"
                      dur={`${3 + i * 0.3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Technology icon image */}
                  <image
                    href={`/tech_icons/${tech.icon}`}
                    x={startX - iconSize / 2}
                    y={startY - iconSize / 2}
                    width={iconSize}
                    height={iconSize}
                    opacity="0.9"
                  />
                </g>
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
  );
}
