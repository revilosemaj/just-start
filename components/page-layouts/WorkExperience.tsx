import { JOBS, EXPERIENCE_SECTION } from "@/lib/content";

export default function WorkExperience({
  experienceRef,
  visibleSections,
}: {
  experienceRef: React.RefObject<HTMLDivElement>;
  visibleSections: Set<string>;
}) {
  return (
    <section
      ref={experienceRef}
      id="experience"
      className="relative py-20 sm:py-24 portfolio-section-alt"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="flex justify-center mb-4">
          <span className="section-label">{EXPERIENCE_SECTION.label}</span>
        </div>

        <h2
          className={`text-3xl sm:text-4xl font-bold text-white text-center mb-14 transition-all duration-700 ${
            visibleSections.has("experience") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {EXPERIENCE_SECTION.title}
        </h2>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-[#00ADB5]/40 via-[#00ADB5]/20 to-transparent" />

          <div className="space-y-10">
            {JOBS.map((job, i) => (
              <div
                key={i}
                className={`relative pl-14 transition-all duration-700 ${
                  visibleSections.has("experience") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                }`}
                style={{ transitionDelay: visibleSections.has("experience") ? `${i * 150}ms` : "0ms" }}
              >
                <div className="absolute left-[15px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#00ADB5] shadow-[0_0_8px_rgba(0,173,181,0.6)]" />

                <div className="p-6 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-[#00ADB5]/20 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-white font-semibold text-base">{job.role}</h3>
                      <p className="text-[#00ADB5]/70 text-sm">{job.company}</p>
                    </div>
                    <span className="text-white/30 text-xs font-medium bg-white/5 px-3 py-1 rounded-full border border-white/[0.06] whitespace-nowrap self-start">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed mb-4">{job.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs bg-[#00ADB5]/10 border border-[#00ADB5]/15 text-[#00ADB5]/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
