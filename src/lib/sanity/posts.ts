import { fetchSanity } from './client';
import { postSummaryFragment, postDetailFragment } from './queries';
import type { Post, PostSummary, PaginatedResult } from '@/types/sanity';

const PAGE_SIZE = 12;

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return fetchSanity<Post | null>(
    `*[_type == "post" && slug.current == $slug][0]{ ${postDetailFragment} }`,
    { slug },
    null
  );
}

export async function getPosts(page = 0, pageSize = PAGE_SIZE): Promise<PaginatedResult<PostSummary>> {
  const safePage = Math.max(0, Math.floor(page));
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const start = safePage * safePageSize;
  const end = start + safePageSize;

  const [items, total] = await Promise.all([
    fetchSanity<PostSummary[]>(
      `*[_type == "post"] | order(publishedAt desc) [$start...$end]{ ${postSummaryFragment} }`,
      { start, end },
      []
    ),
    fetchSanity<number>(`count(*[_type == "post"])`, undefined, 0),
  ]);

  return { items, total, hasMore: end < total };
}

export async function getPostsByCategory(
  categorySlug: string,
  page = 0,
  pageSize = PAGE_SIZE
): Promise<PaginatedResult<PostSummary>> {
  const safePage = Math.max(0, Math.floor(page));
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const start = safePage * safePageSize;
  const end = start + safePageSize;
  const filter = `_type == "post" && category->slug.current == $categorySlug`;

  const [items, total] = await Promise.all([
    fetchSanity<PostSummary[]>(
      `*[${filter}] | order(publishedAt desc) [$start...$end]{ ${postSummaryFragment} }`,
      { categorySlug, start, end },
      []
    ),
    fetchSanity<number>(`count(*[${filter}])`, { categorySlug }, 0),
  ]);

  return { items, total, hasMore: end < total };
}

export async function searchPosts(query: string, limit = 20): Promise<PostSummary[]> {
  const safeQuery = query.trim();
  if (!safeQuery) return [];
  const safeLimit = Math.max(1, Math.floor(limit));
  return fetchSanity<PostSummary[]>(
    `*[_type == "post" && (title match $q || excerpt match $q)] | order(publishedAt desc) [0...$limit]{ ${postSummaryFragment} }`,
    { q: `${safeQuery}*`, limit: safeLimit },
    []
  );
}

/** Related posts: same category, excluding the current article. */
export async function getRelatedPosts(currentId: string, categorySlug: string, limit = 3): Promise<PostSummary[]> {
  const safeLimit = Math.max(1, Math.floor(limit));
  return fetchSanity<PostSummary[]>(
    `*[_type == "post" && category->slug.current == $categorySlug && _id != $currentId] | order(publishedAt desc) [0...$limit]{ ${postSummaryFragment} }`,
    { categorySlug, currentId, limit: safeLimit },
    []
  );
}
