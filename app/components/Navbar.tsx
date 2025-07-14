// components/Navbar.tsx
"use client";

import Link from "next/link";
import { FaLinkedin, FaGithub, FaFileAlt } from "react-icons/fa";
import { MdTranslate } from "react-icons/md";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageToggle = () => {
    if (!isChanging) {
      setIsChanging(true);
      toggleLang();
      setTimeout(() => setIsChanging(false), 500);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full py-3 px-4 sm:py-4 sm:px-6 z-50 backdrop-blur-md bg-background/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" passHref>
          <h1
            className="text-lg sm:text-2xl font-bold tracking-wide text-accent transition-transform duration-200 hover:scale-105 cursor-pointer"
            title={t("home")}
          >
            nanopiva
          </h1>
        </Link>

        <div className="flex items-center gap-2 sm:gap-6 text-lg sm:text-xl text-text">
          <button
            onClick={handleLanguageToggle}
            aria-label={t("switch_language")}
            disabled={isChanging}
            className={`flex items-center gap-1 p-1 sm:p-2 transition duration-200 hover:scale-110 ${
              isChanging ? "opacity-50" : "hover:text-accent"
            }`}
          >
            <MdTranslate />
            <span className="text-xs sm:text-sm font-medium">
              {lang.toUpperCase()}
            </span>
          </button>

          <span className="h-6 w-px bg-white/20 hidden sm:block"></span>

          <Link
            href="https://www.linkedin.com/in/mariano-piva-551964307/"
            target="_blank"
            aria-label="LinkedIn"
            className="p-1 sm:p-2 hover:text-accent transition duration-200 hover:scale-110"
          >
            <FaLinkedin />
          </Link>
          <Link
            href="https://github.com/nanopiva"
            target="_blank"
            aria-label="GitHub"
            className="p-1 sm:p-2 hover:text-accent transition duration-200 hover:scale-110 hidden min-[290px]:block"
          >
            <FaGithub />
          </Link>
          <Link
            href="/cv.pdf"
            target="_blank"
            aria-label={t("resume")}
            className="p-1 sm:p-2 hover:text-accent transition duration-200 hover:scale-110"
          >
            <FaFileAlt />
          </Link>
        </div>
      </div>
    </header>
  );
}
