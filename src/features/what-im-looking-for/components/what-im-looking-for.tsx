"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Briefcase, Rocket, GraduationCap, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Reveal, AuroraBackground, Magnetic } from "@/shared/ui";
import { fadeUp, staggerContainer, viewportOnce, EASE_PREMIUM } from "@/shared/animations";
import { socials } from "@/shared/constants/profile";
import { cn } from "@/lib/utils";

interface Opportunity {
  icon: typeof Briefcase;
  title: string;
  description: string;
}

const opportunities: Opportunity[] = [
  {
    icon: Briefcase,
    title: "CDI / Software Engineer",
    description:
      "Au sein d'une entreprise internationale, sur des défis d'architecture, de systèmes distribués ou de produits à fort impact.",
  },
  {
    icon: Rocket,
    title: "Freelance international",
    description:
      "Missions de conception & développement full-stack pour startups et clients exigeants.",
  },
  {
    icon: GraduationCap,
    title: "Doctorat / Recherche",
    description:
      "Long terme : intelligence artificielle, robotique, systèmes distribués.",
  },
];

export function WhatImLookingFor() {
  const github = socials.find((s) => s.name === "GitHub");

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="what-im-looking-for">
      <AuroraBackground variant="subtle" />

      <div className="relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 glass-strong">
            {/* Inner grid background */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-sm opacity-50" />

            {/* Emerald glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full blur-[120px]"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.78 0.17 162 / 0.18), transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 right-1/4 h-56 w-72 rounded-full blur-[110px]"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.82 0.16 80 / 0.08), transparent 70%)",
              }}
            />

            {/* Top gradient hairline */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.78 0.17 162 / 0.5), transparent)",
              }}
            />

            <div className="relative flex flex-col items-center gap-10 px-6 py-14 md:px-12 md:py-20 text-center">
              {/* Heading block */}
              <div className="flex flex-col items-center gap-4 max-w-3xl">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="flex items-center gap-2"
                >
                  <span className="h-px w-8 bg-primary/60" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    Opportunités
                  </span>
                  <span className="h-px w-8 bg-primary/60" />
                </motion.div>

                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  transition={{ delay: 0.05, duration: 0.7, ease: EASE_PREMIUM }}
                  className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance"
                >
                  <span className="text-gradient">Ce que je recherche actuellement.</span>
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  transition={{ delay: 0.1, duration: 0.7, ease: EASE_PREMIUM }}
                  className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty"
                >
                  Ouvert à plusieurs formats d'engagement. L'essentiel : des défis techniques
                  ambitieux, une équipe qui soigne le métier, et l'occasion de construire des
                  systèmes qui durent.
                </motion.p>
              </div>

              {/* Opportunities columns */}
              <motion.div
                variants={staggerContainer(0.1, 0.15)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid w-full gap-4 md:grid-cols-3 md:gap-5"
              >
                {opportunities.map(({ icon: Icon, title, description }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    className={cn(
                      "group relative flex flex-col items-start gap-3 rounded-2xl border border-border/60 bg-card/30 p-6 text-left",
                      "transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card/50"
                    )}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                      {description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA row */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ delay: 0.25, duration: 0.7, ease: EASE_PREMIUM }}
                className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 pt-2"
              >
                <Magnetic strength={0.25}>
                  <Button
                    asChild
                    size="lg"
                    className="group h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-6 shadow-glow"
                  >
                    <a
                      href="/#contact"
                      onClick={scrollToContact}
                      className="gap-2"
                      aria-label="Discuter de votre projet — aller à la section contact"
                    >
                      Discutons de votre projet
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </Button>
                </Magnetic>

                {github && (
                  <Magnetic strength={0.25}>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="group h-12 rounded-xl border-border bg-card/40 backdrop-blur-sm px-6 hover:bg-card"
                    >
                      <a
                        href={github.href}
                        target="_blank"
                        rel="noreferrer"
                        className="gap-2"
                        aria-label={`Voir mon GitHub — ${github.handle}`}
                      >
                        <Github className="h-4 w-4" />
                        Voir mon GitHub
                      </a>
                    </Button>
                  </Magnetic>
                )}
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
