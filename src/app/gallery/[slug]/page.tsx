import { notFound } from 'next/navigation';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

interface GallerySlugPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: GallerySlugPageProps): Promise<Metadata> {
  return buildMetadata({ title: params.slug, description: 'গ্যালারি অ্যালবাম', path: `/gallery/${params.slug}` });
}

export default function GallerySlugPage({ params }: GallerySlugPageProps) {
  if (!params.slug) notFound();

  return (
    <main>
      <Container>
        <PageHeader title={params.slug} description="গ্যালারি অ্যালবামের বিস্তারিত কনটেন্ট" eyebrow="গ্যালারি" />
      </Container>
      <Section>
        <Container>
          <p className="text-body text-text-secondary">গ্যালারি অ্যালবাম পৃষ্ঠা ভবিষ্যতে ইমেজ গ্রিড, লাইটবক্স এবং ডাউনলোড অপশনসহ তৈরি হবে।</p>
        </Container>
      </Section>
    </main>
  );
}
