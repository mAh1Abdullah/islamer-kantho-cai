# Islamer Kantho v2.0 — Development Plan

This plan replaces the earlier rebuild outline and reflects the complete product blueprint for a modern, CMS-driven Islamic publishing platform.

## 1. Project Vision

Build a premium-quality Islamic digital publication platform that is fast, SEO-optimized, scalable, and fully manageable from Sanity CMS.

The platform should combine:
- the simplicity of Medium
- the structure of a professional news website
- the elegance of premium Islamic publications

Primary content areas:
- Islamic articles
- Islamic Q&A
- Media library
- Image gallery
- Static pages
- Powerful search
- Excellent reading experience

---

## 2. Product Goals

The v2.0 release should deliver:
- modern minimal UI
- lightning-fast performance
- premium reading experience
- mobile-first design
- accessibility (WCAG AA)
- strong SEO
- dynamic content management
- easy administration
- future scalability

---

## 3. Core Technology Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- Framer Motion
- React Icons
- Shadcn UI
- Lucide Icons

### CMS
- Sanity v3
- Sanity Content Lake

### Deployment
- Vercel
- ISR
- Edge-ready architecture
- Optimized image pipeline

---

## 4. Design Language

### Theme
Modern Islamic Minimalism

### Color System
- Primary: #055547
- Secondary: #0F766E
- Accent: #C8A44D
- Background: #FAFAF7
- Card: #FFFFFF
- Text: #1F2937
- Muted: #6B7280
- Border: #E5E7EB

### Typography
- Headings: Noto Serif Bengali
- Body: Hind Siliguri
- Arabic: Amiri
- English: Inter

---

## 5. Site Structure

The platform will include:
- Home
- Articles
- Q&A
- Media
- Gallery
- Pages
- Search

Navigation must be CMS-driven, not hardcoded.

---

## 6. Core Product Requirements

### Header
- sticky layout
- glass effect while scrolling
- CMS-managed navigation
- search button
- responsive mobile drawer

### Prayer Time Bar
- displays Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha
- shows Gregorian and Hijri dates
- updates automatically

### Hero Section
- large carousel with unlimited slides
- image, headline, subtitle, CTA, internal/external links
- scheduling, ordering, and visibility controls
- autoplay, swipe, keyboard support, pause-on-hover

### Homepage Sections
- hero
- featured articles
- latest articles
- popular articles
- editor’s picks
- Q&A
- media
- gallery preview
- newsletter

Each homepage section should be CMS-configurable and reorderable.

### Articles
- feature image
- title, slug, category, tags, author
- publish date, reading time
- SEO fields
- related content
- social sharing
- print support

### Rich Content Editor
Support block-based content including:
- paragraphs
- headings
- quotes
- Arabic quotes
- images and galleries
- YouTube, video, audio, PDF embeds
- tables, callouts, FAQs, hadith, Quran verses
- columns, buttons, references, footnotes, code blocks

### Categories
Fully dynamic and editable from CMS:
- create, edit, delete
- color, icon, order, slug, description, SEO

### Q&A Module
Separate content type with:
- question
- answer
- category
- scholar
- tags
- related questions
- SEO

### Media Library
- videos
- podcasts
- audio lectures
- playlists
- embedded media
- YouTube, Spotify, SoundCloud, MP3, uploaded video

### Gallery Module
- galleries and albums
- multiple image uploads
- cover image
- descriptions
- download support
- search and pagination
- lightbox viewing

### Static Pages
CMS-managed pages such as:
- About
- Contact
- Privacy
- Terms
- Donate
- Authors
- Advertising
- Write for Us
- Gallery
- Media
- custom pages

### Global Search
Search across:
- articles
- pages
- Q&A
- gallery
- media
- tags
- categories
- authors

### Sidebar
Three editable blocks:
- advertisement banner
- partner logos
- popular posts

### Footer
CMS-editable footer with:
- logo
- mission
- navigation links
- social links
- newsletter
- contact details
- privacy and terms links

---

## 7. CMS Content Models

The platform must support these Sanity content types:
- Site Settings
- Navigation
- Footer
- Page
- Article
- Q&A
- Category
- Tag
- Author
- Media
- Gallery
- Gallery Album
- Hero Slide
- Advertisement
- Partner Logo
- Social Link
- SEO Settings
- Prayer Time Configuration
- Homepage Sections

---

## 8. SEO and Performance Targets

### SEO
Every page should support:
- SEO title
- meta description
- slug
- canonical
- OpenGraph
- Twitter card
- schema markup
- breadcrumbs
- sitemap
- RSS
- robots rules

### Performance Targets
- LCP < 2s
- CLS < 0.1
- TTFB < 200ms
- INP < 200ms

### Optimization Strategy
- image CDN and optimization
- dynamic imports
- ISR
- streaming and code splitting
- lazy loading
- caching
- font optimization

