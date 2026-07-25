'use client';

import dynamic from 'next/dynamic';
import { Card } from '@/components/common/Card';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';

function WidgetFallback() {
  return (
    <Card padding="md" className="flex flex-col gap-3">
      <LoadingSkeleton variant="text" className="w-32" />
      <LoadingSkeleton className="h-24 w-full" />
    </Card>
  );
}

/**
 * Both widgets call external time/date APIs and are non-critical to the
 * page's core content, so they're code-split out of the main bundle via
 * `next/dynamic` with `ssr: false` — they render only on the client,
 * after hydration, behind their own skeleton.
 */
export const LazyPrayerWidget = dynamic(
  () => import('./PrayerWidget').then((m) => m.PrayerWidget),
  { ssr: false, loading: WidgetFallback }
);

export const LazyHijriWidget = dynamic(
  () => import('./HijriWidget').then((m) => m.HijriWidget),
  { ssr: false, loading: WidgetFallback }
);
