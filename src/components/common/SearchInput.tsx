import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, className, value, ...props }, ref) => {
    return (
      <div className={cn('relative flex items-center', className)}>
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="pointer-events-none absolute left-3 text-text-secondary"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          ref={ref}
          type="search"
          value={value}
          role="searchbox"
          className={cn(
            'h-11 w-full rounded-md border border-border bg-surface pl-10 pr-10 text-body text-text-primary',
            'placeholder:text-text-secondary',
            'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'
          )}
          {...props}
        />
        {onClear && value ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="সার্চ মুছুন"
            className="absolute right-3 rounded-full p-1 text-text-secondary transition-colors hover:bg-primary-tint hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            ×
          </button>
        ) : null}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
