"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { useT } from "@/shared/i18n";
import type { ContentBlock } from "../data/posts";

/** Rend les blocs structurés d'un article. */
export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h3 key={i} className="mt-6 font-display text-2xl tracking-tight">
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={i} className="text-[1.05rem] leading-relaxed text-pretty">
                {block.text}
              </p>
            );
          case "code":
            return <CodeBlock key={i} code={block.code} language={block.language} />;
          case "list":
            return (
              <ul key={i} className="flex list-disc flex-col gap-2 pl-5 marker:text-muted-foreground">
                {block.items.map((item, j) => (
                  <li key={j} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const t = useT();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* presse-papiers indisponible */
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-muted">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-xs text-muted-foreground">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? t("blog.code.copied") : t("blog.code.copy")}
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>{code.replace(/\n$/, "")}</code>
      </pre>
    </div>
  );
}
