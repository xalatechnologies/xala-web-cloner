# Phase 01 – Next.js app scaffold, tokens, and Header

## Implementation Overview
- Scaffolded `apps/website` (Next.js 15, App Router, TS, Tailwind).
- Added design tokens via CSS variables and Tailwind theme mapping.
- Implemented accessible `Header` with desktop dropdowns and mobile drawer.
- Assembled homepage sections: `Hero`, `ServiceGrid`, `ProjectCards`, `ProductStripe`, `ClientLogos`, `Footer`, `BackToTop`.
- Stubbed core routes: tjenester, produkter, om-oss, aktuelt (+slug), partnere, kontakt, karriere.

## Technical Architecture
- Next.js App Router with server components by default; interactive parts as client components.
- Tailwind for styling with tokens exposed as CSS variables in `app/globals.css`.
- Components under `apps/website/components/site`.

## Next Steps
- Add mega/accordion polish (focus trap, arrow-key nav).
- Hook up real Xala content (projects, products, news).
- Add SEO metadata per page; structured data.
- Add tests (RTL for Header and cards, Playwright for a11y nav).
- Performance pass (images via next/image, font preloads). 