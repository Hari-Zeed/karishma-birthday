'use client';

import React, { useEffect, useRef, useState, memo } from 'react';

/* ─── FloatingHearts ─────────────────────────────────────────── */
// Capped at 8 hearts, each lasts 3.5s, added every 2s (not 600ms)
export const FloatingHearts = memo(function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number }>>([]);
  const mountedRef = useRef(true);
  const idRef = useRef(0);

  useEffect(() => {
    mountedRef.current = true;

    const interval = setInterval(() => {
      if (!mountedRef.current) return;
      const id = ++idRef.current;
      setHearts(prev => {
        const trimmed = prev.length >= 8 ? prev.slice(-7) : prev;
        return [...trimmed, { id, left: Math.random() * 90 + 5 }];
      });

      const cleanup = setTimeout(() => {
        if (!mountedRef.current) return;
        setHearts(prev => prev.filter(h => h.id !== id));
      }, 3500);

      return () => clearTimeout(cleanup);
    }, 2000);

    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[2]">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-xl"
          style={{
            left:      `${heart.left}%`,
            bottom:    '-20px',
            animation: 'heart-float 3.5s ease-out forwards',
            willChange:'transform, opacity',
          }}
        >
          {['💕','💖','💗','💝'][heart.id % 4]}
        </div>
      ))}
    </div>
  );
});

/* ─── Sparkles (mousemove) ──────────────────────────────────── */
// Throttled to max 1 sparkle every 120ms (not 30%) — far less garbage
export const Sparkles = memo(function Sparkles() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const mountedRef  = useRef(true);
  const lastTimeRef = useRef(0);
  const idRef       = useRef(0);

  useEffect(() => {
    mountedRef.current = true;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTimeRef.current < 120) return; // throttle 120ms
      lastTimeRef.current = now;
      if (!mountedRef.current) return;

      const id = ++idRef.current;
      setSparkles(prev => {
        const trimmed = prev.length >= 12 ? prev.slice(-11) : prev;
        return [...trimmed, { id, x: e.clientX, y: e.clientY }];
      });

      setTimeout(() => {
        if (!mountedRef.current) return;
        setSparkles(prev => prev.filter(s => s.id !== id));
      }, 1200);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      mountedRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[2]">
      {sparkles.map(s => (
        <div
          key={s.id}
          className="absolute text-base animate-sparkle"
          style={{
            left:      s.x,
            top:       s.y,
            transform: 'translate(-50%, -50%)',
            willChange:'transform, opacity',
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
});

/* ─── Butterflies (pure CSS, zero JS) ───────────────────────── */
export const Butterflies = memo(function Butterflies() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {[0,1,2].map(i => (
        <div
          key={i}
          className="absolute text-2xl"
          style={{
            left:           `${20 + i * 30}%`,
            top:            `${10 + i * 18}%`,
            animation:      `float-gentle ${5 + i}s ease-in-out infinite`,
            animationDelay: `${i * 1.2}s`,
            willChange:     'transform',
          }}
        >
          🦋
        </div>
      ))}
    </div>
  );
});
