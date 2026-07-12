"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Layers, Boxes, Hexagon, Network, type LucideIcon } from "lucide-react";
import { Section, SectionHeading, Reveal, AuroraBackground } from "@/shared/ui";
import { fadeUp, staggerContainer, viewportOnce } from "@/shared/animations";
import { useT } from "@/shared/i18n";
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
    title: "philosophy.p1Title",
    description: "philosophy.p1Desc",
    featured: true,
  },
  {
    icon: Boxes,
    title: "philosophy.p2Title",
    description: "philosophy.p2Desc",
  },
  {
    icon: Hexagon,
    title: "philosophy.p3Title",
    description: "philosophy.p3Desc",
  },
  {
    icon: Network,
    title: "philosophy.p4Title",
    description: "philosophy.p4Desc",
  },
];

export function Philosophy() {
  const t = useT();

  return (
    <Section id="philosophy">
      <AuroraBackground variant="subtle" />

      <div className="relative">
        <SectionHeading
          eyebrow={t("philosophy.eyebrow")}
          title={t("philosophy.title")}
          description={t("philosophy.description")}
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
  const t = useT();
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
                {featured ? t("philosophy.coreLabel") : `// principle ${String(index + 1).padStart(2, "0")}`}
              </span>
              <h3
                className={cn(
                  "font-semibold tracking-tight text-foreground",
                  featured ? "text-xl md:text-2xl" : "text-lg"
                )}
              >
                {t(title)}
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
          {t(description)}
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
