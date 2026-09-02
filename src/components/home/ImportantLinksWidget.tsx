'use client';

import { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Globe, ExternalLink, Sparkles, BookOpen, Compass } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ImportantLink {
  id: string;
  name: string;
  nameEn: string;
  url: string;
  domain: string;
  category: 'quran-hadith' | 'research' | 'library' | 'organization';
  categoryLabel: string;
  description: string;
  brandColor: string;
  badgeBg: string;
}

const IMPORTANT_LINKS: ImportantLink[] = [
  {
    id: 'quran-com',
    name: 'কুরআন.কম',
    nameEn: 'Quran.com',
    url: 'https://quran.com',
    domain: 'quran.com',
    category: 'quran-hadith',
    categoryLabel: 'কুরআন ও তিলাওয়াত',
    description: 'আন্তর্জাতিক অনলাইন কুরআন অধ্যয়ন, বাংলা অনুবাদ ও বিশ্বখ্যাত ক্বারিদের তিলাওয়াত।',
    brandColor: 'text-emerald-700 dark:text-emerald-400',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 'sunnah-com',
    name: 'সুন্নাহ.কম',
    nameEn: 'Sunnah.com',
    url: 'https://sunnah.com',
    domain: 'sunnah.com',
    category: 'quran-hadith',
    categoryLabel: 'সহিহ হাদিস ভাণ্ডার',
    description: 'বুখারি, মুসলিমসহ সিহাহ সিত্তাহ হাদিসগ্রন্থের প্রামাণিক আন্তর্জাতিক এনসাইক্লোপিডিয়া।',
    brandColor: 'text-teal-700 dark:text-teal-400',
    badgeBg: 'bg-teal-500/10 border-teal-500/20',
  },
  {
    id: 'hadith-bd',
    name: 'হাদিস বিডি',
    nameEn: 'HadithBD.com',
    url: 'https://www.hadithbd.com',
    domain: 'hadithbd.com',
    category: 'quran-hadith',
    categoryLabel: 'বাংলা হাদিস ও তাফসির',
    description: 'বাংলা ভাষায় সিহাহ সিত্তাহ ও তাফসির ইবনে কাসীরের বৃহত্তম বাংলা ডাটাবেজ।',
    brandColor: 'text-green-700 dark:text-green-400',
    badgeBg: 'bg-green-500/10 border-green-500/20',
  },
  {
    id: 'yaqeen-institute',
    name: 'ইয়াক্বীন ইনস্টিটিউট',
    nameEn: 'Yaqeen Institute',
    url: 'https://yaqeeninstitute.org',
    domain: 'yaqeeninstitute.org',
    category: 'research',
    categoryLabel: 'সমকালীন গবেষণা',
    description: 'আধুনিক যুগে ইসলামী চিন্তা, বিশ্বাস ও বুদ্ধিবৃত্তিক সংশয় নিরসনের শীর্ষ গবেষণা প্রতিষ্ঠান।',
    brandColor: 'text-blue-700 dark:text-blue-400',
    badgeBg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    id: 'islam-qa',
    name: 'ইসলাম কিউএ',
    nameEn: 'IslamQA.info',
    url: 'https://islamqa.info/bn',
    domain: 'islamqa.info',
    category: 'research',
    categoryLabel: 'ফতোয়া ও মাসায়েল',
    description: 'কুরআন ও সুন্নাহর আলোকে প্রামাণিক ফতোয়া ও ইসলামিক জীবনবিধানের বিশ্বকোষ।',
    brandColor: 'text-amber-700 dark:text-amber-400',
    badgeBg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    id: 'shamela',
    name: 'আল-মাকতাবা আশ-শামেলা',
    nameEn: 'Shamela.ws',
    url: 'https://shamela.ws',
    domain: 'shamela.ws',
    category: 'library',
    categoryLabel: 'আরবি ডিজিটাল লাইব্রেরি',
    description: 'হাজারো প্রাচীন ও আধুনিক আরবি কিতাবের সর্ববৃহৎ আন্তর্জাতিক ইসলামিক ই-লাইব্রেরি।',
    brandColor: 'text-amber-800 dark:text-amber-300',
    badgeBg: 'bg-amber-600/10 border-amber-600/20',
  },
  {
    id: 'islamic-foundation',
    name: 'ইসলামিক ফাউন্ডেশন',
    nameEn: 'Islamic Foundation BD',
    url: 'http://www.islamicfoundation.gov.bd',
    domain: 'islamicfoundation.gov.bd',
    category: 'organization',
    categoryLabel: 'জাতীয় প্রতিষ্ঠান',
    description: 'বাংলাদেশ ইসলামিক ফাউন্ডেশনের অফিসিয়াল পোর্টাল, প্রকাশনা ও সেবাসমূহ।',
    brandColor: 'text-emerald-800 dark:text-emerald-300',
    badgeBg: 'bg-emerald-600/10 border-emerald-600/20',
  },
  {
    id: 'al-azhar',
    name: 'আল-আজহার পোর্টাল',
    nameEn: 'Al-Azhar Egypt',
    url: 'https://www.azhar.eg',
    domain: 'azhar.eg',
    category: 'organization',
    categoryLabel: 'ঐতিহাসিক বিশ্ববিদ্যালয়',
    description: 'বিশ্ববিখ্যাত আল-আজহার আল-শরীফের আন্তর্জাতিক শিক্ষা ও ফতোয়া পোর্টাল।',
    brandColor: 'text-sky-700 dark:text-sky-400',
    badgeBg: 'bg-sky-500/10 border-sky-500/20',
  },
  {
    id: 'bayyinah',
    name: 'বাইয়্যিনাহ টিভি',
    nameEn: 'Bayyinah.tv',
    url: 'https://bayyinah.tv',
    domain: 'bayyinah.tv',
    category: 'library',
    categoryLabel: 'কুরআনিক ভাষা ও তাদাব্বুর',
    description: 'কুরআনিক আরবি ভাষা শিক্ষা ও গভীর বিশ্লেষণমূলক তাফসির ভিডিও লেকচার।',
    brandColor: 'text-indigo-700 dark:text-indigo-400',
    badgeBg: 'bg-indigo-500/10 border-indigo-500/20',
  },
  {
    id: 'islamonline',
    name: 'ইসলাম অনলাইন',
    nameEn: 'IslamOnline.net',
    url: 'https://islamonline.net',
    domain: 'islamonline.net',
    category: 'research',
    categoryLabel: 'ইসলামী সংবাদ ও চিন্তা',
    description: 'মুসলিম বিশ্বের চিন্তা, সংস্কৃতি, সমকালীন জিজ্ঞাসা ও পরিবারের সার্বিক দিকনির্দেশনা।',
    brandColor: 'text-purple-700 dark:text-purple-400',
    badgeBg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    id: 'quran-mazid',
    name: 'কুরআন মাজীদ বিডি',
    nameEn: 'Quran Mazid',
    url: 'https://quranmazid.com',
    domain: 'quranmazid.com',
    category: 'quran-hadith',
    categoryLabel: 'বাংলা কুরআন অ্যাপ',
    description: 'বাংলায় শব্দে শব্দে কুরআন, একাধিক তাফসির ও বিষয়ভিত্তিক আয়াত ভাণ্ডার।',
    brandColor: 'text-cyan-700 dark:text-cyan-400',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    id: 'dorar',
    name: 'আদ-দুরার আস-সানিয়্যাহ',
    nameEn: 'Dorar.net',
    url: 'https://dorar.net',
    domain: 'dorar.net',
    category: 'research',
    categoryLabel: 'হাদিস তাহকিক ও ফিকহ',
    description: 'হাদিসের বিশুদ্ধতা যাচাই (তাহকিক) এবং তুলনামূলক ফিকহের আধুনিক বৈজ্ঞানিক এনসাইক্লোপিডিয়া।',
    brandColor: 'text-amber-900 dark:text-amber-200',
    badgeBg: 'bg-amber-700/10 border-amber-700/20',
  },
];

