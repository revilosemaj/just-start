import About from "@/components/PageSections/About";
import Contact from "@/components/PageSections/Contact";
import Hero from "@/components/PageSections/Hero";
import Projects from "@/components/PageSections/Projects";

export default function Main({
  setIsHeroHovered,
  isHeroHovered,
  visibleWords,
  aboutRef,
  visibleSections,
  projectsRef,
  currentSlide,
  setCurrentSlide,
  contactRef,
}: {
  setIsHeroHovered: (isHovered: boolean) => void;
  isHeroHovered: boolean;
  visibleWords: number;
  aboutRef: React.RefObject<HTMLDivElement>;
  projectsRef: React.RefObject<HTMLDivElement>;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  contactRef: React.RefObject<HTMLDivElement>;
  visibleSections: Set<string>;
}) {
  return (
    <main className="relative">
      {/* Hero section */}
      <Hero
        setIsHeroHovered={setIsHeroHovered}
        isHeroHovered={isHeroHovered}
        visibleWords={visibleWords}
      />
      {/* About section */}
      <About
        aboutRef={aboutRef as React.RefObject<HTMLDivElement>}
        visibleSections={visibleSections}
      />
      {/* Project section */}
      <Projects
        projectsRef={projectsRef as React.RefObject<HTMLDivElement>}
        visibleSections={visibleSections}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
      {/* Contact section */}
      <Contact
        contactRef={contactRef as React.RefObject<HTMLDivElement>}
        visibleSections={visibleSections}
      />
    </main>
  );
}
