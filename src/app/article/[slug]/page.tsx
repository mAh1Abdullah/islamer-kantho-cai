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
import { portableTextComponents } from '@/components/article/PortableTextRenderers';
import { TableOfContents, extractToc } from '@/components/article/TableOfContents';
import { getPostBySlug, getRelatedPosts } from '@/lib/sanity/posts';
import { getImageUrl, getBlurDataUrl } from '@/utils/image';
import { estimateReadingTime } from '@/utils/readingTime';
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

  return (
    <main>
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

      <div className="relative h-[320px] w-full overflow-hidden sm:h-[420px] lg:h-[480px]">
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
          <CategoryChip label={post.category.title} slug={post.category.slug} />
          <h1 className="mt-4 text-h1 leading-tight text-text-primary">{post.title}</h1>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <ArticleMeta author={post.author} publishedAt={post.publishedAt} readingTime={readingTime} avatarSize="md" />
            <ShareButtons url={articleUrl} title={post.title} />
          </div>

          {updated && (
            <p className="mt-2 text-caption text-text-secondary">
              হালনাগাদ: {formatBanglaDate(post.updatedAt as string)}
            </p>
          )}
        </Container>
      </Section>

      <Container narrow>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents entries={toc} />
              </div>
            </aside>
          )}

          <article className={toc.length > 0 ? '' : 'lg:col-span-2'}>
            {toc.length > 0 && (
              <div className="mb-8 lg:hidden">
                <TableOfContents entries={toc} />
              </div>
            )}
            <PortableText value={post.body} components={portableTextComponents} />
          </article>
        </div>
      </Container>

      {related.length > 0 && (
        <Section>
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

      <Section tone="surface">
        <Container narrow>
          <Newsletter />
        </Container>
      </Section>
    </main>
  );
}
