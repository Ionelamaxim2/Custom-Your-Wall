"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import MobileMenu from "../../components/MobileMenu";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
// Avoid SSR hydration mismatch with react-select
const Select = dynamic(() => import("react-select"), { ssr: false });
import "./contact.css";

const countries = [
  // European countries
  { value: "albania", label: "Albania" },
  { value: "andorra", label: "Andorra" },
  { value: "armenia", label: "Armenia" },
  { value: "austria", label: "Austria" },
  { value: "azerbaijan", label: "Azerbaijan" },
  { value: "belarus", label: "Belarus" },
  { value: "belgium", label: "Belgium" },
  { value: "bosnia", label: "Bosnia and Herzegovina" },
  { value: "bulgaria", label: "Bulgaria" },
  { value: "croatia", label: "Croatia" },
  { value: "cyprus", label: "Cyprus" },
  { value: "czech", label: "Czech Republic" },
  { value: "denmark", label: "Denmark" },
  { value: "estonia", label: "Estonia" },
  { value: "finland", label: "Finland" },
  { value: "france", label: "France" },
  { value: "georgia", label: "Georgia" },
  { value: "germany", label: "Germany" },
  { value: "greece", label: "Greece" },
  { value: "hungary", label: "Hungary" },
  { value: "iceland", label: "Iceland" },
  { value: "ireland", label: "Ireland" },
  { value: "italy", label: "Italy" },
  { value: "kosovo", label: "Kosovo" },
  { value: "latvia", label: "Latvia" },
  { value: "liechtenstein", label: "Liechtenstein" },
  { value: "lithuania", label: "Lithuania" },
  { value: "luxembourg", label: "Luxembourg" },
  { value: "malta", label: "Malta" },
  { value: "moldova", label: "Moldova" },
  { value: "monaco", label: "Monaco" },
  { value: "montenegro", label: "Montenegro" },
  { value: "netherlands", label: "Netherlands" },
  { value: "north-macedonia", label: "North Macedonia" },
  { value: "norway", label: "Norway" },
  { value: "poland", label: "Poland" },
  { value: "portugal", label: "Portugal" },
  { value: "romania", label: "Romania" },
  { value: "russia", label: "Russia" },
  { value: "san-marino", label: "San Marino" },
  { value: "serbia", label: "Serbia" },
  { value: "slovakia", label: "Slovakia" },
  { value: "slovenia", label: "Slovenia" },
  { value: "spain", label: "Spain" },
  { value: "sweden", label: "Sweden" },
  { value: "switzerland", label: "Switzerland" },
  { value: "uk", label: "United Kingdom" },
  { value: "ukraine", label: "Ukraine" },
  { value: "vatican", label: "Vatican City" },
  // Continents for other regions
  { value: "america-north", label: "North America" },
  { value: "america-central", label: "Central America" },
  { value: "america-south", label: "South America" },
  { value: "asia-east", label: "East Asia" },
  { value: "asia-south", label: "South Asia" },
  { value: "asia-southeast", label: "Southeast Asia" },
  { value: "asia-middle-east", label: "Middle East" },
  { value: "africa-north", label: "North Africa" },
  { value: "africa-central", label: "Central Africa" },
  { value: "africa-south", label: "Southern Africa" },
  { value: "africa-east", label: "East Africa" },
  { value: "africa-west", label: "West Africa" },
  { value: "oceania", label: "Oceania" },
];

