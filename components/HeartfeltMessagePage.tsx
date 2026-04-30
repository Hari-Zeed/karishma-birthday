'use client';

import React from 'react';
import { GlassmorphicCard, CatAccent } from './GlassmorphicComponents';
import { FloatingHearts, Butterflies } from './AnimationEffects';

export function HeartfeltMessagePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 relative">
      <CatAccent position="top-left" src="/cat-cute.png" size="md" />
      <CatAccent position="bottom-right" src="/cat-cozy.png" size="md" />

      <FloatingHearts />
      <Butterflies />

      <div className="w-full max-w-2xl">
        <GlassmorphicCard className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8">
            A Special Message for You 🐼✨
          </h1>

          <div className="space-y-4 text-lg md:text-xl leading-relaxed font-poppins text-gray-700">
            <p>
              <span className="font-semibold text-purple-700">Karishma,</span>
            </p>

            <p>
              Being your best friend in 2025 honestly made this year special for me.
              <br />
              Not because we talk every single day, but because I know I always have you —
              <br />
              <span className="italic">someone I can talk to anytime, laugh with, and just be myself around.</span>
            </p>

            <p>
              Even if we don&apos;t talk often, nothing changes. That&apos;s what makes our friendship real 😌💞
            </p>

            <p>
              You&apos;re one of those people who just <span className="font-semibold text-pink-600">makes everything better</span> without even trying.
              <br />
              And yes… you are actually too beautiful (had to say it 😌✨)
            </p>

            <div className="border-t border-white/20 pt-6 mt-6">
              <p className="font-semibold text-purple-700 text-xl mb-4">
                Wishing you a day that&apos;s as awesome as you are!
              </p>

              <p>
                May this year bring you happiness, success, fun, and all your favorite things.
                <br />
                More laughs, more memories, and definitely more chaos together 🥳💕
              </p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-6">
              <p className="text-lg font-semibold text-purple-700 mb-3">
                And just remember…
              </p>

              <p className="text-xl font-script text-pink-600">
                I&apos;ll always be there for you — whether you need a friend,
                <br />
                or even a brother — I&apos;ll try my best, always 💝
              </p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-6">
              <p className="text-2xl font-script text-purple-700 font-semibold">
                Stay the same amazing, funny, slightly crazy Panda 🐼😄
              </p>
              <p className="text-3xl font-script text-pink-600 mt-4">
                Happy 20th Birthday 🎉✨
              </p>
            </div>
          </div>

          <div className="pt-8 text-5xl flex justify-center gap-4 animate-float">
            <span>💕</span>
            <span>🦋</span>
            <span>✨</span>
          </div>
        </GlassmorphicCard>
      </div>
    </div>
  );
}
