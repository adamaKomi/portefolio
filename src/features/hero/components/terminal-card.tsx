"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

const LINES = [
  { prompt: "adama@portfolio", text: "whoami", output: "Software Engineer · Full-Stack" },
  { prompt: "adama@portfolio", text: "cat stack.json", output: '{ "backend": ["Java","Spring Boot","NestJS","Python"], "frontend": ["Next.js","React","TypeScript"], "mobile": ["React Native"] }' },
  { prompt: "adama@portfolio", text: "ls projects/", output: "paylith/  queueclock/  parkour/" },
  { prompt: "adama@portfolio", text: "echo $FOCUS", output: "Systèmes distribués · Temps réel · SaaS" },
];

export function TerminalCard() {
  const [visibleLines, setVisibleLines] = React.useState(0);
  const [typed, setTyped] = React.useState("");

  React.useEffect(() => {
    if (visibleLines >= LINES.length) {
      const reset = setTimeout(() => {
        setVisibleLines(0);
        setTyped("");
      }, 3500);
      return () => clearTimeout(reset);
    }

    const line = LINES[visibleLines];
    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setTyped(line.text.slice(0, i));
      if (i >= line.text.length) {
        clearInterval(typeInterval);
        const next = setTimeout(() => {
          setVisibleLines((v) => v + 1);
          setTyped("");
        }, 700);
        return () => clearTimeout(next);
      }
    }, 45);

    return () => clearInterval(typeInterval);
  }, [visibleLines]);

  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute -inset-2 rounded-3xl bg-primary/10 blur-2xl opacity-60" />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <TerminalIcon className="h-3.5 w-3.5" />
            <span className="font-mono text-xs">zsh — adama@portfolio</span>
          </div>
          <span className="w-12" />
        </div>

        {/* Body */}
        <div className="min-h-[280px] p-4 font-mono text-[13px] leading-relaxed premium-scroll">
          {LINES.slice(0, visibleLines).map((line, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex gap-2">
                <span className="text-primary">➜</span>
                <span className="text-muted-foreground">{line.prompt}</span>
                <span className="text-amber-300/90">~</span>
                <span className="text-foreground">{line.text}</span>
              </div>
              <motion.pre
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 whitespace-pre-wrap text-muted-foreground text-[12px]"
              >
                {line.output}
              </motion.pre>
            </div>
          ))}

          {visibleLines < LINES.length && (
            <div className="flex gap-2">
              <span className="text-primary">➜</span>
              <span className="text-muted-foreground">{LINES[visibleLines].prompt}</span>
              <span className="text-amber-300/90">~</span>
              <span className="text-foreground">{typed}</span>
              <span className="inline-block w-2 h-4 bg-primary animate-blink" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
