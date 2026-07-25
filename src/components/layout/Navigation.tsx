import Link from 'next/link';
import { cn } from '@/utils/cn';
import type { Category } from '@/types/sanity';
import { routes } from '@/constants/routes';

export interface NavigationProps {
  categories: Category[];
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void; // closes the Drawer on link click
  className?: string;
}

export function Navigation({ categories, orientation = 'horizontal', onNavigate, className }: NavigationProps) {
  return (
    <nav
      aria-label="প্রধান নেভিগেশন"
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'items-center gap-8' : 'flex-col gap-1',
        className
      )}
    >
      {categories.map((category) => (
        <Link
          key={category._id}
          href={routes.category(category.slug)}
          onClick={onNavigate}
          className={cn(
            'text-text-primary transition-colors duration-200 ease-calm hover:text-primary',
            orientation === 'horizontal' ? 'text-small font-medium' : 'rounded-md px-3 py-2 text-body hover:bg-primary-tint'
          )}
        >
          {category.title}
        </Link>
      ))}
    </nav>
  );
}
