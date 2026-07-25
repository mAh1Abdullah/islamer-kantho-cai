import { site } from './site';

/**
 * Default SEO values. Per-page overrides are passed into the <SEO />
 * component; anything omitted falls back to these.
 */
export const seoDefaults = {
  titleTemplate: `%s | ${site.nameEn}`,
  defaultTitle: `${site.name} — ${site.tagline}`,
  description: site.description,
  searchUrlTemplate: '/search?q={search_term_string}',
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
  },
  twitter: {
    cardType: 'summary_large_image',
  },
} as const;
