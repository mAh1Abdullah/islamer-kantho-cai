'use client';

import { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { HelpCircle, CheckCircle2, AlertCircle, Sparkles, Send, RotateCcw, ShieldCheck } from 'lucide-react';
import type { QASubmission, QASubmissionResponse } from '@/types/qa';

const QA_CATEGORIES = [
  'দৈনন্দিন ফিকহ',
  'ঈমান ও আকীদা',
  'রোজা ও রমজান',
  'যাকাত ও সদকা',
  'তাহরাত ও পবিত্রতা',
  'নামাজ ও ইবাদত',
  'সীরাত ও ইতিহাস',
  'পারিবারিক ও সামাজিক জীবন',
  'সমকালীন মাসায়েল',
  'অন্যান্য',
];

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionSubmitted?: (submission: QASubmission) => void;
}

export function AskQuestionModal({ isOpen, onClose, onQuestionSubmitted }: AskQuestionModalProps) {
  const [category, setCategory] = useState<string>(QA_CATEGORIES[0]!);
  const [question, setQuestion] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<QASubmission | null>(null);

  const resetForm = () => {
    setCategory(QA_CATEGORIES[0]!);
    setQuestion('');
    setDetail('');
    setName('');
    setEmail('');
    setErrorMessage(null);
    setSubmittedData(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!question.trim() || question.trim().length < 5) {
      setErrorMessage('অনুগ্রহ করে কমপক্ষে ৫ অক্ষরের একটি স্পষ্ট ও সুনির্দিষ্ট প্রশ্ন লিখুন।');
      return;
    }

    if (!category.trim()) {
      setErrorMessage('অনুগ্রহ করে একটি বিভাগ নির্বাচন করুন।');
      return;
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setErrorMessage('অনুগ্রহ করে সঠিক ফরম্যাটে ইমেইল লিখুন।');
        return;
      }
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          question: question.trim(),
          detail: detail.trim() || undefined,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });

      const data: QASubmissionResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'প্রশ্ন জমা নেওয়ার সময় ত্রুটি ঘটেছে।');
      }

      if (data.submission) {
        setSubmittedData(data.submission);
        if (onQuestionSubmitted) {
          onQuestionSubmitted(data.submission);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'সার্ভারে সংযোগ স্থাপন সম্ভব হয়নি। পুনরায় চেষ্টা করুন।';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="xl"
      title={
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <HelpCircle className="h-5 w-5" />
          </div>
          <span>নতুন ইসলামিক প্রশ্ন করুন</span>
        </div>
      }
      description="কুরআন ও সহিহ সুন্নাহর আলোকে আপনার শরয়ী জিজ্ঞাসার উত্তর পেতে প্রশ্ন জমা দিন।"
    >
      {submittedData ? (
        // Success View
        <div className="space-y-5 py-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-h3 font-bold text-text-primary">জাজাকাল্লাহু খাইরান!</h3>
            <p className="text-body text-text-secondary max-w-md mx-auto leading-relaxed">
              আপনার প্রশ্নটি সফলভাবে আমাদের ইফতা ও শরীয়াহ বোর্ডে জমা হয়েছে।
            </p>
          </div>

          {/* Submission Details Card */}
          <div className="rounded-xl border border-primary/20 bg-primary-tint/30 p-4 text-left space-y-2 text-small">
            <div className="flex justify-between items-center pb-2 border-b border-border/60">
              <span className="text-text-secondary">রেফারেন্স ট্র্যাকিং নম্বর:</span>
              <span className="font-mono font-bold text-primary bg-surface px-2.5 py-0.5 rounded border border-border">
                {submittedData.id}
              </span>
            </div>
            <div>
              <span className="text-text-secondary">বিভাগ: </span>
              <span className="font-semibold text-text-primary">{submittedData.category}</span>
            </div>
            <div>
              <span className="text-text-secondary">প্রশ্ন: </span>
              <p className="font-medium text-text-primary mt-0.5 line-clamp-2">
                &ldquo;{submittedData.question}&rdquo;
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-caption text-text-secondary bg-surface rounded-lg p-2.5 border border-border">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <span>অভিজ্ঞ মুফতিগণের তাহকিক ও যাচাই শেষে উত্তর ওয়েবসাইটে প্রকাশিত হবে।</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              onClick={resetForm}
              className="w-full sm:w-auto"
            >
              <RotateCcw className="h-4 w-4 mr-1.5" />
              <span>আরেকটি প্রশ্ন করুন</span>
            </Button>
            <Button
              variant="primary"
              onClick={handleClose}
              className="w-full sm:w-auto"
            >
              <span>সম্পন্ন করুন</span>
            </Button>
          </div>
        </div>
      ) : (
        // Question Input Form
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Alert */}
          {errorMessage && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-small text-red-800 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Shariah Notice */}
          <div className="flex items-center gap-2 rounded-lg bg-primary-tint/50 border border-primary/20 px-3.5 py-2.5 text-caption text-text-primary">
            <Sparkles className="h-4 w-4 text-primary shrink-0" />
            <span>
              প্রামাণ্য হাদিস ও ফিকহের আলোকে নির্ভরযোগ্য আলেমদের দ্বারা প্রশ্নগুলোর উত্তর প্রস্তুত করা হয়।
            </span>
          </div>

          {/* Category Selector */}
          <div>
            <label htmlFor="qa-category" className="block text-small font-semibold text-text-primary mb-1.5">
              প্রশ্নের বিভাগ <span className="text-red-500">*</span>
            </label>
            <select
              id="qa-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-body text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
              required
            >
              {QA_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Main Question */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="qa-question" className="block text-small font-semibold text-text-primary">
                আপনার মূল প্রশ্ন <span className="text-red-500">*</span>
              </label>
              <span className="text-caption text-text-secondary">
                {question.length} অক্ষর
              </span>
            </div>
            <textarea
              id="qa-question"
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="যেমন: রোজা অবস্থায় রক্তের টেস্ট বা ইনজেকশন নেওয়া যাবে কি?"
              className="w-full rounded-lg border border-border bg-surface p-3 text-body text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none transition-colors"
              required
              minLength={5}
            />
          </div>

          {/* Question Details / Context (Optional) */}
          <div>
            <label htmlFor="qa-detail" className="block text-small font-semibold text-text-primary mb-1.5">
              বিস্তারিত বিবরণ বা পটভূমি <span className="text-caption text-text-secondary font-normal">(ঐচ্ছিক)</span>
            </label>
            <textarea
              id="qa-detail"
              rows={3}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="প্রশ্নের প্রাসঙ্গিক পরিস্থিতি বা জরুরি প্রেক্ষাপট থাকলে এখানে উল্লেখ করুন..."
              className="w-full rounded-lg border border-border bg-surface p-3 text-body text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none transition-colors"
            />
          </div>

          {/* Submitter Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="qa-name" className="block text-small font-semibold text-text-primary mb-1.5">
                আপনার নাম <span className="text-caption text-text-secondary font-normal">(ঐচ্ছিক)</span>
              </label>
              <input
                type="text"
                id="qa-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: আব্দুল্লাহ"
                className="w-full rounded-lg border border-border bg-surface px-3.5 py-2 text-body text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div>
              <label htmlFor="qa-email" className="block text-small font-semibold text-text-primary mb-1.5">
                ইমেইল ঠিকানা <span className="text-caption text-text-secondary font-normal">(বিজ্ঞপ্তির জন্য)</span>
              </label>
              <input
                type="email"
                id="qa-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-lg border border-border bg-surface px-3.5 py-2 text-body text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              বাতিল
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="min-w-[130px]"
            >
              <Send className="h-4 w-4 mr-1.5" />
              <span>প্রশ্ন জমা দিন</span>
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
