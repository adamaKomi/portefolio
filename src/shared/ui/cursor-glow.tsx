"use client";

import * as React from "react";

/**
 * Premium cursor-following glow.
 * Renders a fixed, pointer-events-none radial gradient that smoothly
 * trails the cursor. Hidden on touch devices and reduced-motion.
 * Inspired by Linear / Vercel hover ambiance.
 */
export function CursorGlow() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Skip on touch / reduced motion
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      // Smooth lerp toward target
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      el.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[500px] w-[500px] rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle, oklch(0.78 0.17 162 / 0.06), transparent 60%)",
        willChange: "transform, opacity",
      }}
    />
  );
}
