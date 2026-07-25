import type { MetadataRoute } from 'next';
import { site } from '@/constants/site';
import { routes } from '@/constants/routes';
import { getAllCategories } from '@/lib/sanity/categories';
import { getPosts } from '@/lib/sanity/posts';

const PAGE_SIZE = 200; // Sanity fetch page size for sitemap generation, not the site's PAGE_SIZE

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getAllCategories();

  // Walk all posts in batches so the sitemap stays complete as content grows
  // past a single page, without loading the whole dataset into one query.
  const allPosts = [];
  let page = 0;
  while (true) {
    const { items, hasMore } = await getPosts(page, PAGE_SIZE);
    allPosts.push(...items);
    if (!hasMore) break;
    page += 1;
  }

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${site.url}${routes.home}`, changeFrequency: 'daily', priority: 1 },
    { url: `${site.url}${routes.archive}`, changeFrequency: 'daily', priority: 0.5 },
  ];

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${site.url}${routes.category(c.slug)}`,
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${site.url}${routes.article(post.slug)}`,
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticEntries, ...categoryEntries, ...postEntries];
}
