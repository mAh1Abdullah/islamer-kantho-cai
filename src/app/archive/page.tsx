import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return buildMetadata({ title: 'প্রবন্ধসমূহ', description: 'সমস্ত প্রকাশিত প্রবন্ধের তালিকা', path: '/archive' });
}

export default function ArchivePage() {
  return (
    <main>
      <Container>
        <PageHeader title="প্রবন্ধসমূহ" description="সমস্ত প্রকাশিত প্রবন্ধের সমন্বিত তালিকা" eyebrow="আর্কাইভ" />
      </Container>
      <Section>
        <Container>
          <p className="text-body text-text-secondary">এই পৃষ্ঠার ব內容 ভবিষ্যতে পূর্ণ আর্কাইভ তালিকা দিয়ে তৈরি হবে।</p>
        </Container>
      </Section>
    </main>
  );
}
