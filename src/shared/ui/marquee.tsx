"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

export function Marquee({ items, reverse, className, speed = "normal" }: MarqueeProps) {
  const duration = speed === "slow" ? "60s" : speed === "fast" ? "25s" : "40s";
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden mask-fade-x",
        className
      )}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-3 pr-3",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ animationDuration: duration }}
      >
        {doubled.map((item, i) => (
          <MarqueeItem key={i} label={item} />
        ))}
      </div>
      <div
        className={cn(
          "flex shrink-0 items-center gap-3 pr-3",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ animationDuration: duration }}
        aria-hidden
      >
        {doubled.map((item, i) => (
          <MarqueeItem key={i} label={item} />
        ))}
      </div>
    </div>
  );
}

function MarqueeItem({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/40 px-4 py-2 font-mono text-sm text-muted-foreground whitespace-nowrap">
      <span className="h-1 w-1 rounded-full bg-primary/60" />
      {label}
    </span>
  );
}
