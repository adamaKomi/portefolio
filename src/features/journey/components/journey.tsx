"use client";

import { Container, SectionHead } from "@/shared/ui";
import { useT, type TranslationKey } from "@/shared/i18n";

interface Entry {
  dateKey: TranslationKey;
  titleKey: TranslationKey;
  placeKey: TranslationKey;
  descKey?: TranslationKey;
}

const experience: Entry[] = [
  {
    dateKey: "journey.exp1.date",
    titleKey: "journey.exp1.role",
    placeKey: "journey.exp1.org",
    descKey: "journey.exp1.desc",
  },
  {
    dateKey: "journey.exp2.date",
    titleKey: "journey.exp2.role",
    placeKey: "journey.exp2.org",
    descKey: "journey.exp2.desc",
  },
];

const education: Entry[] = [
  { dateKey: "journey.edu1.date", titleKey: "journey.edu1.degree", placeKey: "journey.edu1.school" },
  { dateKey: "journey.edu2.date", titleKey: "journey.edu2.degree", placeKey: "journey.edu2.school" },
  { dateKey: "journey.edu3.date", titleKey: "journey.edu3.degree", placeKey: "journey.edu3.school" },
];

/** Deux colonnes de journal séparées par un filet vertical. */
export function Journey() {
  const t = useT();

  return (
    <section id="journey" data-section-id="journey">
      <Container className="py-section">
        <SectionHead label={t("journey.title")} />
        <div className="mt-12 grid gap-16 md:mt-16 md:grid-cols-2 md:gap-0">
          <Column heading={t("journey.experience")} entries={experience} className="md:pr-10 lg:pr-16" />
          <Column
            heading={t("journey.education")}
            entries={education}
            className="md:border-l md:border-border md:pl-10 lg:pl-16"
          />
        </div>
      </Container>
    </section>
  );
}

function Column({
  heading,
  entries,
  className,
}: {
  heading: string;
  entries: Entry[];
  className?: string;
}) {
  const t = useT();

  return (
    <div className={className}>
      <h3 className="font-display text-3xl italic">{heading}</h3>
      <ol className="mt-8">
        {entries.map((entry) => (
          <li key={entry.titleKey} className="border-t border-border py-8 last:pb-0">
            <p className="font-mono text-xs text-primary">{t(entry.dateKey)}</p>
            <p className="mt-3 font-display text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] leading-snug">{t(entry.titleKey)}</p>
            <p className="mt-2 label-caps leading-relaxed opacity-70">{t(entry.placeKey)}</p>
            {entry.descKey && (
              <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">{t(entry.descKey)}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
