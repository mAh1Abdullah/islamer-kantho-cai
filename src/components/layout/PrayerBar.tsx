'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/common/Container';
import { toBanglaDigits } from '@/utils/date';
import { cn } from '@/utils/cn';

interface PrayerBarState {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  gregorianDate: string;
  hijriDate: string;
}

const prayerLabels: Array<{ key: keyof Omit<PrayerBarState, 'gregorianDate' | 'hijriDate'>; label: string }> = [
  { key: 'fajr', label: 'ফজর' },
  { key: 'dhuhr', label: 'যোহর' },
  { key: 'asr', label: 'আসর' },
  { key: 'maghrib', label: 'মাগরিব' },
  { key: 'isha', label: 'ইশা' },
];

export function PrayerBar() {
  const [data, setData] = useState<PrayerBarState | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [prayerRes, hijriRes] = await Promise.all([
          fetch('/api/prayer-times'),
          fetch('/api/hijri-date'),
        ]);

        if (!prayerRes.ok || !hijriRes.ok) throw new Error('failed');

        const prayerData = await prayerRes.json();
        const hijriData = await hijriRes.json();

        if (!cancelled) {
          setData({
            ...prayerData,
            gregorianDate: new Date().toLocaleDateString('bn-BD', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
            hijriDate: `${hijriData.day} ${hijriData.monthName}, ${hijriData.year}`,
          });
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="border-b border-border bg-surface/90 backdrop-blur-sm">
      <Container className={cn('flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between')}> 
        <div className="flex flex-wrap items-center gap-3 text-small font-medium text-text-secondary">
          {error ? (
            <span>সময়সূচি আপডেট করা যাচ্ছে না</span>
          ) : data ? (
            prayerLabels.map((item) => (
              <div key={item.key} className="flex items-center gap-2 rounded-full bg-primary-tint px-3 py-1.5">
                <span className="text-text-secondary">{item.label}</span>
                <span className="font-semibold text-primary">{toBanglaDigits(data[item.key])}</span>
              </div>
            ))
          ) : (
            <span>সময়সূচি লোড হচ্ছে…</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-small text-text-secondary">
          <span>{data ? toBanglaDigits(data.gregorianDate) : '—'}</span>
          <span>{data ? toBanglaDigits(data.hijriDate) : '—'}</span>
        </div>
      </Container>
    </div>
  );
}
