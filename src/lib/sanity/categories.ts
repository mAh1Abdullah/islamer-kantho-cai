import { fetchSanity, isSanityConfigured } from './client';
import { categoryFragment } from './queries';
import { mockCategories } from './mockData';
import type { Category } from '@/types/sanity';

export async function getAllCategories(): Promise<Category[]> {
  if (!isSanityConfigured) return mockCategories;
  const result = await fetchSanity<Category[]>(`*[_type == "category"] | order(title asc){ ${categoryFragment} }`, undefined, []);
  return result.length > 0 ? result : mockCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isSanityConfigured) {
    return mockCategories.find((c) => c.slug === slug) ?? null;
  }
  const result = await fetchSanity<Category | null>(
    `*[_type == "category" && slug.current == $slug][0]{ ${categoryFragment} }`,
    { slug },
    null
  );
  return result ?? mockCategories.find((c) => c.slug === slug) ?? null;
}
