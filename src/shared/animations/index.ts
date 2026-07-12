import { Variants } from "framer-motion";

/**
 * Shared Framer Motion animation variants.
 * Sober, premium, performance-friendly.
 */

export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Fade up on scroll reveal */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_PREMIUM } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_PREMIUM } },
};

/** Stagger container — children must use fadeUp or similar */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const staggerFast: Variants = staggerContainer(0.05);
export const staggerMedium: Variants = staggerContainer(0.08);
export const staggerSlow: Variants = staggerContainer(0.12);

/** Card hover lift */
export const cardHover = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.3, ease: EASE_OUT } },
};

/** Slide in from left/right */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_PREMIUM } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_PREMIUM } },
};

/** Default viewport config for whileInView */
export const viewportOnce = { once: true, margin: "-80px" } as const;

/** Overlay / modal variants */
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const overlayContentVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_PREMIUM },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.99,
    transition: { duration: 0.25, ease: EASE_OUT },
  },
};
