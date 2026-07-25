import { cn } from '@/utils/cn';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h2' | 'h3';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className="mb-3 text-caption font-medium uppercase tracking-wider text-secondary">
          {eyebrow}
        </p>
      )}
      <Tag className={cn(Tag === 'h2' ? 'text-h2' : 'text-h3', 'text-text-primary')}>{title}</Tag>
      {description && <p className="mt-4 text-body text-text-secondary">{description}</p>}
    </div>
  );
}
