"use client";

import * as React from "react";
import { CommandPaletteProvider } from "@/features/command-palette";
import { SectionObserverProvider } from "@/shared/hooks/use-section-observer";
import { CursorGlow } from "@/shared/ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CommandPaletteProvider>
      <SectionObserverProvider>
        <CursorGlow />
        {children}
      </SectionObserverProvider>
    </CommandPaletteProvider>
  );
}
