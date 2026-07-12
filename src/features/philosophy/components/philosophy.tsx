"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Layers, Boxes, Hexagon, Network, type LucideIcon } from "lucide-react";
import { Section, SectionHeading, Reveal, AuroraBackground } from "@/shared/ui";
import { fadeUp, staggerContainer, viewportOnce } from "@/shared/animations";
import { cn } from "@/lib/utils";

interface Principle {
  icon: LucideIcon;
  title: string;
  description: string;
  featured?: boolean;
}

const principles: Principle[] = [
  {
    icon: Layers,
    title: "Clean Architecture",
    description:
      "Séparation stricte des responsabilités, indépendance des frameworks, testabilité maximale. Le code doit exprimer l'intention métier avant les détails techniques — chaque couche a un rôle, et ce rôle reste stable face au changement.",
    featured: true,
  },
  {
    icon: Boxes,
    title: "Domain-Driven Design",
    description:
      "Modéliser le logiciel autour du domaine métier. Ubiquitous language, bounded contexts, agrégats.",
  },
  {
    icon: Hexagon,
    title: "Architecture Hexagonale",
    description:
      "Isoler le cœur métier des détails techniques. Ports & adaptateurs pour une inversion de dépendances totale.",
  },
  {
    icon: Network,
    title: "CQRS & Microservices",
    description:
      "Séparer lecture et écriture pour scaler. Découper en services autonomes quand la complexité l'exige.",
  },
];

export function Philosophy() {
  return (
    <Section id="philosophy">
      <AuroraBackground variant="subtle" />

      <div className="relative">
        <SectionHeading
          eyebrow="Philosophie"
          title={"Comment je conçois le logiciel."}
          description={
            "Quatre principes structurent chaque décision d'architecture que je prends — de la première ligne de code au déploiement en production. Ils ne sont pas des dogmes, mais des boussoles pour rester simple, évolutif et aligné sur le métier."
          }
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 md:grid-cols-2"
        >
          {principles.map((principle, idx) => (
            <PrincipleCard key={principle.title} principle={principle} index={idx} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

interface PrincipleCardProps {
  principle: Principle;
  index: number;
}

function PrincipleCard({ principle, index }: PrincipleCardProps) {
  const { icon: Icon, title, description, featured } = principle;

  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        "group relative glass rounded-2xl p-6 md:p-7 overflow-hidden",
        "transition-all duration-300 hover:-translate-y-1 hover:border-primary/30",
        featured &&
          "md:col-span-2 glass-strong border-primary/20"
      )}
    >
      {/* Featured gradient background */}
      {featured && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(ellipse at top left, oklch(0.78 0.17 162 / 0.1), transparent 55%), radial-gradient(ellipse at bottom right, oklch(0.82 0.16 80 / 0.06), transparent 55%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid-sm opacity-40 mask-radial"
          />
        </>
      )}

      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at top right, oklch(0.78 0.17 162 / 0.08), transparent 60%)",
        }}
      />

      <div className="relative flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors",
                featured
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border/60 bg-card/40 text-primary group-hover:border-primary/30 group-hover:bg-primary/10"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {featured ? "// core principle" : `// principle ${String(index + 1).padStart(2, "0")}`}
              </span>
              <h3
                className={cn(
                  "font-semibold tracking-tight text-foreground",
                  featured ? "text-xl md:text-2xl" : "text-lg"
                )}
              >
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          className={cn(
            "text-pretty leading-relaxed text-muted-foreground",
            featured ? "text-base md:text-lg max-w-3xl" : "text-sm md:text-base"
          )}
        >
          {description}
        </p>

        {/* Featured footer accent */}
        {featured && (
          <div className="mt-1 flex items-center gap-2 text-primary">
            <div className="h-px w-8 bg-primary/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              fondation de toute conception
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}
