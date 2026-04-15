import { TESTIMONIALS, TESTIMONIALS_SECTION } from "@/lib/content";
import Image from "next/image";

const BORDER_STYLES = [
  "border-2 border-indigo-500",
  "border-2 border-purple-500",
  "border-2 border-sky-500",
];

export default function Testimonials({
  testimonialsRef,
  visibleSections,
}: {
  testimonialsRef: React.RefObject<HTMLDivElement>;
  visibleSections: Set<string>;
}) {
  return (
    <section
      ref={testimonialsRef}
      id="testimonials"
      className="relative py-20 sm:py-24 portfolio-section-alt"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="flex justify-center mb-4">
          <span className="section-label">{TESTIMONIALS_SECTION.label}</span>
        </div>

        <h2
          className={`text-3xl sm:text-4xl font-bold text-white text-center mb-14 transition-all duration-700 ${
            visibleSections.has("testimonials") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {TESTIMONIALS_SECTION.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`p-6 rounded-xl border border-white/[0.07] bg-white/[0.03] flex flex-col gap-5 transition-all duration-700 ${
                visibleSections.has("testimonials") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visibleSections.has("testimonials") ? `${i * 130}ms` : "0ms" }}
            >
              <svg className="w-6 h-6 text-[#00ADB5]/30 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              

              <p className="text-white/50 text-sm leading-relaxed flex-1">{t.text}</p>

              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                  <Image src={t.src} height={50} width={50} alt={`${t.name} profile`} className={`w-10 h-10 rounded-full ${BORDER_STYLES[i]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}/>
                <div>
                  <p className="text-white/80 text-sm font-medium">{t.name}</p>
                  <p className="text-white/30 text-xs">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
