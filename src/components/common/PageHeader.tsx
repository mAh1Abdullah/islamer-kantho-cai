import { cn } from '@/utils/cn';

export interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
}

export function PageHeader({ title, description, eyebrow, className }: PageHeaderProps) {
  return (
    <div className={cn('border-b border-border py-10 lg:py-16', className)}>
      {eyebrow && (
        <p className="mb-3 text-caption font-medium uppercase tracking-wider text-secondary">{eyebrow}</p>
      )}
      <h1 className="text-h1 text-text-primary">{title}</h1>
      {description && <p className="mt-4 max-w-2xl text-body text-text-secondary">{description}</p>}
    </div>
  );
}
