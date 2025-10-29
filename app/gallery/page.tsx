"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileMenu from "../../components/MobileMenu";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { GlowingEffect } from "../../components/ui/glowing-effect";
import { cn } from "../../lib/utils";
import Image from "next/image";

const mediaItems = [
  { src: "/photos/pozagalerie1.webp", type: "image", colSpan: 2 },
  { src: "/photos/pozagalerie2.webp", type: "image", colSpan: 2 },
  { src: "/photos/videogalerie1.mp4", type: "video", colSpan: 1 },
  { src: "/photos/videogalerie2.mp4", type: "video", colSpan: 1 },
  { src: "/photos/video6.mp4", type: "video", colSpan: 1 },
  { src: "/photos/pozagalerie3.webp", type: "image", colSpan: 2 },
  { src: "/photos/video3.mp4", type: "video", colSpan: 1 },
  { src: "/photos/pozagalerie4.webp", type: "image", colSpan: 2 },
  { src: "/photos/pozagalerie5.webp", type: "image", colSpan: 2 },
  { src: "/photos/video4.mp4", type: "video", colSpan: 1 },
  { src: "/photos/video5.mp4", type: "video", colSpan: 1 },
  { src: "/photos/pozagalerie6.webp", type: "image", colSpan: 2 },
  { src: "/photos/pozagalerie7.webp", type: "image", colSpan: 2 },
  { src: "/photos/video8.mp4", type: "video", colSpan: 1 },
  { src: "/photos/pozagalerie8.webp", type: "image", colSpan: 2 },
  { src: "/photos/video7.mp4", type: "video", colSpan: 1 },
  { src: "/photos/video9.mp4", type: "video", colSpan: 1 },
];

export default function GalleryPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedMedia, setSelectedMedia] = useState<{
    src: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedMedia) {
        setSelectedMedia(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedMedia]);

  return (
    <>
      {/* Mobile top controls: Back (left) + Menu (right) */}
      <div className="block md:hidden">
        <MobileMenu />
        <div className="fixed top-6 left-3 z-[60]">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white"
            aria-label="Go back"
          >
            <svg
              className="w-[1.35rem] h-[1.35rem]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="text-[1.35rem] leading-none">Go back</span>
          </button>
        </div>
      </div>

      <div
        className="w-full text-white min-h-screen py-12 px-4"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-4xl md:text-4xl lg:text-5xl font-semibold tracking-wide leading-tight mb-8 md:mb-32 text-center uppercase pt-20"
            data-aos="fade-down"
          >
            {t.galleryPageTitle}
          </h1>
          <ul
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 grid-flow-row-dense md:grid-flow-row"
            data-aos="fade-up"
          >
            {mediaItems.map((item, index) => {
              return (
                <GridItem
                  key={index}
                  colSpan={item.colSpan}
                  mediaSrc={item.src}
                  mediaType={item.type}
                  onClick={() => setSelectedMedia(item)}
                />
              );
            })}
          </ul>
        </div>
      </div>

      {/* Modal for viewing media */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedMedia(null);
            }
          }}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-400 transition-colors z-10"
            onClick={() => setSelectedMedia(null)}
          >
            ×
          </button>
          <div className="max-w-3xl w-full h-[70vh] flex items-center justify-center">
            {selectedMedia.type === "video" ? (
              <video
                src={selectedMedia.src}
                className="max-w-full max-h-full object-contain"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={selectedMedia.src}
                alt="Gallery"
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

interface GridItemProps {
  colSpan?: number;
  mediaSrc: string;
  mediaType: string;
  onClick?: () => void;
}

const GridItem = ({
  colSpan = 1,
  mediaSrc,
  mediaType,
  onClick,
}: GridItemProps) => {
  // Toate casetele au aceeași înălțime (h-[400px]), doar lățimea diferă
  const heightClass = "h-[400px]";
  const isVideo = mediaType === "video";
  const mobileColSpanClass = isVideo ? "col-span-1" : "col-span-2"; // mobil: foto pe un rând, video 2 pe rând
  const mdColSpanClass = colSpan === 2 ? "md:col-span-2" : "md:col-span-1"; // păstrează layout-ul existent pe md+

  return (
    <li
      className={`list-none ${heightClass} overflow-hidden cursor-pointer ${mobileColSpanClass} ${mdColSpanClass}`}
      onClick={onClick}
    >
      <div className="relative w-full h-full rounded-[1.25rem] border-[0.75px] border-gray-700 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative w-full h-full overflow-hidden rounded-xl border-[0.75px] bg-black border-gray-700 shadow-sm">
          {mediaType === "video" ? (
            <video
              src={mediaSrc}
              className="w-full h-full object-contain bg-black"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={mediaSrc}
                alt="Gallery"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
