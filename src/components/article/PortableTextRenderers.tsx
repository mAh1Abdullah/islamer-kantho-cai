import type { PortableTextComponents } from '@portabletext/react';
import { Image } from '@/components/common/Image';
import { getImageUrl, getBlurDataUrl } from '@/utils/image';
import { slugify } from '@/utils/slug';
import type { SanityImage } from '@/types/sanity';
import { BookOpen, Quote, Info, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';

/**
 * Custom renderers passed to <PortableText components={portableTextComponents} />.
 * Headings get a stable `id` (via slugify) so TableOfContents can deep-link to them.
 */
export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => {
      const headingId = slugify(String(value.children?.[0]?.text ?? 'section'));
      return (
        <h2 id={headingId} className="mt-12 scroll-mt-24 text-h2 text-text-primary">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const headingId = slugify(String(value.children?.[0]?.text ?? 'section'));
      return (
        <h3 id={headingId} className="mt-10 scroll-mt-24 text-h3 text-text-primary">
          {children}
        </h3>
      );
    },
    h4: ({ children, value }) => {
      const headingId = slugify(String(value.children?.[0]?.text ?? 'section'));
      return (
        <h4 id={headingId} className="mt-8 scroll-mt-24 text-h4 text-text-primary">
          {children}
        </h4>
      );
    },
    normal: ({ children }) => <p className="mt-5 text-body leading-relaxed text-text-primary">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-primary bg-primary-tint/30 px-6 py-4 text-body italic text-text-primary rounded-r-lg">
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
      const href = value?.href ?? '#';
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(isExternal && { target: '_blank', rel: 'noopener noreferrer nofollow' })}
          className="text-primary underline underline-offset-2 hover:text-primary-hover font-medium"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold text-text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-border/60 px-1.5 py-0.5 font-mono text-[0.9em] text-primary">{children}</code>
    ),
  },

  types: {
    // Custom Quran Verse block with Arabic script and Bangla translation
    quranVerse: ({ value }: { value: { arabicText?: string; banglaTranslation?: string; surahInfo?: string } }) => (
      <div className="my-8 rounded-xl border border-primary/30 bg-primary-tint/25 p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 text-primary/5 pointer-events-none">
          <BookOpen className="w-32 h-32" />
        </div>
        {value.surahInfo && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{value.surahInfo}</span>
          </div>
        )}
        {value.arabicText && (
          <p
            dir="rtl"
            lang="ar"
            className="text-2xl sm:text-3xl leading-[2.2] font-serif text-right text-text-primary font-medium my-3 select-all"
            style={{ fontFamily: "'Amiri', 'Traditional Arabic', 'Scheherazade', serif" }}
          >
            {value.arabicText}
          </p>
        )}
        {value.banglaTranslation && (
          <div className="mt-4 pt-4 border-t border-primary/20">
            <p className="text-small sm:text-body text-text-secondary leading-relaxed">
              <strong className="text-primary font-semibold">অনুবাদ: </strong>
              {value.banglaTranslation}
            </p>
          </div>
        )}
      </div>
    ),

    // Custom Hadith block with Arabic, Bangla translation, and Source
    hadith: ({ value }: { value: { arabicText?: string; banglaText?: string; narrator?: string; source?: string } }) => (
      <div className="my-8 rounded-xl border border-border bg-surface p-6 shadow-xs relative">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <Sparkles className="w-4 h-4" />
            <span>হাদিস শরিফ</span>
          </div>
          {value.source && (
            <span className="rounded bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary">
              {value.source}
            </span>
          )}
        </div>

        {value.narrator && (
          <p className="text-caption text-text-secondary mb-2 italic">
            হজরত {value.narrator} (রা.) থেকে বর্ণিত:
          </p>
        )}

        {value.arabicText && (
          <p
            dir="rtl"
            lang="ar"
            className="text-xl sm:text-2xl leading-[2] font-serif text-right text-text-primary font-medium my-2"
            style={{ fontFamily: "'Amiri', 'Traditional Arabic', 'Scheherazade', serif" }}
          >
            {value.arabicText}
          </p>
        )}

        {value.banglaText && (
          <p className="mt-3 text-body text-text-primary leading-relaxed border-l-2 border-primary pl-3 italic">
            {value.banglaText}
          </p>
        )}
      </div>
    ),

    // Callout / Alert box
    callout: ({ value }: { value: { text?: string; title?: string; type?: 'info' | 'success' | 'warning' | 'tip' } }) => {
      const type = value.type || 'info';
      const styles = {
        info: {
          bg: 'bg-blue-50/80 dark:bg-blue-950/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-900 dark:text-blue-200',
          icon: <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />,
        },
        success: {
          bg: 'bg-emerald-50/80 dark:bg-emerald-950/20',
          border: 'border-emerald-200 dark:border-emerald-800',
          text: 'text-emerald-900 dark:text-emerald-200',
          icon: <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
        },
        warning: {
          bg: 'bg-amber-50/80 dark:bg-amber-950/20',
          border: 'border-amber-200 dark:border-amber-800',
          text: 'text-amber-900 dark:text-amber-200',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
        },
        tip: {
          bg: 'bg-primary-tint/40',
          border: 'border-primary/30',
          text: 'text-text-primary',
          icon: <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />,
        },
      }[type];

      return (
        <div className={`my-6 flex gap-3.5 rounded-xl border p-4 sm:p-5 ${styles.bg} ${styles.border}`}>
          {styles.icon}
          <div className="space-y-1 text-small">
            {value.title && <h5 className={`font-semibold ${styles.text}`}>{value.title}</h5>}
            {value.text && <p className="text-text-primary leading-relaxed">{value.text}</p>}
          </div>
        </div>
      );
    },

    // Pull quote
    pullQuote: ({ value }: { value: { quote?: string; author?: string } }) => (
      <div className="my-8 text-center px-4 sm:px-12 py-6 border-y border-border">
        <Quote className="w-8 h-8 mx-auto text-primary/40 mb-2" />
        <p className="text-xl sm:text-2xl font-serif italic text-text-primary leading-relaxed">
          {value.quote}
        </p>
        {value.author && (
          <p className="mt-3 text-small font-medium text-text-secondary">— {value.author}</p>
        )}
      </div>
    ),

    image: ({ value }: { value: SanityImage & { caption?: string } }) => (
      <figure className="mt-8">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border">
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

