"use client";
import { useEffect, useRef } from "react";

const MAX_DISTANCE = 100;
const MAX_DPR = 2;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
};

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const rootStyles = getComputedStyle(document.documentElement);
    const backgroundColor =
      rootStyles.getPropertyValue("--color-background").trim() || "#0a0f1c";
    const colors = [
      rootStyles.getPropertyValue("--color-particle-1").trim() || "#b5b5c3",
      rootStyles.getPropertyValue("--color-particle-2").trim() || "#837c9b",
    ];

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const getParticleCount = () => {
      if (width < 640) return 35;
      if (width < 1024) return 60;
      return 90;
    };

    const createParticles = () => {
      const count = getParticleCount();
      particles.current = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        color: colors[i % colors.length],
      }));
    };

    resizeCanvas();
    createParticles();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    let animationId = 0;
    let isRunning = true;

    const draw = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles.current) {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DISTANCE) {
          const angle = Math.atan2(dy, dx);
          const force = (MAX_DISTANCE - dist) / MAX_DISTANCE;
          p.vx -= Math.cos(angle) * force * 0.4;
          p.vy -= Math.sin(angle) * force * 0.4;
        }

        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "66";
        ctx.fill();
      }
    };

    const animate = () => {
      draw();
      if (isRunning) {
        animationId = requestAnimationFrame(animate);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationId);
      } else if (!isRunning) {
        isRunning = true;
        animationId = requestAnimationFrame(animate);
      }
    };

    if (prefersReducedMotion) {
      draw();
    } else {
      animationId = requestAnimationFrame(animate);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        backgroundColor: "var(--color-background)",
      }}
    />
  );
}
