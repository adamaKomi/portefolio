"use client";

import * as React from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  Mail,
  Smartphone,
  Star,
  X,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  EASE_PREMIUM,
  overlayContentVariants,
  overlayVariants,
} from "@/shared/animations";
import {
  getNextProject,
  getPrevProject,
  getProject,
  projects,
  type Project,
} from "../data/projects";

interface ProjectDetailOverlayProps {
  slug: string | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
  onContact?: () => void;
}

/* ----------------------------------------------------------
 * Données de présentation spécifiques aux projets.
 * Narratives étendues (rédigées à partir des champs existants).
 * ---------------------------------------------------------- */
const narratives: Record<string, string> = {
  paylith:
    "Au-delà d'une simple facturation, PayLith est un écosystème complet pensé pour les indépendants. La plateforme orchestre tout le cycle de vie d'une facture — du devis initial au paiement final — tout en offrant une vision claire de la santé financière. L'architecture Clean + DDD permet d'évoluer sans dette technique, et la séparation CQRS garantit des lectures ultra-rapides pour les dashboards analytics. Le tout dans un multi-tenant sécurisé, prêt à scaler.",
  queueclock:
    "QueueClock résout un problème universel : l'attente physique. En virtualisant la file, les commerces et administrations fluidifient le parcours client tout en gardant une vision temps réel de la charge. Le défi technique réside dans la cohérence distribuée : plusieurs instances du backend, synchronisées via Redis pub/sub, doivent présenter un état de file unifié sans condition de course. Les notifications push libèrent le client de l'attente passive.",
  parkour:
    "Parkour transforme la course en jeu. Le suivi GPS en arrière-plan capture chaque mouvement avec précision, même écran éteint, sans vider la batterie. La gamification — défis, badges, XP — est modélisée en DDD pour rester maintenable face à l'évolution des règles métier. Les classements live, synchronisés via WebSockets, créent une émulation sociale qui pousse à progresser.",
};

const categoryIcons: Record<string, React.ElementType> = {
  "SaaS Platform": Boxes,
  "Real-time System": Zap,
  "Mobile App": Smartphone,
};

/** Variants pour le swap de contenu (navigate prev/next). */
const contentVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_PREMIUM },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </span>
  );
}

