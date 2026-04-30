'use client';

import React, { useState } from 'react';
import { GlassmorphicCard, CatAccent } from './GlassmorphicComponents';
import { FloatingHearts, Butterflies } from './AnimationEffects';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function MemoryLanePage() {
  const [currentMemory, setCurrentMemory] = useState(0);

  const memories = [
    {
      year: '2024',
      title: 'Unforgettable Moments',
      description: 'Every laugh, every inside joke, every late-night conversation that made us feel alive.',
      emoji: '😄',
    },
    {
      year: '2024',
      title: 'Adventures Together',
      description: 'The spontaneous trips, random hangouts, and the best stories we keep telling.',
      emoji: '🚀',
    },
    {
      year: '2024',
      title: 'Through Thick & Thin',
      description: 'You were there when it mattered, and that&apos;s what true friendship means.',
      emoji: '💪',
    },
    {
      year: '2024',
      title: 'Laughter & Joy',
      description: 'Your presence alone brings so much positivity and light into everything.',
      emoji: '🌟',
    },
    {
      year: '2024',
      title: 'Forever Grateful',
      description: 'For all the moments, the memories, and everything that&apos;s yet to come.',
      emoji: '💖',
    },
  ];

  const handlePrev = () => setCurrentMemory((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
  const handleNext = () => setCurrentMemory((prev) => (prev === memories.length - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 relative">
      <CatAccent position="top-right" src="/cat-cute.png" size="md" />
      <CatAccent position="bottom-left" src="/cat-cozy.png" size="sm" />
      <FloatingHearts />
      <Butterflies />

      <div className="w-full max-w-3xl">
        <h1 className="text-5xl font-script text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-12">
          Memory Lane 💫
        </h1>

        <div className="relative">
          <GlassmorphicCard className="text-center space-y-6 min-h-96 flex flex-col justify-center">
            <div className="text-6xl">{memories[currentMemory].emoji}</div>
            <h2 className="text-4xl font-script text-purple-700">{memories[currentMemory].title}</h2>
            <p className="text-xl text-gray-700 font-poppins leading-relaxed">
              {memories[currentMemory].description}
            </p>
            <p className="text-sm text-purple-500 font-poppins">Year {memories[currentMemory].year}</p>
          </GlassmorphicCard>

          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 backdrop-blur-lg bg-white/10 rounded-full p-3 hover:bg-white/20 transition-all border border-white/20"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 backdrop-blur-lg bg-white/10 rounded-full p-3 hover:bg-white/20 transition-all border border-white/20"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </button>
        </div>

        <div className="flex gap-2 justify-center mt-8">
          {memories.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentMemory(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentMemory ? 'bg-purple-500 w-8' : 'bg-white/30 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
