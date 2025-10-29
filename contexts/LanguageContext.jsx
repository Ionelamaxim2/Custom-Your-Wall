"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  // Load saved preference
  useEffect(() => {
    try {
      const saved =
        typeof window !== "undefined" && localStorage.getItem("cyw_lang");
      if (saved === "ro" || saved === "en") setLanguage(saved);
    } catch {}
  }, []);

  // Persist preference
  useEffect(() => {
    try {
      if (typeof window !== "undefined")
        localStorage.setItem("cyw_lang", language);
    } catch {}
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
