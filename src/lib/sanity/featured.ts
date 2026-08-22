import { fetchSanity, isSanityConfigured } from './client';
import { postSummaryFragment } from './queries';
import { mockPostSummaries } from './mockData';
import type { PostSummary } from '@/types/sanity';

/** Posts flagged `featured` in Sanity, newest first — powers the Hero Banner. */
export async function getFeaturedPosts(limit = 5): Promise<PostSummary[]> {
  if (!isSanityConfigured) {
    const featured = mockPostSummaries.filter((p) => p.featured);
    return featured.length > 0 ? featured.slice(0, limit) : mockPostSummaries.slice(0, limit);
  }
  const result = await fetchSanity<PostSummary[]>(
    `*[_type == "post" && featured == true] | order(publishedAt desc) [0...$limit]{ ${postSummaryFragment} }`,
    { limit },
    []
  );
  if (result.length > 0) return result;
  const fallback = mockPostSummaries.filter((p) => p.featured);
  return fallback.length > 0 ? fallback.slice(0, limit) : mockPostSummaries.slice(0, limit);
}
