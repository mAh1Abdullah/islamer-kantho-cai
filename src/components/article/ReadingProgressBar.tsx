'use client';

import { useEffect, useState } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const scrollPercentage = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      setProgress(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (progress <= 0) return null;

  return (
    <div
      role="progressbar"
      aria-label="পড়ার অগ্রগতি"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-primary/15 pointer-events-none print:hidden"
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out shadow-xs"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
