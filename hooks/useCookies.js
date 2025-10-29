"use client";

import { useState, useEffect } from "react";

export const useCookies = () => {
  const [cookiesEnabled, setCookiesEnabled] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookieConsent");
      const enabled = localStorage.getItem("cookiesEnabled");

      setConsentGiven(!!consent);
      setCookiesEnabled(enabled === "true");
    }
  }, []);

  const enableCookies = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", "accepted");
      localStorage.setItem("cookiesEnabled", "true");
      setConsentGiven(true);
      setCookiesEnabled(true);

      // Enable analytics, tracking, etc.

      // Example: Enable Google Analytics
      // if (typeof gtag !== 'undefined') {
      //   gtag('consent', 'update', {
      //     'analytics_storage': 'granted',
      //     'ad_storage': 'granted'
      //   });
      // }
    }
  };

  const disableCookies = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", "declined");
      localStorage.setItem("cookiesEnabled", "false");
      setConsentGiven(true);
      setCookiesEnabled(false);

      // Disable analytics, tracking, etc.

      // Example: Disable Google Analytics
      // if (typeof gtag !== 'undefined') {
      //   gtag('consent', 'update', {
      //     'analytics_storage': 'denied',
      //     'ad_storage': 'denied'
      //   });
      // }
    }
  };

  const resetConsent = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cookieConsent");
      localStorage.removeItem("cookiesEnabled");
      setConsentGiven(false);
      setCookiesEnabled(false);
    }
  };

  return {
    cookiesEnabled,
    consentGiven,
    mounted,
    enableCookies,
    disableCookies,
    resetConsent,
  };
};
