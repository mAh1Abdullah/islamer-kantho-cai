import { urlForImage } from '@/lib/sanity/client';
import type { SanityImage } from '@/types/sanity';

/** Sharp, sized Sanity CDN URL for use as an <Image> `src`. */
export function getImageUrl(image: SanityImage, width: number, height?: number): string {
  const builder = urlForImage(image);
  if (!builder) return '';

  let sizedBuilder = builder.width(width).auto('format').quality(80);
  if (height) sizedBuilder = sizedBuilder.height(height);
  return sizedBuilder.url();
}

/** Tiny (20px-wide) blurred version of the same image for `placeholder="blur"`. */
export function getBlurDataUrl(image: SanityImage): string {
  const builder = urlForImage(image);
  if (!builder) return '';
  return builder.width(20).blur(50).quality(30).url();
}
