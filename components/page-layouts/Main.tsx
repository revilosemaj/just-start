import Hero from "@/components/page-layouts/Hero";
import Services from "@/components/page-layouts/Services";
import Projects from "@/components/page-layouts/Projects";
import WorkExperience from "@/components/page-layouts/WorkExperience";
import Testimonials from "@/components/page-layouts/Testimonials";
import EducationSkills from "@/components/page-layouts/EducationSkills";
import Contact from "@/components/page-layouts/Contact";

export default function Main({
  servicesRef,
  projectsRef,
  experienceRef,
  testimonialsRef,
  educationRef,
  contactRef,
  visibleSections,
}: {
  servicesRef: React.RefObject<HTMLDivElement>;
  projectsRef: React.RefObject<HTMLDivElement>;
  experienceRef: React.RefObject<HTMLDivElement>;
  testimonialsRef: React.RefObject<HTMLDivElement>;
  educationRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
  visibleSections: Set<string>;
}) {
  return (
    <main>
      <Hero />
      <Services servicesRef={servicesRef} visibleSections={visibleSections} />
      <Projects projectsRef={projectsRef} visibleSections={visibleSections} />
      <WorkExperience experienceRef={experienceRef} visibleSections={visibleSections} />
      <Testimonials testimonialsRef={testimonialsRef} visibleSections={visibleSections} />
      <EducationSkills educationRef={educationRef} visibleSections={visibleSections} />
      <Contact contactRef={contactRef} visibleSections={visibleSections} />
    </main>
  );
}
