import { cn } from '@/utils/cn';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article';
  spacing?: 'default' | 'tight' | 'none';
  tone?: 'background' | 'surface';
}

/**
 * The only place section vertical rhythm is defined. Spacing follows the
 * spec exactly: 120px desktop / 80px tablet / 48px mobile.
 */
export function Section({
  as: Tag = 'section',
  spacing = 'default',
  tone = 'background',
  className,
  children,
  ...props
}: SectionProps) {
  const spacingClasses = {
    default: 'py-12 md:py-20 lg:py-[120px]',
    tight: 'py-8 md:py-12 lg:py-16',
    none: '',
  }[spacing];

  return (
    <Tag
      className={cn(spacingClasses, tone === 'surface' ? 'bg-surface' : 'bg-background', className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
