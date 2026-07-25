import Link from 'next/link';
import { cn } from '@/utils/cn';
import { toBanglaDigits } from '@/utils/date';

export interface PaginationProps {
  currentPage: number; // 1-indexed
  totalPages: number;
  buildHref: (page: number) => string;
  className?: string;
}

/**
 * Numbered pager for pages that use real URL-based pagination (Search,
 * Archive). Category grids use the Load More pattern (see
 * CategoryGridClient + useInfinitePosts) instead, since infinite
 * scroll-style browsing fits that context better.
 */
export function Pagination({ currentPage, totalPages, buildHref, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="পৃষ্ঠা নেভিগেশন" className={cn('flex items-center justify-center gap-2', className)}>
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        aria-label="আগের পৃষ্ঠা"
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-md border border-border text-text-secondary',
          currentPage === 1 ? 'pointer-events-none opacity-40' : 'hover:border-primary hover:text-primary'
        )}
      >
        ‹
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-md text-body',
            page === currentPage
              ? 'bg-primary text-white'
              : 'border border-border text-text-secondary hover:border-primary hover:text-primary'
          )}
        >
          {toBanglaDigits(page)}
        </Link>
      ))}

      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        aria-label="পরের পৃষ্ঠা"
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-md border border-border text-text-secondary',
          currentPage === totalPages ? 'pointer-events-none opacity-40' : 'hover:border-primary hover:text-primary'
        )}
      >
        ›
      </Link>
    </nav>
  );
}
