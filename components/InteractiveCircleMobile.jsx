"use client";

import { useMemo } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";
import DotGrid from "./DotGrid";

const materials = [
  { image: "/photos/glasswall.webp", key: "glass" },
  { image: "/photos/concretewall.webp", key: "concrete" },
  { image: "/photos/woodwall.webp", key: "wood" },
  { image: "/photos/plasterwall.webp", key: "plaster" },
  { image: "/photos/metalwall.webp", key: "metal" },
  { image: "/photos/brickwall.webp", key: "brick" },
];

export default function InteractiveCircleMobile() {
  const { language } = useLanguage();
  const t = translations[language];

  // Angles (degrees) around the circle, starting at top and going clockwise
  const positions = useMemo(
    () => [
      { angle: -90, index: 1 }, // CONCRETE - top
      { angle: -30, index: 2 }, // WOOD - top-right
      { angle: 30, index: 5 }, // BRICK - bottom-right
      { angle: 90, index: 4 }, // METAL - bottom
      { angle: 150, index: 3 }, // PLASTER - bottom-left
      { angle: 210, index: 0 }, // GLASS - top-left
    ],
    []
  );

  const radius = 170; // tuned for mobile viewport

  return (
    <section
      className="mobile-only block md:hidden relative w-full py-10"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      {/* Dotted background similar to desktop */}
      <DotGrid
        dotSize={6}
        gap={18}
        baseColor="#2A2A2A"
        activeColor="#2A2A2A"
        proximity={0}
        shockRadius={0}
        shockStrength={0}
        resistance={700}
        returnDuration={1.4}
      />
      <div className="relative max-w-md mx-auto" style={{ height: 440 }}>
        {/* Center text (smaller on RO mobile) */}
        <h2
          className={`absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white ${
            language === "ro" ? "text-3xl" : "text-4xl"
          } font-semibold tracking-wide leading-tight text-center uppercase px-1 max-w-[16ch]`}
        >
          {t.interactiveTitle}
        </h2>

        {/* Circular items */}
        {positions.map(({ angle, index }, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const item = materials[index];
          return (
            <figure
              key={i}
              className="absolute w-[100px] h-[100px] rounded-xl overflow-hidden border border-gray-700"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={item.image}
                alt={t[item.key]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <span
                  className="text-black text-lg font-extrabold uppercase tracking-widest text-center"
                  style={{
                    WebkitTextStroke: "0.05px #fff",
                    textShadow:
                      "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
                  }}
                >
                  {t[item.key]}
                </span>
              </div>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
