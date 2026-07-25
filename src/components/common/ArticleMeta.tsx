import Link from 'next/link';
import { Avatar } from './Avatar';
import { Date as ArticleDate } from './Date';
import { cn } from '@/utils/cn';
import { routes } from '@/constants/routes';
import type { Author } from '@/types/sanity';

export interface ArticleMetaProps {
  author: Author;
  publishedAt: string;
  readingTime?: string;
  avatarSize?: 'sm' | 'md';
  className?: string;
}

export function ArticleMeta({ author, publishedAt, readingTime, avatarSize = 'sm', className }: ArticleMetaProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Avatar name={author.name} size={avatarSize} />
      <div className="flex flex-col text-small leading-tight">
        <Link href={routes.author(author.slug)} className="font-medium text-text-primary hover:text-primary">
          {author.name}
        </Link>
        <span className="text-text-secondary">
          <ArticleDate iso={publishedAt} />
          {readingTime && <> · {readingTime}</>}
        </span>
      </div>
    </div>
  );
}
