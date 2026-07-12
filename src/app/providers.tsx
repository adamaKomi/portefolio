"use client";

import * as React from "react";
import { CommandPaletteProvider } from "@/features/command-palette";
import { SectionObserverProvider } from "@/shared/hooks/use-section-observer";
import { CursorGlow } from "@/shared/ui";
import { ShortcutsHelp } from "@/features/shortcuts";
import { LanguageProvider, messages } from "@/shared/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider messages={messages}>
      <CommandPaletteProvider>
        <SectionObserverProvider>
          <CursorGlow />
          {children}
          <ShortcutsHelp />
        </SectionObserverProvider>
      </CommandPaletteProvider>
    </LanguageProvider>
  );
}
