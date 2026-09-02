'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  MapPin,
  Camera,
  Share2,
  Check,
  Tag,
  Info,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { GalleryItem } from '@/types/gallery';
import { cn } from '@/utils/cn';

interface PhotoLightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  onDownloadIncrement?: (id: string) => void;
}

export function PhotoLightboxModal({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  onDownloadIncrement,
}: PhotoLightboxModalProps) {
  const currentItem = items[currentIndex];
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom & loaded state on item change
  useEffect(() => {
    setZoomLevel(1);
    setImageLoaded(false);
  }, [currentIndex]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          if (isFullscreen && document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          } else {
            onClose();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
          } else {
            onNavigate(items.length - 1);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (currentIndex < items.length - 1) {
            onNavigate(currentIndex + 1);
          } else {
            onNavigate(0);
          }
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'i':
        case 'I':
          e.preventDefault();
          setShowInfoPanel((prev) => !prev);
          break;
        case '+':
        case '=':
          e.preventDefault();
          handleZoomIn();
          break;
        case '-':
        case '_':
          e.preventDefault();
          handleZoomOut();
          break;
        case '0':
          e.preventDefault();
          handleZoomReset();
          break;
        default:
          break;
      }
    },
    [isOpen, isFullscreen, currentIndex, items.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem) return null;

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current) {
          await containerRef.current.requestFullscreen();
        } else {
          await document.documentElement.requestFullscreen();
        }
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fallback
      setIsFullscreen((prev) => !prev);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.3, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.6));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

  const handleDownload = async (highRes = true) => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      const urlToFetch = highRes ? currentItem.imageUrl : (currentItem.thumbnailUrl || currentItem.imageUrl);
      const safeTitle = currentItem.title
        .replace(/[^a-zA-Z0-9\u0980-\u09FF]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const filename = `islamer-kantho-${currentItem.id}-${safeTitle || 'photo'}.jpg`;

      // Try fetching as blob for direct trigger
      const response = await fetch(urlToFetch, { mode: 'cors' });
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

      setDownloadSuccess(true);
      if (onDownloadIncrement) {
        onDownloadIncrement(currentItem.id);
      }
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch {
      // Direct link fallback
      const link = document.createElement('a');
      link.href = currentItem.imageUrl;
      link.target = '_blank';
      link.download = `islamer-kantho-${currentItem.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      if (onDownloadIncrement) {
        onDownloadIncrement(currentItem.id);
      }
      setTimeout(() => setDownloadSuccess(false), 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + `/gallery?photo=${currentItem.id}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      ref={containerRef}
      id="photo-lightbox-modal"
      className={cn(
        'fixed inset-0 z-50 flex flex-col bg-black/95 text-white backdrop-blur-md transition-opacity duration-200 select-none'
      )}
      role="dialog"
      aria-modal="true"
      aria-label={`${currentItem.title} - ফুল স্ক্রিন ভিউ`}
    >
      {/* Top Action Bar */}
      <header className="relative z-20 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-black/60 px-4 md:px-6">
        {/* Left: Category & Title Info */}
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="shrink-0 rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-emerald-300">
            {currentItem.categoryLabel}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-medium text-white md:text-base">
              {currentItem.title}
            </h2>
            <p className="truncate text-xs text-white/60">
              {currentItem.location}{currentItem.country ? ` • ${currentItem.country}` : ''}
            </p>
          </div>
        </div>

        {/* Center: Image index counter */}
        <div className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 sm:flex">
          <span>{currentIndex + 1}</span>
          <span className="text-white/40">/</span>
          <span>{items.length}</span>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Zoom controls */}
          <div className="hidden items-center rounded-lg bg-white/10 p-0.5 md:flex">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.6}
              title="জুম আউট (-)"
              className="rounded-md p-1.5 text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomReset}
              title="রিসেট (0)"
              className="px-2 text-xs font-mono text-white/70 hover:text-white cursor-pointer"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              title="জুম ইন (+)"
              className="rounded-md p-1.5 text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>

          {/* Fullscreen toggle button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'ফুলস্ক্রিন থেকে বের হোন (F)' : 'ফুলস্ক্রিন ভিউ (F)'}
            className="rounded-lg bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          {/* Info toggle */}
          <button
            type="button"
            onClick={() => setShowInfoPanel((prev) => !prev)}
            title="তথ্য প্যানেল (I)"
            className={cn(
              'rounded-lg p-2 transition-colors cursor-pointer',
              showInfoPanel ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
            )}
          >
            <Info className="h-4 w-4" />
          </button>

          {/* Copy link */}
          <button
            type="button"
            onClick={handleCopyLink}
            title="ছবির লিংক কপি করুন"
            className="rounded-lg bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
          </button>

          {/* Download button */}
          <button
            type="button"
            onClick={() => handleDownload(true)}
            disabled={isDownloading}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all shadow-md cursor-pointer',
              downloadSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95'
            )}
          >
            {downloadSuccess ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">ডাউনলোড সম্পন্ন!</span>
              </>
            ) : isDownloading ? (
              <>
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span className="hidden sm:inline">ডাউনলোড হচ্ছে...</span>
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5" />
                <span>ডাউনলোড</span>
              </>
            )}
          </button>

          {/* Close modal */}
          <button
            type="button"
            onClick={onClose}
            title="বন্ধ করুন (ESC)"
            className="rounded-lg bg-white/10 p-2 text-white/80 hover:bg-red-500/80 hover:text-white transition-colors ml-1 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Previous Navigation Button */}
        <button
          type="button"
          onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1)}
          title="পূর্ববর্তী ছবি (Left Arrow)"
          aria-label="Previous Photo"
          className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white/80 backdrop-blur-xs hover:bg-black/90 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/10"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Next Navigation Button */}
        <button
          type="button"
          onClick={() => onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0)}
          title="পরবর্তী ছবি (Right Arrow)"
          aria-label="Next Photo"
          className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white/80 backdrop-blur-xs hover:bg-black/90 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/10"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Image Stage */}
        <main
          className="relative flex flex-1 items-center justify-center overflow-auto p-4 md:p-8"
          onClick={(e) => {
            // Click outside image resets zoom or closes info panel
            if (e.target === e.currentTarget && zoomLevel > 1) {
              setZoomLevel(1);
            }
          }}
        >
          {/* Loading spinner */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-3 border-emerald-500 border-t-transparent" />
              <p className="text-xs text-white/60">হাই-রেজ্যুলেশন ছবি লোড হচ্ছে...</p>
            </div>
          )}

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentItem.imageUrl}
            alt={currentItem.title}
            onLoad={() => setImageLoaded(true)}
            style={{
              transform: `scale(${zoomLevel})`,
              transition: zoomLevel === 1 ? 'transform 0.2s ease-out' : 'none',
            }}
            className={cn(
              'max-h-full max-w-full rounded-lg object-contain shadow-2xl transition-opacity duration-300',
              imageLoaded ? 'opacity-100' : 'opacity-0',
              zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
            )}
            draggable={false}
          />
        </main>

        {/* Collapsible Info Sidebar / Overlay */}
        {showInfoPanel && (
          <aside className="relative z-20 w-full shrink-0 border-l border-white/10 bg-black/80 p-5 backdrop-blur-lg sm:w-80 md:w-96 flex flex-col justify-between overflow-y-auto max-h-full animate-in slide-in-from-right-4 duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>ছবির বিস্তারিত বিবরণ</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowInfoPanel(false)}
                  className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white cursor-pointer"
                  title="তথ্য প্যানেল লুকান"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {currentItem.title}
                </h3>
                {currentItem.titleEn && (
                  <p className="text-xs text-white/60 font-mono mt-0.5">
                    {currentItem.titleEn}
                  </p>
                )}
              </div>

              <p className="text-sm leading-relaxed text-white/80 bg-white/5 p-3 rounded-lg border border-white/5">
                {currentItem.description}
              </p>

              {/* Meta properties */}
              <div className="space-y-2.5 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/50">অবস্থান:</span>
                  <span className="text-white font-medium">{currentItem.location}</span>
                </div>

                {currentItem.photographer && (
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-white/50">ফটোগ্রাফার:</span>
                    <span className="text-white font-medium">{currentItem.photographer}</span>
                  </div>
                )}

                {currentItem.dimensions && (
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-white/50">রেজ্যুলেশন:</span>
                    <span className="text-white font-mono">{currentItem.dimensions}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/50">যোগের তারিখ:</span>
                  <span className="text-white">{currentItem.uploadedAt}</span>
                </div>
              </div>

              {/* Tags */}
              {currentItem.tags && currentItem.tags.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-white/50 mb-2">
                    <Tag className="h-3.5 w-3.5" />
                    <span>ট্যাগসমূহ:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions inside Panel */}
            <div className="mt-6 border-t border-white/10 pt-4 space-y-2">
              <button
                type="button"
                onClick={() => handleDownload(true)}
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-semibold text-white transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>ফুল রেজ্যুলেশন ৪কে/এইচডি ডাউনলোড</span>
              </button>

              <p className="text-[11px] text-center text-white/40">
                কিবোর্ড শর্টকাট: <kbd className="bg-white/10 px-1 py-0.5 rounded">←</kbd> <kbd className="bg-white/10 px-1 py-0.5 rounded">→</kbd> নেভিগেট, <kbd className="bg-white/10 px-1 py-0.5 rounded">F</kbd> ফুলস্ক্রিন, <kbd className="bg-white/10 px-1 py-0.5 rounded">ESC</kbd> বন্ধ
              </p>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      <footer className="relative z-20 hidden h-20 shrink-0 items-center justify-center border-t border-white/10 bg-black/70 px-4 py-2 sm:flex">
        <div className="flex max-w-4xl items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {items.map((item, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(idx)}
                aria-label={`View photo ${idx + 1}: ${item.title}`}
                className={cn(
                  'relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition-all cursor-pointer border',
                  isSelected
                    ? 'ring-2 ring-emerald-500 border-transparent scale-105 opacity-100'
                    : 'border-white/20 opacity-50 hover:opacity-90'
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumbnailUrl || item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
