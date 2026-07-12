"use client";

import * as React from "react";
import { CommandPaletteProvider } from "@/features/command-palette";
import { SectionObserverProvider } from "@/shared/hooks/use-section-observer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CommandPaletteProvider>
      <SectionObserverProvider>{children}</SectionObserverProvider>
    </CommandPaletteProvider>
  );
}
