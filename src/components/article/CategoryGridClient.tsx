'use client';

import { ArticleCard } from '@/components/article/ArticleCard';
import { Button } from '@/components/common/Button';
import { useInfinitePosts } from '@/hooks/useInfinitePosts';
import { getPostsByCategory } from '@/lib/sanity/posts';
import type { PostSummary, PaginatedResult } from '@/types/sanity';

export interface CategoryGridClientProps {
  categorySlug: string;
  initialItems: PostSummary[];
  initialHasMore: boolean;
}

/**
 * Renders the first page server-side (via the Category page's own
 * fetch), then hands off to this client component for "Load More"
 * pages. Keeps the initial paint fully server-rendered for SEO/LCP
 * while pagination beyond page 1 stays interactive.
 */
export function CategoryGridClient({ categorySlug, initialItems, initialHasMore }: CategoryGridClientProps) {
  const fetchPage = (page: number): Promise<PaginatedResult<PostSummary>> =>
    getPostsByCategory(categorySlug, page);

  const { items, hasMore, isPending, error, loadMore } = useInfinitePosts({
    initialItems,
    initialHasMore,
    fetchPage,
  });

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post, i) => (
          <ArticleCard key={post._id} post={post} variant="medium" priority={i < 3} />
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-6 text-center text-small text-error">
          {error}
        </p>
      )}

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <Button variant="outline" onClick={loadMore} isLoading={isPending}>
            আরও দেখুন
          </Button>
        </div>
      )}
    </div>
  );
}
