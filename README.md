# Ayurvan Resort & Convention — Website

A production-grade Next.js 15 website for Ayurvan Resort in Vijayawada, Andhra Pradesh.

## Tech Stack
- **Next.js 15** App Router
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — subtle, elegant animations
- **Lucide React** — icons

## Pages
- `/` — Home (hero, intro, venues, gallery, testimonials, CTA)
- `/about` — Brand story, philosophy, timeline
- `/rooms` — Rooms & suites showcase with pricing
- `/experiences` — Venues, packages, nature experiences
- `/dining` — Restaurant, menu highlights, philosophy
- `/gallery` — Masonry gallery with lightbox and category filters
- `/contact` — Enquiry form, contact info, embedded map
- `/booking` — Multi-step booking form with pricing summary

## Design System
- **Typography:** Cormorant Garamond (serif display) + Jost (sans body)
- **Palette:** Natural earth tones — cream (#FAF6EF), parchment (#F2EBD9), moss (#4A5C4A), stone greys
- **Motion:** Framer Motion with `whileInView` reveals, slow zoom hero, hover scale transitions

## Folder Structure
```
app/             — Pages (App Router)
components/      — Navbar, Footer
components/ui/   — SectionHeading, Button, CTASection
data/            — rooms.ts, wellness.ts, testimonials.ts (CMS-ready JSON structure)
public/          — Static assets
```

## Deploy to Vercel
```bash
npx vercel --prod
```

## Local Development
```bash
npm install
npm run dev
```
