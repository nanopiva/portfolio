"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

type Language = "es" | "en";

export type TranslationKey = "home" | "switch_language" | "resume" | "projects";

type Translations = {
  [key in TranslationKey]: string;
};

type LanguageTranslations = {
  [lang in Language]: Translations;
};

const translations: LanguageTranslations = {
  es: {
    home: "Inicio",
    switch_language: "Cambiar a inglés",
    resume: "Currículum",
    projects: "proyectos",
  },
  en: {
    home: "Home",
    switch_language: "Switch to Spanish",
    resume: "Resume",
    projects: "projects",
  },
};

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "es",
  toggleLang: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({
  children,
  initialLang = "es",
}: {
  children: React.ReactNode;
  initialLang?: Language;
}) => {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("lang") as Language | null;
      return savedLang || initialLang;
    }
    return initialLang;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang;
      document.cookie = `lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "es" ? "en" : "es"));
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => translations[lang][key],
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
