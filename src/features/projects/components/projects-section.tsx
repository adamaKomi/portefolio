"use client";

import * as React from "react";
import { Container, SectionHead } from "@/shared/ui";
import { useT } from "@/shared/i18n";
import { cn } from "@/lib/utils";
import { isProjectSlug, projects, type Project } from "../data/projects";

/**
 * Projets en bloc inversé (encre sur papier ↔ papier sur encre).
 * Chaque projet est une ligne de titre qui se déplie sur place.
 */
export function Projects() {
  const t = useT();
  const [openSlug, setOpenSlug] = React.useState<string | null>(projects[0].slug);

  // Un lien du sommaire de couverture (#editalis…) ouvre le projet visé.
  React.useEffect(() => {
    const sync = () => {
      const slug = window.location.hash.slice(1);
      if (isProjectSlug(slug)) setOpenSlug(slug);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <section id="projects" data-section-id="projects" className="bg-foreground text-background">
      <Container className="py-20 md:py-28">
        <SectionHead label={t("projects.title")} aside="2024 — 2026" />
        <p className="mt-8 max-w-3xl font-display text-2xl leading-snug italic md:text-[2.5rem] md:leading-[1.15]">
          {t("projects.intro")}
        </p>

        <ol className="mt-14 md:mt-20">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={i}
              open={openSlug === project.slug}
              onToggle={() => setOpenSlug((current) => (current === project.slug ? null : project.slug))}
            />
          ))}
        </ol>
      </Container>
    </section>
  );
}

interface ProjectRowProps {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
}

function ProjectRow({ project, index, open, onToggle }: ProjectRowProps) {
  const t = useT();
  const detailsId = `${project.slug}-details`;

  return (
    <li id={project.slug} className="scroll-mt-20 border-t border-background/25 last:border-b">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={detailsId}
          className="group grid w-full grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 pt-8 pb-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:grid-cols-[4rem_1fr_auto] md:pt-10"
        >
          <span className="font-mono text-sm text-primary">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-display text-5xl leading-[0.95] tracking-[-0.03em] group-hover:italic sm:text-7xl lg:text-8xl">
            {project.name}
          </span>
          <span
            aria-hidden
            className={cn(
              "font-display text-4xl leading-none transition-transform duration-300 md:text-5xl",
              open && "rotate-45"
            )}
          >
            +
          </span>
        </button>
      </h3>

      <div className="grid gap-x-3 gap-y-3 pb-8 md:grid-cols-[4rem_1fr_18rem] md:pb-10">
        <p className="max-w-2xl text-lg leading-relaxed text-pretty md:col-start-2">{t(project.summaryKey)}</p>
        <p className="label-caps opacity-70 md:text-right">
          {t(project.contextKey)}
          <br />
          {project.period}
        </p>
      </div>

      <div
        id={detailsId}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="grid gap-x-3 pb-12 md:grid-cols-[4rem_1fr]">
            <div className="md:col-start-2">
              <p className="label-caps text-primary">{t("projects.work")}</p>
              <dl className="mt-5 grid gap-x-12 gap-y-7 sm:grid-cols-2">
                {project.work.map((item) => (
                  <div key={item.titleKey} className="border-t border-background/25 pt-4">
                    <dt className="font-display text-xl">{t(item.titleKey)}</dt>
                    <dd className="mt-2 leading-relaxed text-pretty opacity-75">{t(item.textKey)}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-10 label-caps text-primary">{t("projects.stack")}</p>
              <p className="mt-2 font-mono text-sm">{project.tech.join("  ·  ")}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
