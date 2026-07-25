import { cn } from '@/utils/cn';

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn('flex flex-col items-center gap-3 py-16 text-center', className)}
    >
      {icon && <div className="text-text-secondary">{icon}</div>}
      <p className="text-h4 text-text-primary">{title}</p>
      {description && <p className="max-w-sm text-body text-text-secondary">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
