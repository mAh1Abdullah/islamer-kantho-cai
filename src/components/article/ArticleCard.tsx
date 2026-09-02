import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Image } from '@/components/common/Image';
import { CategoryChip } from '@/components/common/CategoryChip';
import { ArticleMeta } from '@/components/common/ArticleMeta';
import { getImageUrl, getBlurDataUrl } from '@/utils/image';
import { estimateReadingTime } from '@/utils/readingTime';
import { routes } from '@/constants/routes';
import { cn } from '@/utils/cn';
import type { PostSummary } from '@/types/sanity';

export type ArticleCardVariant = 'small' | 'medium' | 'large' | 'horizontal' | 'featured' | 'compact';

export interface ArticleCardProps {
  post: PostSummary;
  variant?: ArticleCardVariant;
  priority?: boolean; // pass true for above-the-fold cards (e.g. first Hero/featured item)
  className?: string;
}

const titleSizeByVariant: Record<ArticleCardVariant, string> = {
  small: 'text-body font-semibold',
  medium: 'text-h4',
  large: 'text-h3',
  horizontal: 'text-h4',
  featured: 'text-h2',
  compact: 'text-small font-semibold',
};

const imageAspectByVariant: Record<ArticleCardVariant, string> = {
  small: 'aspect-[16/10]',
  medium: 'aspect-[16/10]',
  large: 'aspect-[16/9]',
  horizontal: 'aspect-square',
  featured: 'aspect-[21/9]',
  compact: 'aspect-square',
};

/**
 * One card component, six layouts. All variants share the same internal
 * pieces (Image, CategoryChip, title, ArticleMeta) so visual language
 * never drifts between contexts — only proportion and arrangement change.
 */
export function ArticleCard({ post, variant = 'medium', priority = false, className }: ArticleCardProps) {
  const readingTime = estimateReadingTime(post.excerpt ?? '');
  const isHorizontalLayout = variant === 'horizontal' || variant === 'compact';

  const imageEl = (
    <div className={cn('relative w-full shrink-0 overflow-hidden rounded-md', imageAspectByVariant[variant], isHorizontalLayout && 'w-28 sm:w-40')}>
      <Link href={routes.article(post.slug)} className="block h-full w-full">
        <Image
          src={getImageUrl(post.coverImage, 800)}
          alt={post.coverImage.alt ?? post.title}
          fill
          priority={priority}
          placeholder="blur"
          blurDataURL={getBlurDataUrl(post.coverImage)}
        />
      </Link>
    </div>
  );

  const bodyEl = (
    <div className="flex flex-1 flex-col gap-2">
      <div className="w-fit">
        <CategoryChip label={post.category.title} slug={post.category.slug} />
      </div>
      <h3 className={cn(titleSizeByVariant[variant], 'leading-snug text-text-primary')}>
        <Link href={routes.article(post.slug)} className="hover:text-primary transition-colors">
          {post.title}
        </Link>
      </h3>
      {(variant === 'large' || variant === 'featured') && post.excerpt && (
        <p className="text-body text-text-secondary line-clamp-2">{post.excerpt}</p>
      )}
      {variant !== 'compact' && (
        <ArticleMeta author={post.author} publishedAt={post.publishedAt} readingTime={readingTime} className="mt-1" />
      )}
    </div>
  );

  return (
    <Card
      as="article"
      interactive
      padding="none"
      className={cn('group overflow-hidden', variant === 'featured' && 'bg-primary-tint/40', className)}
    >
      <div
        className={cn('flex h-full gap-4', isHorizontalLayout ? 'flex-row items-start p-3' : 'flex-col p-4')}
      >
        {imageEl}
        {bodyEl}
      </div>
    </Card>
  );
}
