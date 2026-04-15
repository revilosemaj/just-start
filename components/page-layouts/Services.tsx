import { SERVICES, SERVICES_SECTION } from "@/lib/content";

const SERVICE_ICONS = [
  <svg key="design" viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>,
  <svg key="app" viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>,
  <svg key="web" viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>,
];

export default function Services({
  servicesRef,
  visibleSections,
}: {
  servicesRef: React.RefObject<HTMLDivElement>;
  visibleSections: Set<string>;
}) {
  return (
    <section
      ref={servicesRef}
      id="services"
      className="relative py-20 sm:py-24 portfolio-section-alt"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="flex justify-center mb-4">
          <span className="section-label">{SERVICES_SECTION.label}</span>
        </div>

        <h2
          className={`text-3xl sm:text-4xl font-bold text-white text-center mb-14 transition-all duration-700 ${
            visibleSections.has("services") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {SERVICES_SECTION.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className={`group p-7 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-[#00ADB5]/30 hover:bg-[#00ADB5]/5 transition-all duration-500 ${
                visibleSections.has("services") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visibleSections.has("services") ? `${i * 120}ms` : "0ms" }}
            >
              <div className="w-12 h-12 rounded-lg bg-[#00ADB5]/10 border border-[#00ADB5]/20 flex items-center justify-center text-[#00ADB5] mb-5 group-hover:bg-[#00ADB5]/20 transition-colors duration-300">
                {SERVICE_ICONS[i]}
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">{service.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
