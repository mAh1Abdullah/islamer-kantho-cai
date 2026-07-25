import { fetchSanity } from './client';
import { postSummaryFragment } from './queries';
import type { PostSummary } from '@/types/sanity';

/** Posts flagged `featured` in Sanity, newest first — powers the Hero Banner. */
export async function getFeaturedPosts(limit = 5): Promise<PostSummary[]> {
  return fetchSanity<PostSummary[]>(
    `*[_type == "post" && featured == true] | order(publishedAt desc) [0...$limit]{ ${postSummaryFragment} }`,
    { limit },
    []
  );
}
