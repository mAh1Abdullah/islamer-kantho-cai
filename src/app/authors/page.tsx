import Link from 'next/link';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/common/Card';
import { Avatar } from '@/components/common/Avatar';
import { getAllAuthors } from '@/lib/sanity/authors';
import { routes } from '@/constants/routes';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return buildMetadata({ title: 'লেখকবৃন্দ', description: 'প্রকাশিত লেখক ও অবদানকারীদের তালিকা', path: '/authors' });
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <main>
      <Container>
        <PageHeader title="লেখকবৃন্দ" description="ইসলামের কন্ঠ-এর লেখক, গবেষক ও ওলামায়ে কেরাম" eyebrow="সম্পদ" />
      </Container>
      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {authors.map((author) => (
              <Card key={author._id} interactive padding="md">
                <Link href={routes.author(author.slug)} className="flex items-center gap-4">
                  <Avatar name={author.name} size="md" />
                  <div>
                    <h3 className="text-h4 text-text-primary group-hover:text-primary transition-colors">{author.name}</h3>
                    <p className="mt-1 text-small text-text-secondary">প্রবন্ধসমূহ দেখুন →</p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
