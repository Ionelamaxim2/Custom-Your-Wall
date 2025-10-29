import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";

export default function ContactBanner() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden py-10"
      style={{ backgroundColor: "#a8d8ff" }}
    >
      {/* Centered Content */}
      <div className="text-center px-6 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-wide uppercase">
          {t.contactTitle}
        </h2>
        <p className="text-black text-base md:text-lg mb-4 font-medium">
          {t.contactSubtitle}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 font-bold text-base rounded-full tracking-widest transition-colors"
          style={{ backgroundColor: "#000000", color: "#ffffff" }}
          aria-label="Contact us"
        >
          <span>{t.contactButton}</span>
        </Link>
      </div>
    </section>
  );
}
