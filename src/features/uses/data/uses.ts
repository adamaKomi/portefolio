/**
 * Données de la section "Uses" — setup quotidien d'Adama Komi.
 *
 * Inspiré des pages /uses de Linear, Vercel, Raycast : liste crédible
 * d'outils qu'un ingénieur full-stack utilise au quotidien.
 *
 * Le champ `icon` stocke directement le composant LucideIcon — plus simple
 * et type-safe (pas de map string → composant à maintenir côté composant).
 */
import {
  Code2,
  Database,
  Monitor,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export interface UsesItem {
  name: string;
  description?: string;
}

export interface UsesCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  /** Catégorie mise en avant : carte full-width en haut de section. */
  featured?: boolean;
  items: UsesItem[];
}

export const usesCategories: UsesCategory[] = [
  {
    id: "editor-terminal",
    title: "Éditeur & terminal",
    icon: Terminal,
    featured: true,
    items: [
      {
        name: "Neovim",
        description: "Éditeur principal, configuré en Lua, LSP & Treesitter.",
      },
      {
        name: "VS Code",
        description: "Pour le frontend React/Next.js et le débogage.",
      },
      {
        name: "WezTerm",
        description: "Terminal GPU-acceléré, multiplexeur puissant.",
      },
      {
        name: "Tmux",
        description: "Sessions persistantes sur serveurs.",
      },
      {
        name: "Zsh + Starship",
        description: "Prompt shell minimal et informatif.",
      },
    ],
  },
  {
    id: "languages-frameworks",
    title: "Langages & frameworks",
    icon: Code2,
    items: [
      {
        name: "TypeScript",
        description: "Partout, côté frontend comme backend.",
      },
      {
        name: "Java + Spring Boot",
        description: "Backend d'entreprise, API REST, microservices.",
      },
      {
        name: "Node.js + NestJS",
        description: "APIs structurées, temps réel WebSockets.",
      },
      {
        name: "Python + FastAPI",
        description: "Scripts, prototypage, ML.",
      },
      {
        name: "React + Next.js",
        description: "Frontend SSR/SSG, Server Components.",
      },
    ],
  },
  {
    id: "databases-infra",
    title: "Bases de données & infra",
    icon: Database,
    items: [
      {
        name: "PostgreSQL",
        description: "Relationnel par défaut, JSONB, CTE.",
      },
      {
        name: "Redis",
        description: "Cache, pub/sub, compteurs atomiques.",
      },
      {
        name: "MongoDB",
        description: "Quand le schéma évolue vite.",
      },
      {
        name: "Docker",
        description: "Conteneurs locaux et production.",
      },
      {
        name: "Git + GitHub",
        description: "Flow Git, PRs, Actions CI.",
      },
    ],
  },
  {
    id: "tools-productivity",
    title: "Outils & productivité",
    icon: Sparkles,
    items: [
      {
        name: "Raycast",
        description: "Launcher macOS, snippets, scripts.",
      },
      {
        name: "Linear",
        description: "Gestion de projets, issues, sprints.",
      },
      {
        name: "Figma",
        description: "Maquettes, design system.",
      },
      {
        name: "TablePlus",
        description: "Client DB graphique multi-SGBD.",
      },
      {
        name: "Obsidian",
        description: "Notes techniques, seconde cerveau.",
      },
    ],
  },
  {
    id: "hardware-setup",
    title: "Setup matériel",
    icon: Monitor,
    items: [
      {
        name: 'MacBook Pro 14" M2 Pro',
        description: "Machine principale.",
      },
      {
        name: "LG 27UP850",
        description: "Moniteur 4K externe.",
      },
      {
        name: "Keychron K2",
        description: "Clavier mécanique sans fil.",
      },
      {
        name: "Logitech MX Master 3S",
        description: "Souris multi-appareils.",
      },
      {
        name: "AirPods Pro",
        description: "Focus en open-space.",
      },
    ],
  },
];

/** Catégorie mise en avant (full-width featured card). */
export const featuredUsesCategory: UsesCategory =
  usesCategories.find((c) => c.featured) ?? usesCategories[0];

/** Catégories régulières (grille 2×2 sous la featured). */
export const regularUsesCategories: UsesCategory[] = usesCategories.filter(
  (c) => !c.featured,
);

/** Compteurs globaux (utiles pour les mono labels). */
export const usesStats = {
  categories: usesCategories.length,
  items: usesCategories.reduce((acc, c) => acc + c.items.length, 0),
};
