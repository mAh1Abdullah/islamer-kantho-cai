import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return buildMetadata({ title: 'লেখকবৃন্দ', description: 'প্রকাশিত লেখক ও অবদানকারীদের তালিকা', path: '/authors' });
}

export default function AuthorsPage() {
  return (
    <main>
      <Container>
        <PageHeader title="লেখকবৃন্দ" description="প্রকাশিত লেখক ও অবদানকারীদের তালিকা" eyebrow="সম্পদ" />
      </Container>
      <Section>
        <Container>
          <p className="text-body text-text-secondary">এই পৃষ্ঠাটি লেখকプロフィール এবং তাদের কনটেন্টের জন্য প্রস্তুতকৃত বেসলাইন।</p>
        </Container>
      </Section>
    </main>
  );
}
