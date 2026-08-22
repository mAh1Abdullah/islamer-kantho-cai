import { urlForImage } from '@/lib/sanity/client';
import type { SanityImage } from '@/types/sanity';

const FALLBACK_IMAGES: Record<string, string> = {
  'image-ramadan-1': 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80',
  'image-tawheed-2': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
  'image-seerat-3': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80',
  'image-tafsir-4': 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80',
  'image-economy-5': 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&q=80',
  'image-tazkiyah-6': 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80',
};

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80';

// 1x1 neutral transparent blur placeholder
const DEFAULT_BLUR_DATA_URL = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=';

/** Sharp, sized Sanity CDN URL or fallback for use as an <Image> `src`. */
export function getImageUrl(image?: SanityImage | null, width = 800, height?: number): string {
  if (!image) return `${DEFAULT_FALLBACK}&w=${width}${height ? `&h=${height}` : ''}`;
  
  if ((image as unknown as { url?: string }).url) {
    return (image as unknown as { url: string }).url;
  }

  const ref = image.asset?._ref;
  if (ref && FALLBACK_IMAGES[ref]) {
    return `${FALLBACK_IMAGES[ref]}&w=${width}${height ? `&h=${height}` : ''}`;
  }

  const builder = urlForImage(image);
  if (!builder) {
    return `${DEFAULT_FALLBACK}&w=${width}${height ? `&h=${height}` : ''}`;
  }

  let sizedBuilder = builder.width(width).auto('format').quality(80);
  if (height) sizedBuilder = sizedBuilder.height(height);
  const url = sizedBuilder.url();
  return url || `${DEFAULT_FALLBACK}&w=${width}${height ? `&h=${height}` : ''}`;
}

/** Tiny blurred version of the image for `placeholder="blur"`. */
export function getBlurDataUrl(image?: SanityImage | null): string {
  if (!image) return DEFAULT_BLUR_DATA_URL;

  const builder = urlForImage(image);
  if (!builder) return DEFAULT_BLUR_DATA_URL;
  try {
    const url = builder.width(20).blur(50).quality(30).url();
    return url || DEFAULT_BLUR_DATA_URL;
  } catch {
    return DEFAULT_BLUR_DATA_URL;
  }
}
