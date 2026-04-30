'use client';

import React from 'react';
import { GlassmorphicCard, CatAccent } from './GlassmorphicComponents';
import { FloatingHearts, Butterflies } from './AnimationEffects';

export function WhyYouAreAwesomePage() {
  const awesomeThings = [
    {
      emoji: '🌟',
      title: 'Certified Cutie',
      description: 'Too adorable for this world, but we somehow manage.',
    },
    {
      emoji: '✨',
      title: 'Too Beautiful',
      description: 'Still not acting your age, and that&apos;s what makes you perfect.',
    },
    {
      emoji: '😎',
      title: 'Chaos Creator',
      description: 'Professional at turning ordinary moments into legendary memories.',
    },
    {
      emoji: '💪',
      title: 'Strongest Spirit',
      description: 'Face everything with grace, humor, and unwavering positivity.',
    },
    {
      emoji: '🎨',
      title: 'Creative Soul',
      description: 'Your uniqueness is your superpower, never lose it.',
    },
    {
      emoji: '❤️',
      title: 'Loyal Friend',
      description: 'Someone who shows up, listens, and always has your back.',
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 relative">
      <CatAccent position="top-left" src="/cat-cute.png" size="sm" />
      <CatAccent position="bottom-left" src="/cat-cozy.png" size="sm" />
      <Butterflies />
      <FloatingHearts />

      <div className="w-full max-w-5xl">
        <h1 className="text-5xl font-script text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-12">
          Why You&apos;re Absolutely Awesome 🐼✨
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awesomeThings.map((item, i) => (
            <GlassmorphicCard key={i} delay={i * 0.1}>
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="text-2xl font-script text-purple-700 mb-2">{item.title}</h3>
              <p className="text-gray-700 font-poppins">{item.description}</p>
            </GlassmorphicCard>
          ))}
        </div>
      </div>
    </div>
  );
}
