"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, viewportOnce } from "@/shared/animations";
import { cn } from "@/lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}

/** Scroll-reveal wrapper using shared fadeUp variant */
export function Reveal({ children, delay = 0, className, as = "div", ...props }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewportOnce);

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
      {...(props as React.ComponentProps<typeof MotionTag>)}
    >
      {children}
    </MotionTag>
  );
}
