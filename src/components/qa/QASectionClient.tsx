'use client';

import { useState, useMemo } from 'react';
import { AskQuestionModal } from './AskQuestionModal';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import {
  HelpCircle,
  PlusCircle,
  Search,
  CheckCircle2,
  Clock,
  ChevronDown,
  Sparkles,
  Share2,
  Check,
  BookOpen
} from 'lucide-react';
import type { QAItem, QASubmission } from '@/types/qa';

interface QASectionClientProps {
  initialItems: QAItem[];
}

export function QASectionClient({ initialItems }: QASectionClientProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // User submitted questions in this session
  const [userQuestions, setUserQuestions] = useState<QASubmission[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Extract all categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialItems.forEach((item) => set.add(item.category));
    userQuestions.forEach((item) => set.add(item.category));
    return ['সব', ...Array.from(set)];
  }, [initialItems, userQuestions]);

  const handleQuestionSubmitted = (newSubmission: QASubmission) => {
    setUserQuestions((prev) => [newSubmission, ...prev]);
    setToastMessage(`আপনার প্রশ্নটি (আইডি: ${newSubmission.id}) সফলভাবে জমা হয়েছে!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  const handleCopy = (item: QAItem | QASubmission) => {
    const textToCopy = `প্রশ্ন: ${item.question}\nবিভাগ: ${item.category}\nইসলামের কন্ঠ (প্রশ্ন-উত্তর সংকলন)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered items
  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      const matchCategory = selectedCategory === 'সব' || item.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [initialItems, selectedCategory, searchQuery]);

  const filteredUserQuestions = useMemo(() => {
    return userQuestions.filter((item) => {
      const matchCategory = selectedCategory === 'সব' || item.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.detail && item.detail.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [userQuestions, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-surface p-4 shadow-lg ring-1 ring-emerald-500/20 animate-in slide-in-from-bottom-5 duration-200 max-w-md"
        >
          <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <p className="text-small font-medium text-text-primary">{toastMessage}</p>
        </div>
      )}

      {/* Hero / CTA Submission Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary-tint/60 via-surface to-primary-tint/30 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-caption font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>ইফতা ও শরীয়াহ জিজ্ঞাসা</span>
            </div>
            <h2 className="text-h3 font-bold text-text-primary">
              আপনার কি কোনো ইসলামিক প্রশ্ন বা মাসআলা রয়েছে?
            </h2>
            <p className="text-body text-text-secondary leading-relaxed">
              দৈনন্দিন ইবাদত, লেনদেন, তাহরাত বা সমকালীন বিষয়ে আপনার যেকোনো প্রশ্ন জমা দিন। আমাদের বিজ্ঞ আলেম বোর্ড কুরআন ও সুন্নাহর ভিত্তিতে তাহকিক করে সমাধান প্রদান করবেন।
            </p>
          </div>
          <Button
            size="lg"
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 shadow-md hover:shadow-lg w-full sm:w-auto"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            <span>নতুন প্রশ্ন করুন</span>
          </Button>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="space-y-4 rounded-xl border border-border bg-surface p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="প্রশ্ন বা উত্তর অনুসন্ধান করুন..."
              className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-body text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          {/* Quick Ask Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="sm:w-auto"
          >
            <HelpCircle className="h-4 w-4 mr-1.5 text-primary" />
            <span>প্রশ্ন জমা দিন</span>
          </Button>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-small font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-primary-tint/40 text-text-secondary hover:bg-primary-tint hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* User Submitted Questions Section (if any in session) */}
      {filteredUserQuestions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-small font-bold text-text-primary px-1">
            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>আপনার সাম্প্রতিক জমাকৃত প্রশ্ন ({filteredUserQuestions.length})</span>
          </div>

          <div className="space-y-3">
            {filteredUserQuestions.map((q) => (
              <Card
                key={q.id}
                padding="md"
                className="border-amber-400/40 bg-amber-50/20 dark:bg-amber-950/10 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2.5 py-0.5 text-caption font-semibold">
                      {q.category}
                    </span>
                    <span className="rounded-full bg-surface border border-border text-text-secondary px-2 py-0.5 text-caption font-mono">
                      {q.id}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-caption text-amber-600 dark:text-amber-400 font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    <span>পর্যালোচনাধীন</span>
                  </span>
                </div>

                <h3 className="text-h4 font-semibold text-text-primary mb-1.5">
                  প্র: {q.question}
                </h3>

                {q.detail && (
                  <p className="text-small text-text-secondary mb-3 italic">
                    বিবরণ: {q.detail}
                  </p>
                )}

                <div className="rounded-lg bg-surface/80 p-3 border border-border text-small text-text-secondary flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    আপনার প্রশ্নটি বিজ্ঞ মুফতিগণের টেবিলে পর্যালোচনার জন্য জমা হয়েছে। উত্তর অনুমোদিত হলে তা এখানে পূর্ণাঙ্গ দলীলসহ প্রকাশিত হবে।
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Main Q&A List */}
      <div className="space-y-4">
        {filteredItems.length === 0 && filteredUserQuestions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-tint text-primary">
              <HelpCircle className="h-7 w-7" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-h4 font-bold text-text-primary">কোনো প্রশ্ন পাওয়া যায়নি</h3>
              <p className="text-small text-text-secondary">
                আপনার অনুসন্ধানের সাথে মিলিয়ে কোনো উত্তর পাওয়া যায়নি। আপনি চাইলে নতুন প্রশ্ন জমা দিতে পারেন।
              </p>
            </div>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>এই বিষয়ে প্রশ্ন করুন</span>
            </Button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <Card
                key={item.id}
                padding="md"
                className="transition-all hover:border-primary/40 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary-tint px-3 py-0.5 text-caption font-semibold text-primary">
                      {item.category}
                    </span>
                    {item.mufti && (
                      <span className="text-caption text-text-secondary hidden sm:inline">
                        উত্তরদাতা: {item.mufti}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(item)}
                    aria-label="প্রশ্ন কপি করুন"
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-caption text-text-secondary hover:bg-primary-tint hover:text-text-primary transition-colors cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-600">কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-3.5 w-3.5" />
                        <span>শেয়ার</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <h3 className="text-h4 font-semibold text-text-primary group-hover:text-primary transition-colors">
                    প্র: {item.question}
                  </h3>
                  <div
                    className={`shrink-0 mt-1 rounded-full p-1 text-text-secondary transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 bg-primary-tint text-primary' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-border' : 'grid-rows-[1fr] mt-3'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-body text-text-secondary leading-relaxed">
                      <span className="font-semibold text-primary">উত্তর: </span>
                      {item.answer}
                    </p>

                    {item.source && (
                      <p className="mt-2 text-caption text-text-secondary font-medium">
                        সূত্র: {item.source}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Modal Dialog */}
      <AskQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onQuestionSubmitted={handleQuestionSubmitted}
      />
    </div>
  );
}
