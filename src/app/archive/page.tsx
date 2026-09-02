import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { ArticleCard } from '@/components/article/ArticleCard';
import { EmptyState } from '@/components/common/EmptyState';
import { getPosts } from '@/lib/sanity/posts';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return buildMetadata({ title: 'প্রবন্ধসমূহ', description: 'সমস্ত প্রকাশিত প্রবন্ধের তালিকা', path: '/archive' });
}

export default async function ArchivePage() {
  const { items } = await getPosts(0, 50);

  return (
    <main>
      <Container>
        <PageHeader title="প্রবন্ধসমূহ" description="সমস্ত প্রকাশিত প্রবন্ধের সমন্বিত তালিকা" eyebrow="আর্কাইভ" />
      </Container>
      <Section>
        <Container>
          {items.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((post) => (
                <ArticleCard key={post._id} post={post} variant="medium" />
              ))}
            </div>
          ) : (
            <EmptyState title="কোনো প্রবন্ধ পাওয়া যায়নি" description="শীঘ্রই নতুন প্রবন্ধ যোগ করা হবে।" />
          )}
        </Container>
      </Section>
    </main>
  );
}
