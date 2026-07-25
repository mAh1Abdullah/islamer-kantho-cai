import { cn } from '@/utils/cn';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
  removeLabel?: string;
}

/**
 * A plain content label (e.g. article keyword tags). For clickable
 * category pills that navigate, use CategoryChip instead.
 */
export function Tag({ onRemove, removeLabel = 'অপসারণ করুন', className, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-small text-text-secondary',
        className
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className="text-text-secondary hover:text-error"
        >
          ×
        </button>
      )}
    </span>
  );
}
