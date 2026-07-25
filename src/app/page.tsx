import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Divider } from '@/components/common/Divider';
import { EmptyState } from '@/components/common/EmptyState';
import { Newsletter } from '@/components/common/Newsletter';
import { HeroBanner } from '@/components/home/HeroBanner';
import { ArticleCard } from '@/components/article/ArticleCard';
import { LazyPrayerWidget, LazyHijriWidget } from '@/components/home/LazyWidgets';
import { getFeaturedPosts } from '@/lib/sanity/featured';
import { getRecommendedPosts } from '@/lib/sanity/recommended';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return buildMetadata({ path: '/' });
}

export default async function HomePage() {
  const featured = await getFeaturedPosts(5);
  const [heroPost, ...restFeatured] = featured;
  const recommended = await getRecommendedPosts(featured.map((p) => p._id), 6);

  return (
    <main>
      {heroPost ? (
        <HeroBanner post={heroPost} />
      ) : (
        <Section spacing="tight">
          <Container>
            <EmptyState
              title="এখনো কোনো ফিচার্ড প্রবন্ধ নেই"
              description="Sanity Studio-তে একটি প্রবন্ধকে 'Featured' হিসেবে চিহ্নিত করুন।"
            />
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <SectionHeading
                eyebrow="ফিচার্ড"
                title="নির্বাচিত প্রবন্ধসমূহ"
                description="সম্পাদকদের বাছাই করা এই সপ্তাহের গুরুত্বপূর্ণ লেখা।"
              />

              {restFeatured.length > 0 ? (
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {restFeatured.map((post, i) => (
                    <ArticleCard key={post._id} post={post} variant="medium" priority={i === 0} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  className="mt-10"
                  title="আর কোনো ফিচার্ড প্রবন্ধ নেই"
                  description="নতুন প্রবন্ধ ফিচার্ড করা হলে এখানে দেখা যাবে।"
                />
              )}

              <Divider variant="ornament" className="my-12" />

              <SectionHeading
                eyebrow="সুপারিশকৃত"
                title="আপনার জন্য নির্বাচিত"
                description="আপনার আগ্রহের সাথে মিলিয়ে বাছাই করা লেখা।"
              />

              {recommended.length > 0 ? (
                <div className="mt-10 flex flex-col gap-4">
                  {recommended.map((post) => (
                    <ArticleCard key={post._id} post={post} variant="horizontal" />
                  ))}
                </div>
              ) : (
                <EmptyState
                  className="mt-10"
                  title="এখনো কোনো সুপারিশকৃত প্রবন্ধ নেই"
                  description="Sanity Studio-তে প্রবন্ধে 'Recommended' ফ্ল্যাগ চালু করুন।"
                />
              )}
            </div>

            <aside className="flex flex-col gap-6">
              <LazyPrayerWidget />
              <LazyHijriWidget />
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Newsletter />
        </Container>
      </Section>
    </main>
  );
}
