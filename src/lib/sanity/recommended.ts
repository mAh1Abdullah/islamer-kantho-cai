import { fetchSanity, isSanityConfigured } from './client';
import { postSummaryFragment } from './queries';
import { mockPostSummaries } from './mockData';
import type { PostSummary } from '@/types/sanity';

/**
 * Recommended posts for the home page's secondary section. Separate from
 * `featured.ts` (Hero) so the two editorial slots can be curated
 * independently in Sanity.
 */
export async function getRecommendedPosts(excludeIds: string[] = [], limit = 6): Promise<PostSummary[]> {
  if (!isSanityConfigured) {
    return mockPostSummaries.filter((p) => !excludeIds.includes(p._id)).slice(0, limit);
  }
  const result = await fetchSanity<PostSummary[]>(
    `*[_type == "post" && recommended == true && !(_id in $excludeIds)] | order(publishedAt desc) [0...$limit]{ ${postSummaryFragment} }`,
    { excludeIds, limit },
    []
  );
  if (result.length > 0) return result;
  return mockPostSummaries.filter((p) => !excludeIds.includes(p._id)).slice(0, limit);
}
