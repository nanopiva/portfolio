import "./globals.css";
import { Sora, Orbitron } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Background from "./components/Background";
import { LanguageProvider } from "./contexts/LanguageContext";
import { cookies } from "next/headers";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

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
