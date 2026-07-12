"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowUpRight,
  User,
  FolderGit2,
  Mail,
  Code2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Github,
  Linkedin,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { navSections, profile, socials } from "@/shared/constants/profile";
import { cn } from "@/lib/utils";

interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommandPaletteContext = React.createContext<CommandPaletteContextValue | null>(null);

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandPaletteDialog open={open} onOpenChange={setOpen} />
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const ctx = React.useContext(CommandPaletteContext);
  if (!ctx) throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  return ctx;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CommandPaletteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { setTheme } = useTheme();
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const runNav = (id: string) => {
    onOpenChange(false);
    setTimeout(() => scrollTo(id), 100);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]"
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <CommandPrimitive
              className="flex flex-col"
              loop
              shouldFilter
              value={search}
              onValueChange={setSearch}
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <CommandPrimitive.Input
                  placeholder="Rechercher une section, un projet, un lien..."
                  className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <CommandPrimitive.List className="max-h-[60vh] overflow-y-auto p-2 premium-scroll">
                <CommandPrimitive.Empty className="py-8 text-center text-sm text-muted-foreground">
                  Aucun résultat pour « {search} »
                </CommandPrimitive.Empty>

                <CommandGroup title="Navigation">
                  {navSections.map((s) => (
                    <CommandItem key={s.id} onSelect={() => runNav(s.id)} icon={<SectionIcon id={s.id} />}>
                      <span>{s.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandGroup title="Projets">
                  <CommandItem
                    onSelect={() => runNav("projects")}
                    icon={<FolderGit2 className="h-4 w-4" />}
                  >
                    Voir tous les projets
                  </CommandItem>
                </CommandGroup>

                <CommandGroup title="Liens">
                  <CommandItem
                    onSelect={() => {
                      onOpenChange(false);
                      window.open(socials[0].href, "_blank");
                    }}
                    icon={<Github className="h-4 w-4" />}
                  >
                    GitHub
                    <ArrowRight />
                  </CommandItem>
                  <CommandItem
                    onSelect={() => {
                      onOpenChange(false);
                      window.open(socials[1].href, "_blank");
                    }}
                    icon={<Linkedin className="h-4 w-4" />}
                  >
                    LinkedIn
                    <ArrowRight />
                  </CommandItem>
                  <CommandItem
                    onSelect={() => runNav("contact")}
                    icon={<Mail className="h-4 w-4" />}
                  >
                    Me contacter
                  </CommandItem>
                </CommandGroup>

                <CommandGroup title="Apparence">
                  <CommandItem
                    onSelect={() => {
                      setTheme("dark");
                      onOpenChange(false);
                    }}
                    icon={<Moon className="h-4 w-4" />}
                  >
                    Thème sombre
                  </CommandItem>
                  <CommandItem
                    onSelect={() => {
                      setTheme("light");
                      onOpenChange(false);
                    }}
                    icon={<Sun className="h-4 w-4" />}
                  >
                    Thème clair
                  </CommandItem>
                </CommandGroup>
              </CommandPrimitive.List>

              <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
                <span className="font-mono">
                  {profile.firstName}
                  <span className="text-primary">.</span> portfolio
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border bg-muted px-1 font-mono">↑↓</kbd>
                    naviguer
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border bg-muted px-1 font-mono">↵</kbd>
                    ouvrir
                  </span>
                </div>
              </div>
            </CommandPrimitive>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionIcon({ id }: { id: string }) {
  const map: Record<string, React.ReactNode> = {
    about: <User className="h-4 w-4" />,
    philosophy: <Sparkles className="h-4 w-4" />,
    skills: <Code2 className="h-4 w-4" />,
    projects: <FolderGit2 className="h-4 w-4" />,
    experience: <Briefcase className="h-4 w-4" />,
    education: <GraduationCap className="h-4 w-4" />,
    contact: <Mail className="h-4 w-4" />,
  };
  return <>{map[id] ?? <ArrowUpRight className="h-4 w-4" />}</>;
}

function ArrowRight() {
  return <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />;
}

function CommandGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <CommandPrimitive.Group
      heading={title}
      className={cn(
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
        "[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px]",
        "[&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider",
        "[&_[cmdk-group-heading]]:text-muted-foreground"
      )}
    >
      {children}
    </CommandPrimitive.Group>
  );
}

function CommandItem({
  onSelect,
  icon,
  children,
}: {
  onSelect: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <CommandPrimitive.Item
      onSelect={onSelect}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm",
        "data-[selected=true]:bg-primary/10 data-[selected=true]:text-foreground",
        "transition-colors outline-none"
      )}
    >
      <span className="text-muted-foreground data-[selected=true]:text-primary">
        {icon}
      </span>
      <span className="flex-1">{children}</span>
    </CommandPrimitive.Item>
  );
}
