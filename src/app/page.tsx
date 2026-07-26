import { HeroBanner } from '@/components/home/HeroBanner';
import { HomeSections } from '@/components/home/HomeSections';
import { getFeaturedPosts } from '@/lib/sanity/featured';
import { getRecommendedPosts } from '@/lib/sanity/recommended';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return buildMetadata({ path: '/' });
}

export default async function HomePage() {
  const featured = await getFeaturedPosts(5);
  const recommended = await getRecommendedPosts(featured.map((p) => p._id), 6);

  return (
    <main>
      {featured[0] ? <HeroBanner post={featured[0]} /> : null}
      <HomeSections featuredPosts={featured} recommendedPosts={recommended} />
    </main>
  );
}
