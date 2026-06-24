'use client';

import { useEffect, useState } from 'react';
import { EDUCATION, EDUCATION_SECTION, SKILLS } from '@/lib/content';

function SkillBar({
  skill,
  animate,
}: {
  skill: { name: string; level: number };
  animate: boolean;
}) {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-black/60 dark:text-white/60 text-sm">{skill.name}</span>
        <span className="text-[var(--primary)] text-xs font-medium">{skill.level}%</span>
      </div>
      <div className="skillbar h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/60 transition-all duration-1000 ease-out"
          style={{ width: animate ? `${skill.level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function EducationSkills({
  educationRef,
  visibleSections,
}: {
  educationRef: React.RefObject<HTMLDivElement>;
  visibleSections: Set<string>;
}) {
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    if (visibleSections.has('education') && !barsAnimated) {
      const t = setTimeout(() => setBarsAnimated(true), 300);
      return () => clearTimeout(t);
    }
  }, [visibleSections, barsAnimated]);

  return (
    <section
      ref={educationRef}
      id="education"
      className="relative py-20 sm:py-24 portfolio-section"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="flex justify-center mb-4">
          <span className="section-label">{EDUCATION_SECTION.label}</span>
        </div>

        <h2
          className={`text-3xl sm:text-4xl font-bold text-black dark:text-white text-center mb-14 transition-all duration-700 ${
            visibleSections.has('education')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          {EDUCATION_SECTION.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div
            className={`transition-all duration-700 ${
              visibleSections.has('education')
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <h3 className="text-black/80 dark:text-white/80 text-sm font-semibold uppercase tracking-widest mb-6">
              {EDUCATION_SECTION.educationLabel}
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[#00ADB5]/40 to-transparent" />
              <div className="space-y-7">
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="relative pl-11">
                    <div className="absolute left-[11px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#00ADB5] shadow-[0_0_6px_rgba(0,173,181,0.5)]" />
                    <p className="text-[var(--primary)] text-xs uppercase tracking-widest mb-0.5">
                      {edu.year}
                    </p>
                    <h4 className="text-black/85 dark:text-white/85 font-semibold text-sm">
                      {edu.degree}
                    </h4>
                    <p className="text-black/50 dark:text-white/50 text-xs">{edu.field}</p>
                    <p className="text-black/30 dark:text-white/30 text-xs mt-0.5">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              visibleSections.has('education')
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            <h3 className="text-black/80 dark:text-white/80 text-sm font-semibold uppercase tracking-widest mb-6">
              {EDUCATION_SECTION.skillsLabel}
            </h3>
            <div className="space-y-4">
              {SKILLS.map((skill) => (
                <SkillBar key={skill.name} skill={skill} animate={barsAnimated} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
