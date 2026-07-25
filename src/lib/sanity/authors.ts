import { sanityClient } from './client';
import { authorFragment, postSummaryFragment } from './queries';
import type { Author, PostSummary } from '@/types/sanity';

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return sanityClient.fetch(
    `*[_type == "author" && slug.current == $slug][0]{ ${authorFragment}, bio }`,
    { slug }
  );
}

export async function getPostsByAuthor(slug: string, limit = 12): Promise<PostSummary[]> {
  return sanityClient.fetch(
    `*[_type == "post" && author->slug.current == $slug] | order(publishedAt desc) [0...$limit]{ ${postSummaryFragment} }`,
    { slug, limit }
  );
}
