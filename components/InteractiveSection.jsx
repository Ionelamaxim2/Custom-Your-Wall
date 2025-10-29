"use client";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";
import DotGrid from "./DotGrid";

const materials = [
  { image: "/photos/glasswall.webp", title: "GLASS" },
  { image: "/photos/concretewall.webp", title: "CONCRETE" },
  { image: "/photos/woodwall.webp", title: "WOOD" },
  { image: "/photos/plasterwall.webp", title: "PLASTER" },
  { image: "/photos/metalwall.webp", title: "METAL" },
  { image: "/photos/brickwall.webp", title: "BRICK" },
];

export default function InteractiveSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const englishToKey = {
    GLASS: "glass",
    CONCRETE: "concrete",
    WOOD: "wood",
    PLASTER: "plaster",
    METAL: "metal",
    BRICK: "brick",
  };

  const circlePositions = [
    { angle: -90, item: 1 }, // CONCRETE - Top
    { angle: -30, item: 2 }, // WOOD - Top Right
    { angle: 30, item: 5 }, // BRICK - Bottom Right
    { angle: 90, item: 4 }, // METAL - Bottom
    { angle: 150, item: 3 }, // PLASTER - Bottom Left
    { angle: 210, item: 0 }, // GLASS - Top Left
  ];

  const circleRadius = 320;
  const colorRadius = 400; // Radius where colors appear

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCursorMove = (clientX, clientY) => {
    const section = document.querySelector(".interactive-section");
    if (section) {
      const rect = section.getBoundingClientRect();
      setCursorPos({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
    }
  };

  const getImageFilter = (imageX, imageY) => {
    const dx = imageX - cursorPos.x;
    const dy = imageY - cursorPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > colorRadius) {
      return "grayscale(1) brightness(0.78)";
    }

    // Gradually transition from color to grayscale
    const ratio = distance / colorRadius;
    const grayscaleAmount = ratio;
    return `grayscale(${grayscaleAmount}) brightness(${
      0.78 + (1 - ratio) * 0.5
    })`;
  };

  return (
    <div
      className="interactive-section relative w-full min-h-[100vh] flex items-center justify-center py-12"
      onMouseMove={handleMouseMove}
    >
      {/* Dot Grid Background */}
      <DotGrid
        dotSize={6}
        gap={19}
        baseColor="#2A2A2A"
        activeColor="#76beff"
        proximity={200}
        shockRadius={460}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
        onCursorMove={handleCursorMove}
      />

      {/* CENTER TEXT */}
      <h2 className="absolute z-10 text-center text-white text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide leading-tight px-4 max-w-[600px]">
        {t.interactiveTitle}
      </h2>

      {/* CIRCULAR ARRANGEMENT OF IMAGES */}
      {circlePositions.map(({ angle, item }, index) => {
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * circleRadius;
        const y = Math.sin(radian) * circleRadius;

        // Calculate absolute position for filter calculation
        const centerX =
          typeof window !== "undefined" ? window.innerWidth / 2 : 0;
        const centerY = 450; // Approximate center of section
        const imageX = centerX + x;
        const imageY = centerY + y;

        return (
          <article
            key={index}
            className="group absolute w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 cursor-pointer hover:scale-105"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={materials[item].image}
              alt={materials[item].title}
              className="w-full h-full object-cover transition-all duration-150"
              style={{
                filter:
                  typeof window !== "undefined"
                    ? getImageFilter(
                        parseFloat(
                          getComputedStyle(document.documentElement).width
                        ) /
                          2 +
                          x,
                        450 + y
                      )
                    : "grayscale(1) brightness(0.78)",
              }}
            />
            <h3 className="absolute bottom-3 left-0 w-full text-center text-white font-sans text-base md:text-lg tracking-widest z-20">
              {t[englishToKey[materials[item].title]] || materials[item].title}
            </h3>
          </article>
        );
      })}
    </div>
  );
}
