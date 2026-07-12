"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/shared/animations";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

/** Semantic section with id + optional observer target */
export function Section({ id, children, className, containerClassName, ...props }: SectionProps) {
  return (
    <section
      id={id}
      data-section-id={id}
      className={cn("relative py-20 md:py-28 scroll-mt-20", className)}
      {...props}
    >
      <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={cn(
        "flex flex-col gap-3 mb-12 md:mb-16",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.div variants={fadeUp} className="flex items-center gap-2">
          <span className="h-px w-8 bg-primary/60" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </span>
        </motion.div>
      )}
      <motion.h2
        variants={fadeUp}
        className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
