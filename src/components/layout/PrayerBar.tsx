'use client';

import { useEffect, useState, useMemo } from 'react';
import { Container } from '@/components/common/Container';
import { toBanglaDigits, formatBanglaDate } from '@/utils/date';
import { gregorianToHijri } from '@/utils/hijri';
import { calculatePrayerTimes, BANGLADESH_CITIES, type DailyPrayerTimes } from '@/utils/prayerTimes';
import { cn } from '@/utils/cn';
import { MapPin, Clock } from 'lucide-react';

const prayerList: Array<{ key: keyof Pick<DailyPrayerTimes, 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'>; label: string }> = [
  { key: 'fajr', label: 'ফজর' },
  { key: 'dhuhr', label: 'যোহর' },
  { key: 'asr', label: 'আসর' },
  { key: 'maghrib', label: 'মাগরিব' },
  { key: 'isha', label: 'ইশা' },
];

export function PrayerBar() {
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [now, setNow] = useState<Date | null>(null);

  // Initialize and tick every minute
  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const activeCity = BANGLADESH_CITIES[selectedCityIndex] ?? BANGLADESH_CITIES[0]!;

  const prayerData = useMemo(() => {
    if (!now) return null;
    return calculatePrayerTimes(now, activeCity.latitude, activeCity.longitude);
  }, [now, activeCity]);

  const hijriString = useMemo(() => {
    if (!now) return '';
    const h = gregorianToHijri(now);
    return `${toBanglaDigits(h.day)} ${h.monthName}, ${toBanglaDigits(h.year)} হিজরি`;
  }, [now]);

  const gregorianString = useMemo(() => {
    if (!now) return '';
    return formatBanglaDate(now.toISOString());
  }, [now]);

  return (
    <div className="border-b border-border bg-surface/95 backdrop-blur-sm print:hidden">
      <Container className="flex flex-col gap-2.5 py-2.5 text-small lg:flex-row lg:items-center lg:justify-between">
        {/* Prayer Times list */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-medium">
          {/* City selector dropdown */}
          <div className="flex items-center gap-1 text-text-secondary pr-1">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
            <select
              aria-label="নামাজের স্থান নির্বাচন করুন"
              value={selectedCityIndex}
              onChange={(e) => setSelectedCityIndex(Number(e.target.value))}
              className="bg-transparent text-xs font-semibold text-text-primary focus:outline-none cursor-pointer border-none py-0.5"
            >
              {BANGLADESH_CITIES.map((city, idx) => (
                <option key={city.nameEn} value={idx} className="bg-surface text-text-primary">
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-border hidden sm:block" />

          {/* Prayer badges */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {prayerData ? (
              prayerList.map((item) => {
                const isNext = prayerData.nextPrayer === item.label;
                return (
                  <div
                    key={item.key}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-colors',
                      isNext
                        ? 'bg-primary text-white font-medium shadow-xs ring-1 ring-primary/30'
                        : 'bg-primary-tint/80 text-text-secondary hover:bg-primary-tint'
                    )}
                  >
                    <span className={isNext ? 'text-white/90' : 'text-text-secondary'}>{item.label}</span>
                    <span className={cn('font-semibold', isNext ? 'text-white' : 'text-primary')}>
                      {toBanglaDigits(prayerData[item.key])}
                    </span>
                  </div>
                );
              })
            ) : (
              <span className="text-xs text-text-secondary">সময়সূচি লোড হচ্ছে…</span>
            )}
          </div>

          {prayerData?.nextPrayer && (
            <div className="hidden xl:flex items-center gap-1 text-caption text-text-secondary bg-background/80 rounded-full px-2 py-0.5 border border-border">
              <Clock className="h-3 w-3 text-primary" />
              <span>পরবর্তী ওয়াক্ত: <strong className="text-text-primary">{prayerData.nextPrayer} ({prayerData.nextPrayerTime})</strong></span>
            </div>
          )}
        </div>

        {/* Date strings */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-text-secondary">
          <span>{gregorianString || '—'}</span>
          <span className="text-border hidden sm:inline">•</span>
          <span className="text-primary font-medium">{hijriString || '—'}</span>
        </div>
      </Container>
    </div>
  );
}

