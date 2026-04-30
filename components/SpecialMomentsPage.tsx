'use client';

import React from 'react';
import { GlassmorphicCard, CatAccent } from './GlassmorphicComponents';
import { FloatingHearts, Butterflies } from './AnimationEffects';

export function SpecialMomentsPage() {
  const moments = [
    {
      icon: '🎂',
      title: 'Birthday Wishes',
      content: 'You deserve all the happiness in the world, today and every day.',
    },
    {
      icon: '🌈',
      title: 'Bright Future',
      content: 'At 20, you&apos;re just getting started. Amazing things are coming your way.',
    },
    {
      icon: '💝',
      title: 'True Friendship',
      content: 'This is what real friendship looks like – genuine, honest, and forever.',
    },
    {
      icon: '🚀',
      title: 'Dream Big',
      content: 'Chase those dreams fearlessly. I&apos;ll be cheering from the sidelines.',
    },
    {
      icon: '🎉',
      title: 'Let&apos;s Celebrate',
      content: 'Today is about YOU. Let&apos;s make it unforgettable together!',
    },
    {
      icon: '∞',
      title: 'Forever Connected',
      content: 'Distance doesn&apos;t matter when the bond is real. We&apos;ll always have this.',
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 relative">
      <CatAccent position="top-right" src="/cat-cute.png" size="sm" />
      <CatAccent position="bottom-right" src="/cat-cozy.png" size="md" />
      <FloatingHearts />
      <Butterflies />

      <div className="w-full max-w-5xl">
        <h1 className="text-5xl font-script text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-12">
          Special Moments 💫
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {moments.map((moment, i) => (
            <GlassmorphicCard
              key={i}
              delay={i * 0.1}
              className="group hover:bg-white/20 cursor-pointer"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {moment.icon}
              </div>
              <h3 className="text-2xl font-script text-purple-700 mb-3">{moment.title}</h3>
              <p className="text-gray-700 font-poppins text-lg leading-relaxed">{moment.content}</p>
            </GlassmorphicCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <GlassmorphicCard className="bg-gradient-to-r from-purple-200/30 to-pink-200/30">
            <p className="text-2xl font-script text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-700">
              &quot;In your presence, the world feels brighter, the laughter feels louder, and life feels more meaningful.&quot;
            </p>
            <p className="text-sm text-purple-600 font-poppins mt-4">— With love on your 20th 💖</p>
          </GlassmorphicCard>
        </div>
      </div>
    </div>
  );
}
