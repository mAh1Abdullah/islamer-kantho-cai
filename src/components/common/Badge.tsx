import { cn } from '@/utils/cn';

export type BadgeTone = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'neutral';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  primary: 'bg-primary-tint text-primary',
  secondary: 'bg-secondary-tint text-primary',
  success: 'bg-success/10 text-success',
  error: 'bg-error/10 text-error',
  warning: 'bg-warning/10 text-warning',
  neutral: 'bg-border/60 text-text-secondary',
};

export function Badge({ tone = 'neutral', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-caption font-medium',
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
