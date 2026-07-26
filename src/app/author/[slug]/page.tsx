import { notFound } from 'next/navigation';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

interface AuthorPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  return buildMetadata({ title: params.slug, description: 'লেখকের প্রোফাইল', path: `/author/${params.slug}` });
}

export default function AuthorPage({ params }: AuthorPageProps) {
  if (!params.slug) notFound();

  return (
    <main>
      <Container>
        <PageHeader title={params.slug} description="লেখকের প্রোফাইল ও প্রকাশিত প্রবন্ধ" eyebrow="লেখক" />
      </Container>
      <Section>
        <Container>
          <p className="text-body text-text-secondary">লেখক-ভিত্তিক কনটেন্ট পৃষ্ঠা ভবিষ্যতে Sanity ডেটা দিয়ে প্রতিস্থাপিত হবে।</p>
        </Container>
      </Section>
    </main>
  );
}
