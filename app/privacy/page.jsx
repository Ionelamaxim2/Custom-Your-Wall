"use client";

import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { useRouter } from "next/navigation";
import MobileMenu from "../../components/MobileMenu";

export default function PrivacyPolicy() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: October 2025",
      sections: [
        {
          title: "1) Introduction",
          content:
            "Welcome to Custom Your Wall. We respect your privacy and protect personal data. This policy explains what data we collect, how we use it, and what your rights are.",
        },
        {
          title: "2) Who we are",
          content:
            "The website www.customyourwall.cloud is managed by SC Custom Your Wall SRL.\nAddress: [Complete address] • CUI: [CUI] • Reg. No.: [Jxx/xxxx/20xx]\nEmail: customyourwall@gmail.com • Phone: [07xx xxx xxx]",
        },
        {
          title: "3) What data we collect",
          content:
            "Contact data: name, email, phone (submitted through contact form).\nYour message content / project details.\nTechnical data: IP, device type, pages visited (through cookies/analytics).\nWe do not request or process sensitive data.",
        },
        {
          title: "4) Purpose and legal basis for processing",
          content:
            "Responding to requests and quotations (legitimate interest / execution of pre-contractual measures).\nImproving site experience (legitimate interest).\nSecurity and abuse prevention (legitimate interest).\nLegal compliance when necessary (legal obligation).",
        },
        {
          title: "5) Storage duration",
          content:
            "We keep data only as long as necessary for the purpose for which it was collected and according to applicable legal requirements.",
        },
        {
          title: "6) Data disclosure",
          content:
            "We do not sell your data. We may share it strictly necessary with suppliers (hosting, email, analytics) under confidentiality obligations or if required by law.",
        },
        {
          title: "7) International transfers",
          content:
            "If suppliers process data outside the EEA, we use adequate safeguards (e.g. Standard Contractual Clauses).",
        },
        {
          title: "8) Your rights (GDPR)",
          content:
            "You have the right to access, rectification, erasure, restriction, objection, portability and to withdraw your consent.\nYou can file a complaint with ANSPDCP. To exercise your rights: customyourwall@gmail.com.",
        },
        {
          title: "9) Cookies",
          content:
            "We use necessary, performance and functional cookies. Complete details in Cookie Policy. You can manage your options in browser or site preferences.",
        },
        {
          title: "10) Security",
          content:
            "We apply adequate technical and organizational measures (HTTPS, access control, backup). Details in Security Policy.",
        },
        {
          title: "11) Changes",
          content:
            "We may update this policy. Continued use of the site after publication means acceptance of changes.",
        },
      ],
    },
    ro: {
      title: "Politica de Confidențialitate",
      lastUpdated: "Ultima actualizare: Octombrie 2025",
      sections: [
        {
          title: "1) Introducere",
          content:
            "Bine ai venit pe Custom Your Wall. Respectăm confidențialitatea ta și protejăm datele cu caracter personal. Această politică explică ce date colectăm, cum le folosim și care sunt drepturile tale.",
        },
        {
          title: "2) Cine suntem",
          content:
            "Site-ul www.customyourwall.cloud este administrat de SC Custom Your Wall SRL.\nSediu: [Adresă completă] • CUI: [CUI] • Nr. Reg. Com.: [Jxx/xxxx/20xx]\nEmail: customyourwall@gmail.com • Telefon: [07xx xxx xxx]",
        },
        {
          title: "3) Ce date colectăm",
          content:
            "Date de contact: nume, e-mail, telefon (transmise prin formularul de contact).\nConținutul mesajului tău / detalii proiect.\nDate tehnice: IP, tip dispozitiv, pagini vizitate (prin cookie-uri/analitice).\nNu solicităm și nu prelucrăm date sensibile.",
        },
        {
          title: "4) Scopul și temeiul prelucrării",
          content:
            "Răspuns la solicitări și ofertare (interes legitim / executarea măsurilor precontractuale).\nÎmbunătățirea experienței pe site (interes legitim).\nSecuritate și prevenirea abuzurilor (interes legitim).\nConformitate legală, atunci când este necesar (obligație legală).",
        },
        {
          title: "5) Durata stocării",
          content:
            "Păstrăm datele doar cât este necesar scopului pentru care au fost colectate și conform cerințelor legale aplicabile.",
        },
        {
          title: "6) Dezvăluirea datelor",
          content:
            "Nu vindem datele tale. Le putem partaja strict necesar cu furnizori (găzduire, e-mail, analitice) sub obligații de confidențialitate sau dacă legea impune.",
        },
        {
          title: "7) Transferuri internaționale",
          content:
            "Dacă furnizorii procesează date în afara SEE, folosim garanții adecvate (de ex. Clauze Contractuale Standard).",
        },
        {
          title: "8) Drepturile tale (GDPR)",
          content:
            "Ai dreptul de acces, rectificare, ștergere, restricționare, opoziție, portabilitate și de a-ți retrage consimțământul.\nPoți depune plângere la ANSPDCP. Pentru exercitarea drepturilor: customyourwall@gmail.com.",
        },
        {
          title: "9) Cookie-uri",
          content:
            "Folosim cookie-uri necesare, de performanță și funcționale. Detalii complete în Politica de Cookies. Îți poți gestiona opțiunile din browser sau din preferințele de pe site.",
        },
        {
          title: "10) Securitate",
          content:
            "Aplicăm măsuri tehnice și organizatorice adecvate (HTTPS, control acces, backup). Detalii în Politica de Securitate.",
        },
        {
          title: "11) Modificări",
          content:
            "Putem actualiza această politică. Continuarea utilizării site-ului după publicare înseamnă acceptarea modificărilor.",
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
            style={{ color: "#00E5FF" }}
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
