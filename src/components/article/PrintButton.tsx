'use client';

import { Printer } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PrintButtonProps {
  className?: string;
  variant?: 'button' | 'icon';
}

export function PrintButton({ className, variant = 'button' }: PrintButtonProps) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handlePrint}
        aria-label="প্রবন্ধটি প্রিন্ট করুন"
        title="প্রিন্ট করুন"
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors duration-200 ease-calm hover:border-primary hover:text-primary hover:bg-primary-tint/50 print:hidden',
          className
        )}
      >
        <Printer className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      aria-label="প্রবন্ধটি প্রিন্ট করুন"
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-small font-medium text-text-secondary shadow-xs transition-colors duration-200 ease-calm hover:border-primary hover:text-primary hover:bg-primary-tint/40 print:hidden',
        className
      )}
    >
      <Printer className="h-4 w-4 text-primary" aria-hidden="true" />
      <span>প্রিন্ট করুন</span>
    </button>
  );
}
