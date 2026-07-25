import { cn } from '@/utils/cn';

export interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'block' | 'circle';
}

export function LoadingSkeleton({ variant = 'block', className, ...props }: LoadingSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'skeleton-shimmer',
        variant === 'text' && 'h-4 rounded-sm',
        variant === 'block' && 'rounded-md',
        variant === 'circle' && 'rounded-full',
        className
      )}
      {...props}
    />
  );
}

/** Ready-made skeleton matching the medium ArticleCard layout. */
export function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      <LoadingSkeleton className="aspect-[16/10] w-full" />
      <LoadingSkeleton variant="text" className="w-20" />
      <LoadingSkeleton variant="text" className="h-6 w-full" />
      <LoadingSkeleton variant="text" className="w-2/3" />
    </div>
  );
}
