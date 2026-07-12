/**
 * Profil central d'Adama Komi.
 * Source unique de vérité partagée entre toutes les features.
 */

export const profile = {
  name: "Adama Komi",
  firstName: "Adama",
  lastName: "Komi",
  title: "Software Engineer",
  subtitle: "Full-Stack Developer",
  tagline: "Je conçois et déploie des applications complètes — de l'analyse métier à la production.",
  description:
    "Ingénieur logiciel diplômé en Génie Logiciel de la FSTM (Université Hassan II de Casablanca). Je construis des systèmes distribués, des applications temps réel et des plateformes SaaS robustes, avec une obsession : l'architecture propre et la maintenabilité.",
  location: "Casablanca, Maroc",
  timezone: "Africa/Casablanca",
  available: true,
  availabilityLabel: "Disponible pour opportunités",
  email: "hello@adama-komi.dev",
  resumeUrl: "#",
} as const;

export const socials = [
  { name: "GitHub", href: "https://github.com/adama-komi", handle: "@adama-komi", icon: "github" },
  { name: "LinkedIn", href: "https://linkedin.com/in/adama-komi", handle: "in/adama-komi", icon: "linkedin" },
  { name: "Email", href: "mailto:hello@adama-komi.dev", handle: "hello@adama-komi.dev", icon: "mail" },
] as const;

export const navSections = [
  { id: "about", label: "À propos" },
  { id: "philosophy", label: "Philosophie" },
  { id: "skills", label: "Compétences" },
  { id: "projects", label: "Projets" },
  { id: "experience", label: "Parcours" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Sections affichées dans le rail latéral (indicateur de progression vertical).
 * Inclut toutes les sections majeures de la page, dans l'ordre d'apparition.
 */
export const railSections = [
  { id: "hero", label: "Hero", index: "01" },
  { id: "about", label: "À propos", index: "02" },
  { id: "philosophy", label: "Philosophie", index: "03" },
  { id: "skills", label: "Compétences", index: "04" },
  { id: "technologies", label: "Stack", index: "05" },
  { id: "projects", label: "Projets", index: "06" },
  { id: "experience", label: "Parcours", index: "07" },
  { id: "testimonials", label: "Recommandations", index: "08" },
  { id: "education", label: "Formation", index: "09" },
  { id: "uses", label: "Uses", index: "10" },
  { id: "blog", label: "Blog", index: "11" },
  { id: "what-im-looking-for", label: "Opportunités", index: "12" },
  { id: "contact", label: "Contact", index: "13" },
] as const;

export const stats = [
  { value: "5+", label: "Ans de pratique", sub: "Projets académiques & personnels" },
  { value: "3", label: "Projets majeurs", sub: "SaaS, temps réel, mobile" },
  { value: "12+", label: "Technologies", sub: "Backend, Frontend, Mobile, DB" },
  { value: "∞", label: "Curiosité", sub: "Architecture, IA, systèmes distribués" },
] as const;
