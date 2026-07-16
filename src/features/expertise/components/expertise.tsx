"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Server,
  Code2,
  Smartphone,
  Database,
  Boxes,
  Cloud,
  type LucideIcon,
} from "lucide-react";
import {
  Section,
  SectionHeading,
  Reveal,
  AuroraBackground,
  Marquee,
} from "@/shared/ui";
import { fadeUp, staggerContainer, viewportOnce } from "@/shared/animations";
import { useT, type TranslationKey } from "@/shared/i18n";
import { cn } from "@/lib/utils";

interface SkillDomain {
  nameKey: TranslationKey;
  icon: LucideIcon;
  skills: string[];
  specialty?: boolean;
}

const domains: SkillDomain[] = [
  {
    nameKey: "expertise.domain.backend",
    icon: Server,
    skills: ["Java", "Spring Boot", "Node.js", "NestJS", "ExpressJS", "Python", "FastAPI", "Flask"],
  },
  {
    nameKey: "expertise.domain.frontend",
    icon: Code2,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    nameKey: "expertise.domain.mobile",
    icon: Smartphone,
    skills: ["React Native", "Expo"],
  },
  {
    nameKey: "expertise.domain.database",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    nameKey: "expertise.domain.architecture",
    icon: Boxes,
    skills: ["Clean Architecture", "Hexagonal", "DDD", "CQRS", "Microservices"],
    specialty: true,
  },
  {
    nameKey: "expertise.domain.cloudDevops",
    icon: Cloud,
    skills: ["Docker", "Docker Compose", "Git", "GitHub Actions", "CI/CD"],
  },
];

const techItems = [
  "Next.js", "React", "TypeScript", "Spring Boot", "NestJS", "Node.js",
  "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Docker",
  "React Native", "Expo", "WebSockets", "Tailwind CSS", "Java", "ExpressJS",
  "Flask", "MySQL", "Git", "REST API",
];

export function Expertise() {
  const t = useT();
  const totalSkills = domains.reduce((acc, d) => acc + d.skills.length, 0);

  return (
    <Section id="expertise" className="overflow-hidden">
      <AuroraBackground variant="section" />

      <div className="relative">
        <SectionHeading
          eyebrow={t("expertise.eyebrow")}
          title={t("expertise.title")}
          description={t("expertise.description")}
        />

        {/* Domain cards */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {domains.map((domain, i) => (
            <Reveal
              key={domain.nameKey}
              delay={i * 0.06}
              className={cn("h-full", domain.specialty && "lg:col-span-2")}
            >
              <DomainCard domain={domain} index={i} total={domains.length} />
            </Reveal>
          ))}
        </motion.div>

        {/* Footer mono accent */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 flex items-center gap-2 text-muted-foreground"
        >
          <div className="h-px w-8 bg-primary/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            {t("expertise.footer").replace("27", String(totalSkills)).replace("6", String(domains.length))}
          </span>
        </motion.div>



        {/* Tech marquee (merged from Technologies) */}
        <div className="mt-14">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                {t("expertise.stackLabel")}
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {t("expertise.stackCount")}
            </span>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8">
            <Marquee items={techItems} className="mb-4" />
            <Marquee items={techItems} reverse className="mt-4" />

            {/* Category legend */}
            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-border pt-6 sm:grid-cols-4">
              <LegendItem color="bg-primary" label={t("expertise.cat.backend")} />
              <LegendItem color="bg-accent" label={t("expertise.cat.frontend")} />
              <LegendItem
                color=""
                style={{ backgroundColor: "oklch(0.75 0.15 195)" }}
                label={t("expertise.cat.mobile")}
              />
              <LegendItem color="bg-muted-foreground/50" label={t("expertise.cat.infra")} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function LegendItem({
  color,
  style,
  label,
}: {
  color: string;
  style?: React.CSSProperties;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/30 px-3 py-2">
      <span className={cn("h-2 w-2 rounded-full", color)} style={style} />
      <span className="font-mono text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}

interface DomainCardProps {
  domain: SkillDomain;
  index: number;
  total: number;
}

function DomainCard({ domain, index, total }: DomainCardProps) {
  const t = useT();
  const { icon: Icon, skills, specialty } = domain;
  const name = t(domain.nameKey);

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

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at top right, oklch(0.78 0.17 162 / 0.06), transparent 60%)",
        }}
      />

      <div className="relative flex h-full flex-col gap-4">
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
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80">
              {t("expertise.specialty")}
            </span>
          )}

          <span
            className="ml-auto inline-flex items-center rounded-md border border-border bg-card/40 px-2 py-0.5 font-mono text-xs text-muted-foreground"
            aria-label={`${skills.length} technologies`}
          >
            {String(skills.length).padStart(2, "0")}
          </span>
        </header>

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

        {specialty && (
          <div className="mt-auto flex items-center gap-2 pt-1 text-primary">
            <div className="h-px w-6 bg-primary/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              {t("expertise.specialtyNote")}
            </span>
          </div>
        )}
      </div>

      <span className="sr-only">
        {index + 1} / {total}
      </span>
    </motion.article>
  );
}
