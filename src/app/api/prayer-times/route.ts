import { NextResponse, type NextRequest } from 'next/server';
import { calculatePrayerTimes, DEFAULT_COORDINATES } from '@/utils/prayerTimes';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat')?.trim();
  const lng = searchParams.get('lng')?.trim();

  const parsedLat = lat ? Number.parseFloat(lat) : DEFAULT_COORDINATES.latitude;
  const parsedLng = lng ? Number.parseFloat(lng) : DEFAULT_COORDINATES.longitude;
  const safeLat = Number.isFinite(parsedLat) ? parsedLat : DEFAULT_COORDINATES.latitude;
  const safeLng = Number.isFinite(parsedLng) ? parsedLng : DEFAULT_COORDINATES.longitude;

  try {
    const times = calculatePrayerTimes(new Date(), safeLat, safeLng);
    return NextResponse.json({
      fajr: times.fajr,
      sunrise: times.sunrise,
      dhuhr: times.dhuhr,
      asr: times.asr,
      maghrib: times.maghrib,
      isha: times.isha,
      currentPrayer: times.currentPrayer,
      nextPrayer: times.nextPrayer,
      nextPrayerTime: times.nextPrayerTime,
    });
  } catch {
    return NextResponse.json({ error: 'সময়সূচি গণনা করা যায়নি' }, { status: 500 });
  }
}

