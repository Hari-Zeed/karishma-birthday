'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function BackgroundMusic() {
  const audioRef    = useRef<HTMLAudioElement>(null);
  const fadeRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const unlockRef   = useRef<(() => void) | null>(null);
  const mountedRef  = useRef(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted,   setIsMuted]   = useState(false);
  const [started,   setStarted]   = useState(false);
  const [visible,   setVisible]   = useState(false);

  const cancelFade = useCallback(() => {
    if (fadeRef.current !== null) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const fadeIn = useCallback((target = 0.4) => {
    cancelFade();
    fadeRef.current = setInterval(() => {
      const audio = audioRef.current;
      if (!audio || !mountedRef.current) { cancelFade(); return; }
      const next = Math.min(audio.volume + 0.015, target);
      audio.volume = next;
      if (next >= target) cancelFade();
    }, 40);
  }, [cancelFade]);

  const fadeOut = useCallback((onComplete?: () => void) => {
    cancelFade();
    fadeRef.current = setInterval(() => {
      const audio = audioRef.current;
      if (!audio || !mountedRef.current) { cancelFade(); return; }
      const next = Math.max(audio.volume - 0.02, 0);
      audio.volume = next;
      if (next <= 0) { cancelFade(); onComplete?.(); }
    }, 40);
  }, [cancelFade]);

  useEffect(() => {
    mountedRef.current = true;
    const audio = audioRef.current;
    if (!audio) return;

    const showTimer = setTimeout(() => {
      if (mountedRef.current) setVisible(true);
    }, 600);

    const doPlay = () => {
      if (!mountedRef.current) return;
      audio.volume = 0;
      audio.play()
        .then(() => {
          if (!mountedRef.current) return;
          setIsPlaying(true);
          setStarted(true);
          fadeIn();
        })
        .catch(() => {/* blocked by browser */});
    };

    const unlock = () => {
      cleanup();
      doPlay();
    };

    const cleanup = () => {
      if (unlockRef.current) {
        document.removeEventListener('click',      unlockRef.current);
        document.removeEventListener('touchstart', unlockRef.current);
        document.removeEventListener('keydown',    unlockRef.current);
        unlockRef.current = null;
      }
    };

    unlockRef.current = unlock;

    // Try autoplay
    audio.volume = 0;
    audio.play()
      .then(() => {
        if (!mountedRef.current) return;
        setIsPlaying(true);
        setStarted(true);
        fadeIn();
      })
      .catch(() => {
        // Register single unified unlock handler
        document.addEventListener('click',      unlock, { once: true });
        document.addEventListener('touchstart', unlock, { once: true, passive: true });
        document.addEventListener('keydown',    unlock, { once: true });
      });

    return () => {
      mountedRef.current = false;
      clearTimeout(showTimer);
      cancelFade();
      cleanup();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [fadeIn, cancelFade]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setStarted(true);

    if (isPlaying) {
      fadeOut(() => { if (audioRef.current) audioRef.current.pause(); });
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => { setIsPlaying(true); fadeIn(); })
        .catch(() => {});
    }
  }, [isPlaying, fadeIn, fadeOut]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !isMuted;
    audio.muted = next;
    setIsMuted(next);
  }, [isMuted]);

  return (
    <>
      {/* THE ONE AND ONLY audio element */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />

      <div
        role="region"
        aria-label="Music player"
        className="fixed top-4 right-4 z-[998] flex items-center gap-2"
        style={{
          opacity:       visible ? 1 : 0,
          transform:     visible ? 'translateY(0)' : 'translateY(-14px)',
          transition:    'opacity 0.6s ease, transform 0.6s ease',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        {!started && (
          <div
            aria-live="polite"
            className="text-xs font-semibold text-white/80 px-3 py-1.5 rounded-full animate-pulse select-none"
            style={{
              background:          'rgba(255,110,180,0.18)',
              border:              '1px solid rgba(255,110,180,0.35)',
              backdropFilter:      'blur(12px)',
              WebkitBackdropFilter:'blur(12px)',
            }}
          >
            🎵 Tap for Music
          </div>
        )}

        {isPlaying && (
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            aria-pressed={isMuted}
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all hover:scale-110 active:scale-95"
            style={{
              background:          'rgba(255,255,255,0.09)',
              border:              '1px solid rgba(255,255,255,0.18)',
              backdropFilter:      'blur(16px)',
              WebkitBackdropFilter:'blur(16px)',
              boxShadow:           '0 2px 12px rgba(0,0,0,0.25)',
            }}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        )}

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          aria-pressed={isPlaying}
          className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white text-sm transition-all hover:scale-105 active:scale-95 select-none"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
            boxShadow:  isPlaying
              ? '0 0 20px rgba(236,72,153,0.65), 0 0 40px rgba(124,58,237,0.35)'
              : '0 0 12px rgba(236,72,153,0.3)',
            border:    '1px solid rgba(255,255,255,0.2)',
            transition:'all 0.3s ease',
          }}
        >
          <span className="text-base leading-none" aria-hidden="true">
            {isPlaying ? '⏸' : '▶'}
          </span>

          {isPlaying && !isMuted && (
            <div className="flex items-end gap-[2px] h-3.5" aria-hidden="true">
              {[0,1,2,3,4].map(i => (
                <div
                  key={i}
                  className="waveform-bar rounded-full"
                  style={{
                    width:          2.5,
                    background:     'rgba(255,255,255,0.85)',
                    minHeight:      2,
                    maxHeight:      14,
                    animationDelay: `${i * 0.11}s`,
                  }}
                />
              ))}
            </div>
          )}

          <span className="text-xs opacity-80 tracking-wide hidden sm:inline">
            {isPlaying ? 'Playing' : 'Music'}
          </span>
        </button>
      </div>
    </>
  );
}