---

## 9. Accessibility and Security

### Accessibility
- WCAG AA compliance
- keyboard navigation
- ARIA support
- focus states
- semantic HTML
- reduced motion support
- alt text and contrast checks

### Security
- Sanity roles
- rate limiting
- CSP and headers
- input validation
- image validation
- XSS and spam protection
- HTTPS enforcement

---

## 10. Development Roadmap

### Phase 1 — Project Initialization
Goal: prepare the development environment.

Tasks:
- create Next.js app structure
- configure TypeScript
- install TailwindCSS
- configure ESLint and Prettier
- set up path aliases and environment variables
- prepare Vercel deployment setup

### Phase 2 — Design System
Goal: create a reusable UI foundation.

Deliverables:
- colors
- typography
- spacing and radius
- buttons, cards, badges, avatars
- inputs, dialogs, drawers, pagination, skeletons, empty states

### Phase 3 — CMS Architecture
Goal: design all Sanity schemas and content models.

Deliverables:
- site settings
- navigation
- footer
- pages
- articles
- categories
- tags
- authors
- media
- gallery
- hero slides
- ads and partner logos
- Q&A
- homepage sections
- SEO and prayer configuration

### Phase 4 — Application Architecture
Goal: establish the application foundation.

Deliverables:
- CMS client
- image loader
- SEO helper
- API layer
- data fetching layer
- error handling
- caching utilities
- providers and global context

### Phase 5 — Global Layout
Goal: build the core shell of the site.

Deliverables:
- root layout
- header
- prayer time bar
- footer
- sidebar
- container and breadcrumb system
- responsive navigation

### Phase 6 — Header and Navigation
Goal: make navigation fully CMS-driven.

Requirements:
- editors can add, remove, hide, rename, reorder, publish, and unpublish pages without changing code

### Phase 7 — Prayer Time Bar
Goal: deliver live prayer timing and date display.

### Phase 8 — Homepage
Goal: build a dynamic homepage.

Deliverables:
- hero slider
- featured articles
- latest articles
- popular articles
- editor’s picks
- Q&A
- media
- gallery preview
- newsletter

### Phase 9 — Hero Carousel
Goal: ship a production-ready hero experience.

Features:
- unlimited slides
- image, overlay, headline, subtitle, CTA
- internal/external links
- scheduling and priority
- autoplay, swipe, keyboard, hover pause, indicators, arrows

### Phase 10 — Articles Module
Goal: ship complete article listing and detail experiences.

Deliverables:
- article listing
- article cards
- single article page
- category and tag filters
- related content
- reading time
- sharing and print support
- SEO

### Phase 11 — Rich Article Editor
Goal: support a professional block-based editorial experience.

### Phase 12 — Categories
Goal: implement full category management.

### Phase 13 — Q&A Module
Goal: build the dedicated Q&A experience.

### Phase 14 — Media Module
Goal: implement the media center.

### Phase 15 — Gallery Module
Goal: build gallery browsing, albums, and lightbox viewing.

### Phase 16 — Dynamic Pages
Goal: make static pages fully editable from CMS.

### Phase 17 — Global Search
Goal: ship instant, keyboard-friendly search across all major content types.

### Phase 18 — Sidebar
Goal: implement dynamic sidebar blocks for ads, partners, and popular posts.

### Phase 19 — Footer
Goal: finish the CMS-managed footer system.

### Phase 20 — SEO
Goal: implement metadata, JSON-LD, breadcrumbs, RSS, sitemap, and robots.

### Phase 21 — Performance
Goal: optimize loading, streaming, rendering, and asset delivery.

### Phase 22 — Accessibility
Goal: meet WCAG AA expectations.

### Phase 23 — Security
Goal: harden the application and API surfaces.

### Phase 24 — Analytics
Goal: add tracking for content engagement and search behavior.

### Phase 25 — Testing
Goal: validate the app with unit, integration, accessibility, performance, and SEO tests.

### Phase 26 — Deployment
Goal: deploy to Vercel with production configuration and monitoring.

### Phase 27 — Post-Launch
Goal: monitor performance, SEO, analytics, security, and CMS health.

### Phase 28 — Future Enhancements
Potential future additions include:
- dark mode
- bookmarks
- reading history
- user accounts
- notifications
- prayer reminders
- PWA/offline reading
- Arabic translation
- English version
- Bangla transliteration
- AI search and AI summaries
- voice reading
- membership and donation features

---

## 11. Final Milestone

The finished product should be a production-ready Islamic publishing platform where major content, layout, and navigation are controlled from Sanity CMS rather than hardcoded into the application.

It should deliver:
- premium reading experience
- strong SEO and accessibility
- high performance
- scalable architecture
- capacity for multilingual and AI-enhanced future expansion
