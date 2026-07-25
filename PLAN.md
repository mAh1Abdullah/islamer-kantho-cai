# Development Plan — ইসলামের কন্ঠ Rebuild

Foundation (Phase 0) is done — tokens, config, and the `components/common/`
primitives. This plan sequences everything else so each phase only depends
on phases already built, and nothing gets built twice.

| Phase | Deliverable | Depends on |
|---|---|---|
| 0 ✅ | Design tokens, Tailwind config, `components/common/*`, `utils/cn,date,readingTime`, `SEO.tsx` | — |
| 1 ✅ | **Data layer**: `types/`, `lib/sanity/client.ts`, `queries.ts`, `posts.ts`, `categories.ts`, `authors.ts`, `featured.ts`, `recommended.ts` | 0 |
| 2 ✅ | **Hooks**: `useScroll`, `useMediaQuery`, `useDebounce`, `useMounted`, `useInfinitePosts`, `useSearch` | 1 |
| 3 ✅ | **Layout shell**: `Header` (sticky/transparent-to-white), `Footer`, `Drawer`, `Navigation` | 0, 2 |
| 4 ✅ | **Home page**: `HeroBanner`, `ArticleCard` (all 6 variants), `PrayerWidget`+`HijriWidget` (lazy via `next/dynamic`), real Home composition wired to Sanity | 1, 2, 3 |
| 5 ✅ | **Category pages**: grid + Load More / infinite pagination | 1, 2, 4 |
| 6 ✅ | **Single Article page**: Portable Text renderers, `ArticleMeta`, `Date`, `ShareButtons`, TOC, related articles, `Newsletter`, back-to-top | 1, 4 |
| 7 ✅ | **Search**: `SearchInput`, debounced instant search, keyboard nav, empty/loading states | 1, 2 |
| 8 ✅ | **SEO wiring**: real per-page `generateMetadata` + JSON-LD on Home/Category/Article, `sitemap.ts`, `robots.ts` | 1, 4, 5, 6 |
| 9 ✅ | **Accessibility pass**: Drawer focus trap, focus-return-on-close; performance already covered by Phase 1-7's `sizes`/`priority`/blur/lazy-widget choices | all above |
| 10 | **Final cleanup**: dead code, duplicate query check, naming pass, this-file docs | all above |

## Notes from this pass (Phase 8–9)

- **Sitemap/robots**: `app/sitemap.ts` walks all posts in batches (not a
  single unbounded query) plus categories; `app/robots.ts` disallows
  `/studio` and `/api/`.
- **JSON-LD consolidated**: Organization + WebSite (with a SearchAction
  pointing at `/search?q=`) now render once, site-wide, from the root
  layout — previously Organization was only on Home, which would have
  meant duplicating it as more pages needed it. Article/Breadcrumb schemas
  stay page-specific (Article, Category, single Article pages).
- **The two open API routes are now real**:
  - `/api/hijri-date` — implemented as a local deterministic tabular
    Islamic-calendar conversion (`utils/hijri.ts`), not an external call.
  - `/api/prayer-times` — deliberately proxies the Aladhan API server-side
    rather than hand-rolling sun-angle astronomy: prayer times are a
    religious-observance feature where a subtle formula bug is a
    real-world harm, and the calculation *method* (angle convention)
    genuinely varies by regional authority — Aladhan's `method` param
    handles that; a generic formula can't. Defaults to Dhaka coordinates
    and the Karachi method (common across Bangladesh/South Asia),
    overridable via `?lat=&lng=&method=`.
- **Accessibility**: `Drawer` only set initial focus before — added a
  real Tab/Shift+Tab focus trap over the panel's focusable elements (WCAG
  2.1 AA dialog requirement) and focus-return to whatever opened it
  (the hamburger button) on close.
- Not independently re-verified: actual Lighthouse scores, since running
  a real audit needs a live build (`npm install && npm run build` — not
  possible in this no-network environment). Everything gating those
  scores (image `sizes`/`priority`/blur, lazy-loaded widgets, semantic
  headings, focus rings, `prefers-reduced-motion`) is in place from
  earlier phases, but treat the "95+/100/100/100" targets as unverified
  until you run it locally.

## Notes from Phases 5–7 (still relevant)

- Category page renders page 1 server-side (SEO/LCP) and hands off to
  `CategoryGridClient` (client component + `useInfinitePosts`) for
  "Load More" pages.
- `estimateReadingTime`'s signature was tightened to accept
  `PortableTextBlock[] | string` directly (was a loose inline shape that
  wouldn't have type-checked cleanly against strict mode).
- Caught and fixed two invalid-nesting bugs (`<Link>` nested inside
  `<button>` in Header/HeroBanner, and `ArticleCard`'s own `<Link>`
  double-wrapped in `SearchClient`) — both replaced with a plain
  styled element instead of nesting interactive elements.

## What's left — Phase 10 only

Dead-code sweep, a duplicate-GROQ-field check (should already be clean —
everything composes from `lib/sanity/queries.ts` fragments), a naming
pass, and confirming every file that needs a "why" comment has one.
