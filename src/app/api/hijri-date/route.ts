import { NextResponse } from 'next/server';
import { gregorianToHijri } from '@/utils/hijri';

export const revalidate = 3600; // recompute at most hourly — the date only changes once a day anyway

export async function GET() {
  try {
    const hijri = gregorianToHijri(new Date());
    return NextResponse.json(hijri);
  } catch {
    return NextResponse.json({ error: 'তারিখ আনা যায়নি' }, { status: 500 });
  }
}
