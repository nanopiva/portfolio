"use client";
import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 100;
const MAX_DISTANCE = 100;

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

    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-particle-1")
        .trim(),
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-particle-2")
        .trim(),
    ];

    const createParticles = () => {
      particles.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        color: colors[i % colors.length],
      }));
    };

    createParticles();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-background")
        .trim();
      ctx.fillRect(0, 0, width, height);

      particles.current.forEach((p) => {
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
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        backgroundColor: "var(--color-background)",
      }}
    />
  );
}
