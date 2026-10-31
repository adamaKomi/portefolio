"use client";

import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/shared/i18n";
import { formatPostDate, getNextPost, getPost } from "../data/posts";
import { ContentRenderer } from "./content-renderer";

interface BlogReaderProps {
  slug: string | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

export function BlogReader({ slug, onClose, onNavigate }: BlogReaderProps) {
  const { t, locale } = useLanguage();
  const post = slug ? getPost(slug) : undefined;
  const next = post ? getNextPost(post.slug) : null;

  return (
    <Dialog open={Boolean(post)} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[92svh] gap-0 overflow-y-auto p-6 sm:max-w-3xl sm:p-12">
        {post && (
          <article>
            <p className="text-sm text-muted-foreground">
              <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
              {" · "}
              {t("blog.readingTime", { n: post.readingTime })}
            </p>
            <DialogTitle className="mt-3 font-display text-3xl leading-tight font-normal tracking-tight text-balance md:text-4xl">
              {t(`blog.${post.i18nKey}.title`)}
            </DialogTitle>
            <DialogDescription className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              {t(`blog.${post.i18nKey}.excerpt`)}
            </DialogDescription>

            <div className="mt-10">
              <ContentRenderer blocks={post.content} />
            </div>

            {next && (
              <div className="mt-12 border-t border-border pt-6">
                <button
                  type="button"
                  onClick={() => onNavigate(next.slug)}
                  className="group inline-flex items-center gap-1.5 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("blog.next", { title: t(`blog.${next.i18nKey}.title`) })}
                  <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            )}
          </article>
        )}
      </DialogContent>
    </Dialog>
  );
}
