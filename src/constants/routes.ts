/**
 * Route constants. Components should import from here rather than
 * hardcoding path strings, so renaming a route is a one-file change.
 */

export const routes = {
  home: '/',
  article: (slug: string) => `/article/${slug}`,
  category: (slug: string) => `/category/${slug}`,
  author: (slug: string) => `/author/${slug}`,
  search: '/search',
  archive: '/archive',
  page: (slug: string) => `/page/${slug}`,
  studio: '/studio',
} as const;

export type RouteKey = keyof typeof routes;
