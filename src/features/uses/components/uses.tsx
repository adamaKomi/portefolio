"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  AuroraBackground,
  Reveal,
  Section,
  SectionHeading,
} from "@/shared/ui";
import { useT } from "@/shared/i18n";
import { cn } from "@/lib/utils";
import {
  featuredUsesCategory,
  regularUsesCategories,
  usesStats,
  type UsesCategory,
  type UsesItem,
} from "../data/uses";

/* ----------------------------------------------------------
 * Uses — section "Uses" du portfolio Adama Komi.
 *
 * Layout :
 *  - 1ère catégorie ("Éditeur & terminal", `featured: true`) en carte
 *    featured full-width (glass-strong + border-gradient + mono `// core setup`).
 *  - 4 autres catégories en grid 2×2 (md) sous la featured.
 *
 * Cartes : header (icône dans square émeraude + titre + count badge mono),
 * body (liste d'items nom + description muted). Hover lift + border-primary/30.
 *
 * L'icône est stockée directement en tant que composant LucideIcon dans les
 * données → pas de map string → composant à maintenir.
 * ---------------------------------------------------------- */
export function Uses() {
  const t = useT();
  return (
    <Section id="uses" className="overflow-hidden">
      <AuroraBackground variant="section" />

      <div className="relative">
        <SectionHeading
          eyebrow={t("uses.eyebrow")}
          title={t("uses.title")}
          description={t("uses.description")}
        />

        {/* Featured category — full width */}
        <Reveal className="mb-5 md:mb-6">
          <FeaturedCard category={featuredUsesCategory} />
        </Reveal>

        {/* Other categories — 2x2 grid on md */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {regularUsesCategories.map((category, i) => (
            <Reveal key={category.id} delay={0.06 * (i + 1)} className="h-full">
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>

        {/* Footer mono accent + gradient divider */}
        <Reveal delay={0.1}>
          <div
            className="mt-10 flex items-center gap-3 text-muted-foreground"
            aria-label={t("uses.statsAria", { items: String(usesStats.items), categories: String(usesStats.categories) })}
          >
            <div className="h-px w-8 bg-primary/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              {t("uses.footer")}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------- */
/* Featured card — full width, glass-strong + border-gradient */
/* ---------------------------------------------------------- */

function FeaturedCard({ category }: { category: UsesCategory }) {
  const Icon = category.icon;
  const t = useT();

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-3xl glass-strong border-gradient p-6 md:p-8",
        "transition-colors duration-300 hover:border-primary/30",
      )}
    >
      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at top left, oklch(0.78 0.17 162 / 0.08), transparent 55%)",
        }}
      />
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-sm opacity-30 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
      />

      <div className="relative flex flex-col gap-6">
        {/* Header */}
        <header className="flex flex-wrap items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 shadow-glow">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80">
              {t("uses.coreLabel")}
            </span>
            <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {t(category.titleKey)}
            </h3>
          </div>
          <span
            className="ml-auto inline-flex items-center rounded-md border border-border bg-card/40 px-2 py-0.5 font-mono text-xs text-muted-foreground"
            aria-label={`${String(category.items.length)} ${t("uses.toolsLabel")}`}
          >
            {String(category.items.length).padStart(2, "0")}
          </span>
        </header>

        {/* Items — 2 cols on md+ for the featured card */}
        <ul
          aria-label={`${t("uses.toolsLabel")} — ${t(category.titleKey)}`}
          className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2"
        >
          {category.items.map((item) => (
            <li key={item.name}>
              <ItemRow item={item} />
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/* ---------------------------------------------------------- */
/* Regular category card — 2x2 grid                           */
/* ---------------------------------------------------------- */

function CategoryCard({ category }: { category: UsesCategory }) {
  const Icon = category.icon;
  const t = useT();

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl glass p-5 md:p-6",
        "transition-colors duration-300 hover:border-primary/30",
      )}
    >
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
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary/15">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {t(category.titleKey)}
          </h3>
          <span
            className="ml-auto inline-flex items-center rounded-md border border-border bg-card/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
            aria-label={`${String(category.items.length)} ${t("uses.toolsLabel")}`}
          >
            {String(category.items.length).padStart(2, "0")}
          </span>
        </header>

        {/* Items */}
        <ul
          aria-label={`${t("uses.toolsLabel")} — ${t(category.titleKey)}`}
          className="flex flex-col gap-3"
        >
          {category.items.map((item) => (
            <li key={item.name}>
              <ItemRow item={item} />
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/* ---------------------------------------------------------- */
/* Item row — checkmark + name + description                  */
/* ---------------------------------------------------------- */

function ItemRow({ item }: { item: UsesItem }) {
  const t = useT();
  return (
    <div className="flex items-start gap-2.5">
      <Check
        aria-hidden
        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70"
        strokeWidth={2.5}
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">{item.name}</span>
        <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
          {t(item.descKey)}
        </p>
      </div>
    </div>
  );
}
