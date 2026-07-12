"use client";

import * as React from "react";
import { Check } from "lucide-react";
import type { ContentBlock } from "../data/posts";

/* ----------------------------------------------------------
 * ContentRenderer — rend les blocs structurés d'un article.
 *
 * - heading      → <h2> avec accent émeraude
 * - paragraph    → <p> muted-foreground, leading-relaxed
 * - code         → fenêtre "faux éditeur" (macOS dots + langage + <pre>)
 * - list         → <ul> avec checkmarks émeraude
 * ---------------------------------------------------------- */

interface ContentRendererProps {
  blocks: ContentBlock[];
}

export function ContentRenderer({ blocks }: ContentRendererProps) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return <HeadingBlock key={i} text={block.text} />;
          case "paragraph":
            return <ParagraphBlock key={i} text={block.text} />;
          case "code":
            return <CodeBlock key={i} code={block.code} language={block.language} />;
          case "list":
            return <ListBlock key={i} items={block.items} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

/* ---------------------------------------------------------- */

function HeadingBlock({ text }: { text: string }) {
  return (
    <h2 className="flex items-baseline gap-3 pt-4 text-2xl font-semibold tracking-tight text-foreground">
      <span
        aria-hidden
        className="h-5 w-1 rounded-full bg-gradient-to-b from-primary to-primary/40"
      />
      {text}
    </h2>
  );
}

function ParagraphBlock({ text }: { text: string }) {
  return (
    <p className="text-base leading-relaxed text-muted-foreground text-pretty md:text-[1.05rem]">
      {text}
    </p>
  );
}

function ListBlock({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <Check className="h-3 w-3 text-primary" />
          </span>
          <span className="text-sm leading-relaxed text-foreground/90 md:text-base">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ----------------------------------------------------------
 * CodeBlock — fenêtre type éditeur macOS.
 * Header avec 3 dots + label de langage + numéro de lignes.
 * Le corps est un <pre> mono, scroll horizontal premium-scroll.
 *
 * On applique un léger tint émeraude aux commentaires (// ...)
 * sans dépendre d'une lib de syntax highlighting.
 * ---------------------------------------------------------- */

function CodeBlock({ code, language }: { code: string; language: string }) {
  const lines = React.useMemo(() => code.replace(/\n$/, "").split("\n"), [code]);

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card/60 shadow-sm">
      {/* ---------- Header (faux éditeur) ---------- */}
      <div className="flex items-center justify-between gap-3 border-b border-border/50 bg-background/40 px-4 py-2.5">
        <div className="flex items-center gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-destructive/50" />
          <span className="h-3 w-3 rounded-full bg-accent/60" />
          <span className="h-3 w-3 rounded-full bg-primary/60" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {language}
        </span>
      </div>

      {/* ---------- Body ---------- */}
      <div className="relative overflow-x-auto premium-scroll bg-[oklch(0.12_0.004_250)]">
        <pre className="min-w-full px-4 py-4 font-mono text-[13px] leading-relaxed">
          <code className="block">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span
                  aria-hidden
                  className="mr-4 inline-block w-7 shrink-0 select-none text-right text-[11px] text-muted-foreground/40"
                >
                  {i + 1}
                </span>
                <CodeLine raw={line} />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

/**
 * Rendu d'une ligne : on sépare les commentaires (// ...) du reste.
 * Les commentaires prennent une teinte émeraude atténuée, le reste reste
 * en foreground/85. Approche volontairement simple — pas de tokenizer.
 */
function CodeLine({ raw }: { raw: string }) {
  const commentIdx = findCommentStart(raw);
  if (commentIdx === -1) {
    return <span className="whitespace-pre text-foreground/85">{raw || " "}</span>;
  }
  const before = raw.slice(0, commentIdx);
  const comment = raw.slice(commentIdx);
  return (
    <>
      <span className="whitespace-pre text-foreground/85">{before}</span>
      <span className="whitespace-pre text-primary/70 italic">{comment}</span>
    </>
  );
}

/**
 * Trouve l'index du début d'un commentaire `//` en dehors d'une chaîne.
 * Approche simple : on scanne en ignorant les // à l'intérieur de "".
 */
function findCommentStart(line: string): number {
  let inString = false;
  let stringChar = "";
  for (let i = 0; i < line.length - 1; i++) {
    const ch = line[i];
    if (inString) {
      if (ch === stringChar && line[i - 1] !== "\\") inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      stringChar = ch;
      continue;
    }
    if (ch === "/" && line[i + 1] === "/") {
      return i;
    }
  }
  return -1;
}
