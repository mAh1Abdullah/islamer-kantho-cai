import { notFound } from 'next/navigation';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

interface MediaSlugPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: MediaSlugPageProps): Promise<Metadata> {
  return buildMetadata({ title: params.slug, description: 'মিডিয়া আইটেম', path: `/media/${params.slug}` });
}

export default function MediaSlugPage({ params }: MediaSlugPageProps) {
  if (!params.slug) notFound();

  return (
    <main>
      <Container>
        <PageHeader title={params.slug} description="মিডিয়া আইটেমের বিস্তারিত কনটেন্ট" eyebrow="মিডিয়া" />
      </Container>
      <Section>
        <Container>
          <p className="text-body text-text-secondary">মিডিয়া ডিটেইল পৃষ্ঠাটি ভবিষ্যতে ভিডিও/অডিও প্লেয়ার এবং সম্পর্কিত কনটেন্টের সাথে যুক্ত হবে।</p>
        </Container>
      </Section>
    </main>
  );
}
