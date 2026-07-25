'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/common/Card';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { toBanglaDigits } from '@/utils/date';

interface HijriDate {
  day: number;
  monthName: string; // Bangla month name, e.g. "মুহাররম"
  year: number;
}

export function HijriWidget() {
  const [hijri, setHijri] = useState<HijriDate | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/hijri-date')
      .then((res) => {
        if (!res.ok) throw new Error('failed');
        return res.json();
      })
      .then((data: HijriDate) => {
        if (!cancelled) setHijri(data);
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
        <p className="text-small text-text-secondary">হিজরি তারিখ লোড করা যায়নি।</p>
      </Card>
    );
  }

  if (!hijri) {
    return (
      <Card padding="md" className="flex flex-col gap-3">
        <LoadingSkeleton variant="text" className="w-32" />
        <LoadingSkeleton variant="text" className="w-full" />
      </Card>
    );
  }

  return (
    <Card padding="md">
      <h3 className="text-h4">হিজরি তারিখ</h3>
      <p className="mt-3 text-h3 text-primary">
        {toBanglaDigits(hijri.day)} {hijri.monthName}, {toBanglaDigits(hijri.year)} হিজরি
      </p>
    </Card>
  );
}
