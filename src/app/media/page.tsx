import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/common/Card';
import { Image } from '@/components/common/Image';
import { buildMetadata } from '@/components/common/SEO';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return buildMetadata({ title: 'মিডিয়া', description: 'ভিডিও আলোচনা, তিলাওয়াত ও অডিও লেকচার', path: '/media' });
}

const mediaItems = [
  {
    title: 'পবিত্র কুরআন তিলাওয়াত — সূরা আর-রহমান',
    author: 'শায়খ মিশারী রশিদ আল-আফাসী',
    type: 'অডিও তিলাওয়াত',
    category: 'কুরআন ও তিলাওয়াত',
    duration: '১৩:২৫ মিনিট',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'রমজানের প্রস্তুতি ও অন্তরের পরিশুদ্ধি',
    author: 'মুফতি মুহাম্মদ আব্দুল্লাহ',
    type: 'ভিডিও আলোচনা',
    category: 'দৈনন্দিন ফিকহ ও আমল',
    duration: '২৮:৪০ মিনিট',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'সীরাতুন্নবী (সা.)-এর আলোকে আদর্শ পারিবারিক জীবন',
    author: 'ড. আহমদ আল-হাসান',
    type: 'পডকাস্ট লেকচার',
    category: 'সীরাতুন্নবী ও ইতিহাস',
    duration: '৪৫:১২ মিনিট',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'তাওহীদের গভীর মর্ম ও শিরকমুক্ত জীবনের সাধনা',
    author: 'মাওলানা মাহমুদুর রহমান',
    type: 'ভিডিও আলোচনা',
    category: 'ঈমান ও আকীদা',
    duration: '৩২:১৫ মিনিট',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'কুরআন তিলাওয়াত — সূরা আল-মুলক ও সূরা ওয়াক্বিয়াহ',
    author: 'কারী আব্দুল বাসিত আব্দুস সামাদ',
    type: 'অডিও তিলাওয়াত',
    category: 'কুরআন ও তিলাওয়াত',
    duration: '১৯:৪০ মিনিট',
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'ডিজিটাল যুগে হালাল অর্থায়ন ও অর্থনৈতিক সুরক্ষা',
    author: 'মুফতি মুহাম্মদ আব্দুল্লাহ',
    type: 'ভিডিও সিম্পোজিয়াম',
    category: 'সমকালীন ইসলামী চিন্তা',
    duration: '৩৮:৫০ মিনিট',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'অন্তরের ব্যাধি নিরাময় ও ক্বলবে সালিম অর্জনের পথ',
    author: 'ড. আহমদ আল-হাসান',
    type: 'আত্মশুদ্ধি সিরিজ',
    category: 'আদব ও আত্মশুদ্ধি',
    duration: '৩৫:২০ মিনিট',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'সূরা আল-ফাতিহা ও সূরা আল-ইখলাসের প্রাঞ্জল তাফসির',
    author: 'মাওলানা মাহমুদুর রহমান',
    type: 'তাফসির দরস',
    category: 'কুরআন ও তাফসির',
    duration: '৪২:১০ মিনিট',
    image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'মদিনা সনদের রাষ্ট্রনীতি ও ধর্মীয় সহাবস্থান',
    author: 'ড. আহমদ আল-হাসান',
    type: 'ইতিহাস আলোচনা',
    category: 'সীরাতুন্নবী ও ইতিহাস',
    duration: '২৯:১৮ মিনিট',
    image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&q=80&w=600',
  },
];

export default function MediaPage() {
  return (
    <main>
      <Container>
        <PageHeader title="মিডিয়া ও লেকচার" description="ইসলামিক আলোচনা, কুরআন তিলাওয়াত ও শিক্ষামূলক অডিও-ভিডিও" eyebrow="মাল্টিমিডিয়া" />
      </Container>
      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mediaItems.map((item, idx) => (
              <Card key={idx} padding="none" interactive className="overflow-hidden">
                <div className="relative aspect-video w-full overflow-hidden bg-background">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <div className="absolute bottom-2 right-2 rounded bg-black/75 px-2 py-0.5 text-caption text-white font-medium">
                    {item.duration}
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block rounded-full bg-primary-tint px-2.5 py-0.5 text-caption font-medium text-primary mb-2">
                    {item.type}
                  </span>
                  <h3 className="text-h4 font-semibold text-text-primary mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-small text-text-secondary">{item.author}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
