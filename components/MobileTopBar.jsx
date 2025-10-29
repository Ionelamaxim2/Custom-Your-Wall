"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import MobileMenu from "./MobileMenu";

export default function MobileTopBar() {
  // No scroll tracking needed when bubble transform is disabled
  const pathname = usePathname();
  const router = useRouter();
  const showBack = pathname === "/gallery" || pathname === "/contact";

  return (
    <div className="block md:hidden">
      {/* Fixed top bar with title left and menu on right (always visible) */}
      <div className="fixed top-0 left-0 right-0 h-16 z-[90] bg-black/70 backdrop-blur border-b border-white/10 flex items-center justify-between px-5">
        {showBack ? (
          <button
            type="button"
            onClick={() =>
              window.history.length > 1 ? router.back() : router.push("/")
            }
            className="text-white tracking-wide font-bigshoulders font-bold text-[1.7rem] flex items-center gap-2"
            aria-label="Go back"
          >
            <span
              style={{ display: "inline-block", transform: "translateY(-1px)" }}
            >
              &larr;
            </span>
            <span>Go back</span>
          </button>
        ) : (
          <span
            className="tracking-wide font-bigshoulders font-bold text-[1.7rem] text-[#ffffff
]"
          >
            Custom Your Wall
          </span>
        )}
        <div className="relative h-full flex items-center">
          <MobileMenu inlineInBar={true} disableBubble={true} />
        </div>
      </div>
    </div>
  );
}
