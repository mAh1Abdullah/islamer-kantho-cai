import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return buildMetadata({ title: 'গ্যালারি', description: 'চিত্র-গ্যালারি ও অ্যালবাম', path: '/gallery' });
}

export default function GalleryPage() {
  return (
    <main>
      <Container>
        <PageHeader title="গ্যালারি" description="চিত্র-গ্যালারি, অ্যালবাম এবং ইমেজ লাইটবক্স" eyebrow="গ্যালারি" />
      </Container>
      <Section>
        <Container>
          <p className="text-body text-text-secondary">গ্যালারি পৃষ্ঠা ভবিষ্যতে অ্যালবাম গ্রিড ও লাইটবক্স সহ বাস্তবায়িত হবে।</p>
        </Container>
      </Section>
    </main>
  );
}
