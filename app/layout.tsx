import "./globals.css";
import { Sora, Orbitron } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Background from "./components/Background";
import { LanguageProvider } from "./contexts/LanguageContext";
import { cookies } from "next/headers";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Mariano Piva - Portfolio",
  description:
    "Portfolio de Mariano Piva, desarrollador de software argentino. Trabajo principalmente con Java y Spring Boot, y también con React y Next.js.",
  keywords: [
    "Mariano Piva",
    "Java Developer",
    "Spring Boot",
    "Fullstack Developer",
    "Next.js",
    "React",
    "PostgreSQL",
    "Portfolio",
  ],
  authors: [{ name: "Mariano Piva", url: "https://github.com/nanopiva" }],
  creator: "Mariano Piva",
  openGraph: {
    type: "website",
    locale: "es_AR",
    title: "Mariano Piva — Desarrollador Java & Fullstack",
    description:
      "Desarrollador de software argentino. Java, Spring Boot y PostgreSQL en el backend; React y Next.js cuando hace falta.",
    siteName: "nanopiva",
  },
  twitter: {
    card: "summary",
    title: "Mariano Piva — Desarrollador Java & Fullstack",
    description:
      "Desarrollador de software argentino. Java, Spring Boot y PostgreSQL en el backend; React y Next.js cuando hace falta.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0f1c",
};

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang");

  const initialLang =
    langCookie?.value === "es" || langCookie?.value === "en"
      ? (langCookie.value as "es" | "en")
      : "es";

  return (
    <html lang={initialLang}>
      <body
        className={`${sora.variable} ${orbitron.variable} font-[var(--font-sora)]`}
      >
        <LanguageProvider initialLang={initialLang}>
          <Background />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
