"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock,
  Mail,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useT, useLanguage } from "@/shared/i18n";
import {
  EASE_PREMIUM,
  overlayContentVariants,
  overlayVariants,
} from "@/shared/animations";
import {
  type BlogPost,
  formatPostDate,
  getNextPost,
  getPost,
  getPrevPost,
  posts,
} from "../data/posts";
import { ContentRenderer } from "./content-renderer";

interface BlogReaderOverlayProps {
  slug: string | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
  onContact?: () => void;
}

/* Variants pour le swap de contenu (navigate prev/next). */
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

/* ----------------------------------------------------------
 * BlogReaderOverlay — lecteur plein écran.
 *
 * Réutilise le pattern de l'overlay projets :
 *  - AnimatePresence + overlayVariants (backdrop) + overlayContentVariants (panel)
 *  - AnimatePresence interne mode="wait" avec key={slug} pour swap prev/next fluide
 *  - role="dialog" aria-modal="true" aria-label
 *  - ESC to close, body scroll lock, focus close button on open, scroll reset on navigate
 * ---------------------------------------------------------- */
export function BlogReaderOverlay({
  slug,
  onClose,
  onNavigate,
  onContact,
}: BlogReaderOverlayProps) {
  const t = useT();
  const post = slug ? getPost(slug) : undefined;

  // Titre traduit via i18n — fallback sur post.title pour le SSR.
  const postTitle = post
    ? t(`blog.${post.i18nKey}.title`) || post.title
    : "";

  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

  /* Reading progress — manual scroll listener on the panel.
   * Avoids useScroll container ref issues; updates a state 0→1. */
  React.useEffect(() => {
    if (!post) return;
    const panel = panelRef.current;
    if (!panel) return;
    const onScroll = () => {
      const max = panel.scrollHeight - panel.clientHeight;
      setProgress(max > 0 ? Math.min(1, panel.scrollTop / max) : 0);
    };
    panel.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => panel.removeEventListener("scroll", onScroll);
  }, [post]);

  /* ESC to close */
  React.useEffect(() => {
    if (!post) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [post, onClose]);

  /* Body scroll lock + focus close button on open */
  React.useEffect(() => {
    if (!post) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeButtonRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [post]);

  /* Reset scroll to top on navigate */
  React.useEffect(() => {
    if (slug && panelRef.current) {
      panelRef.current.scrollTo({ top: 0 });
    }
  }, [slug]);

  const currentIndex = post
    ? posts.findIndex((p) => p.slug === post.slug)
    : -1;
  const prevPost = post ? getPrevPost(post.slug) : null;
  const nextPost = post ? getNextPost(post.slug) : null;

  const handleContact = () => {
    if (onContact) {
      onContact();
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-stretch justify-center p-0 md:items-center md:p-6"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label={t("blog.readerTitle", { title: postTitle })}
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
            className="relative z-10 flex max-h-[100vh] w-full max-w-3xl flex-col overflow-y-auto premium-scroll border border-border/60 bg-card/95 shadow-2xl backdrop-blur-2xl md:max-h-[90vh] md:rounded-2xl"
          >
            {/* ---------- Reading progress bar (top of panel) ---------- */}
            <div
              aria-hidden
              style={{ transform: `scaleX(${progress})` }}
              className="sticky top-0 left-0 right-0 z-30 h-0.5 origin-left bg-gradient-to-r from-primary to-accent transition-transform duration-75 ease-out"
            />

            {/* ---------- Sticky header ---------- */}
            <header className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-border/40 bg-background/80 px-4 py-3 backdrop-blur-xl md:px-6">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  aria-label={t("blog.back")}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  {currentIndex + 1} / {posts.length}
                </span>
              </div>

              <Button
                ref={closeButtonRef}
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label={t("common.close")}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </header>

            {/* ---------- Content (swap on navigate) ---------- */}
            <AnimatePresence mode="wait">
              <motion.div
                key={post.slug}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <OverlayContent
                  post={post}
                  prevPost={prevPost}
                  nextPost={nextPost}
                  onNavigate={onNavigate}
                  onContact={handleContact}
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
  post: BlogPost;
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
  onNavigate: (slug: string) => void;
  onContact: () => void;
}

function OverlayContent({
  post,
  prevPost,
  nextPost,
  onNavigate,
  onContact,
}: OverlayContentProps) {
  const t = useT();
  const { locale } = useLanguage();

  // Champs traduits via i18n (fallback sur les valeurs locales en SSR).
  const title = t(`blog.${post.i18nKey}.title`) || post.title;
  const excerpt = t(`blog.${post.i18nKey}.excerpt`) || post.excerpt;
  const category = t(`blog.${post.i18nKey}.category`) || post.category;

  return (
    <>
      {/* ---------- Cover banner ---------- */}
      <div className="relative h-36 overflow-hidden border-b border-border/40 md:h-48">
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
          <BookOpen
            aria-hidden
            className="h-24 w-24 text-foreground/[0.05]"
            strokeWidth={1}
          />
        </div>

        {/* Mono tag category */}
        <div className="absolute top-4 left-4 md:top-5 md:left-6">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-background/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <BookOpen className="h-3 w-3 text-primary" />
            {category}
          </span>
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className="flex flex-col gap-8 px-5 py-8 md:px-10 md:py-12">
        {/* Hero text */}
        <section className="flex flex-col gap-4">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
            <span aria-hidden className="text-border">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden />
              {t("blog.readingTime", { n: String(post.readingTime) })}
            </span>
          </div>

          {/* Title with highlight keyword */}
          <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-4xl">
            {renderHighlightedTitle(title, post.highlightKeyword)}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-card/40 font-mono text-[10px] uppercase tracking-wider text-foreground/80"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Excerpt (lead) */}
          <p className="border-l-2 border-primary/40 pl-4 text-base font-medium leading-relaxed text-foreground/90 text-pretty md:text-lg">
            {excerpt}
          </p>
        </section>

        <div className="my-1 h-px bg-gradient-to-r from-border via-border/50 to-transparent" />

        {/* Article body — content blocks */}
        <article className="flex flex-col">
          <ContentRenderer blocks={post.content} />
        </article>

        {/* Article footer sign */}
        <div className="flex items-center gap-3 pt-2">
          <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {t("blog.endLabel")}
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
        </div>
      </div>

      {/* ---------- Prev / Next navigation ---------- */}
      <div className="border-t border-border/40 px-5 py-6 md:px-10">
        <div className="mb-4 flex items-center gap-3">
          <SectionLabel>{"// continuer la lecture"}</SectionLabel>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {prevPost && (
            <NavCard
              label={t("blog.prevArticle")}
              post={prevPost}
              onClick={() => onNavigate(prevPost.slug)}
              icon={<ArrowLeft className="h-3.5 w-3.5" />}
            />
          )}
          {nextPost && (
            <NavCard
              label={t("blog.nextArticle")}
              post={nextPost}
              onClick={() => onNavigate(nextPost.slug)}
              icon={<ArrowRight className="h-3.5 w-3.5" />}
              align="right"
            />
          )}
        </div>
      </div>

      {/* ---------- CTA contact ---------- */}
      <footer className="sticky bottom-0 z-20 border-t border-border/40 bg-background/80 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Envie d&rsquo;échanger ?
            </span>
            <span className="text-sm font-medium text-foreground">
              Parlons architecture, systèmes distribués, ou votre prochain projet.
            </span>
          </div>
          <Button
            onClick={onContact}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Mail className="h-4 w-4" />
            {t("common.contactMe")}
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </footer>
    </>
  );
}

/* ---------------------------------------------------------- */

function NavCard({
  label,
  post,
  onClick,
  icon,
  align = "left",
}: {
  label: string;
  post: BlogPost;
  onClick: () => void;
  icon: React.ReactNode;
  align?: "left" | "right";
}) {
  const t = useT();
  const { locale } = useLanguage();
  const title = t(`blog.${post.i18nKey}.title`) || post.title;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label} : ${title}`}
      className={cn(
        "group flex flex-col gap-1.5 rounded-xl border border-border/50 bg-card/30 p-4 text-left transition-all duration-200",
        "hover:border-primary/40 hover:bg-card/50 hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        align === "right" && "sm:items-end sm:text-right"
      )}
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
        {icon}
        {label}
      </span>
      <span className="line-clamp-2 text-sm font-medium text-foreground/90 transition-colors group-hover:text-foreground">
        {title}
      </span>
      <span className="font-mono text-[10px] text-muted-foreground">
        {formatPostDate(post.date, locale)} · {t("blog.readingTime", { n: String(post.readingTime) })}
      </span>
    </button>
  );
}

/* ----------------------------------------------------------
 * Rendu du titre avec mise en évidence d'un mot-clé en gradient émeraude.
 * On split sur le keyword (première occurrence) et on wrap ce fragment.
 * ---------------------------------------------------------- */
function renderHighlightedTitle(
  title: string,
  keyword?: string,
): React.ReactNode {
  if (!keyword) return title;
  const idx = title.toLowerCase().indexOf(keyword.toLowerCase());
  if (idx === -1) return title;
  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + keyword.length);
  const after = title.slice(idx + keyword.length);
  return (
    <>
      {before}
      <span className="text-gradient-emerald">{match}</span>
      {after}
    </>
  );
}
