"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Section,
  SectionHeading,
  Reveal,
  AuroraBackground,
  Marquee,
} from "@/shared/ui";
import { fadeUp, staggerContainer, viewportOnce } from "@/shared/animations";
import { cn } from "@/lib/utils";

const techItems: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Spring Boot",
  "NestJS",
  "Node.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "React Native",
  "Expo",
  "WebSockets",
  "Tailwind CSS",
  "Java",
  "ExpressJS",
  "Flask",
  "MySQL",
  "Git",
  "REST API",
];

interface Category {
  name: string;
  count: number;
  dotClass: string;
  dotStyle?: React.CSSProperties;
}

const categories: Category[] = [
  { name: "Backend", count: 8, dotClass: "bg-primary" },
  { name: "Frontend", count: 4, dotClass: "bg-accent" },
  {
    name: "Mobile",
    count: 2,
    dotClass: "",
    dotStyle: { backgroundColor: "oklch(0.75 0.15 195)" },
  },
  { name: "Infrastructure", count: 8, dotClass: "bg-muted-foreground/50" },
];

export function Technologies() {
  return (
    <Section id="technologies" className="overflow-hidden">
      <AuroraBackground variant="subtle" />

      <div className="relative">
        <SectionHeading
          eyebrow="Stack technique"
          title="Les outils que j'utilise au quotidien."
          description="Un stack moderne, typé, et orienté production — choisi pour la performance, la maintenabilité et l'expérience développeur."
        />

        <Reveal>
          {/* Mono header label */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {"// running in production"}
              </span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {techItems.length} technologies · 4 catégories
            </span>
          </div>

          {/* Marquees */}
          <div
            className="flex flex-col gap-3 rounded-2xl glass p-4 md:p-5"
            aria-label="Défilement des technologies utilisées"
          >
            <Marquee items={techItems} speed="normal" />
            <Marquee items={techItems} speed="normal" reverse />
          </div>

          {/* Category legend */}
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {categories.map((category) => (
              <motion.div
                key={category.name}
                variants={fadeUp}
                className={cn(
                  "group flex items-center gap-2.5 rounded-xl border border-border bg-card/30 px-3.5 py-3",
                  "transition-colors duration-200 hover:border-primary/30 hover:bg-card/50"
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full ring-2 ring-background",
                    category.dotClass
                  )}
                  style={category.dotStyle}
                  aria-hidden
                />
                <span className="text-sm font-medium text-foreground/90">
                  {category.name}
                </span>
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                  {String(category.count).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}
