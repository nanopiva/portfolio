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
    id: 5,
    name: {
      es: "Citero – Gestión de turnos y reservas",
      en: "Citero – Appointment and Booking Management",
    },
    description: {
      es: "Una plataforma para que negocios que trabajan con turnos (barberías, clínicas, salones, spas) ordenen su agenda. El cliente reserva solo desde el link del negocio y elige servicio, profesional y horario entre los que quedan libres. Tiene verificación por código (OTP), recordatorios automáticos por email, invitación de empleados, un sistema de reputación con strikes para reducir las ausencias y un panel con métricas de turnos e ingresos. El backend está hecho en Java 21 con Spring Boot y PostgreSQL, y el frontend en Next.js.",
      en: "A platform for businesses that work with appointments (barbershops, clinics, salons, spas) to keep their schedule in order. Clients book on their own from the business link and pick a service, a professional and a time from the available slots. It has code verification (OTP), automatic email reminders, staff invitations, a reputation system with strikes to reduce no-shows, and a dashboard with appointment and revenue metrics. The backend is built with Java 21, Spring Boot and PostgreSQL, and the frontend with Next.js.",
    },
    image: "/projectCitero.png",
    codeUrl: "https://github.com/nanopiva/citero-backend",
    liveUrl: "https://citero.app",
    techs: [
      "Java 21",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Flyway",
      "Next.js",
      "TypeScript",
    ],
  },
  {
    id: 3,
    name: {
      es: "MutualDesk – Plataforma de escritura colaborativa",
      en: "MutualDesk – Collaborative Writing Platform",
    },
    description: {
      es: "Un editor de textos colaborativo inspirado en Google Docs. Varias personas pueden editar el mismo documento a la vez, y además la app maneja proyectos, grupos, contactos e invitaciones, autenticación con Supabase y perfil de usuario.",
      en: "A collaborative text editor inspired by Google Docs. Several people can edit the same document at once, and the app also handles projects, groups, contacts and invitations, Supabase authentication and user profiles.",
    },
    image: "/projectMutualdesk.webp",
    codeUrl: "https://github.com/nanopiva/mutualdeskapp",
    liveUrl: "https://v0-mutual-desk-v9gidesob5y.vercel.app",
    techs: ["Next.js", "TypeScript", "Supabase", "CSS Modules", "Zustand"],
  },
  {
    id: 4,
    name: {
      es: "Lumen Tools – E-commerce personalizado",
      en: "Lumen Tools – Custom E-commerce",
    },
    description: {
      es: "Un e-commerce hecho con Next.js y Supabase. La tienda tiene búsqueda y filtros por categoría, marca y precio, carrito, checkout con formulario y una compra simulada que envía el email de confirmación con Resend. El panel de administración (CMS) maneja productos, pedidos, categorías, subcategorías y marcas, y permite elegir los destacados de la home. El acceso está restringido a cuentas de administrador.",
      en: "An e-commerce built with Next.js and Supabase. The storefront has search and filters by category, brand and price, a cart, a checkout form and a simulated purchase that sends the confirmation email with Resend. The admin panel (CMS) manages products, orders, categories, subcategories and brands, and lets you pick the featured products for the home page. Access is restricted to admin accounts.",
    },
    image: "/projectLumen.webp",
    codeUrl: "https://github.com/nanopiva/lumen",
    liveUrl: "https://lumen-phi-nine.vercel.app",
    techs: ["Next.js", "TypeScript", "Supabase", "CSS Modules", "Resend"],
  },
  {
    id: 2,
    name: {
      es: "CyC Soluciones Legales - Estudio Jurídico",
      en: "CyC Legal Solutions - Law Firm",
    },
    description: {
      es: "Sitio para un estudio jurídico, con páginas de inicio, áreas de práctica, nosotros y contacto. La idea era una presencia sobria y legible, que diera confianza sin sobrecargar.",
      en: "Website for a law firm, with home, practice areas, about and contact pages. The idea was a sober, readable presence that builds trust without overloading.",
    },
    image: "/projectCyc.webp",
    codeUrl: "https://github.com/nanopiva/cycestudio",
    liveUrl: "https://www.cycsolucioneslegales.com.ar",
    techs: ["Next.js", "TypeScript", "CSS Modules", "SEO"],
  },
  {
    id: 1,
    name: {
      es: "Koble - Asesoramiento empresarial y CRM",
      en: "Koble - Business Consulting and CRM",
    },
    description: {
      es: "Sitio para una consultora que implementa sistemas CRM. Tiene páginas de servicios, nosotros y contacto, además de las legales, con una navegación simple y contenido directo.",
      en: "Website for a consulting firm that implements CRM systems. It has services, about and contact pages, plus the legal ones, with simple navigation and straightforward content.",
    },
    image: "/projectKoble.webp",
    codeUrl: "https://github.com/nanopiva/koble",
    liveUrl: "https://koble.com.ar",
    techs: ["Next.js", "TypeScript", "CSS Modules", "SEO"],
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
