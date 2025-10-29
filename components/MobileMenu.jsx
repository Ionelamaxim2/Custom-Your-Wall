"use client";

import StaggeredMenu from "./StaggeredMenu";
import { usePathname } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";
import { useEffect, useState } from "react";

// Items will be built dynamically from translations inside the component

const socialItems = [
  { label: "Instagram", link: "https://www.instagram.com/customyourwall.ig/" },
  {
    label: "Facebook",
    link: "https://www.facebook.com/profile.php?id=61583014917048",
  },
];

export default function MobileMenu() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const menuColor = isHome ? "#111" : "#fff";
  const { language } = useLanguage();
  const t = translations[language];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const items = [
    {
      label: (t.home || "Home").toUpperCase(),
      ariaLabel: language === "ro" ? "Mergi la acasă" : "Go to home page",
      link: "/",
    },
    {
      label: (t.gallery || "Gallery").toUpperCase(),
      ariaLabel: language === "ro" ? "Vezi galeria" : "View our gallery",
      link: "/gallery",
    },
    {
      label: (t.contact || "Contact").toUpperCase(),
      ariaLabel: language === "ro" ? "Contactează-ne" : "Get in touch",
      link: "/contact",
    },
  ];

  if (!mounted) return null; // avoid flash on initial SSR

  return (
    <div className="block md:hidden fixed top-3 left-0 right-0 h-[72px] z-50">
      <StaggeredMenu
        position="right"
        items={items}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor={menuColor}
        openMenuButtonColor={menuColor}
        changeMenuColorOnOpen={true}
        colors={["#B19EEF", "#5227FF"]}
        accentColor="#ff6b6b"
        isFixed={true}
        onMenuOpen={() => {}}
        onMenuClose={() => {}}
      />
    </div>
  );
}
