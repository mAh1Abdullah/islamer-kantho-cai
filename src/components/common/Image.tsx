import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { cn } from '@/utils/cn';

export interface ImageProps extends Omit<NextImageProps, 'alt'> {
  /** Required — every image in the app must have real alt text (empty string only for pure decoration). */
  alt: string;
}

/**
 * Wraps next/image so every usage goes through one place. Defaults
 * `sizes` to a sensible responsive value when the caller doesn't
 * override it — pass your own `sizes` for anything that isn't a
 * roughly full-width/card image.
 */
export function Image({ className, sizes, alt, ...props }: ImageProps) {
  return (
    <NextImage
      alt={alt}
      sizes={sizes ?? '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'}
      className={cn('object-cover', className)}
      {...props}
    />
  );
}
