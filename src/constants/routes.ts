/**
 * Route constants. Components should import from here rather than
 * hardcoding path strings, so renaming a route is a one-file change.
 */

export const routes = {
  home: '/',
  archive: '/archive',
  article: (slug: string) => `/article/${slug}`,
  category: (slug: string) => `/category/${slug}`,
  authors: '/authors',
  author: (slug: string) => `/author/${slug}`,
  qa: '/qa',
  question: (slug: string) => `/qa/${slug}`,
  media: '/media',
  mediaItem: (slug: string) => `/media/${slug}`,
  gallery: '/gallery',
  galleryItem: (slug: string) => `/gallery/${slug}`,
  search: '/search',
  page: (slug: string) => `/page/${slug}`,
  studio: '/studio',
} as const;

export type RouteKey = keyof typeof routes;
