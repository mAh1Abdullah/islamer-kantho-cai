'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Image } from '@/components/common/Image';
import { getImageUrl, getBlurDataUrl } from '@/utils/image';
import { estimateReadingTime } from '@/utils/readingTime';
import { toBanglaDigits, formatBanglaDate } from '@/utils/date';
import { routes } from '@/constants/routes';
import { TrendingUp, Flame, Award, BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { PostSummary } from '@/types/sanity';

interface ArticleRankingWidgetProps {
  posts: PostSummary[];
  className?: string;
}

type RankingTab = 'trending' | 'allTime';

export function ArticleRankingWidget({ posts, className }: ArticleRankingWidgetProps) {
  const [activeTab, setActiveTab] = useState<RankingTab>('trending');

  if (!posts || posts.length === 0) {
    return null;
  }

  // Display top 5 items for clean sidebar height
  // In trending mode, we display the ordered list; in allTime mode, we can reverse/alternate ranking
  const displayedPosts = activeTab === 'trending' ? posts.slice(0, 5) : [...posts].reverse().slice(0, 5);

  const getRankBadgeStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-amber-500 text-white font-bold ring-2 ring-amber-400/30 shadow-xs';
      case 1:
        return 'bg-slate-700 text-white font-bold';
      case 2:
        return 'bg-amber-700 text-white font-bold';
      default:
        return 'bg-primary-tint text-primary font-semibold border border-border/80';
    }
  };

  return (
    <Card padding="md" as="div" className={cn('border-border overflow-hidden', className)}>
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-h4 font-semibold text-text-primary leading-tight">শীর্ষ প্রবন্ধ র‍্যাংকিং</h3>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center rounded-lg bg-primary-tint/60 p-0.5 text-caption">
          <button
            type="button"
            onClick={() => setActiveTab('trending')}
            className={cn(
              'flex items-center gap-1 rounded-md px-2 py-1 font-medium transition-colors cursor-pointer',
              activeTab === 'trending'
                ? 'bg-surface text-primary shadow-xs font-semibold'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            <Flame className="h-3 w-3 text-amber-500" />
            <span>ট্রেন্ডিং</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('allTime')}
            className={cn(
              'flex items-center gap-1 rounded-md px-2 py-1 font-medium transition-colors cursor-pointer',
              activeTab === 'allTime'
                ? 'bg-surface text-primary shadow-xs font-semibold'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            <Award className="h-3 w-3 text-primary" />
            <span>জনপ্রিয়</span>
          </button>
        </div>
      </div>

      {/* Ranked Items List */}
      <div className="mt-3 divide-y divide-border/60">
        {displayedPosts.map((post, index) => {
          const readingTime = estimateReadingTime(post.excerpt ?? '');
          const rankNumber = toBanglaDigits(index + 1);

          return (
            <div
              key={post._id}
              className="group flex items-start gap-3 py-3 transition-colors hover:bg-primary-tint/20 rounded-lg px-1.5 -mx-1.5"
            >
              {/* Rank Number Badge */}
              <div
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs transition-transform group-hover:scale-105',
                  getRankBadgeStyle(index)
                )}
                aria-label={`র‍্যাংক ${rankNumber}`}
              >
                {rankNumber}
              </div>

              {/* Content info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-caption text-text-secondary mb-1">
                  <Link
                    href={routes.category(post.category.slug)}
                    className="font-medium text-primary hover:underline hover:text-primary-hover truncate max-w-[120px]"
                  >
                    {post.category.title}
                  </Link>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3 inline opacity-70" />
                    {readingTime}
                  </span>
                </div>

                <Link
                  href={routes.article(post.slug)}
                  className="block text-small font-medium text-text-primary leading-snug line-clamp-2 transition-colors group-hover:text-primary"
                >
                  {post.title}
                </Link>

                <div className="mt-1 flex items-center justify-between text-caption text-text-secondary/80">
                  <span className="truncate max-w-[140px]">{post.author.name}</span>
                  <span className="text-[11px]">{formatBanglaDate(post.publishedAt)}</span>
                </div>
              </div>

              {/* Compact Cover Thumbnail */}
              <Link
                href={routes.article(post.slug)}
                className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-border/40"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={getImageUrl(post.coverImage, 200)}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  blurDataURL={getBlurDataUrl(post.coverImage)}
                />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="mt-3 pt-2.5 border-t border-border/80 text-center">
        <Link
          href={routes.archive}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary-hover hover:gap-1.5"
        >
          <span>সকল প্রবন্ধের আর্কাইভ দেখুন</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Card>
  );
}
