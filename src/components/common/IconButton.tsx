import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required — icon-only buttons must always announce their purpose. */
  'aria-label': string;
  variant?: 'default' | 'ghost' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

const variantClasses = {
  default: 'bg-transparent text-text-primary hover:bg-primary-tint',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary',
  filled: 'bg-primary-tint text-primary hover:bg-primary hover:text-white',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-colors duration-200 ease-calm',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
