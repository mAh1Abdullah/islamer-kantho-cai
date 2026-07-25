import { sanityClient } from './client';
import { postSummaryFragment, postDetailFragment } from './queries';
import type { Post, PostSummary, PaginatedResult } from '@/types/sanity';

const PAGE_SIZE = 12;

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ ${postDetailFragment} }`,
    { slug }
  );
}

export async function getPosts(page = 0, pageSize = PAGE_SIZE): Promise<PaginatedResult<PostSummary>> {
  const start = page * pageSize;
  const end = start + pageSize;

  const [items, total] = await Promise.all([
    sanityClient.fetch<PostSummary[]>(
      `*[_type == "post"] | order(publishedAt desc) [$start...$end]{ ${postSummaryFragment} }`,
      { start, end }
    ),
    sanityClient.fetch<number>(`count(*[_type == "post"])`),
  ]);

  return { items, total, hasMore: end < total };
}

export async function getPostsByCategory(
  categorySlug: string,
  page = 0,
  pageSize = PAGE_SIZE
): Promise<PaginatedResult<PostSummary>> {
  const start = page * pageSize;
  const end = start + pageSize;
  const filter = `_type == "post" && category->slug.current == $categorySlug`;

  const [items, total] = await Promise.all([
    sanityClient.fetch<PostSummary[]>(
      `*[${filter}] | order(publishedAt desc) [$start...$end]{ ${postSummaryFragment} }`,
      { categorySlug, start, end }
    ),
    sanityClient.fetch<number>(`count(*[${filter}])`, { categorySlug }),
  ]);

  return { items, total, hasMore: end < total };
}

export async function searchPosts(query: string, limit = 20): Promise<PostSummary[]> {
  if (!query.trim()) return [];
  return sanityClient.fetch(
    `*[_type == "post" && (title match $q || excerpt match $q)] | order(publishedAt desc) [0...$limit]{ ${postSummaryFragment} }`,
    { q: `${query}*`, limit }
  );
}

/** Related posts: same category, excluding the current article. */
export async function getRelatedPosts(currentId: string, categorySlug: string, limit = 3): Promise<PostSummary[]> {
  return sanityClient.fetch(
    `*[_type == "post" && category->slug.current == $categorySlug && _id != $currentId] | order(publishedAt desc) [0...$limit]{ ${postSummaryFragment} }`,
    { categorySlug, currentId, limit }
  );
}
