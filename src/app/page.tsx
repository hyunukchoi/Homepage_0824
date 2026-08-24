import { About } from "@/components/sections/About";
import { Career } from "@/components/sections/Career";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Workflow } from "@/components/sections/Workflow";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Workflow />
      <Projects />
      <Career />
      <Skills />
      <Contact />
    </>
  );
}
