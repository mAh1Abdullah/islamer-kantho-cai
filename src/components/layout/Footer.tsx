import Link from 'next/link';
import { Container } from '@/components/common/Container';
import { Divider } from '@/components/common/Divider';
import { site } from '@/constants/site';
import { routes } from '@/constants/routes';
import { toBanglaDigits } from '@/utils/date';
import type { Category } from '@/types/sanity';

export interface FooterProps {
  categories: Category[];
}

export function Footer({ categories }: FooterProps) {
  const year = toBanglaDigits(new Date().getFullYear());

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-12 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="text-h4 font-semibold text-text-primary">{site.name}</span>
            <p className="mt-3 max-w-sm text-body text-text-secondary">{site.tagline}</p>
          </div>

          <div>
            <p className="mb-3 text-caption font-medium uppercase tracking-wider text-text-secondary">
              বিভাগসমূহ
            </p>
            <nav className="flex flex-col gap-2">
              {categories.slice(0, 5).map((c) => (
                <Link
                  key={c._id}
                  href={routes.category(c.slug)}
                  className="text-small text-text-secondary hover:text-primary"
                >
                  {c.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-3 text-caption font-medium uppercase tracking-wider text-text-secondary">
              পাতাসমূহ
            </p>
            <nav className="flex flex-col gap-2">
              <Link href={routes.archive} className="text-small text-text-secondary hover:text-primary">
                আর্কাইভ
              </Link>
              <Link href={routes.search} className="text-small text-text-secondary hover:text-primary">
                সার্চ
              </Link>
            </nav>
          </div>
        </div>

        <Divider variant="ornament" className="my-10" />

        <div className="flex flex-col items-center gap-2 text-caption text-text-secondary sm:flex-row sm:justify-between">
          <p>© {year} {site.name}। সর্বস্বত্ব সংরক্ষিত।</p>
          <p>কারিগরি সহায়তা: {site.nameEn} Tech Team</p>
        </div>
      </Container>
    </footer>
  );
}
