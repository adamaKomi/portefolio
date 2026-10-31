"use client";

import Image from "next/image";
import { resumeUrls } from "@/shared/constants/profile";
import { Container } from "@/shared/ui";
import { useLanguage } from "@/shared/i18n";

/**
 * Couverture, composée comme celle d'un magazine : le nom en titre,
 * le portrait détouré au premier plan entre les deux mots, et les
 * « lignes de couverture » de part et d'autre de la silhouette.
 *
 * En grand écran, une grille [texte | portrait | texte] : le portrait
 * remonte dans le titre par une marge négative, et les colonnes de texte
 * ne prennent que la place restante, sans jamais passer dessous.
 */
export function Hero() {
  const { t, locale } = useLanguage();

  return (
    <section id="hero" data-section-id="hero" className="pt-14">
      <Container>
        <div className="lg:border-b-2 lg:border-foreground">
          <h1 className="relative mt-8 flex flex-col font-display text-[25vw] leading-[0.82] font-normal tracking-[-0.045em] lg:flex-row lg:justify-between lg:text-[length:min(14vw,11.5rem)]">
            <span>Adama</span>
            <span className="lg:pr-[0.045em]">Komi</span>
          </h1>

          <div className="grid md:grid-cols-2 md:gap-x-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-end">
            <div className="relative z-10 border-b-2 border-foreground md:col-span-2 lg:order-2 lg:col-span-1 lg:-mt-[calc(min(14vw,11.5rem)*0.6)] lg:border-b-0">
              <Image
                src="/portrait-cutout.webp"
                alt={t("hero.portraitAlt")}
                width={779}
                height={1272}
                priority
                sizes="(min-width: 1024px) 30vw, 68vw"
                className="-mt-[6vw] ml-auto block h-auto w-[68%] max-w-sm sm:w-[52%] lg:m-0 lg:h-[clamp(26rem,calc(100svh-13rem),46rem)] lg:w-auto lg:max-w-none"
              />
            </div>

            <div className="max-w-[22rem] pt-10 lg:order-1 lg:pt-0 lg:pb-14">
              <p className="label-caps text-primary">{t("hero.role")}</p>
              <p className="mt-4 font-display text-deck italic">{t("hero.lead")}</p>
            </div>

            <div className="max-w-[22rem] pt-12 pb-16 md:justify-self-end md:pt-10 md:text-right lg:order-3 lg:pt-0 lg:pb-14">
              <p className="label-caps">{t("common.location")}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("hero.availability")}</p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium md:justify-end">
                <a href="#projects" className="link-spot">
                  {t("hero.ctaProjects")}
                </a>
                <a href={resumeUrls[locale]} target="_blank" rel="noopener noreferrer" className="link-spot">
                  {t("hero.ctaCv")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
