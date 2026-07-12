"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Section,
  SectionHeading,
  Reveal,
  AuroraBackground,
} from "@/shared/ui";
import { cn } from "@/lib/utils";
import { getProject, projects } from "../data/projects";
import { ProjectCard } from "./project-card";
import { ProjectDetailOverlay } from "./project-detail-overlay";

const PROJECT_HASH_RE = /^#\/projects\/([\w-]+)$/;

export function Projects() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const hasSyncedRef = useRef(false);

  /* ---------- Hash routing sync ---------- */
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      const match = hash.match(PROJECT_HASH_RE);
      if (match) {
        const slug = match[1];
        if (getProject(slug)) {
          setSelectedSlug(slug);
          return;
        }
      }
      setSelectedSlug(null);
    };

    // Initial sync (deep-link support)
    if (!hasSyncedRef.current) {
      syncFromHash();
      hasSyncedRef.current = true;
    }

    window.addEventListener("popstate", syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.removeEventListener("popstate", syncFromHash);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  /* ---------- Actions ---------- */
  const openProject = useCallback((slug: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", `#/projects/${slug}`);
    }
    setSelectedSlug(slug);
  }, []);

  const closeProject = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hash.startsWith("#/projects/")
    ) {
      // popstate listener will sync selectedSlug to null
      window.history.back();
    } else {
      setSelectedSlug(null);
    }
  }, []);

  const navigateProject = useCallback((slug: string) => {
    // replaceState (not push) → history stays a single entry for the overlay
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", `#/projects/${slug}`);
    }
    setSelectedSlug(slug);
  }, []);

  const handleContact = useCallback(() => {
    closeProject();
    // Wait for overlay exit + body scroll unlock, then smooth-scroll to #contact
    window.setTimeout(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }, [closeProject]);

  /* ---------- Layout: PayLith (featured) = 2×2, QueueClock + Parkour stacked right ---------- */
  const [payLith, queueClock, parkour] = projects;

  return (
    <Section id="projects">
      <AuroraBackground variant="section" />

      <div className="relative">
        <SectionHeading
          eyebrow="Projets"
          title="Des produits pensés comme des systèmes."
          description="Trois projets qui incarnent ma vision de l'ingénierie : architecture propre, expérience utilisateur soignée, et robustesse en production."
        />

        {/* Bento grid header strip */}
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
            {"// 03 projets sélectionnés"}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-border via-border/40 to-transparent" />
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3 lg:auto-rows-[minmax(320px,1fr)]">
          <Reveal delay={0.05} className="lg:col-span-2 lg:row-span-2 h-full">
            <ProjectCard project={payLith} onOpen={openProject} className="h-full" />
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-1 h-full">
            <ProjectCard project={queueClock} onOpen={openProject} className="h-full" />
          </Reveal>
          <Reveal delay={0.25} className="lg:col-span-1 h-full">
            <ProjectCard project={parkour} onOpen={openProject} className="h-full" />
          </Reveal>
        </div>

        {/* Hint line */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">Cliquez sur un projet pour voir le détail.</span>
          <span aria-hidden className="text-primary">↗</span>
        </div>
      </div>

      {/* ---------- Detail overlay ---------- */}
      <ProjectDetailOverlay
        slug={selectedSlug}
        onClose={closeProject}
        onNavigate={navigateProject}
        onContact={handleContact}
      />
    </Section>
  );
}
