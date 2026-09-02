import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_GALLERY_ITEMS } from '@/lib/galleryData';
import { GalleryItem } from '@/types/gallery';

let serverGalleryItems: GalleryItem[] = [...INITIAL_GALLERY_ITEMS];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let results = [...serverGalleryItems];

  if (category && category !== 'all') {
    results = results.filter((item) => item.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    items: results,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category, imageUrl, location, photographer, description, tags, country } = body;

    if (!title || !imageUrl || !location) {
      return NextResponse.json(
        { success: false, error: 'শিরোনাম, ইমেজ ও স্থান আবশ্যক।' },
        { status: 400 }
      );
    }

    const newItem: GalleryItem = {
      id: `api-photo-${Date.now()}`,
      title: title.trim(),
      category: category || 'mosques',
      categoryLabel: category === 'haramain' ? 'পবিত্র হারামাইন' : 'ঐতিহাসিক মসজিদ',
      imageUrl: imageUrl.trim(),
      thumbnailUrl: imageUrl.trim(),
      location: location.trim(),
      country: country || undefined,
      photographer: photographer || 'সম্মানিত অবদানকারী',
      description: description || 'ইসলামিক চিত্র সংকলন',
      tags: tags || ['ইসলামিক স্থিরচিত্র'],
      dimensions: 'ফুল এইচডি',
      aspectRatio: 'landscape',
      uploadedAt: new Date().toISOString().split('T')[0] ?? '2026-08-26',
      isUserUploaded: true,
      downloadsCount: 0,
      likesCount: 0,
    };

    serverGalleryItems = [newItem, ...serverGalleryItems];

    return NextResponse.json({
      success: true,
      message: 'ছবিটি সফলভাবে যুক্ত হয়েছে।',
      item: newItem,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'সার্ভার ত্রুটি ঘটেছে।' },
      { status: 500 }
    );
  }
}
