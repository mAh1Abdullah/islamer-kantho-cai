'use client';

import { useRef } from 'react';
import { SearchInput } from '@/components/common/SearchInput';
import { EmptyState } from '@/components/common/EmptyState';
import { ArticleCard } from '@/components/article/ArticleCard';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { useSearch } from '@/hooks/useSearch';
import { searchPosts } from '@/lib/sanity/posts';
import { cn } from '@/utils/cn';

export function SearchClient() {
  const { query, setQuery, results, status, activeIndex, onKeyDown } = useSearch({ searchFn: searchPosts });
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <SearchInput
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery('')}
        onKeyDown={onKeyDown}
        placeholder="প্রবন্ধ, বিষয় বা লেখক খুঁজুন..."
        aria-label="প্রবন্ধ সার্চ করুন"
        autoFocus
      />

      <div className="mt-8">
        {status === 'idle' && (
          <EmptyState
            title="খোঁজা শুরু করুন"
            description="আপনি যা খুঁজছেন তা টাইপ করুন — প্রবন্ধের শিরোনাম বা সারাংশ থেকে ফলাফল দেখানো হবে।"
          />
        )}

        {status === 'loading' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <LoadingSkeleton className="h-24 w-32 shrink-0" />
                <div className="flex-1 space-y-2">
                  <LoadingSkeleton variant="text" className="w-1/3" />
                  <LoadingSkeleton variant="text" className="h-6 w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <EmptyState title="সার্চ করা যায়নি" description="একটু পরে আবার চেষ্টা করুন।" />
        )}

        {status === 'empty' && (
          <EmptyState
            title={`"${query}"-এর জন্য কোনো ফলাফল পাওয়া যায়নি`}
            description="বানান পরীক্ষা করুন অথবা অন্য শব্দ দিয়ে খুঁজুন।"
          />
        )}

        {status === 'success' && (
          <ul className="flex flex-col gap-4" role="listbox" aria-label="সার্চ ফলাফল">
            {results.map((post, i) => (
              <li key={post._id} role="option" aria-selected={i === activeIndex}>
                <div className={cn('rounded-lg', i === activeIndex && 'ring-2 ring-primary')}>
                  <ArticleCard post={post} variant="horizontal" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
