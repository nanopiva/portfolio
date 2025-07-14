"use client";

import { FiGithub, FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { motion } from "framer-motion";

type ProjectProps = {
  id: number;
  name?: string;
  description?: string;
  image?: string;
  codeUrl?: string;
  liveUrl?: string;
  techs?: string[];
};

export default function Project({
  id = 0,
  name = "Nombre del Proyecto",
  description = "Descripción breve del proyecto destacando qué resuelve o qué tecnologías emplea.",
  image = "/placeholder.svg",
  codeUrl = "#",
  liveUrl = "#",
  techs = ["Next.js", "Tailwind", "TypeScript", "Supabase"],
}: ProjectProps) {
  const isReversed = id % 2 === 0;

  return (
    <div
      className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-6 md:gap-8 w-full`}
    >
      <div className="relative w-full lg:w-1/2 h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden border border-accent/30 shadow-lg group">
        <Image
          src={image || "/placeholder.svg"}
          alt={`Preview de ${name}`}
          fill
          style={{ objectFit: "cover" }}
          className="group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={id <= 2}
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
        <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/40 rounded-xl transition-colors duration-500"></div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center py-2 md:py-4 px-2 sm:px-0">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold font-orbitron text-text mb-2 sm:mb-3">
          {name}
        </h3>

        <p className="text-text/80 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
          {description}
        </p>

        <div className="flex items-center gap-4 sm:gap-6 mb-3 sm:mb-4">
          <motion.a
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Ver código en GitHub"
          >
            <FiGithub
              size={20}
              className="text-accent hover:text-accent/80 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(0,255,56,0.3)]"
            />
          </motion.a>

          <motion.a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Ver proyecto en vivo"
          >
            <FiExternalLink
              size={20}
              className="text-accent hover:text-accent/80 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(0,255,56,0.3)]"
            />
          </motion.a>
        </div>

        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <ul className="flex gap-2 sm:gap-3 w-max py-2 sm:py-3 px-1">
            {techs.map((tech, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-deep/80 text-accent font-mono text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-md border border-accent/30 whitespace-nowrap shadow-[0_0_10px_rgba(0,255,56,0.1)] hover:border-accent/50 hover:shadow-[0_0_15px_rgba(0,255,56,0.15)] transition-all duration-300"
              >
                {tech}
              </motion.li>
            ))}
          </ul>
        </div>

        <style jsx>{`
          .overflow-x-auto {
            scrollbar-width: thin;
            scrollbar-color: var(--color-accent) var(--color-background);
          }

          .overflow-x-auto::-webkit-scrollbar {
            height: 4px;
            background-color: var(--color-background);
          }

          .overflow-x-auto::-webkit-scrollbar-thumb {
            background-color: var(--color-accent);
            border-radius: 3px;
          }

          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background-color: var(--color-accent);
            opacity: 0.8;
          }
        `}</style>
      </div>
    </div>
  );
}
