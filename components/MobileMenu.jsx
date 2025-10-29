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

export default function MobileMenu({
  progress = 0,
  inlineInBar = false,
  disableBubble = false,
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const menuColor = inlineInBar ? "#fff" : isHome ? "#111" : "#fff";
  // When the panel opens over a white background, ensure the toggle becomes dark for contrast
  const openMenuBtnColor = inlineInBar ? "#111" : menuColor;
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

  const effectiveProgress = disableBubble ? 0 : progress;
  const clamped = Math.max(0, Math.min(1, effectiveProgress));
  const translateY = 24 * clamped; // px moving out of the bar
  const bgAlpha = 0.12 * clamped;
  const borderAlpha = 0.22 * clamped;

  return (
    <div
      className={
        "block md:hidden " +
        (inlineInBar
          ? "mobile-menu-inline relative z-[70]"
          : "fixed left-0 right-0 z-[70]")
      }
      style={
        inlineInBar
          ? {
              ["--mm-translate-y"]: translateY + "px",
              ["--mm-glass-bg"]: String(bgAlpha),
              ["--mm-glass-border"]: String(borderAlpha),
            }
          : { top: 12 }
      }
      data-progress={inlineInBar ? clamped : undefined}
      data-scrolled={
        inlineInBar && !disableBubble && clamped > 0.05 ? true : undefined
      }
    >
      <StaggeredMenu
        position="right"
        items={items}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor={menuColor}
        openMenuButtonColor={openMenuBtnColor}
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
