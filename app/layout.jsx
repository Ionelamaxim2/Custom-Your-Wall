import "./globals.css";
import "../components/StaggeredMenu.css";
import CookieConsent from "../components/CookieConsent";
import Navbar from "../components/Navbar";
import MobileTopBar from "../components/MobileTopBar";
import Footer from "../components/Footer";
import AOSClient from "../components/AOSClient";
import { LanguageProvider } from "../contexts/LanguageContext";

export const metadata = {
  title: "Custom your wall",
  description: "Transform your walls into art",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/photos/logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Julius+Sans+One&family=Big+Shoulders+Text:wght@700&family=Advent+Pro:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#1A1A1A] text-white min-h-screen flex flex-col font-bigshoulders">
        <LanguageProvider>
          <AOSClient />
          <MobileTopBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
