"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * TechConstellation — animated interactive network of tech nodes.
 * Nodes drift slowly; connections appear between nearby nodes.
 * Mouse hover attracts nearby nodes (subtle parallax).
 * Pure canvas for performance, no dependencies.
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  category: "backend" | "frontend" | "mobile" | "infra";
}

const CATEGORY_COLORS: Record<Node["category"], string> = {
  backend: "oklch(0.78 0.17 162)", // emerald
  frontend: "oklch(0.82 0.16 80)", // amber
  mobile: "oklch(0.75 0.15 195)", // teal
  infra: "oklch(0.65 0.01 250)", // muted
};

const TECHS: Omit<Node, "x" | "y" | "vx" | "vy">[] = [
  { label: "Next.js", radius: 5, category: "frontend" },
  { label: "React", radius: 5, category: "frontend" },
  { label: "TypeScript", radius: 6, category: "frontend" },
  { label: "Spring Boot", radius: 6, category: "backend" },
  { label: "NestJS", radius: 5, category: "backend" },
  { label: "Node.js", radius: 5, category: "backend" },
  { label: "Python", radius: 4, category: "backend" },
  { label: "PostgreSQL", radius: 5, category: "infra" },
  { label: "Redis", radius: 4, category: "infra" },
  { label: "MongoDB", radius: 4, category: "infra" },
  { label: "Docker", radius: 5, category: "infra" },
  { label: "React Native", radius: 5, category: "mobile" },
  { label: "WebSockets", radius: 4, category: "backend" },
  { label: "Java", radius: 5, category: "backend" },
];

const CONNECT_DISTANCE = 140;
const MOUSE_RADIUS = 120;

export function TechConstellation() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouseRef = React.useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const nodesRef = React.useRef<Node[]>([]);

  // Initialize nodes
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Create nodes with random positions
    nodesRef.current = TECHS.map((tech) => ({
      ...tech,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < node.radius || node.x > rect.width - node.radius) {
          node.vx *= -1;
          node.x = Math.max(node.radius, Math.min(rect.width - node.radius, node.x));
        }
        if (node.y < node.radius || node.y > rect.height - node.radius) {
          node.vy *= -1;
          node.y = Math.max(node.radius, Math.min(rect.height - node.radius, node.y));
        }

        // Mouse attraction (subtle pull toward cursor)
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * 0.5;
            node.vx += (dx / dist) * force * 0.02;
            node.vy += (dy / dist) * force * 0.02;
          }
        }

        // Damping
        node.vx *= 0.99;
        node.vy *= 0.99;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            const opacity = (1 - dist / CONNECT_DISTANCE) * 0.25;
            ctx.strokeStyle = `oklch(0.78 0.17 162 / ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes + labels
      for (const node of nodes) {
        const color = CATEGORY_COLORS[node.category];
        // Glow
        ctx.fillStyle = color.replace(")", " / 0.15)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
        // Core
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        // Label
        ctx.fillStyle = "oklch(0.7 0.01 250)";
        ctx.font = "10px var(--font-geist-mono), monospace";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y - node.radius - 6);
      }

      raf = requestAnimationFrame(animate);
    };
    animate();

    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        active: true,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1 }}
      className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm"
    >
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />
      {/* Legend overlay */}
      <div className="pointer-events-none absolute bottom-3 left-4 flex flex-wrap gap-3">
        {(["backend", "frontend", "mobile", "infra"] as const).map((cat) => (
          <span key={cat} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[cat] }}
            />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {cat}
            </span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
