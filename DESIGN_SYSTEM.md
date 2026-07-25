# Design System — ইসলামের কন্ঠ (Islamer Kantho)

## Tokens (from brief — followed exactly, not reinterpreted)

| Token | Value | Use |
|---|---|---|
| Primary | `#055547` (Deep Emerald) | brand, links, primary buttons, active nav |
| Secondary | `#D1BB9E` (warm sand) | badges, ornament, subtle accents |
| Background | `#FAFAF8` | page background |
| Surface | `#FFFFFF` | cards, header-on-scroll, modals |
| Border | `#E8E8E8` | hairlines only — never used to box every element |
| Text Primary | `#1F2937` | headings, body |
| Text Secondary | `#6B7280` | meta, captions |
| Success / Error / Warning | `#41B06E` / `#E72929` / `#F59E0B` | form + system feedback only |

Type scale (hero 64 / h1 48 / h2 36 / h3 30 / h4 24 / body 18 / small 15 /
caption 13) is implemented as Tailwind `text-*` utilities in
`tailwind.config.ts` — never use arbitrary `text-[Npx]` values elsewhere.

Fonts: **Hind Siliguri** for Bangla body/headings (loaded via
`next/font/google`, Bengali+Latin subsets), **Inter** for any Latin-only
UI chrome (numerals in the studio login, etc). Both exposed as CSS
variables (`--font-bangla`, `--font-inter`) so Tailwind's `font-bangla` /
`font-sans` utilities stay the only place font-family is chosen.

## Signature element

The brief already fixes the palette and the "calm / minimal / Apple /
Medium / Notion" direction, so the one place left for a deliberate,
subject-specific choice is a small piece of restraint: a single-line
eight-point star (khatam), the geometric motif found throughout Islamic
architecture and manuscript illumination, reduced to a 16px line-art
mark. It appears in exactly one place in the whole system — the
`Divider` component's `ornament` variant, used only between major
sections (e.g. under the hero, above the footer CTA). Nowhere else does
geometric ornament appear: no border patterns, no repeating background
motifs, no icon set built from it. That restraint is what keeps it
reading as *the* signature rather than decoration.

## Why not the AI-default look

This brief already pins its own direction (deep emerald, warm sand,
off-white, generous whitespace) — nothing here reaches for the generic
cream/terracotta, near-black/acid-green, or hairline-newspaper defaults.
Shadows are avoided almost everywhere; the one exception (`Card`
`interactive`) uses a barely-there tinted shadow (`rgba(5,85,71,0.06)`)
derived from the primary color itself, not a generic gray box-shadow.

## What's built in this pass

Foundation only (per your "start scaffolding" choice):

- Project scaffold: `package.json`, `tsconfig.json` (strict, `@/*`
  path aliases), `tailwind.config.ts`, `next.config.js`,
  `postcss.config.js`
- `constants/`: `colors.ts`, `layout.ts`, `routes.ts`, `site.ts`, `seo.ts`
- `utils/`: `cn.ts`, `date.ts` (Bangla numerals/date), `readingTime.ts`
- `styles/globals.css`: base resets, visible focus rings everywhere,
  `prefers-reduced-motion` handling, skeleton shimmer
- `components/common/`: `Container`, `Section`, `SectionHeading`,
  `Button`, `IconButton`, `Badge`, `Tag`, `CategoryChip`, `Card`,
  `Avatar`, `Divider` (incl. signature ornament), `LoadingSkeleton` +
  `ArticleCardSkeleton`, `EmptyState`, `ScrollTopButton`, `SEO.tsx`
  (metadata builder + JSON-LD helpers: Organization, Article, Breadcrumb)
- `src/app/layout.tsx`: fonts wired via `next/font/google`, base metadata
- `src/app/page.tsx`: a **temporary preview page** proving the
  foundation composes correctly (not the real home page yet)

## Not yet built (next steps, per your original 17-step plan)

Steps 5–17: real Header/Footer, Hero Banner, the full Article Card
variant set (small/medium/large/horizontal/featured/compact), Single
Article page + Portable Text renderers, Sanity `lib/sanity/*` client +
GROQ query modules, Search, Drawer, Prayer/Hijri widgets (lazy-loaded),
`hooks/` (`useScroll`, `useMediaQuery`, `useDebounce`, `useInfinitePosts`,
`useSearch`, `useMounted`), and the accessibility/performance/SEO
hardening pass.

## Note on running this

This environment has no network access, so dependencies were **not**
installed and the build was **not** executed here — these are hand-written
source files only. After downloading:

```bash
npm install
npm run dev
```
