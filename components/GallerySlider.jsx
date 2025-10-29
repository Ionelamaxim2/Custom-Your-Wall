"use client";
import { useState, useEffect, useRef } from "react";

const media = [
  { type: "image", src: "/photos/pozagalerie1.webp" },
  { type: "image", src: "/photos/pozagalerie2.webp" },
  { type: "video", src: "/photos/videogalerie1.mp4" },
  { type: "image", src: "/photos/pozagalerie3.webp" },
  { type: "image", src: "/photos/pozagalerie4.webp" },
  { type: "video", src: "/photos/videogalerie2.mp4" },
  { type: "image", src: "/photos/pozagalerie5.webp" },
  { type: "image", src: "/photos/pozagalerie6.webp" },
  { type: "image", src: "/photos/pozagalerie7.webp" },
  { type: "image", src: "/photos/pozagalerie8.webp" },
];

export default function GallerySlider() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const touchStartXRef = useRef(null);

  const normalizedIndex =
    ((current % media.length) + media.length) % media.length;
  const currentItem = media[normalizedIndex];

  const goToNext = () => {
    setCurrent((prev) => prev + 1);
  };

  const goToPrevious = () => {
    setCurrent((prev) => prev - 1);
  };

  // Handle auto-play for images
  useEffect(() => {
    if (currentItem.type === "image") {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, 4000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      // Clear interval for videos
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [current, currentItem.type]);

  // Handle video end event
  const handleVideoEnd = () => {
    goToNext();
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    const startX = touchStartXRef.current;
    if (startX == null) return;
    const endX = e.changedTouches && e.changedTouches[0]?.clientX;
    if (endX == null) return;
    const delta = endX - startX;
    const threshold = 40; // minimal swipe distance
    if (delta > threshold) {
      goToPrevious();
    } else if (delta < -threshold) {
      goToNext();
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      className="relative w-full h-[700px] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#1A1A1A" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
        {/* Main Display */}
        <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000">
          {[...Array(7)].map((_, i) => {
            const index = (current + i - 3 + media.length * 100) % media.length;
            const item = media[index];
            const offset = i - 3;
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            return (
              <div
                key={`${current}-${i}`}
                className="absolute cursor-pointer"
                style={{
                  transform: `
                    translateX(${offset * 450}px) 
                    scale(${isActive ? 1 : 0.7}) 
                    rotateY(${offset * 15}deg)
                  `,
                  opacity: isActive ? 1 : 0.4,
                  zIndex: isActive ? 20 : 10 - absOffset,
                  filter: isActive ? "brightness(1)" : "brightness(0.7)",
                  transition: "all 0.9s cubic-bezier(0.4, 0.0, 0.2, 1)",
                }}
                onClick={() => {
                  if (offset > 0) goToNext();
                  else if (offset < 0) goToPrevious();
                }}
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={`Gallery ${index + 1}`}
                    className="w-[400px] h-[500px] object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-4 border-white/10"
                  />
                ) : (
                  <video
                    ref={isActive ? videoRef : null}
                    src={item.src}
                    autoPlay
                    muted
                    playsInline
                    onEnded={isActive ? handleVideoEnd : undefined}
                    className="w-[400px] h-[500px] object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-4 border-white/10"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="hidden md:flex absolute left-8 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center hover:bg-white/20 transition-all duration-300 group"
        >
          <svg
            className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="hidden md:flex absolute right-8 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center hover:bg-white/20 transition-all duration-300 group"
        >
          <svg
            className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {media.map((_, index) => {
          const normalizedCurrent =
            ((current % media.length) + media.length) % media.length;
          return (
            <button
              key={index}
              className={`transition-all duration-300 rounded-full ${
                index === normalizedCurrent
                  ? "w-10 h-3 bg-white"
                  : "w-3 h-3 bg-white/40 hover:bg-white/70"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
