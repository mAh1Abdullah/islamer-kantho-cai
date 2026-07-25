import { sanityClient } from './client';
import { categoryFragment } from './queries';
import type { Category } from '@/types/sanity';

export async function getAllCategories(): Promise<Category[]> {
  return sanityClient.fetch(`*[_type == "category"] | order(title asc){ ${categoryFragment} }`);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return sanityClient.fetch(
    `*[_type == "category" && slug.current == $slug][0]{ ${categoryFragment} }`,
    { slug }
  );
}
