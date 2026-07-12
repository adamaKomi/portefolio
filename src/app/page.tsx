import { Navbar } from "@/features/navbar";
import { Hero } from "@/features/hero";
import { About } from "@/features/about";
import { Philosophy } from "@/features/philosophy";
import { Skills } from "@/features/skills";
import { Technologies } from "@/features/technologies";
import { Projects } from "@/features/projects";
import { Experience } from "@/features/experience";
import { Testimonials } from "@/features/testimonials";
import { Education } from "@/features/education";
import { Blog } from "@/features/blog";
import { WhatImLookingFor } from "@/features/what-im-looking-for";
import { Contact } from "@/features/contact";
import { Footer } from "@/features/footer";
import { Providers } from "./providers";
import { ScrollProgress } from "@/shared/ui/scroll-progress";

export default function Home() {
  return (
    <Providers>
      <div className="relative flex min-h-screen flex-col bg-background">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Philosophy />
          <Skills />
          <Technologies />
          <Projects />
          <Experience />
          <Testimonials />
          <Education />
          <Blog />
          <WhatImLookingFor />
          <Contact />
        </main>
        <Footer />
      </div>
    </Providers>
  );
}
