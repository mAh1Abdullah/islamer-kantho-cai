import { NextResponse, type NextRequest } from 'next/server';

// Default to Dhaka, Bangladesh — the site's primary audience — when the
// client doesn't provide (or hasn't yet resolved) a geolocation.
const DEFAULT_LAT = 23.8103;
const DEFAULT_LNG = 90.4125;

// Aladhan calculation method 1 = University of Islamic Sciences, Karachi —
// the convention most commonly used across Bangladesh and South Asia.
// See https://aladhan.com/calculation-methods for the full list; expose
// `?method=` if a future settings page needs to let users choose theirs.
const DEFAULT_METHOD = 1;

interface AladhanResponse {
  data: {
    timings: Partial<Record<'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha', string>>;
  };
}

/**
 * Deliberately proxies a real, authoritative prayer-time provider rather
 * than computing sun-angle astronomy locally: prayer times are a
 * religious-observance feature where a subtle formula bug would be a
 * real-world harm, and calculation *method* (angle conventions) varies
 * by regional authority in ways a generic formula can't get right
 * without that context anyway. Aladhan is deliberately configurable via
 * `method` for exactly that reason.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') ?? String(DEFAULT_LAT);
  const lng = searchParams.get('lng') ?? String(DEFAULT_LNG);
  const method = searchParams.get('method') ?? String(DEFAULT_METHOD);

  try {
    const upstream = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${method}`,
      { next: { revalidate: 3600 } } // prayer times only change daily; hourly revalidation is generous
    );

    if (!upstream.ok) {
      return NextResponse.json({ error: 'সময়সূচি আনা যায়নি' }, { status: 502 });
    }

    const body: AladhanResponse = await upstream.json();
    const t = body.data.timings;

    // Aladhan returns e.g. "04:12 (+06)" — strip the timezone suffix, keep HH:mm.
    const clean = (value?: string) => value?.split(' ')[0] ?? '';

    return NextResponse.json({
      fajr: clean(t.Fajr),
      dhuhr: clean(t.Dhuhr),
      asr: clean(t.Asr),
      maghrib: clean(t.Maghrib),
      isha: clean(t.Isha),
    });
  } catch {
    return NextResponse.json({ error: 'সময়সূচি আনা যায়নি' }, { status: 502 });
  }
}
