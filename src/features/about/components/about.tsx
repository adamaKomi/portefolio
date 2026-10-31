"use client";

import { Container, SectionHead } from "@/shared/ui";
import { useT } from "@/shared/i18n";

/** Bio en grand corps, ouverte par une lettrine. */
export function About() {
  const t = useT();

  return (
    <section id="about" data-section-id="about">
      <Container className="py-20 md:py-28">
        <SectionHead label={t("about.title")} aside={t("common.location")} />
        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12">
          <p className="dropcap font-display text-[1.85rem] leading-[1.18] tracking-[-0.01em] text-pretty md:text-[2.75rem] lg:col-span-11">
            {t("about.p1")}
          </p>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty lg:col-span-5 lg:col-start-7">
            {t("about.p2")}
          </p>
        </div>
      </Container>
    </section>
  );
}
