export type GalleryCategory =
  | 'all'
  | 'haramain'
  | 'mosques'
  | 'architecture'
  | 'calligraphy'
  | 'heritage'
  | 'nature';

export interface GalleryItem {
  id: string;
  title: string;
  titleEn?: string;
  category: GalleryCategory;
  categoryLabel: string;
  imageUrl: string;
  thumbnailUrl?: string;
  location: string;
  country?: string;
  photographer?: string;
  photographerUrl?: string;
  description: string;
  tags: string[];
  dimensions?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  uploadedAt: string;
  isUserUploaded?: boolean;
  downloadsCount?: number;
  likesCount?: number;
}

export interface GalleryCategoryMeta {
  id: GalleryCategory;
  label: string;
  labelEn: string;
  description: string;
  iconName: string;
}
