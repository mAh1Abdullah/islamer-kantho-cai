import { fetchSanity, isSanityConfigured } from './client';
import { postSummaryFragment } from './queries';
import { mockPostSummaries } from './mockData';
import type { PostSummary } from '@/types/sanity';

/**
 * Ranked / Trending posts for the homepage sidebar.
 * Fetches top performing articles ordered by views / curated priority.
 */
export async function getRankedPosts(limit = 5): Promise<PostSummary[]> {
  if (!isSanityConfigured) {
    // In mock mode, sort mock posts with deterministic popularity weighting
    return [...mockPostSummaries].slice(0, limit);
  }

  const result = await fetchSanity<PostSummary[]>(
    `*[_type == "post"] | order(featured desc, publishedAt desc) [0...$limit]{ ${postSummaryFragment} }`,
    { limit },
    []
  );

  if (result.length > 0) return result;
  return [...mockPostSummaries].slice(0, limit);
}
