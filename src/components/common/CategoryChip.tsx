import Link from 'next/link';
import { cn } from '@/utils/cn';
import { routes } from '@/constants/routes';

export interface CategoryChipProps {
  label: string;
  slug: string;
  active?: boolean;
  className?: string;
}

export function CategoryChip({ label, slug, active = false, className }: CategoryChipProps) {
  return (
    <Link
      href={routes.category(slug)}
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-caption font-medium uppercase tracking-wide',
        'transition-colors duration-200 ease-calm',
        active ? 'bg-primary text-white' : 'bg-primary-tint text-primary hover:bg-primary hover:text-white',
        className
      )}
    >
      {label}
    </Link>
  );
}
