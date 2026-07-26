import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return buildMetadata({ title: 'মিডিয়া', description: 'ভিডিও, অডিও ও মিডিয়া কনটেন্ট', path: '/media' });
}

export default function MediaPage() {
  return (
    <main>
      <Container>
        <PageHeader title="মিডিয়া" description="ভিডিও, অডিও, প্লেলিস্ট এবং ইমবেডেড মিডিয়া" eyebrow="মিডিয়া" />
      </Container>
      <Section>
        <Container>
          <p className="text-body text-text-secondary">মিডিয়া লাইব্রেরি ভিউ ভবিষ্যতে বাস্তব কনটেন্ট দিয়ে পূর্ণ হবে।</p>
        </Container>
      </Section>
    </main>
  );
}
