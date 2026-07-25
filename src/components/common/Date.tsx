import { formatBanglaDate } from '@/utils/date';

export interface DateProps {
  iso: string;
  className?: string;
}

export function Date({ iso, className }: DateProps) {
  return (
    <time dateTime={iso} className={className}>
      {formatBanglaDate(iso)}
    </time>
  );
}
