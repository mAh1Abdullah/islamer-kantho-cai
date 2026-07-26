# Islamer Kantho

Islamer Kantho is a modern Islamic publishing platform being rebuilt as a fast, SEO-friendly, CMS-driven web experience with Next.js, TypeScript, TailwindCSS, and Sanity.

## What this project aims to deliver

The v2.0 vision is a premium Islamic digital publication that supports:
- Islamic articles and long-form content
- Islamic Q&A content
- media and audio libraries
- image galleries
- dynamic static pages
- powerful global search
- a polished reading experience on mobile and desktop

Everything major should be editable from Sanity CMS rather than hardcoded into the application.

## Core technology stack

- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- Sanity v3
- Vercel deployment

## Project structure

- app/: route-level pages and layouts
- components/: shared UI and feature components
- constants/: design tokens, site config, routes
- hooks/: reusable client-side behavior
- lib/: Sanity client, queries, and data fetch logic
- styles/: global styles and design-system foundations
- types/: shared TypeScript models
- utils/: helper functions for dates, reading time, image handling, and styling

## Current focus

The project is being developed in phased milestones aligned with the product roadmap:
1. Foundation and design system
2. CMS architecture and content models
3. Global layout, navigation, and homepage experience
4. Articles, rich content, categories, and Q&A
5. Media, gallery, search, SEO, accessibility, and performance
6. Deployment and post-launch growth

The detailed delivery plan is documented in PLAN.md.

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run type checking:

```bash
npm run typecheck
```

## Content and CMS

The site is intended to be driven by Sanity content models for:
- site settings
- navigation
- pages
- articles
- categories
- authors
- media
- galleries
- hero slides
- FAQ and Q&A content
- SEO and prayer-time configuration

## Roadmap highlights

Planned capabilities include:
- CMS-managed navigation and homepage sections
- live prayer-time widget and hijri date display
- rich article editor with multimedia blocks
- gallery and media modules
- advanced search and SEO metadata
- accessibility and performance optimization
- future enhancements such as dark mode, bookmarks, multilingual content, and AI-assisted discovery
