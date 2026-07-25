import type { PortableTextComponents } from '@portabletext/react';
import { Image } from '@/components/common/Image';
import { getImageUrl, getBlurDataUrl } from '@/utils/image';
import { slugify } from '@/utils/slug';
import type { SanityImage } from '@/types/sanity';

/**
 * Custom renderers passed to <PortableText components={portableTextComponents} />.
 * Replaces the deprecated @sanity/block-content-to-react per the migration plan.
 * Headings get a stable `id` (via slugify) so TableOfContents can deep-link to them.
 */
export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2 id={slugify(String(value.children?.[0]?.text ?? ''))} className="mt-12 scroll-mt-24 text-h2 text-text-primary">
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={slugify(String(value.children?.[0]?.text ?? ''))} className="mt-10 scroll-mt-24 text-h3 text-text-primary">
        {children}
      </h3>
    ),
    h4: ({ children, value }) => (
      <h4 id={slugify(String(value.children?.[0]?.text ?? ''))} className="mt-8 scroll-mt-24 text-h4 text-text-primary">
        {children}
      </h4>
    ),
    normal: ({ children }) => <p className="mt-5 text-body leading-relaxed text-text-primary">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-secondary bg-secondary-tint px-6 py-4 text-body italic text-text-primary">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-body text-text-primary">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-body text-text-primary">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  marks: {
    link: ({ children, value }) => {
      const isExternal = /^https?:\/\//.test(value?.href ?? '');
      return (
        <a
          href={value?.href}
          {...(isExternal && { target: '_blank', rel: 'noopener noreferrer nofollow' })}
          className="text-primary underline underline-offset-2 hover:text-primary-hover"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-border/60 px-1.5 py-0.5 font-mono text-[0.9em]">{children}</code>
    ),
  },

  types: {
    image: ({ value }: { value: SanityImage & { caption?: string } }) => (
      <figure className="mt-8">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
          <Image
            src={getImageUrl(value, 1200)}
            alt={value.alt ?? ''}
            fill
            placeholder="blur"
            blurDataURL={getBlurDataUrl(value)}
            sizes="(max-width: 768px) 100vw, 760px"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-2 text-center text-small text-text-secondary">{value.caption}</figcaption>
        )}
      </figure>
    ),

    code: ({ value }: { value: { code: string; language?: string; filename?: string } }) => (
      <div className="mt-6 overflow-hidden rounded-lg border border-border">
        {value.filename && (
          <div className="border-b border-border bg-background px-4 py-2 text-caption text-text-secondary">
            {value.filename}
          </div>
        )}
        <pre className="overflow-x-auto bg-text-primary p-4 text-small text-white">
          <code>{value.code}</code>
        </pre>
      </div>
    ),

    youtube: ({ value }: { value: { videoId: string; title?: string } }) => (
      <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${value.videoId}`}
          title={value.title ?? 'YouTube video'}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    ),
  },
};
