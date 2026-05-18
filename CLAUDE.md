# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Turbopack dev server
- `npm run build` — production build (Turbopack)
- `npm start` — serve the built app
- `npm run lint` — ESLint (uses `eslint-config-next`)

Node `>=20.17.0` is required (declared in `package.json` engines).

There is no test suite.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 · shadcn/ui (style `base-nova`, neutral base) · Leaflet/react-leaflet for the map · Lucide icons. Path alias `@/*` → `src/*`. Production domain is `sydneybanhmi.com.au`.

## Architecture

This is a fully static, data-driven directory. There is no backend, no database, and no fetching — all content is hardcoded TypeScript arrays compiled into the build.

**Data layer** (`src/data/` + `src/lib/data.ts`)
- `src/data/shops.ts` and `src/data/suburbs.ts` are flat `Shop[]` / `Suburb[]` exports. Shops join to suburbs via `suburbId` (the id field, *not* the slug).
- `src/lib/data.ts` is the only consumer of those arrays. It exposes pure getter functions (`getTopShops`, `getShopsBySuburb`, `getShopBySlug`, `getNotableMentions`, `searchShops`, etc.) that compute weighted scores on the fly from each shop's `reviews`.
- Scoring weights review sources by credibility: verified Food Inbox reviews `2.0×`, premium publications (Broadsheet, TimeOut, SMH, Good Food Guide, Gourmet Traveller) `1.5×`, aggregators (Google/Yelp/TripAdvisor) `1.0×`, individual blogs `0.7×`. The `overallScore` and four sub-scores returned in `ShopWithScores` are weighted averages of the raw 0–10 ratings on each review. Pages and components should always go through these getters rather than reading `shops`/`suburbs` directly — they depend on the score fields.
- Shops with `isNotableMention: true` are excluded from `getTopShops` and `getShopsBySuburb` but surface via `getNotableMentions`.

**Routing** (`src/app/`)
- All dynamic routes use `generateStaticParams` and SSG. Adding or removing a shop/suburb in `src/data/` is the only change needed to add or remove pages.
- Suburb route: `/suburbs/[slug]` with a nested shop route at `/suburbs/[slug]/[shopSlug]`. The shop page accepts `shopSlug` (not `id`) and resolves the parent suburb via `getSuburbById(shop.suburbId)`.
- `sitemap.ts`, `robots.ts`, and `opengraph-image.tsx` are also static, generated from the same data.

**Types** (`src/types/index.ts`) — `Suburb`, `Shop`, `Review`, `BanhMiType`, plus the derived `ShopWithScores` returned by the data layer. Source attribution lives on each `Review` (`sourceName`, `sourceUrl`, `isVerified`); rendering of the Food Inbox source banner keys off the top-level `Shop.foodInboxUrl`.

## Editing the directory

Every listed shop is intended to be a real, verifiable Sydney business. A prior cleanup removed 33 AI-fabricated entries (generic `[Suburb] Banh Mi` / `[Suburb] Hot Bread` names with synthetic reviews) and the 18 suburbs that only existed to host them. When adding shops, verify the business exists (e.g. via Broadsheet, TimeOut, Urban List, Google Maps) before committing — do not invent listings to fill empty suburbs. If you add a suburb, also add at least one verified shop for it, otherwise the suburb page will render with no results.
