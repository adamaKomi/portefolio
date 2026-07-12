"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Code2, Server, Cpu } from "lucide-react";
import { Section, SectionHeading, Reveal, AuroraBackground } from "@/shared/ui";
import { profile, stats } from "@/shared/constants/profile";
import { fadeUp, staggerContainer, viewportOnce } from "@/shared/animations";
import { useT } from "@/shared/i18n";
import { cn } from "@/lib/utils";

const traits = [
  { label: "about.trait1", icon: Sparkles },
  { label: "about.trait2", icon: Code2 },
  { label: "about.trait3", icon: Cpu },
  { label: "about.trait4", icon: Server },
] as const;

export function About() {
  const t = useT();

  return (
    <Section id="about">
      <AuroraBackground variant="section" />

      <div className="relative">
        <SectionHeading
          eyebrow={t("about.eyebrow")}
          title={t("about.title")}
          description={t("about.description")}
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 items-start">
          {/* Left: narrative */}
          <div className="relative">
            <span className="pointer-events-none absolute -left-3 top-0 hidden h-full w-px bg-gradient-to-b from-primary/40 via-border to-transparent lg:block" />
            <div className="flex flex-col gap-5 text-pretty lg:pl-6">
              <Reveal delay={0.05}>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  {t("about.p1")}
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  {t("about.p2")}
                </p>
              </Reveal>
              <Reveal delay={0.19}>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  {t("about.p3")}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right: profile card */}
          <Reveal delay={0.15} className="lg:sticky lg:top-24">
            <div className="glass-strong rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Decorative corner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.78 0.17 162 / 0.18), transparent 70%)",
                }}
              />

              <div className="relative flex flex-col gap-5">
                {/* Header: monogram + identity */}
                <div className="flex items-center gap-4">
                  <div
                    className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-semibold tracking-tight text-primary-foreground shadow-glow"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.78 0.17 162) 0%, oklch(0.6 0.18 145) 100%)",
                    }}
                    aria-label="Monogramme AK"
                  >
                    AK
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground truncate">
                      {profile.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {profile.title} · {profile.subtitle}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {profile.location}
                    </p>
                  </div>
                </div>

                {/* Traits grid */}
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t("about.traitsLabel")}
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {traits.map(({ label, icon: Icon }) => (
                      <div
                        key={label}
                        className="group flex items-center gap-2 rounded-lg border border-border/60 bg-card/30 px-3 py-2 text-sm transition-colors hover:border-primary/30 hover:bg-primary/5"
                      >
                        <Icon className="h-3.5 w-3.5 text-primary transition-transform group-hover:scale-110" />
                        <span className="font-medium text-foreground/90">{t(label)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="font-mono text-xs text-primary">
                    {profile.availabilityLabel}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats row */}
        <div className="mt-16 md:mt-20">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {t("about.statsLabel")}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5"
          >
            {stats.map((_, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className={cn(
                  "group relative glass rounded-xl p-5 md:p-6 overflow-hidden",
                  "transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                )}
              >
                {/* Hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at top right, oklch(0.78 0.17 162 / 0.1), transparent 60%)",
                  }}
                />
                <div className="relative flex flex-col gap-1">
                  <span className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient-emerald leading-none">
                    {t(`about.stat${idx + 1}Value`)}
                  </span>
                  <span className="mt-2 text-sm font-medium text-foreground">
                    {t(`about.stat${idx + 1}Label`)}
                  </span>
                  <span className="text-xs text-muted-foreground text-pretty">
                    {t(`about.stat${idx + 1}Sub`)}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
