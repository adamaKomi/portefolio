"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
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
import { useT, type TranslationKey } from "@/shared/i18n";
import { cn } from "@/lib/utils";



interface EduSkill {
  titleKey: TranslationKey;
  descKey: TranslationKey;
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

interface EducationItem {
  degreeKey: TranslationKey;
  schoolKey: TranslationKey;
  dateKey: TranslationKey;
  locationKey: TranslationKey;
}

const educationItems: EducationItem[] = [
  {
    degreeKey: "journey.edu1.degree",
    schoolKey: "journey.edu1.school",
    dateKey: "journey.edu1.date",
    locationKey: "journey.edu1.location",
  },
  {
    degreeKey: "journey.edu2.degree",
    schoolKey: "journey.edu2.school",
    dateKey: "journey.edu2.date",
    locationKey: "journey.edu2.location",
  },
  {
    degreeKey: "journey.edu3.degree",
    schoolKey: "journey.edu3.school",
    dateKey: "journey.edu3.date",
    locationKey: "journey.edu3.location",
  },
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

        {/* Education featured card */}
        <Reveal delay={0.1} className="mt-8">
          <div id="journey-edu" className="relative overflow-hidden rounded-3xl border border-border bg-card/40 backdrop-blur-sm border-gradient">
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
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6 divide-y divide-border/40">
                  {educationItems.map((edu, idx) => (
                    <div key={idx} className={cn("flex flex-col gap-1.5", idx > 0 && "pt-6")}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-base md:text-lg font-semibold tracking-tight text-foreground">
                          <span className="text-gradient-emerald">{t(edu.degreeKey)}</span>
                        </h3>
                        <span className="font-mono text-xs text-primary font-medium whitespace-nowrap">
                          {t(edu.dateKey)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground/90">
                        {t(edu.schoolKey)}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground/75">
                        <MapPin className="h-3 w-3 text-muted-foreground/60" aria-hidden />
                        {t(edu.locationKey)}
                      </p>
                    </div>
                  ))}
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


