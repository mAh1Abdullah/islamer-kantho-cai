'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { IconButton } from '@/components/common/IconButton';
import { Navigation } from './Navigation';
import { cn } from '@/utils/cn';
import type { Category } from '@/types/sanity';
import { routes } from '@/constants/routes';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
}

const staticPages = [
  { label: 'আর্কাইভ', href: routes.archive },
  { label: 'সার্চ', href: routes.search },
];

/** Grouped mobile navigation drawer: Categories, then Pages. Traps focus while open, closes on Escape. */
export function Drawer({ open, onClose, categories }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = (): HTMLElement[] =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      // Trap Tab/Shift+Tab within the panel's focusable elements (WCAG 2.1 AA
      // dialog requirement) — without this, tabbing past the last link
      // would escape into the page content hidden behind the overlay.
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus(); // return focus to whatever opened the drawer (the hamburger button)
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={cn('fixed inset-0 z-50', open ? 'pointer-events-auto' : 'pointer-events-none')}
    >
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-text-primary/40 transition-opacity duration-300 ease-calm',
          open ? 'opacity-100' : 'opacity-0'
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="নেভিগেশন মেনু"
        tabIndex={-1}
        className={cn(
          'absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col gap-8 overflow-y-auto bg-surface p-6',
          'transition-transform duration-300 ease-calm',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between">
          <span className="text-h4">মেনু</span>
          <IconButton aria-label="মেনু বন্ধ করুন" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </IconButton>
        </div>

        <div>
          <p className="mb-3 text-caption font-medium uppercase tracking-wider text-text-secondary">
            বিভাগসমূহ
          </p>
          <Navigation categories={categories} orientation="vertical" onNavigate={onClose} />
        </div>

        <div>
          <p className="mb-3 text-caption font-medium uppercase tracking-wider text-text-secondary">
            পাতাসমূহ
          </p>
          <nav className="flex flex-col gap-1">
            {staticPages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                onClick={onClose}
                className="rounded-md px-3 py-2 text-body text-text-primary hover:bg-primary-tint"
              >
                {p.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
