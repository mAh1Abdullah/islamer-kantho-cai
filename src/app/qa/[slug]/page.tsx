import { notFound } from 'next/navigation';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

interface QAPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: QAPageProps): Promise<Metadata> {
  return buildMetadata({ title: params.slug, description: 'প্রশ্ন-উত্তর বিশ্লেষণ', path: `/qa/${params.slug}` });
}

export default function QASlugPage({ params }: QAPageProps) {
  if (!params.slug) notFound();

  return (
    <main>
      <Container>
        <PageHeader title={params.slug} description="এই প্রশ্ন-উত্তরের বিস্তারিত কনটেন্ট" eyebrow="প্রশ্ন-উত্তর" />
      </Container>
      <Section>
        <Container>
          <p className="text-body text-text-secondary">Q&A ডিটেইল পৃষ্ঠা ভবিষ্যতে Sanity ডেটা এবং রিচ ব্লকের সাথে যুক্ত হবে।</p>
        </Container>
      </Section>
    </main>
  );
}