export default function ContactPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    nda: false,
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const isComEmail = (value) => {
    if (!value) return false;
    const basic = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    return basic && /\.com$/i.test(String(value).trim().toLowerCase());
  };

  const validatePhoneNumber = (value) => {
    const digits = String(value || "").replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitMsg("");

    const fieldError =
      language === "ro" ? "Completează corect" : "Please fill correctly";

    if (!validateEmail(formData.email) || !isComEmail(formData.email)) {
      setErrors((e) => ({ ...e, email: fieldError }));
      return;
    }
    if (!validatePhoneNumber(formData.phone)) {
      setErrors((e) => ({ ...e, phone: fieldError }));
      return;
    }
    if (!formData.name || formData.name.trim().length < 2) {
      setErrors((e) => ({ ...e, name: fieldError }));
      return;
    }
    if ((formData.message || "").length > 300) {
      setErrors((e) => ({
        ...e,
        message: language === "ro" ? "Mesaj prea lung" : "Message too long",
      }));
      return;
    }
    // block URLs in message
    if (/(https?:\/\/|www\.)/i.test(formData.message || "")) {
      setErrors((e) => ({
        ...e,
        message:
          language === "ro"
            ? "Fără link-uri în mesaj"
            : "Links are not allowed in the message",
      }));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          country: selectedCountry?.label || "",
          nda: formData.nda,
          company: "", // honeypot
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed to send");
      setSubmitMsg(
        t?.contactSuccess ||
          "Thank you! Your message has been sent. We will get back to you shortly."
      );
      setFormData({ name: "", email: "", phone: "", message: "", nda: false });
      setSelectedCountry(null);
      setCooldown(15);
      const timer = setInterval(() => {
        setCooldown((c) => {
          if (c <= 1) {
            clearInterval(timer);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    } catch (err) {
      setSubmitMsg("We could not send your message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
        className="w-full text-white min-h-screen pt-10 md:pt-52 pb-20 px-6 md:px-12"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <div className="max-w-7xl mx-auto space-y-24">
          {/* First Row - Title & Form */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
            data-aos="fade-up"
          >
            {/* Left - Title and Description */}
            <div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight mb-6 pt-20 md:pt-0"
                style={{ color: "#00FF88" }}
              >
                {t.contactPageTitle}
              </h1>
              <p className="text-lg text-white/70">{t.contactPageSubtitle}</p>
            </div>

            {/* Right - Contact Form (simplified normal fields) */}
            <div>
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
                id="contact-form"
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  autoComplete="off"
                  tabIndex={-1}
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm text-white/80">
                      {t.yourName}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full rounded-md bg-transparent px-3 py-2 outline-none border ${
                        errors.name ? "border-red-500" : "border-[#2e2e2e]"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm mt-1 inline-block">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-white/80">
                      {t.yourEmail}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full rounded-md bg-transparent px-3 py-2 outline-none border ${
                        errors.email ? "border-red-500" : "border-[#2e2e2e]"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm mt-1 inline-block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm text-white/80">
                      {t.phoneNumber}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      inputMode="tel"
                      maxLength={15}
                      pattern="[0-9+\-()\s]{7,20}"
                      className={`w-full rounded-md bg-transparent px-3 py-2 outline-none border ${
                        errors.phone ? "border-red-500" : "border-[#2e2e2e]"
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-sm mt-1 inline-block">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-white/80">
                      {t.country}
                    </label>
                    <Select
                      value={selectedCountry}
                      onChange={setSelectedCountry}
                      options={countries}
                      placeholder={t.country}
                      isSearchable
                      instanceId="country-select"
                      inputId="country-select-input"
                      classNamePrefix="select"
                      styles={{
                        control: (base) => ({
                          ...base,
                          background: "transparent",
                          borderColor: "#2e2e2e",
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#111",
                          color: "white",
                        }),
                        singleValue: (base) => ({ ...base, color: "white" }),
                        input: (base) => ({ ...base, color: "white" }),
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-white/80">
                    {t.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={300}
                    rows={4}
                    className="w-full rounded-md border border-[#2e2e2e] bg-transparent px-3 py-2 outline-none"
                  ></textarea>
                  {errors.message && (
                    <span className="text-red-500 text-sm mt-1 inline-block">
                      {errors.message}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    type="submit"
                    disabled={submitting || cooldown > 0}
                    className="px-8 py-3 font-bold uppercase tracking-wide rounded-md hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#a8d8ff", color: "#000" }}
                  >
                    {submitting
                      ? language === "ro"
                        ? "Se trimite..."
                        : "Sending..."
                      : cooldown > 0
                      ? `${
                          language === "ro" ? "Așteaptă" : "Wait"
                        } ${cooldown}s`
                      : t.submit}
                  </button>
                  <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                    <input
                      type="checkbox"
                      id="nda"
                      name="nda"
                      checked={formData.nda}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    {t.ndaText}
                  </label>
                </div>
                {submitMsg && (
                  <div className="pt-2" aria-live="polite">
                    <div className="flex items-center gap-2 rounded-lg border border-green-400/60 bg-green-500/15 text-green-200 px-3 py-2 shadow-sm">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-base font-medium">{submitMsg}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Second Row - Contact Info & Map */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Left - Contact Information (pastel blue section) */}
            <div
              className="rounded-3xl p-5 md:p-6 flex flex-col self-start"
              style={{ backgroundColor: "#a8d8ff", color: "#000" }}
            >
              <h2
                className="text-2xl md:text-3xl font-bold uppercase mb-4"
                style={{ color: "#000" }}
              >
                {t.contactInfoTitle}
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="#000"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:+40733638517"
                    className="text-lg underline text-black"
                  >
                    +40 733 638 517
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="#000"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:contact@customyourwall.com"
                    className="text-lg underline text-black"
                  >
                    contact@customyourwall.com
                  </a>
                </div>
                {/* Removed bottom action button per request */}
              </div>
            </div>

            {/* Right - Map */}
            <div className="w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58968.19277053809!2d28.572477!3d44.1594484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40bae5ee19f7e3e5%3A0xc5db48c7f7aa5c11!2sConstan%C8%9Ba%2C%20Romania!5e0!3m2!1sen!2sro!4v1700000000000!5m2!1sen!2sro"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
