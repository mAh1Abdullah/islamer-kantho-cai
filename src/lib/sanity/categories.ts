import { fetchSanity } from './client';
import { categoryFragment } from './queries';
import type { Category } from '@/types/sanity';

export async function getAllCategories(): Promise<Category[]> {
  return fetchSanity<Category[]>(`*[_type == "category"] | order(title asc){ ${categoryFragment} }`, undefined, []);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return fetchSanity<Category | null>(
    `*[_type == "category" && slug.current == $slug][0]{ ${categoryFragment} }`,
    { slug },
    null
  );
}
