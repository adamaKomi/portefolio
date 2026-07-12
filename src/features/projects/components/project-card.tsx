"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  onOpen: (slug: string) => void;
  className?: string;
}

/**
 * Petite étiquette "mono" positionnée dans la zone de preview.
 * Donne le ton (catégorie) dès le premier regard.
 */
function CategoryTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-background/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
      {children}
    </span>
  );
}

/**
 * Rendu spécifique au slug : petits "cartels" flottants dans la zone de preview.
 * Donne à chaque projet une identité visuelle distincte sans alourdir la carte.
 */
function PreviewAbstract({ project }: { project: Project }) {
  if (project.slug === "paylith") {
    // SaaS → mini KPI cards flottants
    return (
      <div className="absolute inset-x-0 bottom-4 hidden md:flex items-end justify-center gap-2.5 px-6">
        <div
          className="glass rounded-lg px-3 py-2 text-xs animate-float"
          style={{ animationDelay: "0s" }}
        >
          <div className="text-[10px] text-muted-foreground font-mono">CA mensuel</div>
          <div className="font-semibold text-foreground">12 450 €</div>
        </div>
        <div
          className="glass rounded-lg px-3 py-2 text-xs animate-float"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="text-[10px] text-muted-foreground font-mono">Factures</div>
          <div className="font-semibold text-foreground">42 payées</div>
        </div>
        <div
          className="glass rounded-lg px-3 py-2 text-xs animate-float"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="text-[10px] text-muted-foreground font-mono">Relances</div>
          <div className="font-semibold text-primary">Auto ✓</div>
        </div>
      </div>
    );
  }

  if (project.slug === "queueclock") {
    // Real-time → compteur de file avec pulse
    return (
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 flex items-center gap-2">
        <div className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </div>
        <span className="glass rounded-md px-2 py-1 font-mono text-[11px] text-foreground/90">
          Q-042 <span className="text-muted-foreground">·</span>{" "}
          <span className="text-primary">en attente</span>
        </span>
      </div>
    );
  }

  if (project.slug === "parkour") {
    // Mobile → stats de course
    return (
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
        <span className="glass rounded-md px-2 py-1 font-mono text-[11px] text-foreground/90">
          5.2 km <span className="text-muted-foreground">·</span> 4:45 /km
        </span>
      </div>
    );
  }

  return null;
}

export function ProjectCard({ project, onOpen, className }: ProjectCardProps) {
  const visibleTech = project.tech.slice(0, project.featured ? 5 : 4);
  const extraTechCount = Math.max(0, project.tech.length - visibleTech.length);

  const handleOpen = React.useCallback(() => {
    onOpen(project.slug);
  }, [onOpen, project.slug]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <motion.article
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Ouvrir le projet ${project.name}`}
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl glass-strong outline-none",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {/* ---------- Preview area ---------- */}
      <div
        className={cn(
          "relative overflow-hidden border-b border-border/40",
          project.featured ? "h-40 md:h-56" : "h-28 md:h-32"
        )}
      >
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-background" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-sm opacity-50" />
        {/* Glow orb */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 -right-8 h-32 w-32 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.17 162 / 0.22), transparent 70%)",
          }}
        />

        {/* Watermark project name */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              "font-mono font-bold tracking-tighter text-foreground/[0.05] select-none",
              project.featured ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"
            )}
          >
            {project.name}
          </span>
        </div>

        {/* Category mono tag (top-left) */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4">
          <CategoryTag>{project.category}</CategoryTag>
        </div>

        {/* Featured indicator (top-right) */}
        {project.featured && (
          <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 backdrop-blur">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
              Featured
            </span>
          </div>
        )}

        {/* Slug-specific abstract visual */}
        <PreviewAbstract project={project} />

        {/* Hover sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at center, oklch(0.78 0.17 162 / 0.08), transparent 60%)",
          }}
        />
      </div>

      {/* ---------- Body ---------- */}
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="bg-background/40 font-mono text-[10px] uppercase tracking-wider text-foreground/80"
          >
            {project.year}
          </Badge>
          <Badge
            variant="outline"
            className="bg-background/40 font-mono text-[10px] uppercase tracking-wider text-foreground/80"
          >
            {project.status}
          </Badge>
        </div>

        {/* Name + tagline */}
        <div className="flex flex-col gap-1">
          <h3
            className={cn(
              "font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary",
              project.featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            )}
          >
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground text-pretty">{project.tagline}</p>
        </div>

        {/* Short description (2-line clamp) */}
        <p
          className={cn(
            "text-sm text-muted-foreground/80 leading-relaxed line-clamp-2",
            project.featured && "md:line-clamp-3"
          )}
        >
          {project.shortDescription}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {visibleTech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border/60 bg-card/30 px-2 py-0.5 font-mono text-[10px] text-foreground/75"
            >
              {t}
            </span>
          ))}
          {extraTechCount > 0 && (
            <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-medium text-primary">
              +{extraTechCount}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center gap-1.5 pt-1 text-sm font-medium text-primary">
          Voir le projet
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.article>
  );
}
