const hijriMonthsBangla = [
  'মুহাররম', 'সফর', 'রবিউল আউয়াল', 'রবিউস সানি',
  'জমাদিউল আউয়াল', 'জমাদিউস সানি', 'রজব', 'শাবান',
  'রমজান', 'শাওয়াল', 'জিলকদ', 'জিলহজ',
];

export interface HijriDate {
  day: number;
  month: number; // 1-12
  monthName: string;
  year: number;
}

/**
 * Converts a Gregorian date to the Hijri calendar using the tabular
 * (arithmetic) Islamic calendar — the same civil approximation used by
 * most software calendars. It's a fixed calculation, not a moon
 * sighting, so it can be off by a day from local moon-sighting
 * announcements around month boundaries; that's a known, accepted
 * limitation of every non-sighting-based Hijri calendar.
 */
export function gregorianToHijri(date: Date): HijriDate {
  const jd = gregorianToJulianDay(date);
  return julianDayToHijri(jd);
}

function gregorianToJulianDay(date: Date): number {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  const a = Math.floor((14 - m) / 12);
  const y2 = y + 4800 - a;
  const m2 = m + 12 * a - 3;

  return (
    d +
    Math.floor((153 * m2 + 2) / 5) +
    365 * y2 +
    Math.floor(y2 / 4) -
    Math.floor(y2 / 100) +
    Math.floor(y2 / 400) -
    32045
  );
}

function julianDayToHijri(jd: number): HijriDate {
  const islamicEpoch = 1948440; // JD of 1 Muharram, AH 1
  const daysSinceEpoch = jd - islamicEpoch + 1;

  // 30-year cycle of 10631 days, with 11 leap years per cycle (tabular calendar).
  const cycle = Math.floor((daysSinceEpoch - 1) / 10631);
  let dayInCycle = daysSinceEpoch - cycle * 10631;
  let year = cycle * 30 + 1;

  // Walk year-by-year within the cycle to find the exact Hijri year.
  while (true) {
    const yearLength = isHijriLeapYear(year) ? 355 : 354;
    if (dayInCycle <= yearLength) break;
    dayInCycle -= yearLength;
    year += 1;
  }

  const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, isHijriLeapYear(year) ? 30 : 29];

  let month = 0;
  let dayInMonth = dayInCycle;
  for (const length of monthLengths) {
    if (dayInMonth <= length) break;
    dayInMonth -= length;
    month += 1;
  }

  return { day: dayInMonth, month: month + 1, monthName: hijriMonthsBangla[month] ?? '', year };
}

function isHijriLeapYear(year: number): boolean {
  // Standard 30-year tabular cycle leap years (11 of 30).
  return [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29].includes(((year - 1) % 30) + 1);
}
