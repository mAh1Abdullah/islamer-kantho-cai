import type { Metadata } from 'next';
import { site } from '@/constants/site';
import { seoDefaults } from '@/constants/seo';

export interface SEOInput {
  title?: string;
  description?: string;
  path?: string; // e.g. '/article/some-slug'
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  noIndex?: boolean;
}

/**
 * Call this inside a page/layout's `generateMetadata` to produce a
 * consistent Metadata object. Keeps title templating, canonical URLs,
 * and Open Graph/Twitter defaults in exactly one place.
 */
export function buildMetadata(input: SEOInput = {}): Metadata {
  const title = input.title ?? seoDefaults.defaultTitle;
  const description = input.description ?? seoDefaults.description;
  const canonical = input.path ? `${site.url}${input.path}` : site.url;
  const image = input.image ?? `${site.url}/og-default.jpg`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: input.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: site.locale,
      type: input.type ?? 'website',
      images: [{ url: image, width: 1200, height: 630 }],
      ...(input.type === 'article' && {
        publishedTime: input.publishedTime,
        modifiedTime: input.modifiedTime,
        authors: input.authorName ? [input.authorName] : undefined,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/** Renders a JSON-LD <script> tag. Pass any schema.org object. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    alternateName: site.nameEn,
    url: site.url,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    alternateName: site.nameEn,
    url: site.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}${seoDefaults.searchUrlTemplate}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedTime: string;
  modifiedTime?: string;
  authorName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    image: [input.image],
    datePublished: input.publishedTime,
    dateModified: input.modifiedTime ?? input.publishedTime,
    author: { '@type': 'Person', name: input.authorName },
    publisher: { '@type': 'Organization', name: site.name },
    mainEntityOfPage: `${site.url}${input.path}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
