'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from './useDebounce';
import type { PostSummary } from '@/types/sanity';

export interface UseSearchOptions {
  searchFn: (query: string) => Promise<PostSummary[]>;
  debounceMs?: number;
}

export type SearchStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

/**
 * Debounced search with arrow-key navigation over the result list.
 * The consuming component wires `activeIndex` to highlight styling and
 * calls `results[activeIndex]` on Enter.
 */
export function useSearch({ searchFn, debounceMs = 300 }: UseSearchOptions) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PostSummary[]>([]);
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [activeIndex, setActiveIndex] = useState(0);
  const debouncedQuery = useDebounce(query, debounceMs);

  useEffect(() => {
    let cancelled = false;

    if (!debouncedQuery.trim()) {
      setResults([]);
      setStatus('idle');
      return;
    }

    setStatus('loading');
    searchFn(debouncedQuery)
      .then((data) => {
        if (cancelled) return;
        setResults(data);
        setActiveIndex(0);
        setStatus(data.length === 0 ? 'empty' : 'success');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, searchFn]);

  const onKeyDown = useMemo(
    () => (e: React.KeyboardEvent) => {
      if (results.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + results.length) % results.length);
      }
    },
    [results.length]
  );

  return { query, setQuery, results, status, activeIndex, setActiveIndex, onKeyDown };
}
