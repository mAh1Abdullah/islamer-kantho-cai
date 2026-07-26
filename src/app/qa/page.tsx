import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return buildMetadata({ title: 'প্রশ্ন-উত্তর', description: 'ইসলামিক প্রশ্ন-উত্তর সংকলন', path: '/qa' });
}

export default function QAPage() {
  return (
    <main>
      <Container>
        <PageHeader title="প্রশ্ন-উত্তর" description="ইসলামিক প্রশ্ন-উত্তর বিশ্লেষণ ও উত্তরসমূহ" eyebrow="কন্টেন্ট" />
      </Container>
      <Section>
        <Container>
          <p className="text-body text-text-secondary">এই পৃষ্ঠাটি Q&A মডিউল সিস্টেমের জন্য অস্থায়ী বেসলাইন।</p>
        </Container>
      </Section>
    </main>
  );
}
