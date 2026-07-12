"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AuroraBackground,
  Reveal,
  Section,
  SectionHeading,
} from "@/shared/ui";
import { getPost, posts } from "../data/posts";
import { BlogCard } from "./blog-card";
import { BlogReaderOverlay } from "./blog-reader-overlay";

const BLOG_HASH_RE = /^#\/blog\/([\w-]+)$/;

export function Blog() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const hasSyncedRef = useRef(false);

  /* ---------- Hash routing sync ---------- */
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      const match = hash.match(BLOG_HASH_RE);
      if (match) {
        const slug = match[1];
        if (getPost(slug)) {
          setSelectedSlug(slug);
          return;
        }
      }
      setSelectedSlug(null);
    };

    // Initial sync (deep-link support)
    if (!hasSyncedRef.current) {
      syncFromHash();
      hasSyncedRef.current = true;
    }

    window.addEventListener("popstate", syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.removeEventListener("popstate", syncFromHash);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  /* ---------- Actions ---------- */
  const openPost = useCallback((slug: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", `#/blog/${slug}`);
    }
    setSelectedSlug(slug);
  }, []);

  const closePost = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hash.startsWith("#/blog/")
    ) {
      // popstate listener will sync selectedSlug to null
      window.history.back();
    } else {
      setSelectedSlug(null);
    }
  }, []);

  const navigatePost = useCallback((slug: string) => {
    // replaceState (not push) → history stays a single entry for the overlay
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", `#/blog/${slug}`);
    }
    setSelectedSlug(slug);
  }, []);

  const handleContact = useCallback(() => {
    closePost();
    // Wait for overlay exit + body scroll unlock, then smooth-scroll to #contact
    window.setTimeout(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }, [closePost]);

  return (
    <Section id="blog">
      <AuroraBackground variant="section" />

      <div className="relative">
        <SectionHeading
          eyebrow="Blog"
          title="Articles & réflexions techniques."
          description="Je partage ce que j'apprends en construisant : architecture, systèmes distribués, temps réel, et l'art de concevoir du logiciel qui dure."
        />

        {/* Header strip */}
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {"// 03 articles"}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={0.06 * i + 0.05} className="h-full">
              <BlogCard post={post} onOpen={openPost} className="h-full" />
            </Reveal>
          ))}
        </div>

        {/* Hint line */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">Cliquez sur un article pour le lire en entier.</span>
          <span aria-hidden className="text-primary">↗</span>
        </div>
      </div>

      {/* ---------- Reader overlay ---------- */}
      <BlogReaderOverlay
        slug={selectedSlug}
        onClose={closePost}
        onNavigate={navigatePost}
        onContact={handleContact}
      />
    </Section>
  );
}
