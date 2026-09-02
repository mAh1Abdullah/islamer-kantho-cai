import type { PortableTextBlock, Post } from '@/types/sanity';

/**
 * Extracts clean, speakable text from a Post and its Portable Text blocks.
 * Returns an array of paragraph-sized chunks for smooth speech synthesis queueing.
 */
export function extractArticleTextChunks(post: Pick<Post, 'title' | 'excerpt' | 'body'>): string[] {
  const chunks: string[] = [];

  if (post.title?.trim()) {
    chunks.push(post.title.trim());
  }

  if (post.excerpt?.trim()) {
    chunks.push(post.excerpt.trim());
  }

  if (Array.isArray(post.body)) {
    for (const block of post.body) {
      if (!block || typeof block !== 'object') continue;

      if (block._type === 'block') {
        const children = block.children;
        if (Array.isArray(children)) {
          const text = children
            .map((c) => (typeof c === 'object' && c !== null && 'text' in c ? String((c as { text?: unknown }).text ?? '') : ''))
            .join('')
            .trim();
          if (text) chunks.push(text);
        }
      } else if (block._type === 'quranVerse') {
        const arabic = typeof block.arabicText === 'string' ? block.arabicText.trim() : '';
        const bangla = typeof block.banglaTranslation === 'string' ? block.banglaTranslation.trim() : '';
        const surah = typeof block.surahInfo === 'string' ? block.surahInfo.trim() : '';
        const combined = [arabic, bangla, surah].filter(Boolean).join('। ');
        if (combined) chunks.push(combined);
      } else if (block._type === 'hadith') {
        const arabic = typeof block.arabicText === 'string' ? block.arabicText.trim() : '';
        const bangla = typeof block.banglaText === 'string' ? block.banglaText.trim() : '';
        const source = typeof block.source === 'string' ? block.source.trim() : '';
        const combined = [arabic, bangla, source].filter(Boolean).join('। ');
        if (combined) chunks.push(combined);
      } else if (block._type === 'callout') {
        const text = typeof block.text === 'string' ? block.text.trim() : '';
        if (text) chunks.push(text);
      }
    }
  }

  return chunks.filter((c) => c.length > 0);
}
