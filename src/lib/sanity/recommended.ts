import { sanityClient } from './client';
import { postSummaryFragment } from './queries';
import type { PostSummary } from '@/types/sanity';

/**
 * Recommended posts for the home page's secondary section. Separate from
 * `featured.ts` (Hero) so the two editorial slots can be curated
 * independently in Sanity.
 */
export async function getRecommendedPosts(excludeIds: string[] = [], limit = 6): Promise<PostSummary[]> {
  return sanityClient.fetch(
    `*[_type == "post" && recommended == true && !(_id in $excludeIds)] | order(publishedAt desc) [0...$limit]{ ${postSummaryFragment} }`,
    { excludeIds, limit }
  );
}
