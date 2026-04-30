'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function BackgroundMusic() {
  const audioRef    = useRef<HTMLAudioElement>(null);
  const fadeRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const mountedRef  = useRef(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted,   setIsMuted]   = useState(false);
  const [started,   setStarted]   = useState(false);
  const [visible,   setVisible]   = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

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

    // Try autoplay on mount
    audio.volume = 0;
    audio.play()
      .then(() => {
        if (!mountedRef.current) return;
        setIsPlaying(true);
        setStarted(true);
        setShowOverlay(false);
        fadeIn();
      })
      .catch(() => {
        // Autoplay blocked by browser. We MUST show the overlay.
        if (mountedRef.current) {
          setShowOverlay(true);
        }
      });

    return () => {
      mountedRef.current = false;
      clearTimeout(showTimer);
      cancelFade();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [fadeIn, cancelFade]);

  // Explicit handler for the overlay
  const handleUnlock = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Play directly in response to the user's click
    audio.volume = 0;
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setStarted(true);
        setShowOverlay(false);
        fadeIn();
      })
      .catch((e) => {
        console.error('Audio unlock failed:', e);
        // If it still fails, just hide overlay so they can use the site
        setStarted(true); 
        setShowOverlay(false);
      });
  }, [fadeIn]);

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

      {/* FULL SCREEN OVERLAY TO FORCE INTERACTION FOR AUDIO */}
      {showOverlay && (
        <div 
          onClick={handleUnlock}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
          }}
        >
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center animate-fade-in-up">
            <div className="text-7xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>🐼</div>
            <h1 className="font-script text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-8 drop-shadow-lg text-center px-4">
              Karishma's Birthday
            </h1>
            
            <button 
              className="px-8 py-3 rounded-full font-poppins font-bold text-white tracking-wide flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,110,180,0.5)] border border-pink-400/50 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #ec4899, #8b5cf6)' }}
            >
              <span className="text-xl animate-pulse">🎵</span>
              Tap to Enter
            </button>
            <p className="mt-6 text-white/50 font-poppins text-xs tracking-widest uppercase pointer-events-none">Sound On Recommended</p>
          </div>
        </div>
      )}

      {/* MUSIC PLAYER CONTROLS */}
      <div
        role="region"
        aria-label="Music player"
        className="fixed top-4 right-4 z-[998] flex items-center gap-2"
        style={{
          opacity:       visible && started ? 1 : 0,
          transform:     visible && started ? 'translateY(0)' : 'translateY(-14px)',
          transition:    'opacity 0.6s ease, transform 0.6s ease',
          pointerEvents: visible && started ? 'auto' : 'none',
        }}
      >
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
