"use client";

import * as React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { Section, SectionHeading, AuroraBackground, Reveal } from "@/shared/ui";
import { EASE_PREMIUM } from "@/shared/animations";
import { useT } from "@/shared/i18n";
import { cn } from "@/lib/utils";
import { testimonials, type Testimonial } from "../data/testimonials";

const AUTO_ADVANCE_MS = 6000;

const slideVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 48 : -48,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE_PREMIUM },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -48 : 48,
    filter: "blur(4px)",
    transition: { duration: 0.35, ease: EASE_PREMIUM },
  }),
};

function StarRating({ rating }: { rating: number }) {
  const t = useT();
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={t("testimonials.rating", { n: String(rating) })}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            "h-4 w-4 transition-colors",
            i < rating
              ? "fill-primary text-primary"
              : "text-muted-foreground/25"
          )}
        />
      ))}
    </div>
  );
}

function Dots({
  count,
  current,
  onSelect,
  className,
}: {
  count: number;
  current: number;
  onSelect: (i: number) => void;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="tablist"
      aria-label="Sélectionner un témoignage"
    >
      {Array.from({ length: count }).map((_, i) => {
        const active = i === current;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`Témoignage ${i + 1} sur ${count}`}
            onClick={() => onSelect(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              active
                ? "w-6 bg-primary shadow-[0_0_10px_oklch(0.78_0.17_162/0.6)]"
                : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
          />
        );
      })}
    </div>
  );
}

function ArrowButton({
  direction,
  onClick,
  label,
  variant = "side",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
  variant?: "side" | "bottom";
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group/arrow inline-flex items-center justify-center rounded-full",
        "glass-strong border border-border/60 text-foreground/80 hover:text-primary hover:border-primary/40",
        "transition-all duration-300 hover:bg-primary/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "side"
          ? "h-11 w-11 hover:-translate-x-0.5 data-[dir=next]:hover:translate-x-0.5"
          : "h-10 w-10"
      )}
      data-dir={direction}
    >
      <Icon className="h-4 w-4 transition-transform duration-300 group-hover/arrow:scale-110" />
    </button>
  );
}

export function Testimonials() {
  const t = useT();
  const count = testimonials.length;
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const go = React.useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const goNext = React.useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const goPrev = React.useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  // Auto-advance every 6s, pause on hover/focus.
  React.useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, count]);

  // Keyboard navigation when the region is focused.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Only unpause if focus leaves the wrapper entirely.
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setPaused(false);
    }
  };

  const current: Testimonial = testimonials[index];

  return (
    <Section id="testimonials" className="overflow-hidden">
      <AuroraBackground variant="section" />

      <div className="relative">
        <SectionHeading
          align="center"
          eyebrow={t("testimonials.eyebrow")}
          title={t("testimonials.title")}
          description={t("testimonials.description")}
        />

        <Reveal>
          <div
            className="relative mx-auto max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={handleBlur}
          >
            {/* Desktop side arrows (outside the card) */}
            <div className="absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 hidden md:block">
              <ArrowButton
                direction="prev"
                onClick={goPrev}
                label={t("testimonials.prev")}
                variant="side"
              />
            </div>
            <div className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 hidden md:block">
              <ArrowButton
                direction="next"
                onClick={goNext}
                label={t("testimonials.next")}
                variant="side"
              />
            </div>

            {/* Carousel card */}
            <div
              className="relative overflow-hidden rounded-3xl border border-border/60 glass-strong shadow-glow"
              role="region"
              aria-roledescription="carousel"
              aria-label={t("testimonials.region")}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              {/* Inner grid */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-grid-sm opacity-50 mask-radial"
              />

              {/* Emerald top glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full blur-[90px]"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.78 0.17 162 / 0.18), transparent 70%)",
                }}
              />

              {/* Large faint quotation watermark */}
              <Quote
                aria-hidden
                className="pointer-events-none absolute -top-6 right-2 h-40 w-40 rotate-12 text-primary/[0.04]"
                strokeWidth={1}
              />

              {/* Top gradient hairline */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, oklch(0.78 0.17 162 / 0.4), transparent)",
                }}
              />

              <div className="relative flex flex-col items-center px-6 py-12 text-center md:px-14 md:py-16">
                {/* Top quote icon */}
                <div
                  aria-hidden
                  className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-[0_0_24px_-6px_oklch(0.78_0.17_162/0.45)]"
                >
                  <Quote className="h-5 w-5 text-primary" />
                </div>

                {/* Quote region (live for screen readers) */}
                <div
                  className="relative w-full min-h-[220px] md:min-h-[200px]"
                  aria-live="polite"
                >
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.figure
                      key={current.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="flex flex-col items-center"
                    >
                      <blockquote className="text-lg font-medium leading-relaxed text-pretty text-foreground/90 md:text-xl">
                        <p>&ldquo;{t(`t${index + 1}.quote`)}&rdquo;</p>
                      </blockquote>

                      <div className="mt-6">
                        <StarRating rating={current.rating} />
                      </div>

                      <figcaption className="mt-7 flex items-center gap-3.5">
                        {/* Initials avatar — gradient circle, no photo */}
                        <div
                          aria-hidden
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-mono text-sm font-semibold tracking-tight text-primary-foreground ring-2 ring-background shadow-[0_0_18px_-4px_oklch(0.78_0.17_162/0.55)]"
                        >
                          {current.authorInitials}
                        </div>
                        <div className="text-left">
                          <cite className="block not-italic font-semibold tracking-tight text-foreground">
                            {t(`t${index + 1}.author`)}
                          </cite>
                          <p className="font-mono text-xs text-muted-foreground">
                            {t(`t${index + 1}.role`)}
                          </p>
                        </div>
                      </figcaption>
                    </motion.figure>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Mobile controls: prev + dots + next */}
            <div className="mt-6 flex items-center justify-center gap-5 md:hidden">
              <ArrowButton
                direction="prev"
                onClick={goPrev}
                label={t("testimonials.prev")}
                variant="bottom"
              />
              <Dots
                count={count}
                current={index}
                onSelect={(i) => go(i, i > index ? 1 : -1)}
              />
              <ArrowButton
                direction="next"
                onClick={goNext}
                label={t("testimonials.next")}
                variant="bottom"
              />
            </div>

            {/* Desktop dots only */}
            <Dots
              count={count}
              current={index}
              onSelect={(i) => go(i, i > index ? 1 : -1)}
              className="mt-7 hidden md:flex"
            />
          </div>
        </Reveal>

        {/* Trust signals */}
        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            <span
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60"
              aria-hidden
            >
              {t("testimonials.trustLabel")}
            </span>
            <span aria-hidden className="text-muted-foreground/30">
              ·
            </span>
            {[1, 2, 3, 4].map((n) => (
              <span
                key={n}
                className="inline-flex items-center rounded-full border border-border/60 bg-card/30 px-3 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {t(`testimonials.trust${n}`)}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
