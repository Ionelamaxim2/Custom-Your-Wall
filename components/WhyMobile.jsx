"use client";

import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";

export default function WhyMobile() {
  const { language } = useLanguage();
  const t = translations[language];

  const items = [
    { key: "waterResistant", desc: "waterResistantDesc", color: "#99cbff" },
    { key: "sustainable", desc: "sustainableDesc", color: "#ddff00" },
    { key: "razorSharp", desc: "razorSharpDesc", color: "#ff7fbf" },
    { key: "durable", desc: "durableDesc", color: "#FFB800" },
  ];

  return (
    <section
      className="mobile-only relative w-full text-white pt-12 pb-6 px-4"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      {/* Title on top */}
      <h2 className="text-center text-4xl font-semibold tracking-wide uppercase mb-10">
        {t.whyTitle}
      </h2>

      <div className="relative max-w-md mx-auto" style={{ minHeight: 640 }}>
        {/* Machine image */}
        <div className="w-full flex items-center justify-center pt-6 pb-12">
          <Image
            src="/photos/pozaaparat.webp"
            alt="Wall printing machine"
            width={320}
            height={330}
            className="object-contain"
            style={{ height: "auto" }}
          />
        </div>

        {/* Cards overlaying the image (staggered L/R) */}
        <div className="absolute inset-x-0 z-10" style={{ top: 16 }}>
          <div className="flex flex-col gap-7">
            {items.map((it, i) => (
              <div
                key={i}
                className={`flex ${
                  i % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className="rounded-2xl p-6 glass-card w-[82%]"
                  style={{ borderColor: "rgba(0, 0, 0, 0.22)" }}
                >
                  <h3
                    className="text-[26px] font-bold uppercase mb-1 tracking-wide"
                    style={{
                      color: it.color,
                      WebkitTextStroke: "0.5px #000",
                      textShadow:
                        "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000",
                    }}
                  >
                    {t[it.key]}
                  </h3>
                  <p className="text-[16px] text-white/95 leading-snug">
                    {t[it.desc]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
