"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Server,
  Code2,
  Smartphone,
  Database,
  Boxes,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  Section,
  SectionHeading,
  Reveal,
  AuroraBackground,
} from "@/shared/ui";
import { fadeUp, staggerContainer, viewportOnce } from "@/shared/animations";
import { cn } from "@/lib/utils";

interface SkillDomain {
  name: string;
  icon: LucideIcon;
  skills: string[];
  specialty?: boolean;
}

const domains: SkillDomain[] = [
  {
    name: "Backend",
    icon: Server,
    skills: [
      "Java",
      "Spring Boot",
      "Node.js",
      "NestJS",
      "ExpressJS",
      "Python",
      "FastAPI",
      "Flask",
    ],
  },
  {
    name: "Frontend",
    icon: Code2,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Mobile",
    icon: Smartphone,
    skills: ["React Native", "Expo"],
  },
  {
    name: "Bases de données",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    name: "Architecture",
    icon: Boxes,
    skills: [
      "Clean Architecture",
      "Architecture Hexagonale",
      "Domain-Driven Design (DDD)",
      "CQRS",
      "Microservices",
    ],
    specialty: true,
  },
  {
    name: "Outils & technologies",
    icon: Wrench,
    skills: ["Docker", "Git", "REST API", "WebSockets", "Redis"],
  },
];

export function Skills() {
  return (
    <Section id="skills" className="overflow-hidden">
      <AuroraBackground variant="section" />

      <div className="relative">
        <SectionHeading
          eyebrow="Compétences"
          title="Une expertise full-stack, de l'architecture au déploiement."
          description="Je maîtrise l'ensemble de la chaîne : backend robuste, frontend performant, mobile natif-cross, bases de données et architectures distribuées."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {domains.map((domain, i) => (
            <Reveal
              key={domain.name}
              delay={i * 0.06}
              className={cn(
                "h-full",
                domain.specialty && "lg:col-span-2"
              )}
            >
              <DomainCard domain={domain} index={i} />
            </Reveal>
          ))}
        </motion.div>

        {/* Footer mono accent */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 flex items-center gap-2 text-muted-foreground"
        >
          <div className="h-px w-8 bg-primary/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            {domains.reduce((acc, d) => acc + d.skills.length, 0)} compétences · 6 domaines
          </span>
        </motion.div>
      </div>
    </Section>
  );
}

interface DomainCardProps {
  domain: SkillDomain;
  index: number;
}

function DomainCard({ domain, index }: DomainCardProps) {
  const { icon: Icon, name, skills, specialty } = domain;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl glass p-5 md:p-6",
        "transition-colors duration-300 hover:border-primary/30",
        specialty && "border-gradient glass-strong"
      )}
    >
      {/* Specialty glow */}
      {specialty && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at top left, oklch(0.78 0.17 162 / 0.08), transparent 55%)",
          }}
        />
      )}

      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at top right, oklch(0.78 0.17 162 / 0.06), transparent 60%)",
        }}
      />

      <div className="relative flex h-full flex-col gap-4">
        {/* Header */}
        <header className="flex items-center gap-3">
          <span
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-lg ring-1 transition-colors",
              specialty
                ? "bg-primary/15 text-primary ring-primary/30"
                : "bg-primary/10 text-primary ring-primary/20 group-hover:bg-primary/15"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {name}
          </h3>

          {specialty && (
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80"
              aria-label="domaine de spécialité"
            >
              {"// specialty"}
            </span>
          )}

          <span
            className="ml-auto inline-flex items-center rounded-md border border-border bg-card/40 px-2 py-0.5 font-mono text-xs text-muted-foreground"
            aria-label={`${skills.length} technologies`}
          >
            {String(skills.length).padStart(2, "0")}
          </span>
        </header>

        {/* Skills */}
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-md border border-border bg-card/40 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors duration-200 group-hover:border-border/70 group-hover:text-foreground/85"
            >
              {skill}
            </li>
          ))}
        </ul>

        {/* Specialty footer accent */}
        {specialty && (
          <div className="mt-auto flex items-center gap-2 pt-1 text-primary">
            <div className="h-px w-6 bg-primary/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              cœur de ma pratique
            </span>
          </div>
        )}
      </div>

      {/* Hidden index for screen readers / semantics */}
      <span className="sr-only">
        Domaine {index + 1} sur {domains.length}
      </span>
    </motion.article>
  );
}
