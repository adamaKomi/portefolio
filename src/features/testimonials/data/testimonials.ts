/**
 * Témoignages — recommandations d'encadrants, collaborateurs et mentors.
 * Adama Komi étant un jeune diplômé, les témoignages proviennent de professeurs,
 * collaborateurs de projets et mentors techniques.
 */

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorInitials: string;
  authorRole: string;
  rating: number; // 1-5
}

export const testimonials: Testimonial[] = [
  {
    id: "pr-benjelloun",
    quote:
      "Adama fait partie des étudiants les plus rigoureux que j'ai encadrés. Sa capacité à modéliser un problème métier complexe et à le traduire en une architecture logicielle claire est remarquable. Il ne se contente pas de coder : il conçoit.",
    authorName: "Pr. Karim Benjelloun",
    authorInitials: "K.B.",
    authorRole: "Professeur en Génie Logiciel, FSTM",
    rating: 5,
  },
  {
    id: "yassine-amrani",
    quote:
      "Travailler avec Adama, c'est la garantie d'un code lisible, testé et maintenable. Il maîtrise l'art de séparer les responsabilités et anticipe les évolutions. Un véritable ingénieur, pas un simple exécutant.",
    authorName: "Yassine Amrani",
    authorInitials: "Y.A.",
    authorRole: "Lead Developer, collaborateur de projet",
    rating: 5,
  },
  {
    id: "sofia-marchetti",
    quote:
      "Sur le projet PayLith, Adama a livré une plateforme complète, de l'architecture au déploiement. Son sens du détail produit et sa réactivité en font un partenaire de confiance pour une startup.",
    authorName: "Sofia Marchetti",
    authorInitials: "S.M.",
    authorRole: "CTO, startup tech",
    rating: 5,
  },
  {
    id: "mehdi-tahiri",
    quote:
      "Ce qui distingue Adama, c'est sa curiosité pour les systèmes distribués et l'IA. Il ne s'arrête jamais à la solution évidente : il cherche la plus robuste. Un profil à suivre de près.",
    authorName: "Mehdi Tahiri",
    authorInitials: "M.T.",
    authorRole: "Mentor technique",
    rating: 5,
  },
];
