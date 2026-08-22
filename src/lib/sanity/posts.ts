import { fetchSanity, isSanityConfigured } from './client';
import { postSummaryFragment, postDetailFragment } from './queries';
import { mockPosts, mockPostSummaries } from './mockData';
import type { Post, PostSummary, PaginatedResult } from '@/types/sanity';

const PAGE_SIZE = 12;

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) {
    return mockPosts.find((p) => p.slug === slug) ?? null;
  }
  const result = await fetchSanity<Post | null>(
    `*[_type == "post" && slug.current == $slug][0]{ ${postDetailFragment} }`,
    { slug },
    null
  );
  return result ?? mockPosts.find((p) => p.slug === slug) ?? null;
}

export async function getPosts(page = 0, pageSize = PAGE_SIZE): Promise<PaginatedResult<PostSummary>> {
  const safePage = Math.max(0, Math.floor(page));
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const start = safePage * safePageSize;
  const end = start + safePageSize;

  if (!isSanityConfigured) {
    const items = mockPostSummaries.slice(start, end);
    return { items, total: mockPostSummaries.length, hasMore: end < mockPostSummaries.length };
  }

  const [items, total] = await Promise.all([
    fetchSanity<PostSummary[]>(
      `*[_type == "post"] | order(publishedAt desc) [$start...$end]{ ${postSummaryFragment} }`,
      { start, end },
      []
    ),
    fetchSanity<number>(`count(*[_type == "post"])`, undefined, 0),
  ]);

  if (items.length > 0) {
    return { items, total, hasMore: end < total };
  }

  const fallbackItems = mockPostSummaries.slice(start, end);
  return { items: fallbackItems, total: mockPostSummaries.length, hasMore: end < mockPostSummaries.length };
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

  if (!isSanityConfigured) {
    const filtered = mockPostSummaries.filter((p) => p.category?.slug === categorySlug);
    const items = filtered.slice(start, end);
    return { items, total: filtered.length, hasMore: end < filtered.length };
  }

  const [items, total] = await Promise.all([
    fetchSanity<PostSummary[]>(
      `*[${filter}] | order(publishedAt desc) [$start...$end]{ ${postSummaryFragment} }`,
      { categorySlug, start, end },
      []
    ),
    fetchSanity<number>(`count(*[${filter}])`, { categorySlug }, 0),
  ]);

  if (items.length > 0) {
    return { items, total, hasMore: end < total };
  }

  const filtered = mockPostSummaries.filter((p) => p.category?.slug === categorySlug);
  const fallbackItems = filtered.slice(start, end);
  return { items: fallbackItems, total: filtered.length, hasMore: end < filtered.length };
}

export async function searchPosts(query: string, limit = 20): Promise<PostSummary[]> {
  const safeQuery = query.trim().toLowerCase();
  if (!safeQuery) return [];
  const safeLimit = Math.max(1, Math.floor(limit));

  if (!isSanityConfigured) {
    return mockPostSummaries
      .filter(
        (p) =>
          p.title.toLowerCase().includes(safeQuery) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(safeQuery)) ||
          p.category.title.toLowerCase().includes(safeQuery)
      )
      .slice(0, safeLimit);
  }

  const result = await fetchSanity<PostSummary[]>(
    `*[_type == "post" && (title match $q || excerpt match $q)] | order(publishedAt desc) [0...$limit]{ ${postSummaryFragment} }`,
    { q: `${safeQuery}*`, limit: safeLimit },
    []
  );

  if (result.length > 0) return result;

  return mockPostSummaries
    .filter(
      (p) =>
        p.title.toLowerCase().includes(safeQuery) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(safeQuery)) ||
        p.category.title.toLowerCase().includes(safeQuery)
    )
    .slice(0, safeLimit);
}

/** Related posts: same category, excluding the current article. */
export async function getRelatedPosts(currentId: string, categorySlug: string, limit = 3): Promise<PostSummary[]> {
  const safeLimit = Math.max(1, Math.floor(limit));

  if (!isSanityConfigured) {
    return mockPostSummaries
      .filter((p) => p.category.slug === categorySlug && p._id !== currentId)
      .slice(0, safeLimit);
  }

  const result = await fetchSanity<PostSummary[]>(
    `*[_type == "post" && category->slug.current == $categorySlug && _id != $currentId] | order(publishedAt desc) [0...$limit]{ ${postSummaryFragment} }`,
    { categorySlug, currentId, limit: safeLimit },
    []
  );

  if (result.length > 0) return result;

  return mockPostSummaries
    .filter((p) => p.category.slug === categorySlug && p._id !== currentId)
    .slice(0, safeLimit);
}
