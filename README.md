<<<<<<< HEAD
# Custom-Your-Wall
=======
Custom Your Wall – Next.js App

Overview

Custom Your Wall is a Next.js 14 (App Router) website with a mobile‑first cinematic intro, Why Wall Printing section, interactive materials, a gallery with glowing effects, a contact page with secure email sending, and a bilingual (RO/EN) UI.

Tech Stack

- Next.js 14 (App Router), React 18
- Tailwind CSS
- Framer Motion (hero doors)
- GSAP (mobile staggered menu)
- AOS (Animate On Scroll)

Getting Started

Requirements

- Node.js 18+
- npm or yarn

Install

```bash
npm install
```

Development

```bash
npm run dev           # defaults to port 3000; use -p to pick another port
npm run dev -- -p 3002
```

Build & Start

```bash
npm run build
npm run start         # serves the production build
```

Environment Configuration

The contact form sends emails through `/api/send-email` using nodemailer. Configure via `.env.local` in the project root. The API supports both generic SMTP variables and simple EMAIL\_\* fallbacks.

Option A – Generic SMTP (recommended for Hostinger)

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465            # or 587
SMTP_SECURE=true         # true for 465, false for 587
SMTP_USER=your@domain.com
SMTP_PASS=your_smtp_password
MAIL_FROM=your@domain.com
MAIL_TO=contact@customyourwall.com
```

Option B – Simple variables (fallbacks)

```
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your@domain.com
EMAIL_PASS=your_smtp_password
EMAIL_FROM=your@domain.com
EMAIL_TO=contact@customyourwall.com
```

Important

- The API enforces emails ending in .com and rejects messages with links to reduce spam.
- Basic rate limits are in place (per IP and per email) and a honeypot field is used.

Cookies & Consent

The app shows a GDPR‑style consent after 5 seconds if no preference is saved:

- Desktop: bottom bar (black background)
- Mobile: centered frosted‑glass modal
- Preference stored in `localStorage` under `cyw_cookie_consent` (accepted/declined)
- Accept/Decline dispatch events: `cyw-consent-accepted` / `cyw-consent-declined`, and pushes to `dataLayer` if present

Accessibility

- Buttons and links include accessible names where needed
- Color contrast adjustments in navbar/footer
- Keyboard escape/overlay close for gallery modals

Localization

- Romanian / English toggle is available (Navbar + Mobile Menu)
- Translations live in `data/translations`

Key Features

- Mobile Intro page (title/subtitle, background image) loads instantly
- Desktop Hero doors (Framer Motion) revealing `Why Wall Printing`
- Why Wall Printing (mobile and desktop layouts)
- Interactive materials section (desktop: dot grid + circular items; mobile: circle variant)
- Infinite text bars between sections
- Gallery page with glow hover and modal viewer (images/videos muted, loop)
- Contact page with secure form, country select, validation (name/email .com/phone/message), toast‑style success and cooldown

Scripts

```bash
npm run dev
npm run build
npm run start
```

Project Structure

```
app/
  page.jsx                # Home
  layout.jsx              # Root layout (Navbar, Footer, Cookie consent)
  gallery/page.tsx        # Gallery
  contact/page.jsx        # Contact form + map
  privacy/page.jsx        # Privacy Policy
  terms/page.jsx          # Terms of Use
  about/page.jsx          # About Us (Legal details)
components/
  Navbar.jsx, Footer.jsx
  Hero.jsx                # Desktop doors
  IntroMobile.jsx         # Mobile intro
  WhyWallPrinting.jsx     # Desktop "Why Wall Printing"
  WhyMobile.jsx           # Mobile variant
  InteractiveSection.jsx  # Desktop interactive circle + DotGrid
  InteractiveCircleMobile.jsx
  GallerySlider.jsx
  ContactBanner.jsx
  CookieConsent.jsx
  StaggeredMenu.jsx + StaggeredMenu.css
  ui/glowing-effect.tsx
public/photos/            # Images & videos used across the app
```

Troubleshooting

Ports in use

```bash
lsof -ti :3000 | xargs kill -9   # or 3001/3002
npm run dev -- -p 3002
```

Nodemailer not found / install issues

- Install: `npm i nodemailer --no-audit --no-fund`
- If ENOTEMPTY: `rm -rf node_modules/nodemailer node_modules/.nodemailer-* && npm cache verify && npm i nodemailer`
- As a last resort: `rm -rf node_modules package-lock.json && npm install`

Hydration warnings

- Mobile Intro is client‑only; we use `suppressHydrationWarning` to avoid mismatches
- InteractiveSection is client‑only (dynamic import without SSR) to avoid randomness mismatches

Licensing

Proprietary project. All rights reserved.
>>>>>>> ce7b82d (initial)
