import Hero from "@/components/PageSections/Hero";
import Services from "@/components/PageSections/Services";
import Projects from "@/components/PageSections/Projects";
import WorkExperience from "@/components/PageSections/WorkExperience";
import Testimonials from "@/components/PageSections/Testimonials";
import EducationSkills from "@/components/PageSections/EducationSkills";
import Contact from "@/components/PageSections/Contact";

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