export function ProjectDetailOverlay({
  slug,
  onClose,
  onNavigate,
  onContact,
}: ProjectDetailOverlayProps) {
  const project = slug ? getProject(slug) : undefined;

  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  /* ESC to close */
  React.useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, onClose]);

  /* Body scroll lock + focus close button on open */
  React.useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeButtonRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [project]);

  /* Reset scroll to top on navigate */
  React.useEffect(() => {
    if (slug && panelRef.current) {
      panelRef.current.scrollTo({ top: 0 });
    }
  }, [slug]);

  const currentIndex = project
    ? projects.findIndex((p) => p.slug === project.slug)
    : -1;
  const prevProject = project ? getPrevProject(project.slug) : null;
  const nextProject = project ? getNextProject(project.slug) : null;

  const handleContact = () => {
    if (onContact) {
      onContact();
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-stretch justify-center p-0 md:items-center md:p-6"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label={`Détails du projet ${project.name}`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            variants={overlayContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            tabIndex={-1}
            className="relative z-10 flex max-h-[100vh] w-full max-w-4xl flex-col overflow-y-auto premium-scroll border border-border/60 bg-card/95 shadow-2xl backdrop-blur-2xl md:max-h-[90vh] md:rounded-2xl"
          >
            {/* ---------- Sticky header ---------- */}
            <header className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-border/40 bg-background/80 px-4 py-3 backdrop-blur-xl md:px-6">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => prevProject && onNavigate(prevProject.slug)}
                  aria-label={`Projet précédent : ${prevProject?.name ?? ""}`}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => nextProject && onNavigate(nextProject.slug)}
                  aria-label={`Projet suivant : ${nextProject?.name ?? ""}`}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  {currentIndex + 1} / {projects.length}
                </span>
              </div>

              <Button
                ref={closeButtonRef}
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Fermer"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </header>

            {/* ---------- Content (swap on navigate) ---------- */}
            <AnimatePresence mode="wait">
              <motion.div
                key={project.slug}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <OverlayContent
                  project={project}
                  onContact={handleContact}
                  onClose={onClose}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------- */

interface OverlayContentProps {
  project: Project;
  onContact: () => void;
  onClose: () => void;
}

function OverlayContent({ project, onContact, onClose }: OverlayContentProps) {
  const CategoryIcon = categoryIcons[project.category] ?? Boxes;

  return (
    <>
      {/* ---------- Visual banner ---------- */}
      <div className="relative h-44 overflow-hidden border-b border-border/40 md:h-60">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-grid-sm opacity-60" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-10 h-56 w-56 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.17 162 / 0.22), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.82 0.16 80 / 0.14), transparent 70%)",
          }}
        />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-6xl font-bold tracking-tighter text-foreground/[0.05] select-none md:text-8xl">
            {project.name}
          </span>
        </div>

        {/* Mono tag */}
        <div className="absolute top-4 left-4 md:top-5 md:left-6">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-background/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <CategoryIcon className="h-3 w-3 text-primary" />
            {project.category}
          </span>
        </div>

        {/* Featured */}
        {project.featured && (
          <div className="absolute top-4 right-4 md:top-5 md:right-6 flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 backdrop-blur">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* ---------- Body ---------- */}
      <div className="flex flex-col gap-10 px-5 py-8 md:px-10 md:py-12">
        {/* Hero text */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="bg-background/40 font-mono text-[10px] uppercase tracking-wider"
            >
              {project.category}
            </Badge>
            <Badge
              variant="outline"
              className="bg-background/40 font-mono text-[10px] uppercase tracking-wider"
            >
              {project.year}
            </Badge>
            <Badge
              variant="outline"
              className="bg-primary/5 font-mono text-[10px] uppercase tracking-wider text-primary"
            >
              {project.status}
            </Badge>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-gradient md:text-5xl">
            {project.name}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty md:text-xl">
            {project.tagline}
          </p>
        </section>

        {/* Overview */}
        <section className="flex flex-col gap-3">
          <SectionLabel>{"// overview"}</SectionLabel>
          <p className="text-base font-medium leading-relaxed text-foreground md:text-lg">
            {project.shortDescription}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {narratives[project.slug]}
          </p>
        </section>

        {/* Points clés */}
        <section className="flex flex-col gap-3">
          <SectionLabel>{"// points clés"}</SectionLabel>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2.5 rounded-lg border border-border/40 bg-card/30 p-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                  <Check className="h-3 w-3 text-primary" />
                </span>
                <span className="text-sm leading-relaxed text-foreground/90">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Architecture */}
        <section className="flex flex-col gap-3">
          <SectionLabel>{"// architecture"}</SectionLabel>
          <div className="overflow-hidden rounded-xl border border-border/50 bg-background/40">
            <div className="border-b border-border/40 px-4 py-2">
              <span className="font-mono text-xs text-muted-foreground">
                architecture.md
              </span>
            </div>
            <div className="px-4 py-4">
              <p className="font-mono text-sm leading-relaxed text-foreground/80">
                {project.architecture}
              </p>
            </div>
          </div>
        </section>

        {/* Stack technique */}
        <section className="flex flex-col gap-3">
          <SectionLabel>{"// stack technique"}</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="bg-card/40 font-mono text-xs text-foreground/90"
              >
                {t}
              </Badge>
            ))}
          </div>
        </section>

        {/* Mon rôle */}
        <section className="flex flex-col gap-3">
          <SectionLabel>{"// mon rôle"}</SectionLabel>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.role}
          </p>
        </section>
      </div>

      {/* ---------- Footer CTA ---------- */}
      <footer className="sticky bottom-0 z-20 border-t border-border/40 bg-background/80 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Envie d'échanger ?
            </span>
            <span className="text-sm font-medium text-foreground">
              Parlons de votre projet.
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={onClose}
              className="gap-2 border-border bg-card/40 hover:bg-card"
            >
              Voir mes autres projets
            </Button>
            <Button
              onClick={onContact}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" />
              Me contacter
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
}
