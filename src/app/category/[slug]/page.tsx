import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { CategoryGridClient } from '@/components/article/CategoryGridClient';
import { getCategoryBySlug, getAllCategories } from '@/lib/sanity/categories';
import { getPostsByCategory } from '@/lib/sanity/posts';
import { buildMetadata, JsonLd, breadcrumbJsonLd } from '@/components/common/SEO';
import { routes } from '@/constants/routes';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return buildMetadata({ noIndex: true });

  return buildMetadata({
    title: category.title,
    description: category.description ?? `${category.title} বিভাগের সকল প্রবন্ধ`,
    path: routes.category(category.slug),
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();

  const { items, hasMore } = await getPostsByCategory(category.slug, 0);

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'হোম', path: routes.home },
          { name: category.title, path: routes.category(category.slug) },
        ])}
      />

      <Container>
        <PageHeader title={category.title} description={category.description} eyebrow="বিভাগ" />
      </Container>

      <Section>
        <Container>
          {items.length > 0 ? (
            <CategoryGridClient categorySlug={category.slug} initialItems={items} initialHasMore={hasMore} />
          ) : (
            <EmptyState
              title="এই বিভাগে এখনো কোনো প্রবন্ধ নেই"
              description="শীঘ্রই নতুন প্রবন্ধ প্রকাশিত হবে।"
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
