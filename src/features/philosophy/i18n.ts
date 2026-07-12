import type { Messages } from "@/shared/i18n/messages/types";

export const messages: Messages = {
  en: {
    "philosophy.eyebrow": "Philosophy",
    "philosophy.title": "How I design software.",
    "philosophy.description":
      "Four principles guide every architectural decision I make — from the first line of code to production deployment. Not dogmas, but compasses to stay simple, evolvable and aligned with the business.",
    "philosophy.coreLabel": "// CORE PRINCIPLE",
    "philosophy.p1Title": "Clean Architecture",
    "philosophy.p1Desc":
      "Strict separation of concerns, framework independence, maximum testability. Code should express business intent.",
    "philosophy.p2Title": "Domain-Driven Design",
    "philosophy.p2Desc":
      "Model software around the business domain. Ubiquitous language, bounded contexts, aggregates.",
    "philosophy.p3Title": "Hexagonal Architecture",
    "philosophy.p3Desc":
      "Isolate the business core from technical details. Ports & adapters for total dependency inversion.",
    "philosophy.p4Title": "CQRS & Microservices",
    "philosophy.p4Desc":
      "Separate reads from writes to scale. Split into autonomous services when complexity demands it.",
  },
  fr: {
    "philosophy.eyebrow": "Philosophie",
    "philosophy.title": "Comment je conçois le logiciel.",
    "philosophy.description":
      "Quatre principes structurent chaque décision d'architecture que je prends — de la première ligne de code au déploiement en production. Ils ne sont pas des dogmes, mais des boussoles pour rester simple, évolutif et aligné sur le métier.",
    "philosophy.coreLabel": "// CORE PRINCIPLE",
    "philosophy.p1Title": "Clean Architecture",
    "philosophy.p1Desc":
      "Séparation stricte des responsabilités, indépendance des frameworks, testabilité maximale. Le code doit exprimer l'intention métier.",
    "philosophy.p2Title": "Domain-Driven Design",
    "philosophy.p2Desc":
      "Modéliser le logiciel autour du domaine métier. Ubiquitous language, bounded contexts, agrégats.",
    "philosophy.p3Title": "Architecture Hexagonale",
    "philosophy.p3Desc":
      "Isoler le cœur métier des détails techniques. Ports & adaptateurs pour une inversion de dépendances totale.",
    "philosophy.p4Title": "CQRS & Microservices",
    "philosophy.p4Desc":
      "Séparer lecture et écriture pour scaler. Découper en services autonomes quand la complexité l'exige.",
  },
};
