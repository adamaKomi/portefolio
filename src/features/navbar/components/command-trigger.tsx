"use client";

import * as React from "react";
import { Command, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCommandPalette } from "@/features/command-palette";

export function CommandMenuTrigger() {
  const { setOpen } = useCommandPalette();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setOpen(true)}
      className="hidden lg:inline-flex h-9 gap-2 rounded-lg px-2.5 text-muted-foreground hover:text-foreground font-mono text-xs"
      aria-label="Ouvrir la palette de commandes"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="hidden xl:inline">Rechercher</span>
      <kbd className="ml-1 inline-flex h-5 items-center gap-0.5 rounded border border-border bg-muted px-1 text-[10px] font-medium">
        <Command className="h-2.5 w-2.5" />K
      </kbd>
    </Button>
  );
}
