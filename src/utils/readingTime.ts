import { toBanglaDigits } from './date';
import type { PortableTextBlock } from '@/types/sanity';

const WORDS_PER_MINUTE = 200;

/**
 * Estimates reading time from Portable Text blocks (or plain text).
 * Returns a Bangla-formatted label, e.g. "৫ মিনিট পড়া".
 */
export function estimateReadingTime(content: PortableTextBlock[] | string): string {
  const text =
    typeof content === 'string'
      ? content
      : content
          .filter((block) => block._type === 'block')
          .flatMap((block) => {
            const children = block.children;
            if (!Array.isArray(children)) return [];
            return children.map((child) =>
              typeof child === 'object' && child !== null && 'text' in child
                ? String((child as { text?: unknown }).text ?? '')
                : ''
            );
          })
          .join(' ');

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

  return `${toBanglaDigits(minutes)} মিনিট পড়া`;
}
