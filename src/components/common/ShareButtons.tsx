'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
  showPrint?: boolean;
}

export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const targets = [
    {
      name: 'Facebook',
      label: 'ফেসবুক',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: 'F',
    },
    {
      name: 'WhatsApp',
      label: 'হোয়াটসঅ্যাপ',
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      icon: 'W',
    },
    {
      name: 'Twitter',
      label: 'টুইটার',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      icon: 'X',
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User cancelled or not supported
      }
    } else {
      void copyLink();
    }
  };

  return (
    <div className={cn('flex items-center gap-2 print:hidden', className)}>
      <span className="text-caption text-text-secondary hidden sm:inline">শেয়ার:</span>
      {targets.map((t) => (
        <a
          key={t.name}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label={`${t.label}-এ শেয়ার করুন`}
          title={`${t.label}-এ শেয়ার করুন`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-xs font-bold text-text-secondary transition-colors duration-200 ease-calm hover:border-primary hover:text-primary hover:bg-primary-tint/30"
        >
          {t.icon}
        </a>
      ))}

      <button
        type="button"
        aria-label="লিংক কপি করুন"
        title={copied ? 'লিংক কপি হয়েছে' : 'লিংক কপি করুন'}
        onClick={copyLink}
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200 ease-calm',
          copied
            ? 'border-primary bg-primary text-white'
            : 'border-border text-text-secondary hover:border-primary hover:text-primary hover:bg-primary-tint/30'
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>

      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          type="button"
          aria-label="শেয়ার করুন"
          title="শেয়ার করুন"
          onClick={handleNativeShare}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-colors duration-200 ease-calm hover:border-primary hover:text-primary hover:bg-primary-tint/30 sm:hidden"
        >
          <Share2 className="h-4 w-4" />
        </button>
      )}

      <span role="status" className="sr-only">
        {copied ? 'লিংক কপি হয়েছে' : ''}
      </span>
    </div>
  );
}

