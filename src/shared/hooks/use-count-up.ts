"use client";

import * as React from "react";
import { useInView } from "framer-motion";

/**
 * Animated counter that counts up from 0 to target when scrolled into view.
 * Handles numeric values with optional suffix (e.g. "5+", "12+", "∞").
 * Non-numeric values (like "∞") are returned as-is.
 */
export function useCountUp(
  target: string,
  options?: { duration?: number; delay?: number }
) {
  const { duration = 1600, delay = 0 } = options ?? {};
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = React.useState(target);

  // Extract numeric part and suffix
  const parsed = React.useMemo(() => {
    const match = target.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return null;
    return { num: parseFloat(match[1]), suffix: match[2] };
  }, [target]);

  React.useEffect(() => {
    if (!inView || !parsed) {
      setDisplay(target);
      return;
    }
    const { num, suffix } = parsed;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, elapsed / duration);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      setDisplay(`${Math.round(current)}${suffix}`);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, target, duration, delay]);

  return { ref, display };
}
