# Design System — Islamer Kantho v2.0

This design system defines the visual language for the next generation of Islamer Kantho: a modern, premium Islamic publishing platform built with Next.js, TypeScript, TailwindCSS, and Sanity.

## 1. Design Principles

The interface should feel:
- calm and minimal
- premium and editorial
- highly readable on mobile and desktop
- respectful of Islamic content and cultural context
- fast, accessible, and SEO-conscious

The visual direction is inspired by modern publishing systems such as Medium, Apple, and respected Islamic media brands, while keeping a distinct editorial identity.

## 2. Color System

### Brand Palette

| Token | Value | Use |
|---|---|---|
| Primary | #055547 | brand, primary actions, active navigation |
| Secondary | #0F766E | supporting emphasis and interactive states |
| Accent | #C8A44D | highlights, callouts, premium accents |
| Background | #FAFAF7 | main page background |
| Card | #FFFFFF | surfaces, cards, panels |
| Text Primary | #1F2937 | headings and body copy |
| Text Secondary | #6B7280 | metadata, captions, muted text |
| Border | #E5E7EB | dividers and structural boundaries |

### Usage Rules
- Use deep emerald for primary brand moments.
- Use warm gold sparingly for emphasis and editorial highlights.
- Keep backgrounds soft and airy to support long-form reading.
- Avoid heavy borders and overly loud decorative surfaces.

## 3. Typography

### Type Scale
- Hero: 64px
- H1: 48px
- H2: 36px
- H3: 30px
- H4: 24px
- Body: 18px
- Small: 15px
- Caption: 13px

### Font Families
- Headings and editorial content: Noto Serif Bengali
- Body copy: Hind Siliguri
- Arabic content: Amiri
- English UI and interface text: Inter

The app should use the Tailwind typography utilities and shared tokens rather than arbitrary font sizing in components.

## 4. Layout and Spacing

Use a simple, generous spacing rhythm:
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- 2xl: 32px
- 3xl: 48px
- 4xl: 64px

### Layout Principles
- prioritize mobile-first reading
- keep comfortable line length for articles
- use generous whitespace around sections
- preserve strong vertical rhythm between content blocks

## 5. Components

### Core UI Components
- Buttons
- Cards
- Badges
- Tags
- Inputs
- Avatars
- Dividers
- Empty states
- Skeletons
- Pagination
- Drawer and navigation shell
- Share and action buttons

### Editorial Components
- Hero carousel
- Article cards in multiple sizes
- Article metadata block
- Table of contents
- Related articles
- Quote and callout blocks
- FAQ, hadith, and Quran verse blocks
- gallery and media cards

## 6. Interaction and Motion

- prefer subtle transitions over dramatic animation
- use easing that feels calm and refined
- keep motion optional for users who prefer reduced motion
- ensure all interactive elements have visible focus states

## 7. Accessibility and Inclusivity

The design system must support:
- WCAG AA contrast expectations
- strong keyboard navigation
- semantic HTML and readable structure
- sufficient focus rings
- alt text and accessible media behavior
- reduced-motion support

## 8. Implementation Notes

The current implementation uses:
- TailwindCSS for tokens and utilities
- shared primitives under the components/common layer
- semantic layout patterns for responsive pages
- centralized app constants for theme values and routes

The system should remain reusable, composable, and easy to extend as the CMS-driven product grows.

