import { notFound } from 'next/navigation';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

interface PageSlugProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageSlugProps): Promise<Metadata> {
  return buildMetadata({ title: params.slug, description: 'CMS পৃষ্ঠা', path: `/page/${params.slug}` });
}

export default function CustomPage({ params }: PageSlugProps) {
  if (!params.slug) notFound();

  return (
    <main>
      <Container>
        <PageHeader title={params.slug} description="এই পৃষ্ঠাটি CMS-এর মাধ্যমে পরিচালিত হবে" eyebrow="পেজ" />
      </Container>
      <Section>
        <Container>
          <p className="text-body text-text-secondary">স্ট্যাটিক পেজ কনটেন্ট ভবিষ্যতে Sanity থেকে টেনে আনা হবে।</p>
        </Container>
      </Section>
    </main>
  );
}
