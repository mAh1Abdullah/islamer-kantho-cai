import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Divider } from '@/components/common/Divider';
import { EmptyState } from '@/components/common/EmptyState';
import { Newsletter } from '@/components/common/Newsletter';
import { ArticleCard } from '@/components/article/ArticleCard';
import { ArticleRankingWidget } from '@/components/home/ArticleRankingWidget';
import { ImportantLinksWidget } from '@/components/home/ImportantLinksWidget';
import { LazyPrayerWidget, LazyHijriWidget } from '@/components/home/LazyWidgets';
import type { PostSummary } from '@/types/sanity';

interface HomeSectionsProps {
  featuredPosts: PostSummary[];
  recommendedPosts: PostSummary[];
  rankedPosts?: PostSummary[];
}

export function HomeSections({ featuredPosts, recommendedPosts, rankedPosts = [] }: HomeSectionsProps) {
  const [heroPost, ...restFeatured] = featuredPosts;

  return (
    <>
      {heroPost ? (
        <Section spacing="tight">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1.55fr_0.85fr] lg:items-start">
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="ফিচার্ড"
                  title="নির্বাচিত প্রবন্ধসমূহ"
                  description="সম্পাদকদের বাছাই করা গুরুত্বপূর্ণ লেখাগুলো"
                />
                <div className="grid gap-6 md:grid-cols-2">
                  <ArticleCard post={heroPost} variant="large" priority />
                  {restFeatured.slice(0, 2).map((post) => (
                    <ArticleCard key={post._id} post={post} variant="medium" />
                  ))}
                </div>
              </div>

              {/* Homepage Sidebar */}
              <aside className="space-y-5">
                <ArticleRankingWidget posts={rankedPosts} />
                <ImportantLinksWidget />
                <LazyPrayerWidget />
                <LazyHijriWidget />
              </aside>
            </div>
          </Container>
        </Section>
      ) : (
        <Section spacing="tight">
          <Container>
            <EmptyState title="এখনও কোনো ফিচার্ড প্রবন্ধ নেই" description="Sanity Studio-তে নতুন প্রবন্ধ ফিচার্ড করুন।" />
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <SectionHeading
            eyebrow="সুপারিশ"
            title="আপনার জন্য নির্বাচিত"
            description="পড়ার অভ্যাস অনুযায়ী বাছাই করা নতুন লেখাসমূহ"
          />
          {recommendedPosts.length > 0 ? (
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {recommendedPosts.map((post) => (
                <ArticleCard key={post._id} post={post} variant="horizontal" />
              ))}
            </div>
          ) : (
            <EmptyState className="mt-10" title="কোনো সুপারিশ নেই" description="শীঘ্রই আরও প্রবন্ধ যুক্ত করা হবে।" />
          )}
        </Container>
      </Section>

      <Divider variant="ornament" className="my-6" />

      <Section tone="surface">
        <Container>
          <Newsletter />
        </Container>
      </Section>
    </>
  );
}
