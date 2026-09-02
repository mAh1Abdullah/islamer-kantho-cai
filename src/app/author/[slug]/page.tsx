import { notFound } from 'next/navigation';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { ArticleCard } from '@/components/article/ArticleCard';
import { EmptyState } from '@/components/common/EmptyState';
import { getAuthorBySlug, getPostsByAuthor } from '@/lib/sanity/authors';
import { buildMetadata, JsonLd, breadcrumbJsonLd } from '@/components/common/SEO';
import { routes } from '@/constants/routes';
import type { Metadata } from 'next';

interface AuthorPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);
  if (!author) return buildMetadata({ noIndex: true });

  return buildMetadata({
    title: author.name,
    description: `${author.name}-এর প্রকাশিত প্রবন্ধ ও গবেষণামূলক লেখা`,
    path: routes.author(author.slug),
  });
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author = await getAuthorBySlug(params.slug);
  if (!author) notFound();

  const posts = await getPostsByAuthor(params.slug, 20);

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'হোম', path: routes.home },
          { name: 'লেখকবৃন্দ', path: routes.authors },
          { name: author.name, path: routes.author(author.slug) },
        ])}
      />

      <Container>
        <PageHeader title={author.name} description="লেখকের প্রকাশিত প্রবন্ধ ও রচনাবলী" eyebrow="লেখক" />
      </Container>
      <Section>
        <Container>
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post._id} post={post} variant="medium" />
              ))}
            </div>
          ) : (
            <EmptyState title="এখনও কোনো প্রবন্ধ নেই" description="এই লেখকের কোনো প্রকাশিত প্রবন্ধ পাওয়া যায়নি।" />
          )}
        </Container>
      </Section>
    </main>
  );
}
