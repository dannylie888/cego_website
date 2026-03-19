# CEGO Ceramics — Website

Premium company-profile website for Cego Ceramics. Built with Next.js 15, Tailwind CSS v4, GSAP, and Lenis smooth scroll. Bilingual (English / Thai), fully SEO-optimised.

---

## Prerequisites

Make sure these are installed on your machine before you start:

| Tool | Minimum version | Check |
|------|----------------|-------|
| [Node.js](https://nodejs.org) | 18.17+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | any | `git --version` |

---

## Quick Start

```bash
# 1. From the repo root, move into the website folder
cd website

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

- English version → [http://localhost:3000/en](http://localhost:3000/en)
- Thai version → [http://localhost:3000/th](http://localhost:3000/th)

The root `/` automatically redirects to `/en`.

> **Port conflict?** If port 3000 is busy, Next.js will use the next available port (e.g. 3001). Check the terminal output for the actual URL.

---

## Project Structure

```
website/
├── app/
│   ├── layout.tsx              # Root HTML shell (html + body)
│   ├── page.tsx                # Root redirect → /en
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # sitemap.xml
│   ├── globals.css             # Global styles, brand tokens, fonts
│   └── [locale]/
│       ├── layout.tsx          # Per-locale layout (SEO metadata, JSON-LD, providers)
│       └── page.tsx            # Single-page entry (assembles all sections)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed top nav with smooth-scroll links
│   │   └── Footer.tsx          # Footer with nav + contact info
│   ├── sections/
│   │   ├── Hero.tsx            # Full-viewport hero with parallax + word reveal
│   │   ├── About.tsx           # Brand story + animated stat counters
│   │   ├── Collections.tsx     # 8-card collection grid + marquee band
│   │   ├── Catalog.tsx         # Paginated image carousel + lightbox
│   │   ├── WhyCego.tsx         # 6 USP feature rows
│   │   └── Contact.tsx         # Contact form + info
│   ├── ui/
│   │   ├── CursorDot.tsx       # Custom trailing cursor (desktop only)
│   │   ├── LanguageToggle.tsx  # EN / TH switcher
│   │   ├── LightboxModal.tsx   # Full-screen image lightbox
│   │   └── MarqueeText.tsx     # Infinite GSAP marquee
│   └── providers/
│       └── SmoothScrollProvider.tsx  # Lenis + GSAP ticker integration
│
├── lib/
│   ├── gsap.ts                 # GSAP + ScrollTrigger registration
│   └── lenis-context.tsx       # LenisContext + useLenisScroll() hook
│
├── messages/
│   ├── en.json                 # English translations
│   └── th.json                 # Thai translations
│
├── i18n/
│   ├── routing.ts              # next-intl locale config
│   └── request.ts              # Server-side message loader
│
├── proxy.ts                    # next-intl routing middleware
├── public/
│   └── images/
│       ├── hero/               # Hero background images
│       └── collections/        # Product images (blue-white, matt-brown, …)
│
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Available Scripts

Run these from inside the `website/` folder:

```bash
# Development server with hot reload
npm run dev

# Production build (outputs to .next/)
npm run build

# Start the production server (requires build first)
npm start

# Lint the codebase
npm run lint
```

---

## Updating Content

### Text & Translations

All site copy lives in `messages/`:

- `messages/en.json` — English
- `messages/th.json` — Thai

Edit the values in these files to change any text on the site. The structure mirrors the page sections (`hero`, `about`, `collections`, `catalog`, `whyCego`, `contact`, `footer`).

### Product Images

Images are served from `public/images/collections/`. To add or swap images:

1. Drop new `.jpg` or `.webp` files into the appropriate collection folder (e.g. `public/images/collections/blue-white/`)
2. Use ASCII-only filenames (no Thai characters, no spaces)
3. Update the image path references in the matching section component (e.g. `components/sections/Catalog.tsx`)

### Contact Information

Placeholder contact details are in `messages/en.json` and `messages/th.json` under the `contact.info` key. Replace with real details when available.

---

## Adding a New Language

1. Add the locale to `i18n/routing.ts`:
   ```ts
   locales: ['en', 'th', 'zh'],   // add 'zh' for example
   ```
2. Create `messages/zh.json` (copy `en.json` as a template and translate)
3. Update the `LanguageToggle` component to include the new option

---

## Tech Stack

| Library | Purpose |
|---------|---------|
| [Next.js 16](https://nextjs.org) | React framework, App Router, SSG |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [GSAP 3](https://gsap.com) | Scroll animations, parallax, reveals |
| [Lenis](https://lenis.darkroom.engineering) | Buttery-smooth scroll |
| [next-intl](https://next-intl.dev) | i18n routing (EN / TH) |
| [sharp](https://sharp.pixelplumbing.com) | Next.js image optimisation |

---

## Deployment

### Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from the website/ folder
vercel
```

Set the **Root Directory** to `website` in the Vercel project settings.

### Self-hosted

```bash
# Build
npm run build

# Start production server on port 3000
npm start

# Or on a custom port
PORT=8080 npm start
```

---

## Source Materials

The `cego_materials/` folder at the repo root contains original catalogue PDFs and high-resolution product images used as the image source. The website uses optimised copies inside `website/public/images/`.
