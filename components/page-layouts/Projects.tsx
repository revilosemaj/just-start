import Image from "next/image";
import { PROJECTS, PROJECTS_SECTION } from "@/lib/content";

export default function Projects({
  projectsRef,
  visibleSections,
}: {
  projectsRef: React.RefObject<HTMLDivElement>;
  visibleSections: Set<string>;
}) {
  return (
    <section
      ref={projectsRef}
      id="projects"
      className="relative py-20 sm:py-24 portfolio-section"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="flex justify-center mb-4">
          <span className="section-label">{PROJECTS_SECTION.label}</span>
        </div>

        <h2
          className={`text-3xl sm:text-4xl font-bold text-white text-center mb-14 transition-all duration-700 ${
            visibleSections.has("projects") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {PROJECTS_SECTION.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-xl overflow-hidden border border-white/[0.07] bg-white/[0.03] hover:border-[#00ADB5]/30 transition-all duration-500 ${
                visibleSections.has("projects") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visibleSections.has("projects") ? `${i * 100}ms` : "0ms" }}
            >
              {/* Screenshot */}
              <div className="relative h-44 overflow-hidden bg-[#0f1420]">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white text-sm font-medium bg-[#00ADB5] px-4 py-2 rounded-lg shadow-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Site
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="text-[#00ADB5]/70 text-xs uppercase tracking-widest mb-1 font-medium">{project.category}</p>
                <h3 className="text-white font-semibold text-base mb-3 group-hover:text-[#00ADB5] transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded text-xs bg-white/5 border border-white/[0.07] text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
