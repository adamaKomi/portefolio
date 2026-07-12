"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  GraduationCap,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Cpu,
  BookOpen,
  Award,
  GitBranch,
  Boxes,
  Database,
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
import { useT } from "@/shared/i18n";
import { cn } from "@/lib/utils";

interface JourneyEntry {
  dateKey: string;
  badgeKey: string;
  titleKey: string;
  descKey: string;
  tech: string[];
  featured?: boolean;
}

const entries: JourneyEntry[] = [
  {
    dateKey: "journey.t1.date",
    badgeKey: "journey.t1.badge",
    titleKey: "journey.t1.title",
    descKey: "journey.t1.desc",
    tech: ["Next.js", "Spring Boot", "PostgreSQL"],
    featured: true,
  },
  {
    dateKey: "journey.t2.date",
    badgeKey: "journey.t2.badge",
    titleKey: "journey.t2.title",
    descKey: "journey.t2.desc",
    tech: ["NestJS", "WebSockets", "Redis", "React Native"],
  },
  {
    dateKey: "journey.t3.date",
    badgeKey: "journey.t3.badge",
    titleKey: "journey.t3.title",
    descKey: "journey.t3.desc",
    tech: ["React Native", "NestJS", "WebSockets"],
  },
  {
    dateKey: "journey.t4.date",
    badgeKey: "journey.t4.badge",
    titleKey: "journey.t4.title",
    descKey: "journey.t4.desc",
    tech: ["Java", "Python", "React", "SQL"],
  },
];

interface EduSkill {
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
}

const eduSkills: EduSkill[] = [
  { titleKey: "journey.skill1Title", descKey: "journey.skill1Desc", icon: Cpu },
  { titleKey: "journey.skill2Title", descKey: "journey.skill2Desc", icon: Boxes },
  { titleKey: "journey.skill3Title", descKey: "journey.skill3Desc", icon: BookOpen },
  { titleKey: "journey.skill4Title", descKey: "journey.skill4Desc", icon: GitBranch },
  { titleKey: "journey.skill5Title", descKey: "journey.skill5Desc", icon: Award },
  { titleKey: "journey.skill6Title", descKey: "journey.skill6Desc", icon: Database },
  { titleKey: "journey.skill7Title", descKey: "journey.skill7Desc", icon: Wrench },
  { titleKey: "journey.skill8Title", descKey: "journey.skill8Desc", icon: Sparkles },
];

export function Journey() {
  const t = useT();

  return (
    <Section id="journey" className="overflow-hidden">
      <AuroraBackground variant="section" />

      <div className="relative">
        <SectionHeading
          eyebrow={t("journey.eyebrow")}
          title={t("journey.title")}
          description={t("journey.description")}
        />

        {/* Timeline */}
        <motion.ol
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          aria-label={t("journey.eyebrow")}
          className="relative flex flex-col gap-8 pl-8 md:pl-10"
        >
          {/* Vertical gradient line */}
          <div
            aria-hidden
            className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-border to-transparent"
          />

          {entries.map((entry, i) => (
            <JourneyItem key={entry.titleKey} entry={entry} index={i} total={entries.length} />
          ))}
        </motion.ol>

        {/* Education featured card */}
        <Reveal delay={0.1} className="mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/40 backdrop-blur-sm border-gradient">
            <div className="grid gap-6 p-6 md:grid-cols-[auto_1fr] md:p-8">
              {/* Left: icon + label */}
              <div className="flex flex-col items-start gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/5 text-primary shadow-glow ring-1 ring-primary/30">
                  <GraduationCap className="h-7 w-7" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {t("journey.eduLabel")}
                </span>
              </div>

              {/* Right: content */}
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                    <span className="text-gradient-emerald">{t("journey.eduDegree")}</span>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("journey.eduSchool")}
                  </p>
                  <p className="text-xs text-muted-foreground/80">
                    {t("journey.eduUniversity")}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {t("journey.eduLocation")}
                  </p>
                </div>

                {/* Skills grid */}
                <div>
                  <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {t("journey.eduSkillsTitle")}
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    {eduSkills.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <li
                          key={skill.titleKey}
                          className="group flex items-start gap-2.5 rounded-lg border border-border/60 bg-card/30 p-3 transition-colors hover:border-primary/30"
                        >
                          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
                            <Icon className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          <div>
                            <p className="text-xs font-medium text-foreground">{t(skill.titleKey)}</p>
                            <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug">
                              {t(skill.descKey)}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Next goal callout */}
        <Reveal delay={0.15}>
          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5 md:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                <Sparkles className="h-4 w-4" aria-hidden />
              </span>
              <div className="flex-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                  {t("journey.nextLabel")}
                </span>
                <p className="mt-1 text-sm md:text-base text-foreground/90 text-pretty">
                  {t("journey.nextText")}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-primary/60 shrink-0" aria-hidden />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function JourneyItem({
  entry,
  index,
  total,
}: {
  entry: JourneyEntry;
  index: number;
  total: number;
}) {
  const t = useT();
  const { featured } = entry;

  return (
    <motion.li variants={fadeUp} className="relative">
      {/* Dot */}
      <span
        aria-hidden
        className={cn(
          "absolute -left-8 md:-left-10 top-5 grid place-items-center",
          featured && "z-10"
        )}
      >
        {featured && (
          <span className="absolute h-6 w-6 animate-ping rounded-full bg-primary/30" />
        )}
        <span
          className={cn(
            "block rounded-full ring-4 ring-background",
            featured
              ? "h-3.5 w-3.5 bg-primary shadow-[0_0_12px_oklch(0.78_0.17_162/0.6)]"
              : "h-2.5 w-2.5 bg-primary/70"
          )}
        />
      </span>

      <motion.article
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "rounded-2xl border p-5 md:p-6 transition-colors",
          featured
            ? "border-primary/30 bg-card/50 backdrop-blur-sm"
            : "border-border bg-card/30 hover:border-primary/20"
        )}
      >
        {/* Date + badge */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" aria-hidden />
            {t(entry.dateKey)}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
              featured
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border bg-card/40 text-muted-foreground"
            )}
          >
            {t(entry.badgeKey)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg font-semibold tracking-tight text-foreground">
          {t(entry.titleKey)}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-sm text-muted-foreground/90 leading-relaxed text-pretty">
          {t(entry.descKey)}
        </p>

        {/* Tech badges */}
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {entry.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border/60 bg-card/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>
      </motion.article>

      <span className="sr-only">
        {index + 1} / {total}
      </span>
    </motion.li>
  );
}
