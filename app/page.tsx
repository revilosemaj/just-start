import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1 overflow-x-clip">
      <Hero />
      <Services />
      <Portfolio />
      <Experience />
      <Testimonials />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
