'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Volume2, Play, Pause, Square, RotateCcw, VolumeX, FastForward, Check } from 'lucide-react';
import { toBanglaDigits } from '@/utils/date';
import { cn } from '@/utils/cn';

interface AudioReaderProps {
  title: string;
  chunks: string[];
  className?: string;
}

const SPEED_OPTIONS = [
  { label: '০.৭৫x', rate: 0.75 },
  { label: '১.০x', rate: 1.0 },
  { label: '১.২৫x', rate: 1.25 },
  { label: '১.৫x', rate: 1.5 },
];

export function AudioReader({ title, chunks, className }: AudioReaderProps) {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentChunkIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const playbackRateRef = useRef<number>(1.0);
  const activeVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Keep refs in sync
  currentChunkIndexRef.current = currentChunkIndex;
  isPlayingRef.current = isPlaying;
  isPausedRef.current = isPaused;
  playbackRateRef.current = playbackRate;
  activeVoiceRef.current = selectedVoice;

  // Initialize Speech Synthesis and load voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const synth = window.speechSynthesis;
    synthRef.current = synth;
    setIsSupported(true);

    const updateVoices = () => {
      const voices = synth.getVoices();
      // Try to find a Bengali voice first
      const bnVoice = voices.find(
        (v) => v.lang.toLowerCase().includes('bn') || v.lang.toLowerCase().includes('bengali')
      );
      if (bnVoice) {
        setSelectedVoice(bnVoice);
        activeVoiceRef.current = bnVoice;
      } else if (voices.length > 0) {
        const defaultVoice = voices.find((v) => v.default) || voices[0];
        setSelectedVoice(defaultVoice || null);
        activeVoiceRef.current = defaultVoice || null;
      }
    };

    updateVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = updateVoices;
    }

    return () => {
      if (synth) {
        synth.cancel();
      }
    };
  }, []);

  const speakChunk = useCallback((index: number) => {
    const synth = synthRef.current;
    if (!synth || index < 0 || index >= chunks.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentChunkIndex(0);
      return;
    }

    synth.cancel();

    const chunkText = chunks[index];
    if (!chunkText?.trim()) {
      if (index + 1 < chunks.length) {
        speakChunk(index + 1);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentChunkIndex(0);
      }
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.rate = playbackRateRef.current;
    utterance.lang = 'bn-BD';

    if (activeVoiceRef.current) {
      utterance.voice = activeVoiceRef.current;
    }

    utterance.onend = () => {
      if (!isPlayingRef.current || isPausedRef.current) return;

      const nextIndex = currentChunkIndexRef.current + 1;
      if (nextIndex < chunks.length) {
        setCurrentChunkIndex(nextIndex);
        currentChunkIndexRef.current = nextIndex;
        speakChunk(nextIndex);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentChunkIndex(0);
      }
    };

    utterance.onerror = (e) => {
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      setIsPlaying(false);
      setIsPaused(false);
    };

    synth.speak(utterance);
  }, [chunks]);

  const handlePlay = () => {
    const synth = synthRef.current;
    if (!synth) return;

    if (isPaused) {
      synth.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    setIsPlaying(true);
    setIsPaused(false);
    speakChunk(currentChunkIndex);
  };

  const handlePause = () => {
    const synth = synthRef.current;
    if (!synth) return;

    synth.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    const synth = synthRef.current;
    if (!synth) return;

    synth.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentChunkIndex(0);
  };

  const handleRestart = () => {
    handleStop();
    setCurrentChunkIndex(0);
    currentChunkIndexRef.current = 0;
    setTimeout(() => {
      setIsPlaying(true);
      setIsPaused(false);
      speakChunk(0);
    }, 50);
  };

  const changeRate = (rate: number) => {
    setPlaybackRate(rate);
    playbackRateRef.current = rate;
    setShowSpeedMenu(false);

    if (isPlaying && !isPaused) {
      // Re-trigger current chunk with new rate
      speakChunk(currentChunkIndex);
    }
  };

  if (!isSupported || chunks.length === 0) {
    return null;
  }

  const progressPercentage = Math.round(((currentChunkIndex + 1) / chunks.length) * 100);

  return (
    <div
      role="region"
      aria-label="অডিও রিডার - শুনুন"
      className={cn(
        'rounded-xl border border-primary/20 bg-primary-tint/30 p-4 transition-all duration-300 print:hidden',
        isPlaying && 'ring-1 ring-primary/40 bg-primary-tint/50 shadow-sm',
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Info and Status */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors',
              isPlaying ? 'bg-primary text-white shadow-xs' : 'bg-surface text-primary border border-border'
            )}
          >
            {isPlaying ? (
              <div className="flex items-end justify-center gap-0.5 h-4 w-4">
                <span className="h-4 w-1 bg-white animate-pulse rounded-full" />
                <span className="h-2.5 w-1 bg-white animate-pulse delay-75 rounded-full" />
                <span className="h-3.5 w-1 bg-white animate-pulse delay-150 rounded-full" />
              </div>
            ) : isPaused ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-small font-semibold text-text-primary">প্রবন্ধটি শুনুন (অডিও রিডার)</span>
              {selectedVoice && selectedVoice.lang.toLowerCase().includes('bn') && (
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary">
                  বাংলা ভয়েস
                </span>
              )}
            </div>
            <p className="text-caption text-text-secondary">
              {isPlaying
                ? `পড়া হচ্ছে: অংশ ${toBanglaDigits(currentChunkIndex + 1)} / ${toBanglaDigits(chunks.length)}`
                : isPaused
                ? 'স্থগিত রাখা হয়েছে'
                : 'স্বয়ংক্রিয়ভাবে প্রবন্ধটি শুনে নিন'}
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Play/Pause Button */}
          {!isPlaying ? (
            <button
              type="button"
              onClick={handlePlay}
              aria-label={isPaused ? 'পুনরায় শুনুন' : 'শুনুন'}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-primary-hover active:scale-95 cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{isPaused ? 'চালিয়ে যান' : 'প্লে করুন'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePause}
              aria-label="সাময়িক থামান"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-border px-3.5 py-1.5 text-xs font-semibold text-text-primary shadow-xs transition-all hover:bg-primary-tint/40 active:scale-95 cursor-pointer"
            >
              <Pause className="h-3.5 w-3.5 fill-current" />
              <span>থামান</span>
            </button>
          )}

          {/* Stop / Reset Button */}
          {(isPlaying || isPaused || currentChunkIndex > 0) && (
            <button
              type="button"
              onClick={handleStop}
              aria-label="বন্ধ করুন"
              title="বন্ধ করুন"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-primary-tint/30 transition-colors cursor-pointer"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
            </button>
          )}

          {/* Restart Button */}
          {(isPlaying || isPaused || currentChunkIndex > 0) && (
            <button
              type="button"
              onClick={handleRestart}
              aria-label="শুরু থেকে শুনুন"
              title="শুরু থেকে শুনুন"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-primary-tint/30 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Speed Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              aria-label="গতি নির্বাচন করুন"
              title="প্লেব্যাক গতি"
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text-secondary hover:text-text-primary hover:border-primary/40 transition-colors cursor-pointer"
            >
              <FastForward className="h-3 w-3 text-primary" />
              <span>{toBanglaDigits(playbackRate)}x</span>
            </button>

            {showSpeedMenu && (
              <div className="absolute right-0 top-full mt-1.5 z-20 min-w-[100px] rounded-lg border border-border bg-surface p-1 shadow-md">
                <div className="text-[10px] font-semibold text-text-secondary px-2 py-1 border-b border-border">
                  গতি
                </div>
                {SPEED_OPTIONS.map((opt) => (
                  <button
                    key={opt.rate}
                    type="button"
                    onClick={() => changeRate(opt.rate)}
                    className={cn(
                      'w-full flex items-center justify-between px-2 py-1.5 text-xs rounded text-left transition-colors cursor-pointer',
                      playbackRate === opt.rate
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-text-secondary hover:bg-background hover:text-text-primary'
                    )}
                  >
                    <span>{opt.label}</span>
                    {playbackRate === opt.rate && <Check className="h-3 w-3" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar within player when active */}
      {(isPlaying || isPaused || currentChunkIndex > 0) && (
        <div className="mt-3 pt-2 border-t border-primary/10">
          <div className="flex items-center justify-between text-[11px] text-text-secondary mb-1">
            <span>অগ্রগতি</span>
            <span>{toBanglaDigits(progressPercentage)}%</span>
          </div>
          <div className="h-1.5 w-full bg-border/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
