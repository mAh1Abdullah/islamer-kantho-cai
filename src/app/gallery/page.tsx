import { Suspense } from 'react';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { buildMetadata } from '@/components/common/SEO';
import { GalleryClient } from '@/components/gallery/GalleryClient';
import { INITIAL_GALLERY_ITEMS } from '@/lib/galleryData';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'ইসলামিক স্থিরচিত্র ও স্থাপত্য গ্যালারি',
    description: 'পবিত্র হারামাইন শরিফাইন, ঐতিহাসিক মসজিদ, ইসলামিক স্থাপত্য, সুদৃশ্য ক্যালিগ্রাফি ও প্রাকৃতিক নিদর্শনের সমৃদ্ধ গ্যালারি। ফুল স্ক্রিন ভিউ এবং হাই-রেজ্যুলেশন ডাউনলোড সুবিধা।',
    path: '/gallery',
  });
}

function GallerySkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-10 w-28 animate-pulse rounded-xl bg-surface" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-72 animate-pulse rounded-2xl bg-surface border border-border" />
        ))}
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background pb-16">
      <Container>
        <PageHeader
          title="ইসলামিক চিত্র-গ্যালারি"
          description="কুরআন-সুন্নাহর আলোকচ্ছটা, ঐতিহাসিক মসজিদ, সুদৃশ্য স্থাপত্য ও পবিত্র হারামাইনের হাই-রেজ্যুলেশন স্থিরচিত্র সংকলন"
          eyebrow="ফটোগ্যালারি ও সংরক্ষণাগার"
        />
      </Container>
      <Section>
        <Container>
          <Suspense fallback={<GallerySkeleton />}>
            <GalleryClient initialItems={INITIAL_GALLERY_ITEMS} />
          </Suspense>
        </Container>
      </Section>
    </main>
  );
}


