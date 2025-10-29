import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";

export default function WhyWallPrinting() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <section
      id="why-wall-printing"
      className="relative w-full text-white pt-32 pb-20 flex flex-col items-center justify-center"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      {/* TITLE */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide leading-tight text-center mb-10 uppercase">
        {t.whyTitle}
      </h2>

      <div className="relative w-full max-w-7xl mx-auto px-6">
        {/* LAYOUT CONTAINER */}
        <div className="relative flex items-start justify-between gap-8">
          {/* LEFT COLUMN */}
          <div className="flex-1 flex flex-col gap-32 pt-16 overflow-hidden">
            {/* FIRST ITEM WITH LINE */}
            <div className="relative">
              <div
                className="absolute left-0 right-0 border-t mb-6"
                style={{
                  borderColor: "#00E5FF",
                  boxShadow:
                    "0 0 20px #00E5FF, 0 0 40px #00E5FF, 0 0 60px #00E5FF",
                  filter: "blur(0.5px)",
                }}
              ></div>
              <div className="pt-6">
                <h3
                  className="text-2xl md:text-3xl font-bold uppercase mb-3 tracking-wide"
                  style={{ color: "#00E5FF" }}
                >
                  {t.waterResistant}
                </h3>
                <p className="text-gray-300 text-base md:text-lg">
                  {t.waterResistantDesc}
                </p>
              </div>
            </div>

            {/* SECOND ITEM WITH LINE */}
            <div className="relative">
              <div
                className="absolute left-0 right-0 border-t mb-6"
                style={{
                  borderColor: "#00FF88",
                  boxShadow:
                    "0 0 20px #00FF88, 0 0 40px #00FF88, 0 0 60px #00FF88",
                  filter: "blur(0.5px)",
                }}
              ></div>
              <div className="pt-6">
                <h3
                  className="text-2xl md:text-3xl font-bold uppercase mb-3 tracking-wide"
                  style={{ color: "#00FF88" }}
                >
                  {t.sustainable}
                </h3>
                <p className="text-gray-300 text-base md:text-lg">
                  {t.sustainableDesc}
                </p>
              </div>
            </div>
          </div>

          {/* CENTER IMAGE */}
          <div className="flex-shrink-0 mx-8">
            <Image
              src="/photos/pozaaparat.webp"
              alt="Wall printing machine"
              width={300}
              height={450}
              className="object-contain"
              style={{ height: "auto" }}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex-1 flex flex-col gap-32 pt-16 overflow-hidden">
            {/* FIRST ITEM WITH LINE */}
            <div className="relative">
              <div
                className="absolute left-0 right-0 border-t mb-6"
                style={{
                  borderColor: "#FF00D6",
                  boxShadow:
                    "0 0 20px #FF00D6, 0 0 40px #FF00D6, 0 0 60px #FF00D6",
                  filter: "blur(0.5px)",
                }}
              ></div>
              <div className="pt-6">
                <h3
                  className="text-2xl md:text-3xl font-bold uppercase mb-3 tracking-wide"
                  style={{ color: "#FF00D6" }}
                >
                  {t.razorSharp}
                </h3>
                <p className="text-gray-300 text-base md:text-lg">
                  {t.razorSharpDesc}
                </p>
              </div>
            </div>

            {/* SECOND ITEM WITH LINE */}
            <div className="relative">
              <div
                className="absolute left-0 right-0 border-t mb-6"
                style={{
                  borderColor: "#FFB800",
                  boxShadow:
                    "0 0 20px #FFB800, 0 0 40px #FFB800, 0 0 60px #FFB800",
                  filter: "blur(0.5px)",
                }}
              ></div>
              <div className="pt-6">
                <h3
                  className="text-2xl md:text-3xl font-bold uppercase mb-3 tracking-wide"
                  style={{ color: "#FFB800" }}
                >
                  {t.durable}
                </h3>
                <p className="text-gray-300 text-base md:text-lg">
                  {t.durableDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
