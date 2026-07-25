const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/** Converts ASCII digits in a string to Bangla numerals. */
export function toBanglaDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => banglaDigits[Number(d)] ?? d);
}

const banglaMonths = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
];

/** Formats an ISO date string as "২৩ জুলাই, ২০২৬" (Bangla). */
export function formatBanglaDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = toBanglaDigits(date.getDate());
  const month = banglaMonths[date.getMonth()];
  const year = toBanglaDigits(date.getFullYear());
  return `${day} ${month}, ${year}`;
}

/** Returns true if the article was updated meaningfully after publish (>1 hour). */
export function wasUpdated(publishedIso: string, updatedIso?: string): boolean {
  if (!updatedIso) return false;
  return new Date(updatedIso).getTime() - new Date(publishedIso).getTime() > 60 * 60 * 1000;
}
