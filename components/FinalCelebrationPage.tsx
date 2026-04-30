'use client';

import React, { useState } from 'react';
import { GlassmorphicCard, CatAccent } from './GlassmorphicComponents';
import { FloatingHearts, Butterflies } from './AnimationEffects';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export function FinalCelebrationPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleCelebrate = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 relative">
      {showConfetti && <Confetti width={width} height={height} />}

      <CatAccent position="top-left" src="/cat-cute.png" size="md" />
      <CatAccent position="top-right" src="/cat-cozy.png" size="sm" />
      <CatAccent position="bottom-left" src="/cat-cozy.png" size="md" />
      <CatAccent position="bottom-right" src="/cat-cute.png" size="sm" />

      <FloatingHearts />
      <Butterflies />

      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-script text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Happy 20th Birthday!
          </h1>
          <p className="text-2xl text-purple-700 font-poppins">
            🎉 Karishma - The Panda Queen 🐼✨
          </p>
        </div>

        <GlassmorphicCard className="text-center space-y-8 mb-8">
          <div className="space-y-4">
            <p className="text-2xl font-script text-purple-700">
              Thank you for being the most amazing person we know
            </p>
            <p className="text-lg font-poppins text-gray-700 leading-relaxed">
              Your friendship is a gift that keeps on giving. May this year be filled with:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
              {['✨ Magic', '💖 Love', '😄 Laughter', '🚀 Success', '🌟 Dreams', '🎨 Creativity', '💪 Strength', '🦋 Growth'].map((item, i) => (
                <div
                  key={i}
                  className="backdrop-blur bg-white/20 rounded-lg p-4 hover:bg-white/30 transition-all"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <p className="font-poppins font-semibold text-purple-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassmorphicCard>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { emoji: '🎂', title: 'Cake Time', text: 'Let&apos;s celebrate and eat cake!' },
            { emoji: '🎊', title: 'Party Mode', text: 'Time for fun and memories!' },
            { emoji: '🎁', title: 'Gift Ideas', text: 'More surprises coming soon!' },
          ].map((item, i) => (
            <GlassmorphicCard key={i} delay={i * 0.1}>
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="text-xl font-script text-purple-700 mb-2">{item.title}</h3>
              <p className="font-poppins text-gray-700">{item.text}</p>
            </GlassmorphicCard>
          ))}
        </div>

        <div className="text-center space-y-4">
          <button
            onClick={handleCelebrate}
            className="backdrop-blur-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-script text-2xl px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            🎉 Celebrate Now! 🎉
          </button>

          <p className="text-xl font-script text-purple-700">
            Here&apos;s to 20 years of being amazing,
            <br />
            and many more to come! 💖
          </p>
        </div>
      </div>
    </div>
  );
}
