'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/common/Card';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { toBanglaDigits } from '@/utils/date';

interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

const prayerLabels: Record<keyof PrayerTimes, string> = {
  fajr: 'ফজর',
  dhuhr: 'যোহর',
  asr: 'আসর',
  maghrib: 'মাগরিব',
  isha: 'ইশা',
};

/**
 * Lazy-loaded (see LazyWidgets.tsx) so the prayer-time API call never
 * blocks the home page's initial render or LCP.
 */
export function PrayerWidget() {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/prayer-times')
      .then((res) => {
        if (!res.ok) throw new Error('failed');
        return res.json();
      })
      .then((data: PrayerTimes) => {
        if (!cancelled) setTimes(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <Card padding="md">
        <p className="text-small text-text-secondary">নামাজের সময় লোড করা যায়নি।</p>
      </Card>
    );
  }

  if (!times) {
    return (
      <Card padding="md" className="flex flex-col gap-3">
        <LoadingSkeleton variant="text" className="w-32" />
        {Array.from({ length: 5 }).map((_, i) => (
          <LoadingSkeleton key={i} variant="text" className="w-full" />
        ))}
      </Card>
    );
  }

  return (
    <Card padding="md" as="div">
      <h3 className="text-h4">নামাজের সময়সূচি</h3>
      <ul className="mt-4 flex flex-col divide-y divide-border">
        {(Object.keys(prayerLabels) as (keyof PrayerTimes)[]).map((key) => (
          <li key={key} className="flex items-center justify-between py-2 text-body">
            <span className="text-text-secondary">{prayerLabels[key]}</span>
            <span className="font-medium text-text-primary">{toBanglaDigits(times[key])}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
