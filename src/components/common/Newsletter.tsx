'use client';

import { useState, type FormEvent } from 'react';
import { Button } from './Button';
import { cn } from '@/utils/cn';

export interface NewsletterProps {
  onSubscribe?: (email: string) => Promise<void>;
  className?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Newsletter({ onSubscribe, className }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      await onSubscribe?.(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={cn('rounded-lg bg-primary-tint px-6 py-10 text-center', className)}>
      <h3 className="text-h4 text-text-primary">নতুন প্রবন্ধের খবর পান</h3>
      <p className="mx-auto mt-2 max-w-md text-body text-text-secondary">
        প্রতি সপ্তাহে নির্বাচিত প্রবন্ধ সরাসরি আপনার ইমেইলে পৌঁছে দিন।
      </p>

      <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          ইমেইল ঠিকানা
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="আপনার ইমেইল ঠিকানা"
          className="h-11 flex-1 rounded-md border border-border bg-surface px-4 text-body focus:border-primary"
        />
        <Button type="submit" isLoading={status === 'loading'}>
          সাবস্ক্রাইব
        </Button>
      </form>

      <p role="status" className="mt-3 text-small">
        {status === 'success' && <span className="text-success">সাবস্ক্রাইব সফল হয়েছে!</span>}
        {status === 'error' && <span className="text-error">সমস্যা হয়েছে, আবার চেষ্টা করুন।</span>}
      </p>
    </div>
  );
}
