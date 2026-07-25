import Link from 'next/link';
import { Image } from '@/components/common/Image';
import { CategoryChip } from '@/components/common/CategoryChip';
import { ArticleMeta } from '@/components/common/ArticleMeta';
import { getImageUrl, getBlurDataUrl } from '@/utils/image';
import { routes } from '@/constants/routes';
import type { PostSummary } from '@/types/sanity';

export interface HeroBannerProps {
  post: PostSummary;
}

export function HeroBanner({ post }: HeroBannerProps) {
  return (
    <section className="relative flex h-[520px] w-full items-end overflow-hidden sm:h-[600px] lg:h-[680px]">
      <Image
        src={getImageUrl(post.coverImage, 1600)}
        alt={post.coverImage.alt ?? post.title}
        fill
        priority
        placeholder="blur"
        blurDataURL={getBlurDataUrl(post.coverImage)}
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark overlay: gradient, not a flat tint, so the top nav stays readable while the title still pops */}
      <div className="absolute inset-0 bg-gradient-to-t from-text-primary/85 via-text-primary/30 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-container px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <CategoryChip label={post.category.title} slug={post.category.slug} className="bg-secondary text-primary" />
        <h1 className="mt-4 max-w-2xl text-h2 leading-tight text-white lg:text-hero">
          <Link href={routes.article(post.slug)} className="hover:underline">
            {post.title}
          </Link>
        </h1>
        {post.excerpt && (
          <p className="mt-4 max-w-xl text-body text-white/85">{post.excerpt}</p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <ArticleMeta author={post.author} publishedAt={post.publishedAt} className="[&_span]:text-white/75 [&_a]:text-white" />
          <Link
            href={routes.article(post.slug)}
            className="inline-flex h-11 items-center justify-center rounded-md bg-secondary px-6 text-body font-medium text-primary transition-colors duration-200 ease-calm hover:bg-secondary/80"
          >
            পুরো পড়ুন
          </Link>
        </div>
      </div>
    </section>
  );
}
