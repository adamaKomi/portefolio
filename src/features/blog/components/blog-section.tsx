"use client";

import { Container, SectionHead } from "@/shared/ui";
import { useLanguage } from "@/shared/i18n";
import { useHashRoute } from "@/shared/hooks/use-hash-route";
import { formatPostDate, isPostSlug, posts } from "../data/posts";
import { BlogReader } from "./blog-reader";

/** Les articles présentés comme une table des matières, avec points de conduite. */
export function Blog() {
  const { t, locale } = useLanguage();
  const { slug, open, navigate, close } = useHashRoute("blog", isPostSlug);

  return (
    <section id="blog" data-section-id="blog">
      <Container className="py-section">
        <SectionHead label={t("blog.title")} />
        <ol className="mt-10 md:mt-12">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-border">
              <button
                type="button"
                onClick={() => open(post.slug)}
                className="group block w-full py-8 text-left md:py-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <span className="flex items-baseline gap-4">
                  <span className="min-w-0 font-display text-statement group-hover:italic">
                    {t(`blog.${post.i18nKey}.title`)}
                  </span>
                  <span aria-hidden className="hidden min-w-8 flex-1 border-b-2 border-dotted border-current opacity-30 sm:block" />
                  <span className="hidden shrink-0 font-mono text-xs text-muted-foreground sm:block">
                    {t("blog.readingTime", { n: post.readingTime })}
                  </span>
                </span>
                <span className="mt-3 block max-w-2xl text-muted-foreground text-pretty">
                  <time dateTime={post.date} className="font-mono text-xs text-primary">
                    {formatPostDate(post.date, locale)}
                  </time>
                  <span className="mx-2 sm:hidden">·</span>
                  <span className="font-mono text-xs sm:hidden">
                    {t("blog.readingTime", { n: post.readingTime })}
                  </span>
                  <span className="mt-2 block leading-relaxed">{t(`blog.${post.i18nKey}.excerpt`)}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </Container>

      <BlogReader slug={slug} onClose={close} onNavigate={navigate} />
    </section>
  );
}
