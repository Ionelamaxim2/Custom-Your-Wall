"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  });
  const leftControls = useAnimationControls();
  const rightControls = useAnimationControls();
  const [isOpen, setIsOpen] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener?.("change", update);
    return () => mediaQuery.removeEventListener?.("change", update);
  }, []);

  const openDoors = useCallback(async () => {
    if (isOpen) return;
    setIsOpen(true);

    // Slide doors without fade - content visible behind
    await Promise.all([
      leftControls.start({
        x: "-100%",
        transition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
      }),
      rightControls.start({
        x: "100%",
        transition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
      }),
    ]);

    // Wait for doors to fully open
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Hide Hero and reset scroll
    setShowHero(false);
    document.body.style.overflow = "auto";
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 50);
  }, [isOpen, leftControls, rightControls]);

  useEffect(() => {
    if (isMobile) return; // never lock scroll on mobile
    // Block body scroll when Hero is visible
    if (showHero) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
      document.body.style.height = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
      document.body.style.height = "auto";
    };
  }, [showHero, isMobile]);

  useEffect(() => {
    const heroSection = document.querySelector(".hero-section");
    if (!heroSection) return;

    const onWheel = (e) => {
      if (!isOpen && e.deltaY > 0) {
        e.preventDefault();
        openDoors();
      }
    };

    heroSection.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      heroSection.removeEventListener("wheel", onWheel);
    };
  }, [openDoors, isOpen]);

  // Render consistently; parent controls visibility on mobile
  if (!showHero) return null;

  return (
    <section className="hero-section fixed inset-0 z-50 h-screen w-full overflow-hidden bg-transparent text-white">
      {/* Left Door */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 h-full bg-black"
        initial={{ x: 0, opacity: 1 }}
        animate={leftControls}
        style={{
          backgroundImage: "url(/photos/peretestanga.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-y-0 right-0 flex items-center justify-end pr-3">
          <span
            className="font-adventpro font-light text-black text-right uppercase"
            style={{
              fontSize: "clamp(48px, 6vw, 96px)",
              letterSpacing: "-1px",
            }}
          >
            {t.heroTitle}
          </span>
        </div>
        {/* Left door arrow (sticks to door) */}
        <button
          aria-label="Open doors"
          onClick={openDoors}
          className="absolute bottom-10 right-3 md:right-6 opacity-80 hover:opacity-100 transition transform hover:scale-105 cursor-pointer z-10 select-none"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 md:w-16 md:h-16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke="white"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </motion.div>

      {/* Right Door */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 h-full bg-black"
        initial={{ x: 0, opacity: 1 }}
        animate={rightControls}
        style={{
          backgroundImage: "url(/photos/peretedreapta.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-y-0 left-0 flex items-center justify-start pl-3">
          <span
            className="font-bigshoulders font-bold text-black max-w-[40ch] uppercase"
            style={{ fontSize: "clamp(14px, 2vw, 24px)" }}
          >
            {t.heroSubtitle}
          </span>
        </div>
        {/* Right door arrow (sticks to door) */}
        <button
          aria-label="Open doors"
          onClick={openDoors}
          className="absolute bottom-10 left-3 md:left-6 opacity-80 hover:opacity-100 transition transform hover:scale-105 cursor-pointer z-10 select-none"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 md:w-16 md:h-16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="white"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </motion.div>

      {/* Arrows are now attached to doors above */}
    </section>
  );
}
