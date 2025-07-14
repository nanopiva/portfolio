"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type FooterTranslations = {
  backToTop: string;
  builtWith: string;
  lastUpdate: string;
};

const translations = {
  es: {
    backToTop: "Regresar a órbita",
    builtWith: "Construido con Next.js, Tailwind y mucho",
    lastUpdate: "Última actualización:",
  },
  en: {
    backToTop: "Back to orbit",
    builtWith: "Built with Next.js, Tailwind and lots of",
    lastUpdate: "Last update:",
  },
};

export default function Footer() {
  const { lang } = useLanguage();
  const t: FooterTranslations = translations[lang];

  const [isClient, setIsClient] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  const starPositions = [2, 4, 6, 8, 2.5, 3.5, 5.5, 7.5, 3, 5, 7, 4.5];

  useEffect(() => {
    setIsClient(true);
    setCurrentYear(new Date().getFullYear());
    setLastUpdate(
      new Date().toLocaleDateString(lang === "es" ? "es-AR" : "en-US")
    );
  }, [lang]);

  return (
    <footer className="relative bg-deep py-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"></div>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -5 }}
            animate={{
              opacity: [0, 0.7, 0],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 w-1 h-1 rounded-full bg-accent"
            style={{
              left: `${i * 8}%`,
              boxShadow: `0 0 ${starPositions[i]}px #00ff38`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-1/4 left-[15%] w-1 h-1 rounded-full bg-accent/40 blur-[1px] animate-pulse"></div>
      <div className="absolute bottom-1/3 right-[20%] w-1 h-1 rounded-full bg-particle-1 blur-[1px] animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-[70%] w-1 h-1 rounded-full bg-accent/30 blur-[1px] animate-pulse delay-1500"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 flex flex-col items-center justify-center gap-4"
      >
        <div className="relative w-32 h-px my-4">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-accent/50"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10">
          <Link
            href={lang === "es" ? "#inicio" : "#home"}
            className="group text-particle-1 font-sora text-sm hover:text-accent transition-colors flex items-center"
          >
            <motion.span
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mr-2 text-accent/60"
            >
              ↑
            </motion.span>
            <span className="group-hover:underline decoration-accent/30">
              {t.backToTop}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-particle-2"
              />
            ))}
          </div>

          <p className="text-particle-1 font-sora text-sm flex items-center">
            <span className="text-accent/50 mr-1">©</span>
            {isClient && currentYear ? currentYear : "2024"} nanopiva
          </p>

          <div className="hidden md:flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-particle-2"
              />
            ))}
          </div>

          <div className="flex gap-6">
            <Link
              href="https://github.com/nanopiva"
              target="_blank"
              className="text-particle-1 hover:text-accent transition-colors group relative"
              aria-label="GitHub"
            >
              <motion.div whileHover={{ y: -3 }} className="relative">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:stroke-accent opacity-80 group-hover:opacity-100 transition-all"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                />
              </motion.div>
            </Link>

            <Link
              href="https://www.linkedin.com/in/mariano-piva-551964307/"
              target="_blank"
              className="text-particle-1 hover:text-accent transition-colors group relative"
              aria-label="LinkedIn"
            >
              <motion.div whileHover={{ y: -3 }} className="relative">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:stroke-accent opacity-80 group-hover:opacity-100 transition-all"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                />
              </motion.div>
            </Link>
          </div>
        </div>

        <motion.div className="mt-6 text-center" whileHover={{ scale: 1.02 }}>
          <p className="text-particle-2 font-sora text-xs opacity-80 hover:opacity-100 transition-opacity">
            {t.builtWith} <span className="text-accent/80">🧉</span>
          </p>
          {isClient && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] mt-1 text-particle-2 font-mono"
            >
              v1.0.0 • {t.lastUpdate}{" "}
              {lastUpdate ||
                new Date().toLocaleDateString(
                  lang === "es" ? "es-AR" : "en-US"
                )}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </footer>
  );
}