interface ImportantLinksWidgetProps {
  className?: string;
}

export function ImportantLinksWidget({ className }: ImportantLinksWidgetProps) {
  const [hoveredLink, setHoveredLink] = useState<ImportantLink | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const filteredLinks = activeCategory === 'all'
    ? IMPORTANT_LINKS
    : IMPORTANT_LINKS.filter((l) => l.category === activeCategory);

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <Card padding="md" as="div" className={cn('border-border overflow-hidden', className)}>
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Globe className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-h4 font-semibold text-text-primary leading-tight">গুরুত্বপূর্ণ ওয়েবসাইট</h3>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-caption text-primary font-medium bg-primary-tint px-2 py-0.5 rounded-full">
          <Compass className="h-3 w-3" />
          <span>রিসোর্স</span>
        </span>
      </div>

      {/* Mini Category Filter Tabs */}
      <div className="flex items-center gap-1 pt-3 pb-2 border-b border-border/40 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={cn(
            'px-2.5 py-1 text-caption font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer',
            activeCategory === 'all'
              ? 'bg-primary text-white font-semibold'
              : 'text-text-secondary hover:bg-primary-tint hover:text-text-primary'
          )}
        >
          সব লিংক
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('quran-hadith')}
          className={cn(
            'px-2.5 py-1 text-caption font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer',
            activeCategory === 'quran-hadith'
              ? 'bg-primary text-white font-semibold'
              : 'text-text-secondary hover:bg-primary-tint hover:text-text-primary'
          )}
        >
          কুরআন-হাদিস
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('research')}
          className={cn(
            'px-2.5 py-1 text-caption font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer',
            activeCategory === 'research'
              ? 'bg-primary text-white font-semibold'
              : 'text-text-secondary hover:bg-primary-tint hover:text-text-primary'
          )}
        >
          গবেষণা ও ফতোয়া
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('library')}
          className={cn(
            'px-2.5 py-1 text-caption font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer',
            activeCategory === 'library'
              ? 'bg-primary text-white font-semibold'
              : 'text-text-secondary hover:bg-primary-tint hover:text-text-primary'
          )}
        >
          লাইব্রেরি
        </button>
      </div>

      {/* Mini Logos Grid */}
      <div className="pt-3">
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2.5">
          {filteredLinks.map((item) => {
            const hasError = imageErrors[item.id];
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${item.domain}&sz=128`;
            const isHovered = hoveredLink?.id === item.id;

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${item.name} (${item.nameEn}) — ${item.description}`}
                aria-label={`${item.name} (${item.nameEn}) ওয়েবসাইট দেখুন`}
                onMouseEnter={() => setHoveredLink(item)}
                onMouseLeave={() => setHoveredLink(null)}
                onFocus={() => setHoveredLink(item)}
                onBlur={() => setHoveredLink(null)}
                className={cn(
                  'group relative flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-200 cursor-pointer',
                  'bg-surface hover:bg-primary-tint/30 hover:border-primary/50 hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
                  isHovered ? 'border-primary shadow-xs scale-105' : 'border-border/80'
                )}
              >
                {/* Mini Logo Container */}
                <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-background border border-border/60 p-1.5 shadow-2xs group-hover:scale-105 transition-transform">
                  {!hasError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={faviconUrl}
                      alt={`${item.nameEn} logo`}
                      width={28}
                      height={28}
                      loading="lazy"
                      onError={() => handleImageError(item.id)}
                      className="h-7 w-7 object-contain rounded-xs"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className={cn('flex h-7 w-7 items-center justify-center rounded-xs font-bold text-xs', item.badgeBg, item.brandColor)}>
                      {item.nameEn.charAt(0)}
                    </div>
                  )}

                  {/* Tiny External Link Indicator */}
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-surface border border-border text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="h-2 w-2 text-primary" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Dynamic Hover / Active Preview Info Box */}
      <div className="mt-3 min-h-[72px] rounded-xl border border-primary/20 bg-primary-tint/40 p-2.5 transition-all">
        {hoveredLink ? (
          <div className="flex items-start justify-between gap-2 animate-in fade-in duration-150">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-small font-bold text-text-primary">
                  {hoveredLink.name}
                </span>
                <span className="text-caption font-medium text-text-secondary">
                  ({hoveredLink.nameEn})
                </span>
              </div>
              <p className="text-caption text-text-secondary line-clamp-2 leading-relaxed">
                {hoveredLink.description}
              </p>
            </div>
            <a
              href={hoveredLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1 text-caption font-semibold text-primary hover:underline mt-0.5"
            >
              <span>ভিজিট</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-2 h-full py-1 text-caption text-text-secondary">
            <Sparkles className="h-4 w-4 text-primary shrink-0" />
            <span>
              লোগোতে ক্লিক করে সরাসরি বিশ্বস্ত ইসলামিক পোর্টাল ও রিসোর্সসমূহে প্রবেশ করুন।
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
