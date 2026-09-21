"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function Hero() {
  const [showCursor, setShowCursor] = useState(true);
  const [animateKey, setAnimateKey] = useState(0);
  const isFirstRender = useRef(true);
  const { scrollY } = useScroll();
  const { lang } = useLanguage();

  const content = {
    es: {
      greeting: "hola, soy ",
      name: "mariano",
      subtitle: "Desarrollador Java & Fullstack.",
      scrollPrompt: "deslizá",
    },
    en: {
      greeting: "hello, I'm ",
      name: "mariano",
      subtitle: "Java & Fullstack Developer.",
      scrollPrompt: "scroll",
    },
  };

  const yFloat = useSpring(useTransform(scrollY, [0, 300], [0, -100]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const opacityFade = useSpring(useTransform(scrollY, [0, 400], [1, 0]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scale = useSpring(useTransform(scrollY, [0, 300], [1, 0.8]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const particle1Y = useTransform(scrollY, [0, 500], [0, -200]);
  const particle2Y = useTransform(scrollY, [0, 500], [0, -150]);
  const particle3Y = useTransform(scrollY, [0, 500], [0, -100]);
  const particle4Y = useTransform(scrollY, [0, 500], [0, -120]);
  const particle5Y = useTransform(scrollY, [0, 500], [0, -80]);

  const scrollIndicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scrollIndicatorY = useTransform(scrollY, [0, 200], [0, 50]);
  const bgGradientOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const particles = [
    {
      className: "top-1/4 left-1/4 w-2 h-2 bg-accent/60",
      y: particle1Y,
      animate: { opacity: [0.6, 1, 0.6] },
      transition: { duration: 4, delay: 0 },
    },
    {
      className: "top-1/3 right-1/3 w-1 h-1 bg-white/80",
      y: particle2Y,
      animate: { opacity: [0.8, 0.4, 0.8] },
      transition: { duration: 3.5, delay: 1 },
    },
    {
      className: "bottom-1/4 right-1/4 w-1 h-1 bg-accent/40",
      y: particle3Y,
      animate: { opacity: [0.4, 0.8, 0.4] },
      transition: { duration: 5, delay: 2 },
    },
    {
      className: "top-1/2 left-1/6 w-1 h-1 bg-accent/30",
      y: particle4Y,
      animate: { x: [0, 10, 0], opacity: [0.3, 0.7, 0.3] },
      transition: { duration: 6, delay: 0.5 },
    },
    {
      className: "bottom-1/3 left-1/2 w-1 h-1 bg-white/60",
      y: particle5Y,
      animate: { x: [0, -8, 0], opacity: [0.6, 0.3, 0.6] },
      transition: { duration: 4.5, delay: 1.5 },
    },
  ];

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setAnimateKey((prev) => prev + 1);
  }, [lang]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const currentContent = content[lang];

  return (
    <motion.section
      key={`hero-section-${animateKey}`}
      id="inicio"
      className="h-screen flex flex-col items-center justify-center text-center px-6 md:px-6 relative overflow-hidden"
      style={{
        y: yFloat,
        opacity: opacityFade,
        scale: scale,
      }}
    >
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}-${animateKey}`}
          className={`absolute rounded-full blur-[0.5px] ${particle.className}`}
          animate={particle.animate}
          transition={particle.transition}
          style={{ y: particle.y }}
        />
      ))}

      <AnimatePresence mode="wait">
        <motion.div key={`hero-content-${animateKey}`}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl xs:text-5xl sm:text-6xl font-orbitron text-white relative z-10"
          >
            <motion.span
              className="font-medium text-white"
              animate={{ y: [0, -2, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
            >
              {`> ${currentContent.greeting}`}
            </motion.span>
            <motion.span
              className="text-accent font-bold"
              animate={{
                y: [0, -3, 0],
                textShadow: [
                  "0 0 10px rgba(0,255,56,0.3)",
                  "0 0 20px rgba(0,255,56,0.5)",
                  "0 0 10px rgba(0,255,56,0.3)",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2.5,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              {currentContent.name}
            </motion.span>
            <motion.span
              className="inline-block w-[0.4ch] h-[1em] align-bottom overflow-hidden text-accent"
              aria-hidden="true"
              animate={{ opacity: showCursor ? 1 : 0 }}
              transition={{ duration: 0.1 }}
            >
              |
            </motion.span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl xs:text-1.5xl sm:text-2xl mt-4 text-text relative z-10"
          >
            {currentContent.subtitle}
          </motion.h2>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-6 flex flex-col items-center text-text/60 z-10"
        style={{
          opacity: scrollIndicatorOpacity,
          y: scrollIndicatorY,
        }}
      >
        <motion.span
          className="text-sm mb-1"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          {currentContent.scrollPrompt}
        </motion.span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <svg
            className="w-5 h-5 text-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none"
        style={{ opacity: bgGradientOpacity }}
      />
    </motion.section>
  );
}
