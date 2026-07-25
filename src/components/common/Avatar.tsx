import Image from 'next/image';
import { cn } from '@/utils/cn';

export interface AvatarProps {
  src?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = { sm: 32, md: 40, lg: 56 };

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const px = sizeMap[size];

  if (!src) {
    return (
      <span
        role="img"
        aria-label={name}
        style={{ width: px, height: px }}
        className={cn(
          'inline-flex shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary font-medium',
          size === 'sm' ? 'text-caption' : 'text-small',
          className
        )}
      >
        {getInitials(name)}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={px}
      height={px}
      className={cn('shrink-0 rounded-full object-cover', className)}
    />
  );
}
