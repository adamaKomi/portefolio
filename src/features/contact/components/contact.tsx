"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

import {
  Section,
  SectionHeading,
  AuroraBackground,
  Reveal,
  Magnetic,
} from "@/shared/ui";
import { profile, socials } from "@/shared/constants/profile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ContactForm } from "./contact-form";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

/**
 * Hook utilitaire : heure locale live basée sur la timezone du profil.
 * Re-render toutes les 30s — suffisant pour un indicateur de timezone.
 */
function useLocalTime(timezone: string) {
  const [now, setNow] = React.useState<string>("");
  const [dateLabel, setDateLabel] = React.useState<string>("");

  React.useEffect(() => {
    const update = () => {
      const d = new Date();
      try {
        const time = new Intl.DateTimeFormat("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: timezone,
        }).format(d);
        const date = new Intl.DateTimeFormat("fr-FR", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          timeZone: timezone,
        }).format(d);
        setNow(time);
        setDateLabel(date);
      } catch {
        // Timezone invalide — fallback UTC.
        const time = new Intl.DateTimeFormat("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(d);
        setNow(time);
        setDateLabel(
          new Intl.DateTimeFormat("fr-FR", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          }).format(d)
        );
      }
    };
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, [timezone]);

  return { time: now, date: dateLabel };
}

export function Contact() {
  const { time, date } = useLocalTime(profile.timezone);

  // On n'affiche que GitHub + LinkedIn dans le panneau d'infos
  // (l'email a déjà son lien dédié au-dessus).
  const panelSocials = socials.filter(
    (s) => s.icon === "github" || s.icon === "linkedin"
  );

  return (
    <Section id="contact" className="relative overflow-hidden">
      <AuroraBackground variant="section" />

      {/* Watermark géant — très discret, gradient emerald */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-10 sm:-bottom-16 flex justify-center select-none"
      >
        <span className="text-[18vw] sm:text-[14vw] lg:text-[12rem] font-semibold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-foreground/[0.04] to-transparent">
          Get in touch
        </span>
      </div>

      <SectionHeading
        eyebrow="Contact"
        title="Discutons de votre prochain projet."
        description="Recrutement, mission freelance ou simple échange — je réponds sous 24h."
        align="center"
      />

      <div className="relative grid gap-6 lg:gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        {/* ============ COLONNE GAUCHE — PANNEAU INFO ============ */}
        <Reveal>
          <aside
            className={cn(
              "glass-strong relative h-full overflow-hidden rounded-2xl p-6 sm:p-8",
              "flex flex-col gap-6"
            )}
          >
            {/* Décor grille interne */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-grid-sm mask-radial opacity-40"
            />
            {/* Halo émeraude */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-[80px]"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.78 0.17 162 / 0.18), transparent 70%)",
              }}
            />

            <div className="relative flex flex-col gap-6">
              {/* Badge disponibilité */}
              <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-xs text-primary">
                  {profile.availabilityLabel}
                </span>
              </div>

              {/* Titre du panneau */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-xl font-semibold tracking-tight">
                  Me contacter directement
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Le formulaire, c&apos;est bien. Mais parfois un email direct
                  va plus vite — choisissez ce qui vous arrange.
                </p>
              </div>

              {/* Bloc coordonnées */}
              <div className="flex flex-col gap-3">
                <Link
                  href={`mailto:${profile.email}`}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl border border-border/60 bg-card/30 p-3",
                    "transition-colors hover:border-primary/40 hover:bg-card/50"
                  )}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      Email
                    </span>
                    <span className="truncate text-sm font-medium">
                      {profile.email}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </Link>

                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/30 p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      Localisation
                    </span>
                    <span className="truncate text-sm font-medium">
                      {profile.location}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/30 p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      Heure locale · {profile.timezone}
                    </span>
                    <span className="flex items-baseline gap-2">
                      <span className="text-sm font-medium tabular-nums">
                        {time || "--:--"}
                      </span>
                      {date && (
                        <span className="text-xs text-muted-foreground capitalize">
                          {date}
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </div>

              {/* Réseaux */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Réseaux
                </span>
                <div className="flex items-center gap-2">
                  {panelSocials.map((s) => {
                    const Icon =
                      socialIcons[s.icon as keyof typeof socialIcons] ?? Mail;
                    return (
                      <Magnetic key={s.name} strength={0.25}>
                        <Button
                          asChild
                          variant="outline"
                          size="icon"
                          aria-label={`${s.name} — ${s.handle}`}
                          className={cn(
                            "h-10 w-10 rounded-xl border-border bg-card/40",
                            "hover:border-primary/40 hover:bg-card hover:text-primary",
                            "transition-colors"
                          )}
                        >
                          <Link
                            href={s.href}
                            target={s.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                          >
                            <Icon className="h-4 w-4" />
                          </Link>
                        </Button>
                      </Magnetic>
                    );
                  })}
                </div>
              </div>

              {/* Séparateur + ligne mono response time */}
              <div className="mt-auto flex flex-col gap-3 border-t border-border/60 pt-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {"// response time"}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground/90">
                  Habituellement sous 24h ouvrées.
                </p>
              </div>
            </div>
          </aside>
        </Reveal>

        {/* ============ COLONNE DROITE — FORMULAIRE ============ */}
        <Reveal delay={0.1}>
          <div
            className={cn(
              "glass relative h-full overflow-hidden rounded-2xl p-6 sm:p-8",
              "border-gradient"
            )}
          >
            {/* Décor grille interne + halo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-grid-sm mask-radial opacity-25"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full blur-[90px]"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.82 0.16 80 / 0.12), transparent 70%)",
              }}
            />

            <div className="relative flex flex-col gap-6">
              {/* Header du form */}
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  /contact
                </span>
                <h3 className="text-xl font-semibold tracking-tight">
                  Écrivez-moi
                </h3>
                <p className="text-sm text-muted-foreground">
                  Quelques informations suffisent pour démarrer la conversation.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Petite note finale sous le grid */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 text-center font-mono text-xs text-muted-foreground/70"
      >
        Préférez-vous un appel ?{" "}
        <Link
          href={`mailto:${profile.email}?subject=Demande%20d%27appel`}
          className="text-primary hover:underline underline-offset-4"
        >
          Écrivez-moi pour planifier
        </Link>{" "}
        — je suis flexible sur les créneaux.
      </motion.p>
    </Section>
  );
}
