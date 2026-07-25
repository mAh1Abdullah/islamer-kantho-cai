import { slugify } from '@/utils/slug';
import type { PortableTextBlock } from '@/types/sanity';

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Pulls h2/h3 blocks out of the article body to build the TOC entries. */
export function extractToc(body: PortableTextBlock[]): TocEntry[] {
  return body
    .filter((block) => block._type === 'block' && (block.style === 'h2' || block.style === 'h3'))
    .map((block) => {
      const children = block.children as Array<{ text?: string }> | undefined;
      const text = children?.map((c) => c.text ?? '').join('') ?? '';
      return { id: slugify(text), text, level: block.style === 'h2' ? 2 : 3 } as TocEntry;
    })
    .filter((entry) => entry.text.length > 0);
}

export interface TableOfContentsProps {
  entries: TocEntry[];
}

export function TableOfContents({ entries }: TableOfContentsProps) {
  if (entries.length === 0) return null;

  return (
    <nav aria-label="সূচিপত্র" className="rounded-lg border border-border p-5">
      <p className="text-caption font-medium uppercase tracking-wider text-text-secondary">সূচিপত্র</p>
      <ul className="mt-3 flex flex-col gap-2">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? 'pl-4' : ''}>
            <a href={`#${entry.id}`} className="text-small text-text-secondary hover:text-primary">
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
