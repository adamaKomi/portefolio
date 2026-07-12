import { Navbar } from "@/features/navbar";
import { Hero } from "@/features/hero";
import { About } from "@/features/about";
import { Philosophy } from "@/features/philosophy";
import { Expertise } from "@/features/expertise";
import { Projects } from "@/features/projects";
import { Journey } from "@/features/journey";
import { Testimonials } from "@/features/testimonials";
import { Uses } from "@/features/uses";
import { Blog } from "@/features/blog";
import { Contact } from "@/features/contact";
import { Footer } from "@/features/footer";
import { SectionRail } from "@/features/section-rail";
import { Providers } from "./providers";
import { ScrollProgress } from "@/shared/ui/scroll-progress";

export default function Home() {
  return (
    <Providers>
      <div className="relative flex min-h-screen flex-col bg-background">
        <ScrollProgress />
        <Navbar />
        <SectionRail />
        <main className="flex-1">
          <Hero />
          <About />
          <Philosophy />
          <Expertise />
          <Projects />
          <Journey />
          <Testimonials />
          <Uses />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </Providers>
  );
}
