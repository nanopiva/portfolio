"use client";

import { useRef, useEffect, ReactElement } from "react";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaJs,
  FaCss3Alt,
  FaHtml5,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiPostgresql,
  SiSupabase,
  SiVercel,
} from "react-icons/si";

interface TechLogo {
  id: number;
  icon: ReactElement;
  name: string;
  color: string;
}

interface TechLogoMarqueeProps {
  speed?: number;
}

export default function TechLogoMarquee({ speed = 30 }: TechLogoMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const techLogos: TechLogo[] = [
    { id: 1, icon: <FaReact size={40} />, name: "React", color: "#61DAFB" },
    {
      id: 2,
      icon: <SiNextdotjs size={40} />,
      name: "Next.js",
      color: "#000000",
    },
    {
      id: 3,
      icon: <SiTypescript size={40} />,
      name: "TypeScript",
      color: "#3178C6",
    },
    { id: 4, icon: <FaNodeJs size={40} />, name: "Node.js", color: "#339933" },
    {
      id: 5,
      icon: <SiTailwindcss size={40} />,
      name: "Tailwind CSS",
      color: "#06B6D4",
    },
    { id: 6, icon: <FaJs size={40} />, name: "JavaScript", color: "#F7DF1E" },
    { id: 7, icon: <FaHtml5 size={40} />, name: "HTML5", color: "#E34F26" },
    { id: 8, icon: <FaCss3Alt size={40} />, name: "CSS3", color: "#1572B6" },
    {
      id: 9,
      icon: <SiSupabase size={40} />,
      name: "Supabase",
      color: "#3ECF8E",
    },
    {
      id: 10,
      icon: <SiPostgresql size={40} />,
      name: "PostgreSQL",
      color: "#336791",
    },
    { id: 11, icon: <FaGithub size={40} />, name: "GitHub", color: "#181717" },
    { id: 12, icon: <SiVercel size={40} />, name: "Vercel", color: "#000000" },
  ];

  const repeatedLogos: TechLogo[] = [];
  while (repeatedLogos.length < techLogos.length * 2.5) {
    for (let i = 0; i < techLogos.length; i++) {
      repeatedLogos.push(techLogos[i]);
    }
  }

  const positionRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    let animationId: number;

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPausedRef.current) {
        positionRef.current += (delta / 1000) * speed;
        const offset = positionRef.current % content.scrollWidth;
        content.style.transform = `translateX(-${offset}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  return (
    <div
      className="relative w-full overflow-hidden py-6"
      ref={containerRef}
      onMouseEnter={() => (isPausedRef.current = true)}
      onMouseLeave={() => (isPausedRef.current = false)}
    >
      <div
        ref={contentRef}
        className="flex gap-12 w-max"
        style={{ willChange: "transform" }}
      >
        {repeatedLogos.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="relative flex items-center justify-center min-w-24 h-24"
          >
            <div className="group relative" style={{ color: logo.color }}>
              <div className="transition-transform duration-300 group-hover:scale-125">
                {logo.icon}
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-y-[-4px] transition-all z-10">
                {logo.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
