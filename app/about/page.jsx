"use client";

import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

export default function AboutUs() {
  const { language } = useLanguage();
  const t = translations[language];

  const content = {
    en: {
      title: "About Us",
      subtitle: "Turning walls into art.",
      lastUpdated: "Last updated: October 2025",
      intro:
        "At Custom Your Wall, we believe every wall has a story to tell.\nEvery space carries its own personality — we bring it to life through high-precision wall printing, vivid colors, and fully customized designs.",
      mission: {
        title: "Our Mission",
        content:
          "Our mission is to redefine the way people see walls — not as plain surfaces, but as creative expressions of personality and vision.\nEvery project we take is a collaboration between your imagination and our expertise, resulting in a unique, flawless, and lasting piece of wall art.",
      },
      whatWeDo: {
        title: "What We Do",
        items: [
          "Direct Wall Printing – professional high-resolution printing compatible with all flat surfaces (concrete, wood, glass, plaster, metal, painted walls, etc.)",
          "Custom Designs – personalized artwork created exclusively for each client's space and style",
          "Full Project Support – from consultation and digital preview to final printing and finishing",
        ],
      },
      quality: {
        title: "Quality, Precision, Durability",
        content: "We use only premium UV printing technology, ensuring:",
        features: [
          "Deep, vibrant colors that last",
          "Smooth surface texture with detailed precision",
          "Scratch-resistant and easy to clean prints",
          "Certified fire-safe and eco-friendly inks (low VOC)",
        ],
      },
      whyChoose: {
        title: "Why Choose Custom Your Wall",
        items: [
          "Unique design for every client",
          "Professional equipment & certified materials",
          "Fast, clean, on-site wall printing",
          "Long-lasting premium results",
        ],
      },
      vision: {
        title: "Our Vision",
        content:
          "We aim to inspire people to transform ordinary spaces into extraordinary ones — filled with color, personality, and emotion.\nFrom private homes and offices to commercial spaces and showrooms, our wall prints create a lasting visual impact.",
      },
      legal: {
        title: "Legal / Operator Details",
        company: "Operator: VERTICAL PRINTING ARTIFICAL INTELLIGENCE SRL",
        address: "📍 Address: Constanța",
        details:
          "📇 Company ID (CUI): 47670139 | Trade Registry: J13/600/2023 | EUID: ROONRC.J13/600/2023 | Incorporated: 2023",
        email: "📧 Email: customyourwall@gmail.com",
        phone: "📞 Phone: +40 733 638 517",
      },
      contact: {
        title: "Contact Us",
        content:
          "For questions, collaborations, or custom projects, feel free to contact us:",
        email: "📩 customyourwall@gmail.com",
        form: "or use the contact form on the Contact page.",
      },
      tagline: "Custom Your Wall – Your vision, perfectly printed.",
    },
    ro: {
      title: "Despre Noi",
      subtitle: "Transformăm pereții în artă.",
      lastUpdated: "Ultima actualizare: Octombrie 2025",
      intro:
        "La Custom Your Wall, credem că fiecare perete are o poveste de spus.\nFiecare spațiu își poartă propria personalitate — noi îi dăm viață prin imprimare de precizie înaltă pe pereți, culori vii și designuri complet personalizate.",
      mission: {
        title: "Misiunea Noastră",
        content:
          "Misiunea noastră este să redefinim modul în care oamenii văd pereții — nu ca suprafețe simple, ci ca expresii creative ale personalității și viziunii.\nFiecare proiect pe care îl luăm este o colaborare între imaginația ta și expertiza noastră, rezultând o operă de artă unică, fără cusur și durabilă.",
      },
      whatWeDo: {
        title: "Ce Facem",
        items: [
          "Imprimare Directă pe Perete – imprimare profesională de înaltă rezoluție compatibilă cu toate suprafețele plane (beton, lemn, sticlă, tencuială, metal, pereți vopsiți, etc.)",
          "Designuri Personalizate – opere de artă personalizate create exclusiv pentru spațiul și stilul fiecărui client",
          "Suport Complet de Proiect – de la consultație și previzualizare digitală la imprimarea finală și finisare",
        ],
      },
      quality: {
        title: "Calitate, Precizie, Durabilitate",
        content: "Folosim doar tehnologia premium de imprimare UV, asigurând:",
        features: [
          "Culori vii și profunde care rezistă",
          "Textură de suprafață netedă cu precizie detaliată",
          "Imprimate rezistente la zgârieturi și ușor de curățat",
          "Cerneală certificată sigură la foc și eco-friendly (VOC scăzut)",
        ],
      },
      whyChoose: {
        title: "De Ce Să Ne Alegi",
        items: [
          "Design unic pentru fiecare client",
          "Echipamente profesionale și materiale certificate",
          "Imprimare rapidă, curată, pe loc pe perete",
          "Rezultate premium de lungă durată",
        ],
      },
      vision: {
        title: "Viziunea Noastră",
        content:
          "Ne propunem să inspirăm oamenii să transforme spațiile obișnuite în unele extraordinare — pline de culoare, personalitate și emoție.\nDe la case private și birouri la spații comerciale și showroom-uri, imprimatele noastre pe pereți creează un impact vizual durabil.",
      },
      legal: {
        title: "Detalii Legale / Operator",
        company: "Operator: VERTICAL PRINTING ARTIFICAL INTELLIGENCE SRL",
        address: "📍 Adresă: Constanța",
        details:
          "📇 CUI: 47670139 | Nr. Reg. Com.: J13/600/2023 | EUID: ROONRC.J13/600/2023 | Data înființării: 2023",
        email: "📧 Email: customyourwall@gmail.com",
        phone: "📞 Telefon: +40 733 638 517",
      },
      contact: {
        title: "Contactează-ne",
        content:
          "Pentru întrebări, colaborări sau proiecte personalizate, nu ezita să ne contactezi:",
        email: "📩 customyourwall@gmail.com",
        form: "sau folosește formularul de contact de pe pagina Contact.",
      },
      tagline: "Custom Your Wall – Viziunea ta, imprimată perfect.",
    },
  };

  const currentContent = content[language];

  return (
    <div
      className="min-h-screen text-white pt-32 pb-20"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <h1
          className="text-4xl md:text-5xl font-bold uppercase mb-4"
          style={{ color: "#00E5FF" }}
        >
          {currentContent.title}
        </h1>
        <p className="text-lg text-white/70 mb-12">
          {currentContent.lastUpdated}
        </p>

        {/* Introduction */}
        <div className="mb-16">
          <div className="bg-gray-900/50 rounded-lg p-8">
            <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">
              {currentContent.intro}
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <div className="bg-gray-900/50 rounded-lg p-8">
            <h2
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ color: "#00FF88" }}
            >
              {currentContent.mission.title}
            </h2>
            <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">
              {currentContent.mission.content}
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="mb-16">
          <div className="bg-gray-900/50 rounded-lg p-8">
            <h2
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ color: "#FF00D6" }}
            >
              {currentContent.whatWeDo.title}
            </h2>
            <div className="space-y-4">
              {currentContent.whatWeDo.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-white mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quality */}
        <div className="mb-16">
          <div className="bg-gray-900/50 rounded-lg p-8">
            <h2
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ color: "#FFB800" }}
            >
              {currentContent.quality.title}
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              {currentContent.quality.content}
            </p>
            <div className="space-y-3">
              {currentContent.quality.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-white mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose */}
        <div className="mb-16">
          <div className="bg-gray-900/50 rounded-lg p-8">
            <h2
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ color: "#00FF88" }}
            >
              {currentContent.whyChoose.title}
            </h2>
            <div className="space-y-4">
              {currentContent.whyChoose.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-green-400 text-xl">✔️</div>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="mb-16">
          <div className="bg-gray-900/50 rounded-lg p-8">
            <h2
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ color: "#00E5FF" }}
            >
              {currentContent.vision.title}
            </h2>
            <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">
              {currentContent.vision.content}
            </p>
          </div>
        </div>

        {/* Legal */}
        <div className="mb-16">
          <div className="bg-gray-900/50 rounded-lg p-8">
            <h2
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ color: "#FF00D6" }}
            >
              {currentContent.legal.title}
            </h2>
            <div className="space-y-3">
              <p className="text-lg text-white/90">
                {currentContent.legal.company}
              </p>
              <p className="text-lg text-white/90">
                {currentContent.legal.address}
              </p>
              <p className="text-lg text-white/90">
                {currentContent.legal.details}
              </p>
              <p className="text-lg text-white/90">
                {currentContent.legal.email}
              </p>
              <p className="text-lg text-white/90">
                {currentContent.legal.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-16">
          <div className="bg-gray-900/50 rounded-lg p-8">
            <h2
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ color: "#FFB800" }}
            >
              {currentContent.contact.title}
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              {currentContent.contact.content}
            </p>
            <p className="text-lg text-white/90 mb-4">
              {currentContent.contact.email}
            </p>
            <p className="text-lg text-white/90">
              {currentContent.contact.form}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center">
          <p
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "#00FF88" }}
          >
            {currentContent.tagline}
          </p>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 font-bold text-base rounded-full tracking-widest shadow-xl transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#a8d8ff", color: "#000000" }}
          >
            <span>{language === "ro" ? "Înapoi la site" : "Back to site"}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
