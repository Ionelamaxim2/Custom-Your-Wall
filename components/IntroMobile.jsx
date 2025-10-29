"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";
import MobileMenu from "./MobileMenu";

export default function IntroMobile() {
  const { language } = useLanguage();
  const t = translations[language];
  // Prevent hyphen break in RO: use non-breaking hyphen
  const displayTitle =
    language === "ro" ? t.heroTitle.replace(/-/g, "\u2011") : t.heroTitle;

  return (
    <section
      className="block md:hidden relative w-full min-h-screen intro-mobile rounded-b-[50px] overflow-hidden"
      style={{
        backgroundImage: "url('/photos/fundalmobil.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Menu handled globally by MobileTopBar */}
      {/* Left-aligned headline (keeps desktop typography; width constrains size) */}
      <div
        className="absolute text-left pr-2"
        style={{
          left: 16,
          top: language === "ro" ? "34%" : "26%",
          width: "calc(100vw / 3.5 - 32px)",
          maxWidth: "80%",
          transform: `scale(${language === "ro" ? 3.1 : 3.4})`,
          transformOrigin: "left top",
        }}
      >
        <h1
          className="font-bigshoulders font-bold uppercase text-white"
          style={{
            letterSpacing: "0.8px",
            WebkitTextStroke: "0.1px #000",
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          {displayTitle}
        </h1>
      </div>

      {/* Right paragraph block mid-page */}
      <div
        className="absolute text-right pl-2"
        style={{
          left: "50%",
          right: 16,
          top: "74%",
          transform: "translateY(-50%) scale(1.06)",
          transformOrigin: "right center",
        }}
      >
        <p
          className="font-bigshoulders text-black uppercase leading-tight"
          style={{ letterSpacing: "0.2px" }}
        >
          {t.heroSubtitle}
        </p>
      </div>

      {/* Removed glass island and bottom logo on mobile as requested */}
    </section>
  );
}
