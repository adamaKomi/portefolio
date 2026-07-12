"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Section, SectionHeading, AuroraBackground, Reveal } from "@/shared/ui";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RoleVariant = "primary" | "secondary" | "accent";

interface TimelineEntry {
  id: string;
  title: string;
  date: string;
  role: string;
  roleVariant: RoleVariant;
  description: string;
  tech: string[];
  featured?: boolean;
}

const entries: TimelineEntry[] = [
  {
    id: "paylith",
    title: "PayLith — SaaS de facturation",
    date: "2024 — Présent",
    role: "Projet principal",
    roleVariant: "primary",
    description:
      "Conception et développement d'une plateforme SaaS complète. Architecture Clean + DDD, frontend Next.js, backend Spring Boot. De l'analyse métier au déploiement.",
    tech: ["Next.js", "Spring Boot", "PostgreSQL"],
    featured: true,
  },
  {
    id: "queueclock",
    title: "QueueClock — Système temps réel",
    date: "2024",
    role: "Projet",
    roleVariant: "secondary",
    description:
      "Architecture d'un système distribué de files d'attente virtuelles. WebSockets, Redis, gestion de concurrence, application mobile React Native.",
    tech: ["NestJS", "WebSockets", "Redis", "React Native"],
  },
  {
    id: "parkour",
    title: "Parkour — App mobile gamifiée",
    date: "2023",
    role: "Projet",
    roleVariant: "secondary",
    description:
      "Application mobile de suivi GPS avec gamification. Suivi en arrière-plan, cartographie, WebSockets pour les classements live.",
    tech: ["React Native", "NestJS", "WebSockets"],
  },
  {
    id: "fstm",
    title: "Projets académiques — FSTM",
    date: "2021 — 2024",
    role: "Formation",
    roleVariant: "accent",
    description:
      "Multiples projets couvrant les systèmes distribués, les bases de données, le développement web/mobile et l'architecture logicielle dans le cadre du cycle ingénieur.",
    tech: ["Java", "Python", "React", "SQL"],
  },
];

const roleStyles: Record<RoleVariant, string> = {
  primary: "bg-primary/10 text-primary border-primary/25",
  secondary: "bg-secondary/60 text-secondary-foreground border-border",
  accent: "bg-accent/10 text-accent border-accent/25",
};

export function Experience() {
  return (
    <Section id="experience" className="overflow-hidden">
      <AuroraBackground variant="section" />

      <div className="relative">
        <SectionHeading
          eyebrow="Parcours"
          title="Une trajectoire d'ingénierie en construction."
          description="Projets, missions et expériences qui ont forgé ma manière de concevoir le logiciel."
        />

        <ol
          aria-label="Parcours et expériences d'Adama Komi"
          className="relative space-y-6 md:space-y-10"
        >
          {/* Vertical gradient line */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-4 top-3 bottom-3 w-px -translate-x-1/2 bg-gradient-to-b from-primary/40 via-border to-transparent"
          />

          {entries.map((entry, i) => (
            <Reveal
              as="li"
              key={entry.id}
              delay={i * 0.08}
              className="relative pl-12 md:pl-16"
            >
              {/* Timeline dot */}
              <span
                aria-hidden
                className="absolute left-4 top-5 -translate-x-1/2"
              >
                <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                  {entry.featured && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  )}
                  <span
                    className={cn(
                      "relative inline-flex h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background",
                      entry.featured &&
                        "shadow-[0_0_14px_oklch(0.78_0.17_162/0.7)]"
                    )}
                  />
                </span>
              </span>

              {/* Content card */}
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-5 md:p-6 transition-colors duration-300",
                  "glass hover:border-primary/30",
                  entry.featured && "border-primary/20 bg-primary/[0.02]"
                )}
              >
                {/* Header row */}
                <div className="mb-3 flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {entry.date}
                  </span>
                  <span className="text-muted-foreground/40" aria-hidden>
                    ·
                  </span>
                  <Badge
                    variant="outline"
                    className={cn("border", roleStyles[entry.roleVariant])}
                  >
                    {entry.role}
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {entry.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground text-pretty md:text-[15px]">
                  {entry.description}
                </p>

                {/* Tech badges */}
                <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
                  {entry.tech.map((t) => (
                    <li
                      key={t}
                      className="inline-flex items-center rounded-md border border-border bg-card/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
