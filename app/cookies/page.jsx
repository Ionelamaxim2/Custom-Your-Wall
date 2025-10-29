"use client";

import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

export default function CookiesPolicy() {
  const { language } = useLanguage();
  const t = translations[language];

  const content = {
    en: {
      title: "Cookie Policy",
      lastUpdated: "Last updated: October 2025",
      sections: [
        {
          title: "1) What are cookies",
          content:
            "Cookies are small files stored on your device that help with site functionality and personalization.",
        },
        {
          title: "2) What cookies we use",
          content:
            "Necessary — ensures basic functions (navigation, session).\nPerformance — measures site usage (e.g. pages visited) for improvements.\nFunctional — remembers preferences like language (RO/EN) or settings.\nWe do not use cookies for behavioral advertising (if you will use in future, update policy).",
        },
        {
          title: "3) Managing cookies",
          content:
            "You can control/delete cookies from browser settings. You can modify preferences from consent options on site (if preference banner exists).",
        },
        {
          title: "4) Contact",
          content:
            "Questions about cookies? Write to us at customyourwall@gmail.com.",
        },
      ],
    },
    ro: {
      title: "Politica de Cookies",
      lastUpdated: "Ultima actualizare: Octombrie 2025",
      sections: [
        {
          title: "1) Ce sunt cookie-urile",
          content:
            "Cookie-urile sunt fișiere mici stocate în dispozitivul tău, care ajută la funcționarea și personalizarea site-ului.",
        },
        {
          title: "2) Ce cookie-uri folosim",
          content:
            "Necesare — asigură funcții de bază (navigare, sesiune).\nDe performanță — măsoară utilizarea site-ului (ex. pagini vizitate) pentru îmbunătățiri.\nFuncționale — rețin preferințe precum limbă (RO/EN) sau setări.\nNu folosim cookie-uri pentru reclame comportamentale (dacă vei folosi în viitor, actualizezi politica).",
        },
        {
          title: "3) Gestionarea cookie-urilor",
          content:
            "Poți controla/șterge cookie-urile din setările browserului. Poți modifica preferințele și din opțiunile de consimțământ de pe site (dacă există bannerul de preferințe).",
        },
        {
          title: "4) Contact",
          content:
            "Întrebări despre cookies? Scrie-ne la customyourwall@gmail.com.",
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <div
      className="min-h-screen text-white pt-32 pb-20"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <h1
          className="text-4xl md:text-5xl font-bold uppercase mb-4"
          style={{ color: "#00FF88" }}
        >
          {currentContent.title}
        </h1>
        <p className="text-lg text-white/70 mb-12">
          {currentContent.lastUpdated}
        </p>

        <div className="space-y-8">
          {currentContent.sections.map((section, index) => (
            <div key={index} className="bg-gray-900/50 rounded-lg p-6">
              <h2
                className="text-xl md:text-2xl font-bold mb-4"
                style={{ color: "#00E5FF" }}
              >
                {section.title}
              </h2>
              <div className="text-white/90 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 font-bold text-base rounded-full tracking-widest shadow-xl transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#a8d8ff", color: "#000000" }}
          >
            <span>{language === "ro" ? "Înapoi la site" : "Back to site"}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
