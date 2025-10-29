"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";

const ChromaGrid = ({ items, className = "" }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const materials = [
    { image: "/photos/glasswall.webp", title: "GLASS" },
    { image: "/photos/concretewall.webp", title: "CONCRETE" },
    { image: "/photos/woodwall.webp", title: "WOOD" },
    { image: "/photos/plasterwall.webp", title: "PLASTER" },
    { image: "/photos/metalwall.webp", title: "METAL" },
    { image: "/photos/brickwall.webp", title: "BRICK" },
  ];

  const data = items?.length ? items : materials;
  const englishToKey = {
    GLASS: "glass",
    CONCRETE: "concrete",
    WOOD: "wood",
    PLASTER: "plaster",
    METAL: "metal",
    BRICK: "brick",
  };

  // Position images in a perfect circle
  const circlePositions = [
    { angle: -90, item: 1 }, // CONCRETE - Top (0°)
    { angle: -30, item: 2 }, // WOOD - Top Right (60°)
    { angle: 30, item: 5 }, // BRICK - Bottom Right (120°)
    { angle: 90, item: 4 }, // METAL - Bottom (180°)
    { angle: 150, item: 3 }, // PLASTER - Bottom Left (240°)
    { angle: 210, item: 0 }, // GLASS - Top Left (300°)
  ];

  const circleRadius = 360; // Distance from center

  return (
    <div
      className={`relative w-full min-h-[900px] flex items-center justify-center ${className}`}
    >
      {/* CENTER TEXT */}
      <h2 className="absolute z-10 text-center text-white text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide leading-tight px-4 max-w-[600px]">
        {t.interactiveTitle}
      </h2>

      {/* CIRCULAR ARRANGEMENT OF IMAGES */}
      {circlePositions.map(({ angle, item }, index) => {
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * circleRadius;
        const y = Math.sin(radian) * circleRadius;

        return (
          <article
            key={index}
            className="group absolute w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-xl overflow-hidden border border-gray-700 transition-transform duration-500 cursor-pointer hover:scale-105"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={data[item].image}
              alt={data[item].title}
              className="w-full h-full object-cover"
              style={{
                filter: "grayscale(1) brightness(0.78)",
              }}
            />
            <h3 className="absolute bottom-3 left-0 w-full text-center text-white font-sans text-base md:text-lg tracking-widest z-20">
              {t[englishToKey[data[item].title]] || data[item].title}
            </h3>
          </article>
        );
      })}
    </div>
  );
};

export default ChromaGrid;
