import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';
import { toBanglaDigits } from './date';

export interface DailyPrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  raw: {
    fajr: Date;
    sunrise: Date;
    dhuhr: Date;
    asr: Date;
    maghrib: Date;
    isha: Date;
  };
  currentPrayer?: string;
  nextPrayer?: string;
  nextPrayerTime?: string;
}

export interface CityCoordinate {
  name: string;
  nameEn: string;
  latitude: number;
  longitude: number;
}

export const BANGLADESH_CITIES: CityCoordinate[] = [
  { name: 'ঢাকা', nameEn: 'Dhaka', latitude: 23.8103, longitude: 90.4125 },
  { name: 'চট্টগ্রাম', nameEn: 'Chittagong', latitude: 22.3569, longitude: 91.7832 },
  { name: 'সিলেট', nameEn: 'Sylhet', latitude: 24.8949, longitude: 91.8687 },
  { name: 'রাজশাহী', nameEn: 'Rajshahi', latitude: 24.3636, longitude: 88.6241 },
  { name: 'খুলনা', nameEn: 'Khulna', latitude: 22.8456, longitude: 89.5403 },
  { name: 'বরিশাল', nameEn: 'Barisal', latitude: 22.7010, longitude: 90.3535 },
  { name: 'রংপুর', nameEn: 'Rangpur', latitude: 25.7439, longitude: 89.2752 },
  { name: 'ময়মনসিংহ', nameEn: 'Mymensingh', latitude: 24.7471, longitude: 90.4203 },
];

export const DEFAULT_COORDINATES = BANGLADESH_CITIES[0]!;

export function formatTime24(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function formatTime12(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedHours = hours.toString().padStart(2, '0');
  return `${formattedHours}:${minutes}`;
}

export function calculatePrayerTimes(
  date: Date = new Date(),
  latitude = DEFAULT_COORDINATES.latitude,
  longitude = DEFAULT_COORDINATES.longitude
): DailyPrayerTimes {
  const coordinates = new Coordinates(latitude, longitude);
  // University of Islamic Sciences, Karachi method - standard across South Asia
  const params = CalculationMethod.Karachi();
  params.madhab = Madhab.Hanafi; // Standard Hanafi Asr calculation

  const pt = new PrayerTimes(coordinates, date, params);

  const raw = {
    fajr: pt.fajr,
    sunrise: pt.sunrise,
    dhuhr: pt.dhuhr,
    asr: pt.asr,
    maghrib: pt.maghrib,
    isha: pt.isha,
  };

  const now = date.getTime();
  let currentPrayer = 'ইশা';
  let nextPrayer = 'ফজর';
  let nextPrayerTime = formatTime12(pt.fajr);

  if (now < pt.fajr.getTime()) {
    currentPrayer = 'তাহাজ্জুদ';
    nextPrayer = 'ফজর';
    nextPrayerTime = formatTime12(pt.fajr);
  } else if (now < pt.sunrise.getTime()) {
    currentPrayer = 'ফজর';
    nextPrayer = 'সূর্যোদয়';
    nextPrayerTime = formatTime12(pt.sunrise);
  } else if (now < pt.dhuhr.getTime()) {
    currentPrayer = 'ইশরাক / চাশত';
    nextPrayer = 'যোহর';
    nextPrayerTime = formatTime12(pt.dhuhr);
  } else if (now < pt.asr.getTime()) {
    currentPrayer = 'যোহর';
    nextPrayer = 'আসর';
    nextPrayerTime = formatTime12(pt.asr);
  } else if (now < pt.maghrib.getTime()) {
    currentPrayer = 'আসর';
    nextPrayer = 'মাগরিব';
    nextPrayerTime = formatTime12(pt.maghrib);
  } else if (now < pt.isha.getTime()) {
    currentPrayer = 'মাগরিব';
    nextPrayer = 'ইশা';
    nextPrayerTime = formatTime12(pt.isha);
  } else {
    currentPrayer = 'ইশা';
    // Tomorrow fajr
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowPt = new PrayerTimes(coordinates, tomorrow, params);
    nextPrayer = 'ফজর';
    nextPrayerTime = formatTime12(tomorrowPt.fajr);
  }

  return {
    fajr: formatTime12(pt.fajr),
    sunrise: formatTime12(pt.sunrise),
    dhuhr: formatTime12(pt.dhuhr),
    asr: formatTime12(pt.asr),
    maghrib: formatTime12(pt.maghrib),
    isha: formatTime12(pt.isha),
    raw,
    currentPrayer,
    nextPrayer,
    nextPrayerTime: toBanglaDigits(nextPrayerTime),
  };
}
