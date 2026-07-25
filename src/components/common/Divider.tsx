import { cn } from '@/utils/cn';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'line' | 'ornament';
}

/**
 * `ornament` variant is the site's one signature decorative mark: a thin
 * single-line eight-point star (khatam) rendered at 16px, used only on
 * dividers between major sections. It is the sole place geometric
 * ornament appears in the whole UI — everywhere else stays unornamented,
 * so this mark stays legible as "the" Islamic Kantho signature rather
 * than one decoration among many.
 */
export function Divider({ variant = 'line', className, ...props }: DividerProps) {
  if (variant === 'ornament') {
    return (
      <div
        role="separator"
        className={cn('flex items-center gap-4 py-2', className)}
        {...props}
      >
        <span className="h-px flex-1 bg-border" />
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-secondary"
        >
          <path
            d="M12 1L14.5 7.5L21 6L16.8 11L21 16L14.5 14.5L12 21L9.5 14.5L3 16L7.2 11L3 6L9.5 7.5L12 1Z"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
        <span className="h-px flex-1 bg-border" />
      </div>
    );
  }

  return <hr role="separator" className={cn('border-t border-border', className)} {...props} />;
}
