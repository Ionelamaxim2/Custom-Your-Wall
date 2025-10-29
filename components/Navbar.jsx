"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import { translations } from "../data/translations";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (pathname === "/") {
      const element = document.getElementById("why-wall-printing");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#why-wall-printing";
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ro" : "en");
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-md shadow-black/10 flex justify-between items-center px-6 sm:px-8 md:px-10 h-[70px] w-[92%] max-w-[1200px] z-[60]">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="logo" width={40} height={40} priority />
        <span className="text-black font-bold tracking-wide text-lg uppercase font-bigshoulders">
          CUSTOM YOUR WALL
        </span>
      </div>
      <div className="flex items-center gap-6 sm:gap-8 text-black font-bold text-lg uppercase font-bigshoulders tracking-wide">
        <Link
          href="/#why-wall-printing"
          className={
            (pathname === "/"
              ? "text-gray-400"
              : "text-black hover:text-gray-400 transition-colors") + " px-1"
          }
          onClick={handleHomeClick}
        >
          {t.home}
        </Link>
        <Link
          href="/gallery"
          className={
            (pathname === "/gallery"
              ? "text-gray-400"
              : "text-black hover:text-gray-400 transition-colors") + " px-1"
          }
        >
          {t.gallery}
        </Link>
        <Link
          href="/contact"
          className={
            (pathname === "/contact"
              ? "text-gray-400"
              : "text-black hover:text-gray-400 transition-colors") + " px-1"
          }
        >
          {t.contact}
        </Link>
        <button
          onClick={toggleLanguage}
          className="text-gray-400 hover:text-gray-500 transition-colors px-1 font-bold text-lg normal-case tracking-wide"
          aria-label={
            language === "en"
              ? "Switch language to Romanian"
              : "Schimbă limba în Engleză"
          }
        >
          <span className={language === "ro" ? "text-black" : "text-gray-400"}>
            ro
          </span>
          <span className="px-0.5 text-gray-400">/</span>
          <span className={language === "en" ? "text-black" : "text-gray-400"}>
            en
          </span>
        </button>
      </div>
      {/* Mobile burger removed */}
    </nav>
  );
}
