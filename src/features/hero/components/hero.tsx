"use client";

import Image from "next/image";
import { resumeUrls } from "@/shared/constants/profile";
import { Container } from "@/shared/ui";
import { useLanguage } from "@/shared/i18n";
import { projects } from "@/features/projects";

/**
 * Couverture, composée comme celle d'un magazine : le nom en titre,
 * le portrait détouré au premier plan entre les deux mots, et les
 * « lignes de couverture » de part et d'autre de la silhouette.
 */
export function Hero() {
  const { t, locale } = useLanguage();

  return (
    <section id="hero" data-section-id="hero" className="pt-14">
      <Container>
        <div className="relative flex flex-col border-foreground lg:min-h-[min(calc(100svh-3.5rem),62vw)] lg:border-b-2">
          <div className="mt-4 flex items-center justify-between border-y border-foreground py-2 label-caps">
            <span>{t("cover.folio")}</span>
            <span>{t("cover.edition")}</span>
            <span className="hidden sm:inline">{t("common.location")}</span>
          </div>

          <h1 className="mt-5 flex flex-col font-display text-[25vw] leading-[0.82] font-normal tracking-[-0.045em] lg:flex-row lg:justify-between lg:text-[length:min(14vw,11.5rem)]">
            <span>Adama</span>
            <span className="lg:pr-[0.045em]">Komi</span>
          </h1>

          {/* Portrait : centré et posé sur le filet du bas en grand écran. */}
          <div className="relative z-10 -mt-[6vw] ml-auto w-[68%] max-w-sm sm:w-[52%] lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-[calc(3.25rem+min(14vw,11.5rem)*0.3)] lg:m-0 lg:flex lg:w-auto lg:max-w-none lg:justify-center lg:pointer-events-none">
            <Image
              src="/portrait-cutout.webp"
              alt={t("hero.portraitAlt")}
              width={779}
              height={1272}
              priority
              sizes="(min-width: 1024px) 34vw, 68vw"
              className="h-auto w-full lg:h-full lg:w-auto"
            />
          </div>

          <div className="relative z-20 grid gap-10 border-t-2 border-foreground pt-6 pb-10 lg:mt-auto lg:grid-cols-2 lg:border-t-0 lg:pt-10 lg:pb-12">
            <div className="max-w-[22rem]">
              <p className="label-caps text-primary">{t("hero.role")}</p>
              <p className="mt-3 font-display text-[1.75rem] leading-[1.12] italic xl:text-[2rem]">
                {t("hero.lead")}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{t("hero.availability")}</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                <a href="#projects" className="link-spot">
                  {t("hero.ctaProjects")}
                </a>
                <a href={resumeUrls[locale]} target="_blank" rel="noopener noreferrer" className="link-spot">
                  {t("hero.ctaCv")}
                </a>
              </div>
            </div>

            <nav aria-label={t("cover.inThisIssue")} className="w-full max-w-[22rem] lg:justify-self-end">
              <p className="border-b border-foreground pb-2 label-caps">{t("cover.inThisIssue")}</p>
              <ol>
                {projects.map((project, i) => (
                  <li key={project.slug} className="border-b border-border">
                    <a href={`#${project.slug}`} className="group grid grid-cols-[1.75rem_1fr] gap-x-2 py-3">
                      <span className="pt-1.5 font-mono text-xs text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="font-display text-xl group-hover:italic">{project.name}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                          {t(project.taglineKey)}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </Container>
    </section>
  );
}
