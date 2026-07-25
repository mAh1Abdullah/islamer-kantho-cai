import type { Metadata } from 'next';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { SearchClient } from '@/components/article/SearchClient';
import { buildMetadata } from '@/components/common/SEO';
import { routes } from '@/constants/routes';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'সার্চ',
    description: 'প্রবন্ধ, বিষয় বা লেখক অনুসারে খুঁজুন।',
    path: routes.search,
    noIndex: true, // search results pages aren't meaningful to index
  });
}

export default function SearchPage() {
  return (
    <main>
      <Container>
        <PageHeader title="সার্চ করুন" eyebrow="খুঁজুন" />
      </Container>
      <Section>
        <Container narrow>
          <SearchClient />
        </Container>
      </Section>
    </main>
  );
}
