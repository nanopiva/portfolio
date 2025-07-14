"use client";

import { motion } from "framer-motion";
import { AnimatedProject } from "./AnimatedProject";
import { useLanguage } from "../contexts/LanguageContext";

type Project = {
  id: number;
  name: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  image: string;
  codeUrl: string;
  liveUrl: string;
  techs: string[];
};

const projectData: Project[] = [
  {
    id: 3,
    name: {
      es: "MutualDesk – Plataforma de escritura colaborativa",
      en: "MutualDesk – Collaborative Writing Platform",
    },
    description: {
      es: "Aplicación web tipo Google Docs desarrollada desde cero para fomentar la colaboración en tiempo real entre usuarios. Permite crear y editar documentos de forma grupal, gestionar miembros, organizar proyectos y comunicarse mediante un sistema de chat integrado. El foco está puesto en la experiencia de usuario, la interacción fluida y la sincronización eficiente de datos.",
      en: "Google Docs-like web application developed from scratch to foster real-time collaboration among users. It allows creating and editing documents in groups, managing members, organizing projects, and communicating through an integrated chat system. The focus is on user experience, smooth interaction, and efficient data synchronization.",
    },
    image: "/projectMutualdesk.webp",
    codeUrl: "https://github.com/nanopiva/mutualdeskapp",
    liveUrl: "https://v0-mutual-desk-v9gidesob5y.vercel.app",
    techs: [
      "Next.js",
      "TypeScript",
      "Supabase (auth, base de datos y almacenamiento)",
      "Lexical (editor de texto en tiempo real)",
      "CSS Modules",
    ],
  },
  {
    id: 4,
    name: {
      es: "Lumen Tools – E-commerce personalizado",
      en: "Lumen Tools – Custom E-commerce",
    },
    description: {
      es: "Proyecto de e-commerce desarrollado desde cero utilizando Next.js y Supabase. Incluye frontend con filtros dinámicos, carrito persistente, vista de producto y checkout simulado, además de un panel de administración privado con gestión completa de productos, categorías y marcas.",
      en: "E-commerce project built from scratch using Next.js and Supabase. It includes a frontend with dynamic filters, persistent cart, product view and simulated checkout, as well as a private admin panel with full product, category and brand management.",
    },
    image: "/projectLumen.webp",
    codeUrl: "https://github.com/nanopiva/lumen",
    liveUrl: "https://lumen-phi-nine.vercel.app",
    techs: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "CSS Modules",
      "Framer Motion",
      "RESEND",
    ],
  },
  {
    id: 2,
    name: {
      es: "CyC Soluciones Legales - Estudio Jurídico",
      en: "CyC Legal Solutions - Law Firm",
    },
    description: {
      es: "Sitio institucional para un estudio jurídico integral. El objetivo fue crear una presencia web profesional y elegante. Se priorizó la legibilidad, la confianza visual y una estética sobria acorde al rubro legal.",
      en: "Institutional website for a comprehensive law firm. The goal was to create a professional and elegant web presence. We prioritized readability, visual trustworthiness, and a sober aesthetic appropriate for the legal field.",
    },
    image: "/projectCyc.webp",
    codeUrl: "https://github.com/nanopiva/cycestudio",
    liveUrl: "https://www.cycsolucioneslegales.com.ar",
    techs: ["Next.js", "Framer Motion", "Tailwind", "SEO"],
  },
  {
    id: 1,
    name: {
      es: "Koble - Asesoramiento empresarial y CRM",
      en: "Koble - Business Consulting and CRM",
    },
    description: {
      es: "Landing page desarrollada para una consultora especializada en potenciar la eficiencia de empresas mediante asesorías personalizadas e implementación de sistemas CRM. El diseño busca transmitir claridad, profesionalismo y cercanía, con una navegación simple y contenido directo.",
      en: "Landing page developed for a consulting firm specializing in enhancing business efficiency through personalized advice and CRM system implementation. The design aims to convey clarity, professionalism, and approachability with simple navigation and straightforward content.",
    },
    image: "/projectKoble.webp",
    codeUrl: "https://github.com/nanopiva/koble",
    liveUrl: "https://koble.com.ar",
    techs: ["Next.js", "TypeScript", "CSS Modules", "Framer Motion"],
  },
];

export default function Projects() {
  const { lang, t } = useLanguage();

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 md:py-16 relative overflow-hidden">
      <div className="absolute top-1/4 left-[15%] w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent/60 blur-[1px] animate-pulse"></div>
      <div className="absolute top-1/3 right-[15%] w-1 h-1 rounded-full bg-white/80 blur-[1px] animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 right-[15%] w-1 h-1 rounded-full bg-accent/40 blur-[1px] animate-pulse delay-1500"></div>

      <motion.div
        key={`projects-container-${lang}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl w-full flex flex-col items-start gap-12 md:gap-16"
      >
        <div className="relative inline-block mb-2 md:mb-4 w-full">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold tracking-wide font-orbitron text-text text-center md:text-left">
            <span className="relative z-10 px-2 lowercase">
              <span className="text-accent">/</span>
              {t("projects")}
            </span>
          </h2>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/30"></div>
        </div>

        <div className="w-full flex flex-col gap-16 sm:gap-20 md:gap-24 px-2 sm:px-0">
          {projectData.map((project, index) => (
            <AnimatedProject
              key={`${project.id}-${lang}`}
              project={{
                ...project,
                name: project.name[lang],
                description: project.description[lang],
              }}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
