"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Hero from "../components/Hero";
import WhyWallPrinting from "../components/WhyWallPrinting";
const InteractiveSection = dynamic(
  () => import("../components/InteractiveSection"),
  { ssr: false }
);
import InfiniteTextBar from "../components/InfiniteTextBar";
import GallerySlider from "../components/GallerySlider";
import ContactBanner from "../components/ContactBanner";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";
import IntroMobile from "../components/IntroMobile";
import WhyMobile from "../components/WhyMobile";
import InteractiveCircleMobile from "../components/InteractiveCircleMobile";

export default function HomePage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    // On mobile, do NOT auto-scroll to Why section even if hash exists
    const isMobile =
      window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile && window.location.hash === "#why-wall-printing") {
      const element = document.getElementById("why-wall-printing");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <div>
      {/* Intro section only on mobile; suppress hydration differences */}
      <div className="block md:hidden" suppressHydrationWarning>
        <IntroMobile />
      </div>
      {/* Desktop-only doors */}
      <div className="hidden md:block">
        <Hero />
      </div>
      {/* Mobile: clean Why Wall Printing (cards + centered machine) */}
      <div className="mobile-only" data-aos="fade-up">
        <WhyMobile />
      </div>
      {/* Mobile: InfiniteTextBar after Why section */}
      <div className="mobile-only" data-aos="fade-up">
        <InfiniteTextBar />
      </div>

      <WhyWallPrinting />
      <div className="hidden md:block" data-aos="fade-up">
        <InfiniteTextBar />
      </div>
      {/* Desktop interactive circle; hidden on mobile */}
      <section
        className="hidden md:block relative overflow-hidden"
        data-aos="fade-up"
      >
        <InteractiveSection />
      </section>
      {/* Mobile replacement: circle of materials around center text */}
      <InteractiveCircleMobile />
      <div data-aos="fade-up">
        <InfiniteTextBar />
      </div>
      <section
        className="py-20 text-white text-center bg-[#1A1A1A]"
        data-aos="fade-up"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide leading-tight mb-0 uppercase">
          {t.galleryTitle}
        </h2>
        <GallerySlider />
      </section>
      <div data-aos="fade-up">
        <ContactBanner />
      </div>
    </div>
  );
}
