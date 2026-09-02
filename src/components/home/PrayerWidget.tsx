'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/common/Card';
import { toBanglaDigits } from '@/utils/date';
import { calculatePrayerTimes, BANGLADESH_CITIES, type DailyPrayerTimes } from '@/utils/prayerTimes';
import { cn } from '@/utils/cn';
import { Clock, MapPin } from 'lucide-react';

const prayerLabels: Array<{ key: keyof Pick<DailyPrayerTimes, 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'>; label: string }> = [
  { key: 'fajr', label: 'ফজর' },
  { key: 'dhuhr', label: 'যোহর' },
  { key: 'asr', label: 'আসর' },
  { key: 'maghrib', label: 'মাগরিব' },
  { key: 'isha', label: 'ইশা' },
];

export function PrayerWidget() {
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const activeCity = BANGLADESH_CITIES[selectedCityIndex] ?? BANGLADESH_CITIES[0]!;

  const times = useMemo(() => {
    return calculatePrayerTimes(new Date(), activeCity.latitude, activeCity.longitude);
  }, [activeCity]);

  return (
    <Card padding="md" as="div" className="border-border">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <h3 className="text-h4 font-semibold text-text-primary">নামাজের সময়সূচি</h3>
        </div>
        <div className="flex items-center gap-1 text-caption text-text-secondary">
          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
          <select
            value={selectedCityIndex}
            onChange={(e) => setSelectedCityIndex(Number(e.target.value))}
            className="bg-transparent text-xs font-medium text-text-primary focus:outline-none cursor-pointer border-none"
            aria-label="শহর নির্বাচন"
          >
            {BANGLADESH_CITIES.map((city, idx) => (
              <option key={city.nameEn} value={idx}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className="mt-2 flex flex-col divide-y divide-border/60">
        {prayerLabels.map((item) => {
          const isNext = times.nextPrayer === item.label;
          return (
            <li
              key={item.key}
              className={cn(
                'flex items-center justify-between py-2.5 px-2 rounded-md transition-colors text-body',
                isNext ? 'bg-primary-tint font-medium text-primary' : 'text-text-secondary'
              )}
            >
              <div className="flex items-center gap-2">
                <span>{item.label}</span>
                {isNext && (
                  <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    পরবর্তী
                  </span>
                )}
              </div>
              <span className={cn('font-semibold', isNext ? 'text-primary' : 'text-text-primary')}>
                {toBanglaDigits(times[item.key])}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

