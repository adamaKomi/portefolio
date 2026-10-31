import { Navbar } from "@/features/navbar";
import { Hero } from "@/features/hero";
import { About } from "@/features/about";
import { Projects } from "@/features/projects";
import { Expertise } from "@/features/expertise";
import { Journey } from "@/features/journey";
import { Blog } from "@/features/blog";
import { Contact } from "@/features/contact";
import { Footer } from "@/features/footer";
import { env } from "@/config/env";
import { Providers } from "./providers";

export default function Home() {
  // CONTACT_EMAIL_TO n'est lisible que côté serveur : on le transmet en props.
  const email = env.contactEmailTo ?? "";

  return (
    <Providers>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Expertise />
        <Journey />
        <Blog />
        <Contact email={email} />
      </main>
      <Footer email={email} />
    </Providers>
  );
}
