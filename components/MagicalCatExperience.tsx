'use client';

import React, { useState, useEffect, useRef, memo } from 'react';

// NOTE: This component is NOT used in BirthdayWebsite.tsx (which has its own full implementation).
// It is kept here as a standalone component for potential future use.
// BackgroundMusic handles all audio — no audio instantiated here.

interface MagicalCatExperienceProps {
  onClose?: () => void;
}

export const MagicalCatExperience = memo(function MagicalCatExperience({}: MagicalCatExperienceProps) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [showMessage,    setShowMessage]    = useState(false);
  const [displayedText,  setDisplayedText]  = useState('');
  const mountedRef = useRef(true);

  const fullMessage = `Karishma,\n\nBeing your best friend in 2025 honestly made this year special for me.\n\nYou're one of those people who just makes everything better without even trying.\n\nHappy 20th Birthday! 🎉🐼`;

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!showMessage) return;
    let index = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      if (!mountedRef.current) { clearInterval(interval); return; }
      index++;
      setDisplayedText(fullMessage.slice(0, index));
      if (index >= fullMessage.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [showMessage, fullMessage]);

  const handleEnvelopeClick = () => {
    setEnvelopeOpened(true);
    setTimeout(() => {
      if (mountedRef.current) setShowMessage(true);
    }, 700);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden"
      style={{ background:'linear-gradient(145deg,#0d0618,#1a0a2e,#0a1040)' }}>

      <div className="relative w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="relative w-full max-w-2xl mx-auto mb-8">
          {/* Cat image */}
          <div className="flex justify-center items-end mb-8">
            <div className={`transition-all duration-700 ${envelopeOpened ? 'scale-95 opacity-60' : 'scale-100'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cat-hero.png"
                alt="Birthday Cat"
                className="w-64 h-64 object-contain animate-breathe"
                style={{ filter:'drop-shadow(0 0 30px rgba(255,110,180,0.5))' }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {!envelopeOpened ? (
            <button
              onClick={handleEnvelopeClick}
              className="mx-auto block group"
              aria-label="Open birthday letter"
            >
              <div className="relative w-48 h-32 mx-auto transform transition-all duration-500 hover:scale-110 hover:-rotate-3">
                <div className="absolute inset-0 rounded-lg shadow-2xl overflow-hidden"
                  style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06))',
                    border:'1px solid rgba(255,110,180,0.3)', backdropFilter:'blur(16px)' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl animate-float-gentle">💌</div>
                  </div>
                </div>
              </div>
            </button>
          ) : (
            <div className="mt-8 rounded-3xl p-8"
              style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))',
                backdropFilter:'blur(24px)', border:'1px solid rgba(255,110,180,0.28)',
                maxHeight:'22rem', overflowY:'auto' }}>
              <h2 className="text-2xl font-script gradient-text-pink text-center mb-5">
                A Special Message for You
              </h2>
              <p className="text-white/85 font-poppins text-sm leading-relaxed whitespace-pre-wrap">
                {displayedText}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
