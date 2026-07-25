'use client';

import { useCallback, useState, useTransition } from 'react';
import type { PostSummary, PaginatedResult } from '@/types/sanity';

export interface UseInfinitePostsOptions {
  initialItems: PostSummary[];
  initialHasMore: boolean;
  fetchPage: (page: number) => Promise<PaginatedResult<PostSummary>>;
}

/**
 * Client-side pagination state for a "Load More" grid. The first page is
 * rendered server-side and passed in as `initialItems`; this hook only
 * handles pages 2+ so there's no duplicate fetch on first paint.
 */
export function useInfinitePosts({ initialItems, initialHasMore, fetchPage }: UseInfinitePostsOptions) {
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const loadMore = useCallback(() => {
    setError(null);
    startTransition(async () => {
      try {
        const nextPage = page + 1;
        const result = await fetchPage(nextPage);
        setItems((prev) => [...prev, ...result.items]);
        setHasMore(result.hasMore);
        setPage(nextPage);
      } catch {
        setError('আরও প্রবন্ধ লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
    });
  }, [page, fetchPage]);

  return { items, hasMore, isPending, error, loadMore };
}
