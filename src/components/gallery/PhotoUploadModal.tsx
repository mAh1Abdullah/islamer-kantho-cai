'use client';

import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Link as LinkIcon,
  Sparkles,
  MapPin,
  Camera,
  Layers
} from 'lucide-react';
import { GalleryItem, GalleryCategory } from '@/types/gallery';
import { GALLERY_CATEGORIES } from '@/lib/galleryData';
import { cn } from '@/utils/cn';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoAdded: (newPhoto: GalleryItem) => void;
}

export function PhotoUploadModal({
  isOpen,
  onClose,
  onPhotoAdded,
}: PhotoUploadModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryCategory>('mosques');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('বাংলাদেশ');
  const [photographer, setPhotographer] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  
  // Image source mode: 'file' or 'url'
  const [imageMode, setImageMode] = useState<'file' | 'url'>('file');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('অনুগ্রহ করে একটি বৈধ ইমেজ ফাইল নির্বাচন করুন (JPG, PNG, WebP)।');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('ইমেজ ফাইলের সর্বোচ্চ আকার ১৫ মেগাবাইট (MB) হতে পারে।');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (url: string) => {
    setImageUrlInput(url);
    setErrorMessage('');
    if (url.trim().startsWith('http://') || url.trim().startsWith('https://')) {
      setImagePreview(url.trim());
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const finalImage = imageMode === 'file' ? imagePreview : imageUrlInput.trim();

    if (!finalImage) {
      setErrorMessage('অনুগ্রহ করে একটি ছবি নির্বাচন করুন বা ছবির লিংক প্রদান করুন।');
      return;
    }

    if (!title.trim()) {
      setErrorMessage('ছবির শিরোনাম লেখা আবশ্যক।');
      return;
    }

    if (!location.trim()) {
      setErrorMessage('ছবির স্থান বা অবস্থান উল্লেখ করুন।');
      return;
    }

    setIsSubmitting(true);

    const categoryMeta = GALLERY_CATEGORIES.find((c) => c.id === category);
    const categoryLabel = categoryMeta ? categoryMeta.label : 'ঐতিহাসিক মসজিদ';

    const parsedTags = tags
      .split(/[,，\s]+/)
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    const newPhoto: GalleryItem = {
      id: `user-photo-${Date.now()}`,
      title: title.trim(),
      category: category === 'all' ? 'mosques' : category,
      categoryLabel,
      imageUrl: finalImage,
      thumbnailUrl: finalImage,
      location: location.trim(),
      country: country.trim() || undefined,
      photographer: photographer.trim() || 'সম্মানিত অবদানকারী',
      description: description.trim() || 'ব্যবহারকারী কর্তৃক সংগৃহীত ও আপলোডকৃত ইসলামিক স্থিরচিত্র।',
      tags: parsedTags.length > 0 ? parsedTags : [categoryLabel, location.trim()],
      dimensions: 'ফুল এইচডি / ৪কে',
      aspectRatio: 'landscape',
      uploadedAt: new Date().toISOString().split('T')[0] ?? '2026-08-26',
      isUserUploaded: true,
      downloadsCount: 0,
      likesCount: 1,
    };

    setTimeout(() => {
      onPhotoAdded(newPhoto);
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 400);
  };

  return (
    <div
      id="photo-upload-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-surface shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-h4 font-bold text-text-primary">গ্যালারিতে নতুন ছবি যোগ করুন</h2>
              <p className="text-caption text-text-secondary">
                ক্যাটাগরি নির্ধারণ করে আপনার ইসলামিক স্থিরচিত্র যুক্ত করুন
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-text-secondary hover:bg-primary-tint hover:text-text-primary cursor-pointer transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMessage && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-small text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-small text-emerald-600 dark:text-emerald-400">
              <Check className="h-4 w-4 shrink-0" />
              <span>ছবিটি সফলভাবে গ্যালারিতে যুক্ত হয়েছে!</span>
            </div>
          )}

          {/* Image Upload / URL Tabs */}
          <div className="space-y-2">
            <label className="block text-small font-semibold text-text-primary">
              ছবি নির্বাচন করুন <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => setImageMode('file')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-caption font-medium transition-colors cursor-pointer',
                  imageMode === 'file'
                    ? 'bg-primary text-white font-semibold'
                    : 'bg-primary-tint text-text-secondary hover:text-text-primary'
                )}
              >
                <Upload className="h-3.5 w-3.5" />
                <span>ফাইল থেকে আপলোড</span>
              </button>
              <button
                type="button"
                onClick={() => setImageMode('url')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-caption font-medium transition-colors cursor-pointer',
                  imageMode === 'url'
                    ? 'bg-primary text-white font-semibold'
                    : 'bg-primary-tint text-text-secondary hover:text-text-primary'
                )}
              >
                <LinkIcon className="h-3.5 w-3.5" />
                <span>ইমেজ ওয়েব লিংক (URL)</span>
              </button>
            </div>

            {imageMode === 'file' ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  'relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-6 text-center cursor-pointer transition-colors',
                  'hover:border-primary/60 hover:bg-primary-tint/20',
                  imagePreview ? 'border-primary/50 bg-primary-tint/10' : ''
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {imagePreview ? (
                  <div className="space-y-2">
                    <div className="relative mx-auto h-40 max-w-sm overflow-hidden rounded-lg border border-border shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="text-caption text-primary font-medium">
                      ছবি পরিবর্তন করতে ক্লিক করুন
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-tint text-primary">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-small font-medium text-text-primary">
                        এখানে ক্লিক করে ছবি নির্বাচন করুন
                      </p>
                      <p className="text-caption text-text-secondary">
                        JPG, PNG, WebP (সর্বোচ্চ ১৫ মেগাবাইট)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="url"
                  value={imageUrlInput}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://images.unsplash.com/... বা যেকোনো পাবলিক ইমেজ লিংক"
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-small text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {imagePreview && (
                  <div className="relative mx-auto h-36 max-w-sm overflow-hidden rounded-lg border border-border shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Category Selection */}
          <div className="space-y-1.5">
            <label className="block text-small font-semibold text-text-primary">
              ক্যাটাগরি নির্বাচন করুন <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {GALLERY_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    'flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer',
                    category === cat.id
                      ? 'border-primary bg-primary-tint text-primary font-bold shadow-xs'
                      : 'border-border/80 bg-background text-text-secondary hover:border-primary/40'
                  )}
                >
                  <Layers className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title & Photographer */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-small font-semibold text-text-primary">
                ছবির শিরোনাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="যেমন: মসজিদে নববীর রাতের দৃশ্য"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-2 text-small text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-small font-semibold text-text-primary flex items-center gap-1">
                <Camera className="h-3.5 w-3.5 text-primary" />
                <span>ফটোগ্রাফার / সূত্র</span>
              </label>
              <input
                type="text"
                value={photographer}
                onChange={(e) => setPhotographer(e.target.value)}
                placeholder="যেমন: তানভীর হাসান বা নিজস্ব সংগ্রহ"
                className="w-full rounded-xl border border-border bg-background px-4 py-2 text-small text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Location & Country */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-small font-semibold text-text-primary flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>স্থান / শহর <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="যেমন: মদিনা মুনাওয়ারা"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-2 text-small text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-small font-semibold text-text-primary">
                দেশ
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="যেমন: সৌদি আরব বা বাংলাদেশ"
                className="w-full rounded-xl border border-border bg-background px-4 py-2 text-small text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-small font-semibold text-text-primary">
              ছবির বিবরণ বা পটভূমি
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ছবিটির ঐতিহাসিক বা নান্দনিক পটভূমি সংক্ষেপে লিখুন..."
              className="w-full rounded-xl border border-border bg-background px-4 py-2 text-small text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="block text-small font-semibold text-text-primary">
              ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="মসজিদ, গম্বুজ, মদিনা, রাতের দৃশ্য"
              className="w-full rounded-xl border border-border bg-background px-4 py-2 text-small text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-4 py-2 text-small font-medium text-text-secondary hover:bg-primary-tint hover:text-text-primary transition-colors cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-small font-semibold text-white shadow-md hover:bg-primary-dark active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>সংরক্ষণ হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>গ্যালারিতে যুক্ত করুন</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
