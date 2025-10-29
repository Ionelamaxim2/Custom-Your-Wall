"use client";

import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { useRouter } from "next/navigation";
import MobileMenu from "../../components/MobileMenu";

export default function TermsOfUse() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  const content = {
    en: {
      title: "Terms of Use",
      lastUpdated: "Last updated: October 2025",
      sections: [
        {
          title: "1) Acceptance of terms",
          content:
            "By accessing and using the Custom Your Wall website, you accept these terms. If you do not agree, please do not use the site.",
        },
        {
          title: "2) Purpose of the site",
          content:
            "The site presents wall printing services and portfolio. Content (texts, images, video, graphic elements) is protected by copyright and cannot be copied, modified or distributed without written consent.",
        },
        {
          title: "3) Limitation of liability",
          content:
            "We make efforts for accuracy and availability, but do not guarantee absence of errors or interruptions. We are not responsible for losses resulting from content use or site unavailability.",
        },
        {
          title: "4) External links",
          content:
            "The site may contain links to third parties. We do not control and do not assume responsibility for their content or policies.",
        },
        {
          title: "5) Proper use",
          content:
            "You agree not to use the site for illegal or abusive purposes and not to attempt compromising security (spam, malware, aggressive scraping, etc.).",
        },
        {
          title: "6) Changes to terms",
          content:
            "We may update terms periodically. We recommend checking this page.",
        },
      ],
    },
    ro: {
      title: "Termeni și Condiții de Utilizare",
      lastUpdated: "Ultima actualizare: Octombrie 2025",
      sections: [
        {
          title: "1) Acceptarea termenilor",
          content:
            "Prin accesarea și utilizarea site-ului Custom Your Wall, accepți acești termeni. Dacă nu ești de acord, te rugăm să nu folosești site-ul.",
        },
        {
          title: "2) Scopul site-ului",
          content:
            "Site-ul prezintă serviciile de imprimare pe perete (wall printing) și portofoliul. Conținutul (texte, imagini, video, elemente grafice) este protejat de drepturi de autor și nu poate fi copiat, modificat sau distribuit fără acord scris.",
        },
        {
          title: "3) Limitarea răspunderii",
          content:
            "Depunem eforturi pentru acuratețe și disponibilitate, dar nu garantăm absența erorilor sau întreruperilor. Nu răspundem pentru pierderi rezultate din utilizarea conținutului sau indisponibilitatea site-ului.",
        },
        {
          title: "4) Linkuri externe",
          content:
            "Site-ul poate conține linkuri către terți. Nu controlăm și nu ne asumăm responsabilitatea pentru conținutul sau politicile acestora.",
        },
        {
          title: "5) Utilizare corectă",
          content:
            "Te obligi să nu utilizezi site-ul în scopuri ilegale sau abuzive și să nu încerci compromiterea securității (spam, malware, scraping agresiv etc.).",
        },
        {
          title: "6) Modificări ale termenilor",
          content:
            "Putem actualiza termenii periodic. Recomandăm verificarea acestei pagini.",
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <>
      {/* Mobile top controls: Back (left) + Menu (right) */}
      <div className="block md:hidden">
        <MobileMenu />
        <div className="fixed top-6 left-3 z-[60]">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white"
            aria-label="Go back"
          >
            <svg
              className="w-[1.35rem] h-[1.35rem]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="text-[1.35rem] leading-none">Go back</span>
          </button>
        </div>
      </div>

      <div
        className="min-h-screen text-white pt-32 pb-20"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <h1
            className="text-4xl md:text-5xl font-bold uppercase mb-4"
            style={{ color: "#FF00D6" }}
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
                  style={{ color: "#00FF88" }}
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
              <span>
                {language === "ro" ? "Înapoi la site" : "Back to site"}
              </span>
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
    </>
  );
}
