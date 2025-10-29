"use client";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";

export default function InfiniteTextBar() {
  const { language } = useLanguage();
  return (
    <div
      className="w-full overflow-hidden py-3 border-y border-gray-800"
      style={{ backgroundColor: "#a8d8ff" }}
    >
      <div
        className="animate-marquee whitespace-nowrap text-center font-bigshoulders font-bold tracking-widest uppercase text-lg"
        style={{ color: "#000000" }}
      >
        {Array(20)
          .fill(
            language === "ro"
              ? "VIZIUNEA TA. PERETELE TĂU. IMPRIMAREA NOASTRĂ."
              : "YOUR VISION. YOUR WALL. OUR PRINT."
          )
          .join(" ")}
      </div>
      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          animation: scroll 40s linear infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
