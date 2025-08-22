"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import aboutPicture from "../../public/Foto de Nano.jpg";
import TecnologiasScroll from "../components/TecnologiasScroll";
import { useLanguage } from "../contexts/LanguageContext";

interface AboutMeContent {
  title: string;
  intro: string;
  passion: string;
  strength: string;
  languages: string;
  highlighted: {
    [key: string]: string;
  };
}

export default function AboutMe() {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  const { lang } = useLanguage();

  const content: Record<"es" | "en", AboutMeContent> = {
    es: {
      title: "sobre_mí",
      intro:
        "Soy Mariano Piva, un desarrollador fullstack argentino, curioso por naturaleza y {autodidacta} desde hace años. Actualmente estoy estudiando la {carrera}, combinando formación académica con práctica constante.",
      passion:
        "Me apasiona crear {interfaces} limpias, funcionales y con una experiencia de usuario cuidada al detalle. Actualmente desarrollo {proyectos} utilizando:",
      strength:
        "Mi mayor fortaleza es el aprendizaje constante a través de la práctica, enfocándome en construir aplicaciones modernas que integren tanto diseño cuidado como lógica robusta del lado del cliente y del servidor.",
      languages: "Hablo {español} (nativo), {inglés} e {italiano} con fluidez.",
      highlighted: {
        autodidacta: "autodidacta",
        carrera: "Tecnicatura en Desarrollo de Software",
        interfaces: "interfaces",
        proyectos: "proyectos fullstack",
        español: "español",
        inglés: "inglés",
        italiano: "italiano",
      },
    },
    en: {
      title: "about_me",
      intro:
        "I'm Mariano Piva, a fullstack developer from Argentina, naturally curious and a {selfTaught} learner for years. I am currently studying a {degree}, combining academic training with constant practice.",
      passion:
        "I'm passionate about creating clean and functional {interfaces} with carefully detailed user experience. Currently developing {projects} using:",
      strength:
        "My greatest strength is continuous learning through practice, focusing on building modern applications that integrate both careful design and robust client-side and server-side logic.",
      languages:
        "I speak {spanish} (native), {english} and {italian} fluently.",
      highlighted: {
        selfTaught: "self-taught",
        degree: "Technical Degree in Software Development",
        interfaces: "interfaces",
        projects: "fullstack projects",
        spanish: "Spanish",
        english: "English",
        italian: "Italian",
      },
    },
  };

  const renderText = (text: string, highlights: Record<string, string>) => {
    const parts = text.split(/(\{[^}]+\})/g);

    return parts.map((part, i) => {
      if (part.startsWith("{") && part.endsWith("}")) {
        const key = part.slice(1, -1);
        return (
          <span key={i} className="text-accent">
            {highlights[key] || key}
          </span>
        );
      }
      return part;
    });
  };

  const currentContent = content[lang];

  return (
    <section
      ref={ref}
      className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-accent/60 blur-[1px] animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-white/80 blur-[1px] animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1 h-1 rounded-full bg-accent/40 blur-[1px] animate-pulse delay-1500"></div>
      <AnimatePresence mode="wait">
        {inView && (
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1 }}
            className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-8 md:gap-12 bg-transparent float-slow"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.3 }}
              className="w-full lg:w-2/5 flex justify-center relative mb-8 lg:mb-0 order-1 lg:order-2"
            >
              <div className="absolute w-72 h-72 bg-[#00ff38]/10 rounded-full blur-2xl -top-24 -left-16 z-0 float-slow hidden lg:block"></div>
              <div className="absolute w-60 h-60 bg-[#89f0ff]/10 rounded-full blur-2xl -bottom-16 -right-8 z-0 float-slow delay-1000 hidden lg:block"></div>
              <div className="absolute w-64 h-64 bg-[#837c9b]/10 rounded-full blur-2xl top-8 right-24 z-0 float-slow delay-2000 hidden lg:block"></div>
              <div className="absolute w-40 h-40 bg-white/5 rounded-full blur-2xl bottom-0 left-16 z-0 float-slow delay-3000 hidden lg:block"></div>

              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[360px] lg:h-[360px] rounded-2xl overflow-hidden border border-accent/30 shadow-[0_0_20px_-5px_theme(colors.accent/40)] sm:shadow-[0_0_40px_-10px_theme(colors.accent/40)] z-10 group backdrop-blur-sm bg-deep/60">
                <Image
                  src={aboutPicture}
                  alt={
                    lang === "es"
                      ? "Foto de Mariano Piva"
                      : "Photo of Mariano Piva"
                  }
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </motion.div>

            <div className="w-full lg:w-3/5 text-text/90 font-sora px-2 sm:px-0 order-2 lg:order-1">
              <div className="relative inline-block mb-6 md:mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-wide font-orbitron text-text">
                  <span className="relative z-10 px-2">
                    <span className="text-accent">/</span>
                    {currentContent.title}
                  </span>
                </h2>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/30"></div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <motion.p
                  className="text-base sm:text-lg leading-relaxed text-text/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {renderText(currentContent.intro, currentContent.highlighted)}
                </motion.p>

                <motion.p
                  className="text-base sm:text-lg leading-relaxed text-text/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {renderText(
                    currentContent.passion,
                    currentContent.highlighted
                  )}
                </motion.p>

                <motion.ul
                  className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 mb-6 max-w-md"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.4,
                      },
                    },
                  }}
                >
                  {[
                    "Next.js",
                    "React",
                    "JavaScript",
                    "TypeScript",
                    "C++",
                    "PostgreSQL",
                    "Supabase",
                  ].map((tech) => (
                    <motion.li
                      key={tech}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="flex items-center text-sm sm:text-base"
                    >
                      <span className="text-accent mr-2">▹</span>
                      <span className="font-mono text-text/90">{tech}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.p
                  className="text-base sm:text-lg leading-relaxed text-text/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {currentContent.strength}
                </motion.p>

                <motion.p
                  className="text-base sm:text-lg leading-relaxed text-text/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {renderText(
                    currentContent.languages,
                    currentContent.highlighted
                  )}
                </motion.p>
              </div>

              <div className="mt-8 sm:mt-10">
                <TecnologiasScroll />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes float-slow {
          0% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-6px) scale(1.015);
          }
          100% {
            transform: translateY(0px) scale(1);
          }
        }

        .float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
