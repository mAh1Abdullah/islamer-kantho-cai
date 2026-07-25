'use client';

import { useState } from 'react';
import { IconButton } from './IconButton';

export interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

export function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const targets = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
  ];

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        {targets.map((t) => (
          <a
            key={t.name}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label={`${t.name}-এ শেয়ার করুন`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors duration-200 ease-calm hover:border-primary hover:text-primary"
          >
            {t.name[0]}
          </a>
        ))}
        <IconButton aria-label="লিংক কপি করুন" onClick={copyLink} variant="ghost">
          {copied ? '✓' : '🔗'}
        </IconButton>
      </div>
      <span role="status" className="sr-only">
        {copied ? 'লিংক কপি হয়েছে' : ''}
      </span>
    </div>
  );
}
