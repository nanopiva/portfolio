"use client";

import { motion } from "framer-motion";
import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { useLanguage } from "../contexts/LanguageContext";

type ContactTranslations = {
  title: string;
  labels: {
    name: string;
    email: string;
    message: string;
  };
  submit: string;
  submitting: string;
  messages: {
    success: string;
    error: string;
  };
  availability: {
    title: string;
    text: string;
  };
  directContact: {
    title: string;
  };
  connect: {
    title: string;
  };
};

const translations = {
  es: {
    title: "contacto",
    labels: {
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
    },
    submit: "Enviar mensaje",
    submitting: "Enviando...",
    messages: {
      success: "¡Mensaje enviado con éxito! Me pondré en contacto pronto.",
      error:
        "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.",
    },
    availability: {
      title: "Disponibilidad",
      text: "Actualmente abierto a nuevas oportunidades y proyectos interesantes.",
    },
    directContact: {
      title: "Contacto directo",
    },
    connect: {
      title: "Conectemos",
    },
  },
  en: {
    title: "contact",
    labels: {
      name: "Name",
      email: "Email",
      message: "Message",
    },
    submit: "Send message",
    submitting: "Sending...",
    messages: {
      success: "Message sent successfully! I'll get back to you soon.",
      error: "There was an error sending your message. Please try again later.",
    },
    availability: {
      title: "Availability",
      text: "Currently open to new opportunities and interesting projects.",
    },
    directContact: {
      title: "Direct contact",
    },
    connect: {
      title: "Let's connect",
    },
  },
};

export default function Contact() {
  const { lang } = useLanguage();
  const t: ContactTranslations = translations[lang];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isInView, setIsInView] = useState(false);
  const [animateTrigger, setAnimateTrigger] = useState(0);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = contactRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      setAnimateTrigger((prev) => prev + 1);
    }
  }, [lang, isInView]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage(t.messages.success);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Error en el envío");
      }
    } catch (error) {
      setSubmitMessage(t.messages.error);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={contactRef}
      id={lang === "es" ? "contacto" : "contact"}
      className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-accent/60 blur-[1px] animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-white/80 blur-[1px] animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1 h-1 rounded-full bg-accent/40 blur-[1px] animate-pulse delay-1500"></div>
      <div className="absolute top-1/2 left-1/3 w-1 h-1 rounded-full bg-particle-2 blur-[1px] animate-pulse delay-500"></div>

      <motion.div
        key={`contact-container-${animateTrigger}`}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1 }}
        className="max-w-6xl w-full flex flex-col items-start gap-6 md:gap-8"
      >
        <div className="relative inline-block mb-2 md:mb-4 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide font-orbitron text-text">
            <span className="relative z-10 px-2 lowercase">
              <span className="text-accent">/</span>
              {t.title}
            </span>
          </h2>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/30"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/20 blur-sm"></div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <motion.form
            key={`contact-form-${animateTrigger}`}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 md:space-y-5"
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-base md:text-base font-medium text-particle-1 font-sora"
              >
                {t.labels.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 md:px-4 md:py-3 bg-deep/80 border border-particle-2/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/60 text-text font-sora transition-all duration-300 hover:border-particle-2/50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-base md:text-base font-medium text-particle-1 font-sora"
              >
                {t.labels.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 md:px-4 md:py-3 bg-deep/80 border border-particle-2/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/60 text-text font-sora transition-all duration-300 hover:border-particle-2/50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-base md:text-base font-medium text-particle-1 font-sora"
              >
                {t.labels.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 md:px-4 md:py-3 bg-deep/80 border border-particle-2/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/60 text-text font-sora transition-all duration-300 hover:border-particle-2/50 resize-none"
              ></textarea>
            </div>

            <div className="pt-1 md:pt-2 flex justify-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`relative px-6 py-2 md:px-8 md:py-3 bg-deep border-2 border-accent text-accent font-orbitron font-medium rounded-lg transition-all duration-300 overflow-hidden group ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-accent hover:text-deep hover:shadow-[0_0_20px_rgba(0,255,56,0.3)]"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 text-sm md:text-base">
                  {isSubmitting ? t.submitting : t.submit}
                </span>
              </motion.button>
            </div>

            {submitMessage && (
              <motion.p
                key={`submit-message-${animateTrigger}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm md:text-base font-sora text-center ${
                  submitMessage === t.messages.success
                    ? "text-accent"
                    : "text-red-400"
                }`}
              >
                {submitMessage}
              </motion.p>
            )}
          </motion.form>

          <motion.div
            key={`contact-info-${animateTrigger}`}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-between h-full space-y-4 md:space-y-6 mt-6 lg:mt-0 text-center lg:text-left items-center lg:items-start"
          >
            <div className="space-y-4 md:space-y-6 w-full max-w-md lg:max-w-none">
              <div>
                <h3 className="text-lg md:text-lg font-orbitron text-accent mb-2 md:mb-3">
                  {t.availability.title}
                </h3>
                <p className="text-base md:text-particle-1 font-sora leading-relaxed">
                  {t.availability.text}
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-lg font-orbitron text-accent mb-2 md:mb-3">
                  {t.directContact.title}
                </h3>
                <ul className="space-y-2 md:space-y-3 font-sora text-base md:text-particle-1 flex flex-col items-center lg:items-start">
                  <li className="flex items-center gap-2 md:gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 md:h-5 md:w-5 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>mpiva24@gmail.com</span>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 md:h-5 md:w-5 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>+54 9 342 536 4800</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full max-w-md lg:max-w-none">
              <h3 className="text-lg md:text-lg font-orbitron text-accent mb-3 md:mb-4">
                {t.connect.title}
              </h3>
              <div className="flex gap-3 md:gap-3 justify-center lg:justify-start">
                <motion.a
                  href="https://wa.me/5493425364800"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 rounded-lg bg-deep/80 border border-particle-2/30 hover:border-accent/50 text-particle-1 hover:text-accent transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="relative z-10 w-5 h-5"
                  >
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.777-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                  </svg>
                </motion.a>

                <motion.a
                  href="mailto:mpiva24@gmail.com"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 rounded-lg bg-deep/80 border border-particle-2/30 hover:border-accent/50 text-particle-1 hover:text-accent transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="relative z-10 w-5 h-5"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/mariano-piva-551964307/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 rounded-lg bg-deep/80 border border-particle-2/30 hover:border-accent/50 text-particle-1 hover:text-accent transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="relative z-10 w-5 h-5"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
