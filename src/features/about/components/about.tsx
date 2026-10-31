"use client";

import { Container, SectionHead } from "@/shared/ui";
import { useT } from "@/shared/i18n";

/** Bio en grand corps, ouverte par une lettrine. */
export function About() {
  const t = useT();

  return (
    <section id="about" data-section-id="about">
      <Container className="py-section">
        <SectionHead label={t("about.title")} />
        <div className="mt-12 grid gap-y-12 md:mt-16 md:gap-y-16 lg:grid-cols-12">
          <p className="dropcap font-display text-lead tracking-[-0.01em] text-pretty lg:col-span-11">
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
