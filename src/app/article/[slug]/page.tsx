import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { Image } from '@/components/common/Image';
import { CategoryChip } from '@/components/common/CategoryChip';
import { ArticleMeta } from '@/components/common/ArticleMeta';
import { ShareButtons } from '@/components/common/ShareButtons';
import { Newsletter } from '@/components/common/Newsletter';
import { Divider } from '@/components/common/Divider';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ArticleCard } from '@/components/article/ArticleCard';
import { PrintButton } from '@/components/article/PrintButton';
import { ReadingProgressBar } from '@/components/article/ReadingProgressBar';
import { AudioReader } from '@/components/article/AudioReader';
import { portableTextComponents } from '@/components/article/PortableTextRenderers';
import { TableOfContents, extractToc } from '@/components/article/TableOfContents';
import { getPostBySlug, getRelatedPosts } from '@/lib/sanity/posts';
import { getImageUrl, getBlurDataUrl } from '@/utils/image';
import { estimateReadingTime } from '@/utils/readingTime';
import { extractArticleTextChunks } from '@/utils/textExtractor';
import { formatBanglaDate, wasUpdated } from '@/utils/date';
import { site } from '@/constants/site';
import { routes } from '@/constants/routes';
import { buildMetadata, JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/components/common/SEO';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return buildMetadata({ noIndex: true });

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: routes.article(post.slug),
    image: getImageUrl(post.coverImage, 1200, 630),
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authorName: post.author.name,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const [related, readingTime] = await Promise.all([
    getRelatedPosts(post._id, post.category.slug, 3),
    Promise.resolve(estimateReadingTime(post.body)),
  ]);

  const toc = extractToc(post.body);
  const articleUrl = `${site.url}${routes.article(post.slug)}`;
  const updated = wasUpdated(post.publishedAt, post.updatedAt);
  const textChunks = extractArticleTextChunks(post);

  return (
    <main>
      <ReadingProgressBar />

      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt ?? '',
          path: routes.article(post.slug),
          image: getImageUrl(post.coverImage, 1200, 630),
          publishedTime: post.publishedAt,
          modifiedTime: post.updatedAt,
          authorName: post.author.name,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'হোম', path: routes.home },
          { name: post.category.title, path: routes.category(post.category.slug) },
          { name: post.title, path: routes.article(post.slug) },
        ])}
      />

      {/* Print only header */}
      <div className="hidden print-header">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-primary">{site.name}</h2>
            <p className="text-xs text-gray-500">{site.tagline}</p>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p>{site.url}</p>
            <p>{formatBanglaDate(new Date().toISOString())}</p>
          </div>
        </div>
      </div>

      <div className="relative h-[320px] w-full overflow-hidden sm:h-[420px] lg:h-[480px] print:h-[260px] print:mb-6">
        <Image
          src={getImageUrl(post.coverImage, 1600)}
          alt={post.coverImage.alt ?? post.title}
          fill
          priority
          placeholder="blur"
          blurDataURL={getBlurDataUrl(post.coverImage)}
          sizes="100vw"
        />
      </div>

      <Section spacing="tight">
        <Container narrow>
          <div className="print:hidden">
            <CategoryChip label={post.category.title} slug={post.category.slug} />
          </div>
          <div className="hidden print:block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            {post.category.title}
          </div>
          
          <h1 className="mt-4 text-h1 leading-tight text-text-primary print:text-2xl print:mt-1">{post.title}</h1>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 print:mt-3 print:border-b print:border-gray-200 print:pb-3">
            <ArticleMeta author={post.author} publishedAt={post.publishedAt} readingTime={readingTime} avatarSize="md" />
            <div className="flex items-center gap-3">
              <PrintButton variant="button" />
              <ShareButtons url={articleUrl} title={post.title} />
            </div>
          </div>

          {updated && (
            <p className="mt-2 text-caption text-text-secondary print:text-xs">
              হালনাগাদ: {formatBanglaDate(post.updatedAt as string)}
            </p>
          )}

          <AudioReader title={post.title} chunks={textChunks} className="mt-6" />
        </Container>
      </Section>

      <Container narrow>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr] print:block">
          {toc.length > 0 && (
            <aside className="hidden lg:block print:hidden toc-container">
              <div className="sticky top-24">
                <TableOfContents entries={toc} />
              </div>
            </aside>
          )}

          <article className={toc.length > 0 ? 'print:w-full' : 'lg:col-span-2 print:w-full'}>
            {toc.length > 0 && (
              <div className="mb-8 lg:hidden print:hidden toc-container">
                <TableOfContents entries={toc} />
              </div>
            )}
            <PortableText value={post.body} components={portableTextComponents} />
          </article>
        </div>
      </Container>

      {/* Print only footer */}
      <div className="hidden print-footer">
        <p>উৎস: {articleUrl}</p>
        <p>© {site.name} — সকল স্বত্ব সংরক্ষিত।</p>
      </div>

      {related.length > 0 && (
        <Section className="related-articles print:hidden">
          <Container narrow>
            <Divider variant="ornament" className="mb-10" />
            <SectionHeading eyebrow="সম্পর্কিত" title="আরও পড়ুন" />
            <div className="mt-8 flex flex-col gap-4">
              {related.map((relatedPost) => (
                <ArticleCard key={relatedPost._id} post={relatedPost} variant="horizontal" />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="surface" className="newsletter-section print:hidden">
        <Container narrow>
          <Newsletter />
        </Container>
      </Section>
    </main>
  );
}

