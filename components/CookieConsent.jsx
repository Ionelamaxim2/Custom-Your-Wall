"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cyw_cookie_consent");
      if (!stored) {
        const timer = setTimeout(() => setOpen(true), 5000);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  const applyConsent = (accepted) => {
    try {
      localStorage.setItem(
        "cyw_cookie_consent",
        accepted ? "accepted" : "declined"
      );
    } catch {}
    // Optional hooks for analytics scripts
    try {
      if (accepted) {
        window.dispatchEvent(new CustomEvent("cyw-consent-accepted"));
        if (window.dataLayer)
          window.dataLayer.push({ event: "consent_accept" });
      } else {
        window.dispatchEvent(new CustomEvent("cyw-consent-declined"));
        if (window.dataLayer)
          window.dataLayer.push({ event: "consent_decline" });
      }
    } catch {}
    setOpen(false);
  };

  if (!open) return null;

  // Desktop bottom bar
  if (isDesktop) {
    return (
      <div className="fixed bottom-0 inset-x-0 z-[70] bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="text-sm md:text-[15px] leading-snug">
            We use cookies to enhance your experience. Accept?
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => applyConsent(false)}
              className="px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 transition"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => applyConsent(true)}
              className="px-4 py-2 rounded-md bg-white text-black hover:opacity-90 transition"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mobile centered modal
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => applyConsent(false)}
      />
      <div
        className="relative w-[90%] max-w-[360px] rounded-2xl shadow-xl text-black"
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="p-5">
          <h3 className="text-lg font-bold mb-2">Cookies</h3>
          <p className="text-sm text-black/80 mb-4">
            We use cookies to enhance your experience. Accept?
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => applyConsent(false)}
              className="px-4 py-2 rounded-md border border-black/30 text-black hover:bg-black/5 transition"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => applyConsent(true)}
              className="px-4 py-2 rounded-md bg-black text-white hover:opacity-90 transition"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
