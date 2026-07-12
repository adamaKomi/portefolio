"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, socials } from "@/shared/constants/profile";
import { AuroraBackground } from "@/shared/ui/aurora-background";
import { Magnetic } from "@/shared/ui/magnetic";
import { EASE_PREMIUM, fadeUp, staggerContainer } from "@/shared/animations";
import { TerminalCard } from "./terminal-card";

export function Hero() {
  return (
    <section
      id="hero"
      data-section-id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16"
    >
      <AuroraBackground variant="hero" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Availability badge */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-primary">{profile.availabilityLabel}</span>
                <span className="text-muted-foreground">·</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {profile.location}
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-balance">
                <span className="block text-foreground">Adama Komi</span>
                <span className="block text-gradient mt-1">
                  Software Engineer
                </span>
              </h1>
              <p className="font-mono text-sm md:text-base text-muted-foreground tracking-wide">
                {"// Full-Stack · Architecture · Systèmes distribués"}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty"
            >
              {profile.description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-2">
              <Magnetic strength={0.25}>
                <Button
                  asChild
                  size="lg"
                  className="group h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-6 shadow-glow"
                >
                  <Link href="/#projects" className="gap-2">
                    Découvrir mes projets
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </Magnetic>

              <Magnetic strength={0.25}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group h-12 rounded-xl border-border bg-card/40 backdrop-blur-sm px-6 hover:bg-card"
                >
                  <Link href="/#contact" className="gap-2">
                    Me contacter
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>

            {/* Socials */}
            <motion.div variants={fadeUp} className="flex items-center gap-5 pt-3">
              {socials.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {s.name}
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </motion.div>

            {/* Now building — live status pill */}
            <motion.div
              variants={fadeUp}
              className="group/now relative inline-flex items-center gap-3 rounded-xl border border-border/60 bg-card/30 backdrop-blur-sm px-3.5 py-2.5 overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover/now:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle at 0% 50%, oklch(0.78 0.17 162 / 0.1), transparent 70%)",
                }}
              />
              <span className="relative flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Now
                </span>
              </span>
              <span className="relative h-3.5 w-px bg-border" />
              <span className="relative text-sm text-foreground/90">
                Building{" "}
                <span className="font-semibold text-primary">PayLith</span>
                <span className="text-muted-foreground"> — SaaS de facturation</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Right: terminal + floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE_PREMIUM }}
            className="relative"
          >
            <TerminalCard />

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE_PREMIUM }}
              className="absolute -bottom-6 -left-4 sm:-left-8 hidden sm:block"
            >
              <div className="glass-strong rounded-xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">focus</span>
                </div>
                <p className="mt-1 text-sm font-medium">Architecture · DDD · Temps réel</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-primary/50 to-transparent">
            <motion.div
              className="h-2 w-px bg-primary"
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
