"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT, useLanguage } from "@/shared/i18n";
import {
  type BlogPost,
  formatPostDate,
} from "../data/posts";

interface BlogCardProps {
  post: BlogPost;
  onOpen: (slug: string) => void;
  className?: string;
}

export function BlogCard({ post, onOpen, className }: BlogCardProps) {
  const t = useT();
  const { locale } = useLanguage();

  // Traductions i18n — fallback sur les valeurs locales du data file
  // (servent également de SSR-safe default avant hydratation).
  const title = t(`blog.${post.i18nKey}.title`);
  const excerpt = t(`blog.${post.i18nKey}.excerpt`);
  const category = t(`blog.${post.i18nKey}.category`);

  const handleOpen = React.useCallback(() => {
    onOpen(post.slug);
  }, [onOpen, post.slug]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <motion.article
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${t("common.viewArticle")} : ${title}`}
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl glass-strong outline-none",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {/* ---------- Cover area ---------- */}
      <div className="relative h-32 overflow-hidden border-b border-border/40 md:h-36">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-background" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-sm opacity-50" />
        {/* Glow orb */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 -right-8 h-32 w-32 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.17 162 / 0.22), transparent 70%)",
          }}
        />

        {/* BookOpen watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen
            aria-hidden
            className="h-16 w-16 text-foreground/[0.06] transition-transform duration-500 group-hover:scale-110"
            strokeWidth={1.2}
          />
        </div>

        {/* Category mono tag (top-left) */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-background/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            {category}
          </span>
        </div>

        {/* Hover sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at center, oklch(0.78 0.17 162 / 0.08), transparent 60%)",
          }}
        />
      </div>

      {/* ---------- Body ---------- */}
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        {/* Meta row — date + reading time */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
          <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
          <span aria-hidden className="text-border">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden />
            {t("blog.readingTime", { n: String(post.readingTime) })}
          </span>
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-xl">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground/80 text-pretty">
          {excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/60 bg-card/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center gap-1.5 pt-1 text-sm font-medium text-primary">
          {t("common.viewArticle")}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.article>
  );
}
