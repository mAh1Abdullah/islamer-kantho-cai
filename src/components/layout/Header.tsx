'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScroll } from '@/hooks/useScroll';
import { Navigation } from './Navigation';
import { Drawer } from './Drawer';
import { IconButton } from '@/components/common/IconButton';
import { Container } from '@/components/common/Container';
import { cn } from '@/utils/cn';
import { site } from '@/constants/site';
import { routes } from '@/constants/routes';
import type { Category } from '@/types/sanity';

export interface HeaderProps {
  categories: Category[];
}

/**
 * Sticky header. Starts transparent-over-hero only on the home page
 * (`pathname === routes.home`) and turns white once scrolled past the
 * threshold; every other route is white from the first paint since it
 * has no hero to sit over. Determined internally via `usePathname` so
 * the root layout doesn't need per-route knowledge — this was previously
 * a caller-supplied `transparentOnTop` prop, which broke as soon as
 * Category/Article/Search pages were added (see PLAN.md Phase 4 note).
 * Height is fixed so this never causes CLS on scroll.
 */
export function Header({ categories }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === routes.home;
  const { isScrolled } = useScroll(24);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isTransparent = isHome && !isScrolled;

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 h-16 lg:h-20',
          'transition-colors duration-300 ease-calm',
          isTransparent ? 'bg-transparent' : 'border-b border-border bg-surface/95 backdrop-blur-sm'
        )}
      >
        <Container className="flex h-full items-center justify-between">
          <Link
            href={routes.home}
            className={cn('text-h4 font-semibold transition-colors duration-300 ease-calm', isTransparent ? 'text-white' : 'text-text-primary')}
            aria-label={site.name}
          >
            {site.name}
          </Link>

          <Navigation
            categories={categories.slice(0, 6)}
            className={cn('hidden lg:flex transition-colors duration-300 ease-calm', isTransparent && '[&_a]:text-white [&_a:hover]:text-white/70')}
          />

          <div className="flex items-center gap-2">
            <Link
              href={routes.search}
              aria-label="সার্চ করুন"
              className={cn(
                'hidden h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ease-calm sm:inline-flex',
                isTransparent ? 'text-white hover:bg-white/15' : 'text-text-primary hover:bg-primary-tint'
              )}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>

            <IconButton
              aria-label="মেনু খুলুন"
              className={cn('lg:hidden', isTransparent ? 'text-white hover:bg-white/15' : 'text-text-primary')}
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </IconButton>
          </div>
        </Container>
      </header>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} categories={categories} />
    </>
  );
}
