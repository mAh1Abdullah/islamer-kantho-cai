'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Download,
  Maximize2,
  Upload,
  Sparkles,
  MapPin,
  Camera,
  Layers,
  Check,
  RotateCcw,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';
import { GalleryItem, GalleryCategory } from '@/types/gallery';
import { GALLERY_CATEGORIES, INITIAL_GALLERY_ITEMS } from '@/lib/galleryData';
import { PhotoLightboxModal } from '@/components/gallery/PhotoLightboxModal';
import { PhotoUploadModal } from '@/components/gallery/PhotoUploadModal';
import { Card } from '@/components/common/Card';
import { cn } from '@/utils/cn';

interface GalleryClientProps {
  initialItems?: GalleryItem[];
}

export function GalleryClient({ initialItems = INITIAL_GALLERY_ITEMS }: GalleryClientProps) {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'downloads' | 'title'>('latest');

  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // Upload Modal state
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);

  // Quick download feedback per item
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  // Sync user uploaded items from localStorage
  useEffect(() => {
    try {
      const savedUserPhotos = localStorage.getItem('user_gallery_uploads');
      if (savedUserPhotos) {
        const parsed: GalleryItem[] = JSON.parse(savedUserPhotos);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge user photos on top of initial items
          setItems((prev) => {
            const userPhotoIds = new Set(parsed.map((p) => p.id));
            const filteredDefaults = prev.filter((p) => !userPhotoIds.has(p.id));
            return [...parsed, ...filteredDefaults];
          });
        }
      }
    } catch {
      // LocalStorage access failsafe
    }
  }, []);

  // Handle URL query parameters (?category=... or ?photo=...)
  useEffect(() => {
    const catParam = searchParams.get('category') as GalleryCategory | null;
    if (catParam && GALLERY_CATEGORIES.some((c) => c.id === catParam)) {
      setSelectedCategory(catParam);
    }

    const photoParam = searchParams.get('photo');
    if (photoParam) {
      const foundIdx = items.findIndex((p) => p.id === photoParam);
      if (foundIdx !== -1) {
        setActivePhotoIndex(foundIdx);
        setLightboxOpen(true);
      }
    }
  }, [searchParams, items]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: items.length };
    GALLERY_CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = items.filter((item) => item.category === cat.id).length;
      }
    });
    return counts;
  }, [items]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = items;

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          (item.titleEn && item.titleEn.toLowerCase().includes(q)) ||
          item.location.toLowerCase().includes(q) ||
          (item.country && item.country.toLowerCase().includes(q)) ||
          (item.photographer && item.photographer.toLowerCase().includes(q)) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      });
    }

    // Sort items
    return [...result].sort((a, b) => {
      if (sortBy === 'downloads') {
        return (b.downloadsCount || 0) - (a.downloadsCount || 0);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title, 'bn');
      }
      // 'latest'
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    });
  }, [items, selectedCategory, searchQuery, sortBy]);

  // Open photo in full screen lightbox
  const handleOpenPhoto = (item: GalleryItem) => {
    const indexInFiltered = filteredItems.findIndex((p) => p.id === item.id);
    if (indexInFiltered !== -1) {
      setActivePhotoIndex(indexInFiltered);
      setLightboxOpen(true);
    }
  };

  // Quick download directly from card
  const handleQuickDownload = async (e: React.MouseEvent, item: GalleryItem) => {
    e.stopPropagation();
    if (downloadingId) return;

    setDownloadingId(item.id);
    setDownloadSuccessId(null);

    try {
      const safeTitle = item.title
        .replace(/[^a-zA-Z0-9\u0980-\u09FF]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const filename = `islamer-kantho-${item.id}-${safeTitle || 'photo'}.jpg`;

      const response = await fetch(item.imageUrl, { mode: 'cors' });
      if (!response.ok) throw new Error('Fetch failed');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      setDownloadSuccessId(item.id);
      handleIncrementDownload(item.id);
      setTimeout(() => setDownloadSuccessId(null), 2500);
    } catch {
      // Fallback
      const link = document.createElement('a');
      link.href = item.imageUrl;
      link.target = '_blank';
      link.download = `islamer-kantho-${item.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccessId(item.id);
      handleIncrementDownload(item.id);
      setTimeout(() => setDownloadSuccessId(null), 2500);
    } finally {
      setDownloadingId(null);
    }
  };

  // Increment download counter
  const handleIncrementDownload = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, downloadsCount: (item.downloadsCount || 0) + 1 } : item
      )
    );
  };

  // Handle new uploaded photo added
  const handlePhotoAdded = (newPhoto: GalleryItem) => {
    setItems((prev) => [newPhoto, ...prev]);

    // Save to localStorage
    try {
      const savedUserPhotos = localStorage.getItem('user_gallery_uploads');
      const currentList: GalleryItem[] = savedUserPhotos ? JSON.parse(savedUserPhotos) : [];
      const updatedList = [newPhoto, ...currentList.filter((p) => p.id !== newPhoto.id)];
      localStorage.setItem('user_gallery_uploads', JSON.stringify(updatedList));
    } catch {
      // Ignore localStorage error
    }

    // Switch to category of uploaded item
    setSelectedCategory(newPhoto.category);
  };

  return (
    <div className="space-y-8">
      {/* Category Pills & Action Header */}
      <div className="space-y-4">
        {/* Top bar: Upload button & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FolderOpen className="h-5 w-5" />
            </span>
            <div>
              <p className="text-small font-bold text-text-primary">
                ক্যাটাগরি ভিত্তিক ইসলামিক ছবির সংগ্রহ
              </p>
              <p className="text-caption text-text-secondary">
                উচ্চ রেজ্যুলেশনের স্থিরচিত্র ফুল স্ক্রিনে দেখুন এবং এক ক্লিকে ডাউনলোড করুন
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-small font-semibold text-white shadow-xs hover:bg-primary-dark active:scale-98 transition-all cursor-pointer shrink-0"
          >
            <Upload className="h-4 w-4" />
            <span>নতুন ছবি আপলোড করুন</span>
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {GALLERY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-small font-medium transition-all whitespace-nowrap cursor-pointer border',
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-xs font-semibold'
                    : 'bg-surface text-text-secondary border-border hover:border-primary/40 hover:text-text-primary'
                )}
              >
                <span>{cat.label}</span>
                <span
                  className={cn(
                    'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-mono leading-none',
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-primary-tint text-primary font-semibold'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search, Sort, and Status Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="শিরোনাম, শহর, দেশ বা ট্যাগ দিয়ে খুঁজুন..."
              className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2 text-small text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-caption text-text-secondary hover:text-text-primary cursor-pointer"
              >
                মুছুন
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <SlidersHorizontal className="h-4 w-4 text-text-secondary shrink-0" />
            <span className="text-caption text-text-secondary hidden sm:inline">সাজান:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'downloads' | 'title')}
              className="rounded-xl border border-border bg-surface px-3 py-2 text-small text-text-primary focus:border-primary focus:outline-none cursor-pointer shadow-2xs"
            >
              <option value="latest">সর্বশেষ যুক্ত</option>
              <option value="downloads">সর্বাধিক ডাউনলোডকৃত</option>
              <option value="title">শিরোনাম (বর্ণানুক্রমিক)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isDownloadingThis = downloadingId === item.id;
            const isDownloadedThis = downloadSuccessId === item.id;

            return (
              <Card
                key={item.id}
                padding="none"
                interactive
                onClick={() => handleOpenPhoto(item)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border-border bg-surface shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {/* Image Container with Hover Actions */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.thumbnailUrl || item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Overlay for Text Visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-1 text-xs font-semibold text-emerald-300 border border-white/10">
                      {item.categoryLabel}
                    </span>

                    {item.isUserUploaded && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 backdrop-blur-xs px-2.5 py-0.5 text-[11px] font-semibold text-white">
                        <Sparkles className="h-3 w-3" />
                        <span>ব্যবহারকারী আপলোড</span>
                      </span>
                    )}
                  </div>

                  {/* Hover Floating Action Buttons (Fullscreen & Download) */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
                    <button
                      type="button"
                      onClick={(e) => handleQuickDownload(e, item)}
                      disabled={isDownloadingThis}
                      title="ছবি ডাউনলোড করুন"
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md shadow-lg transition-transform active:scale-90 cursor-pointer',
                        isDownloadedThis
                          ? 'bg-emerald-600 text-white'
                          : 'bg-black/70 hover:bg-emerald-600 text-white border border-white/20'
                      )}
                    >
                      {isDownloadedThis ? (
                        <Check className="h-4 w-4" />
                      ) : isDownloadingThis ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenPhoto(item)}
                      title="ফুলস্ক্রিন লাইটবক্সে দেখুন"
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/70 hover:bg-primary text-white backdrop-blur-md border border-white/20 shadow-lg transition-transform active:scale-90 cursor-pointer"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Location Overlay on Image */}
                  <div className="absolute bottom-3 left-3 max-w-[65%] text-left">
                    <div className="inline-flex items-center gap-1 text-xs font-medium text-white/90 drop-shadow-md truncate">
                      <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="flex flex-1 flex-col justify-between p-4.5 space-y-3">
                  <div>
                    <h3 className="text-h4 font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-small text-text-secondary line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center justify-between border-t border-border/60 pt-3 text-caption text-text-secondary">
                    {item.photographer ? (
                      <div className="flex items-center gap-1.5 truncate max-w-[55%]">
                        <Camera className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="truncate">{item.photographer}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{item.dimensions || '৪কে / এইচডি'}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 shrink-0">
                      {item.downloadsCount !== undefined && item.downloadsCount > 0 && (
                        <span className="inline-flex items-center gap-1 text-text-secondary/80">
                          <Download className="h-3 w-3 text-emerald-500" />
                          <span>{item.downloadsCount}</span>
                        </span>
                      )}
                      <span className="font-medium text-primary hover:underline inline-flex items-center gap-1">
                        <span>ফুল ভিউ</span>
                        <Maximize2 className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-tint text-primary mb-3">
            <Search className="h-7 w-7" />
          </div>
          <h3 className="text-h4 font-bold text-text-primary mb-1">
            কোনো ছবি পাওয়া যায়নি
          </h3>
          <p className="text-small text-text-secondary max-w-md mb-5">
            আপনার অনুসন্ধান বা নির্বাচিত ক্যাটাগরিতে বর্তমানে কোনো ছবি নেই। ক্যাটাগরি পরিবর্তন করুন অথবা নতুন ছবি যোগ করুন।
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-small font-semibold text-text-primary hover:bg-primary-tint cursor-pointer transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>ফিল্টার রিসেট করুন</span>
            </button>
            <button
              type="button"
              onClick={() => setUploadModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-small font-semibold text-white hover:bg-primary-dark cursor-pointer transition-colors shadow-xs"
            >
              <Upload className="h-4 w-4" />
              <span>ছবি আপলোড করুন</span>
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Photo Lightbox Modal */}
      <PhotoLightboxModal
        items={filteredItems}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setActivePhotoIndex(newIdx)}
        onDownloadIncrement={handleIncrementDownload}
      />

      {/* Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onPhotoAdded={handlePhotoAdded}
      />
    </div>
  );
}
