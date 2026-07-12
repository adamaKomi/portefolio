"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Cpu,
  Layers,
  Code,
  Binary,
  Network,
  Database,
  Container,
  ClipboardList,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Section, SectionHeading, AuroraBackground, Reveal } from "@/shared/ui";
import { cn } from "@/lib/utils";

interface Skill {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const skills: Skill[] = [
  {
    title: "Ingénierie logicielle",
    description: "Conception, développement, déploiement d'applications complexes.",
    icon: <Cpu className="h-4 w-4" />,
  },
  {
    title: "Architecture logicielle",
    description: "Clean Architecture, DDD, microservices, patterns.",
    icon: <Layers className="h-4 w-4" />,
  },
  {
    title: "Développement web & mobile",
    description: "Full-stack, React, React Native, API REST.",
    icon: <Code className="h-4 w-4" />,
  },
  {
    title: "Algorithmique",
    description: "Structures de données, complexité, optimisation.",
    icon: <Binary className="h-4 w-4" />,
  },
  {
    title: "Systèmes distribués",
    description: "Concurrence, synchronisation, tolérance aux pannes.",
    icon: <Network className="h-4 w-4" />,
  },
  {
    title: "Bases de données",
    description: "Modélisation, SQL, NoSQL, optimisation.",
    icon: <Database className="h-4 w-4" />,
  },
  {
    title: "DevOps",
    description: "Docker, CI/CD, déploiement, observabilité.",
    icon: <Container className="h-4 w-4" />,
  },
  {
    title: "Gestion de projet Agile",
    description: "Scrum, itératif, livraison continue.",
    icon: <ClipboardList className="h-4 w-4" />,
  },
];

export function Education() {
  return (
    <Section id="education" className="overflow-hidden">
      <AuroraBackground variant="subtle" />

      <div className="relative">
        <SectionHeading
          eyebrow="Formation"
          title="Diplôme d'Ingénieur d'État en Génie Logiciel."
          description="Une formation rigoureuse qui a posé les fondations de ma pratique de l'ingénierie logicielle."
        />

        {/* Featured diploma card */}
        <Reveal>
          <article className="border-gradient relative overflow-hidden rounded-3xl glass-strong p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start md:gap-10">
              {/* Icon + mono label */}
              <div className="flex items-start gap-4 md:flex-col md:gap-3">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/50 shadow-glow md:h-16 md:w-16">
                  <GraduationCap className="h-7 w-7 text-primary-foreground md:h-8 md:w-8" />
                </div>
                <span className="mt-1 font-mono text-xs tracking-wide text-muted-foreground md:mt-0">
                  {"// 2021 — 2024"}
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
                  <span className="text-gradient-emerald">Diplôme d'Ingénieur d'État</span>{" "}
                  en Génie Logiciel
                </h3>
                <p className="text-base font-medium text-foreground md:text-lg">
                  Faculté des Sciences et Techniques de Mohammédia (FSTM)
                </p>
                <p className="text-sm text-muted-foreground md:text-base">
                  Université Hassan II de Casablanca
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>Casablanca, Maroc</span>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Skills grid */}
        <ul
          aria-label="Compétences acquises pendant la formation"
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4"
        >
          {skills.map((skill, i) => (
            <Reveal as="li" key={skill.title} delay={i * 0.06}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group h-full rounded-2xl border glass p-5 transition-colors duration-300 hover:border-primary/30"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors duration-300 group-hover:bg-primary/15">
                  {skill.icon}
                </div>
                <h4 className="mb-1 text-sm font-semibold text-foreground">
                  {skill.title}
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
                  {skill.description}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </ul>

        {/* Closing callout — long term goal */}
        <Reveal delay={0.1}>
          <div
            role="note"
            className="relative mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 md:mt-10 md:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex shrink-0 items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  {"// next"}
                </span>
              </div>
              <p className="text-base leading-relaxed text-foreground/90 text-pretty md:text-lg">
                Et plus loin : un doctorat en{" "}
                <span className="font-medium text-gradient-emerald">
                  intelligence artificielle
                </span>
                ,{" "}
                <span className="font-medium text-gradient-emerald">robotique</span>{" "}
                et{" "}
                <span className="font-medium text-gradient-emerald">
                  systèmes distribués
                </span>
                .
              </p>
              <ArrowUpRight
                aria-hidden
                className="ml-auto hidden h-5 w-5 shrink-0 text-primary md:block"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
