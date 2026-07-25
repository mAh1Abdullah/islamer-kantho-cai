import { cn } from '@/utils/cn';

/** Shared layout wrapper for consistent page-width spacing and max-width rules. */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  narrow?: boolean; // true for reading-width content, e.g. article body
}

/**
 * Enforces the 1280px max container width and responsive horizontal
 * padding. Never hardcode `max-w-[1280px] px-...` inline — use this.
 */
export function Container({
  as: Component = 'div',
  narrow = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-12',
        narrow ? 'max-w-[760px]' : 'max-w-container',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
