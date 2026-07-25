import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article';
  interactive?: boolean; // adds hover affordance for clickable cards
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * The single shared visual language for every card in the app (article
 * cards, author cards, widgets). Keep it quiet: no shadow-everywhere,
 * a hairline border and a very soft lift on hover only when interactive.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ as: Tag = 'div', interactive = false, padding = 'md', className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref as never}
        className={cn(
          'rounded-lg border border-border bg-surface',
          paddingClasses[padding],
          interactive &&
            'transition-all duration-200 ease-calm hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(5,85,71,0.06)]',
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Card.displayName = 'Card';
