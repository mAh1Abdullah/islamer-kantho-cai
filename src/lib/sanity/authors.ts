import { fetchSanity, isSanityConfigured } from './client';
import { authorFragment, postSummaryFragment } from './queries';
import { mockAuthors, mockPostSummaries } from './mockData';
import type { Author, PostSummary } from '@/types/sanity';

export async function getAllAuthors(): Promise<Author[]> {
  if (!isSanityConfigured) return mockAuthors;
  const result = await fetchSanity<Author[]>(`*[_type == "author"] | order(name asc){ ${authorFragment} }`, undefined, []);
  return result.length > 0 ? result : mockAuthors;
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  if (!isSanityConfigured) {
    return mockAuthors.find((a) => a.slug === slug) ?? null;
  }
  const result = await fetchSanity<Author | null>(
    `*[_type == "author" && slug.current == $slug][0]{ ${authorFragment}, bio }`,
    { slug },
    null
  );
  return result ?? mockAuthors.find((a) => a.slug === slug) ?? null;
}

export async function getPostsByAuthor(slug: string, limit = 12): Promise<PostSummary[]> {
  if (!isSanityConfigured) {
    return mockPostSummaries.filter((p) => p.author.slug === slug).slice(0, limit);
  }
  const result = await fetchSanity<PostSummary[]>(
    `*[_type == "post" && author->slug.current == $slug] | order(publishedAt desc) [0...$limit]{ ${postSummaryFragment} }`,
    { slug, limit },
    []
  );
  if (result.length > 0) return result;
  return mockPostSummaries.filter((p) => p.author.slug === slug).slice(0, limit);
}
