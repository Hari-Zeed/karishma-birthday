'use client';

import React, { useState } from 'react';
import CatAnimator from '../CatAnimator';

export default function MemoriesPage() {
  const [currentMemory, setCurrentMemory] = useState(0);

  const memories = [
    {
      title: 'First Meeting',
      description: 'The day our friendship began, everything changed for the better.',
      emoji: '✨',
    },
    {
      title: 'Laugh Sessions',
      description: 'Endless laughs, inside jokes, and moments we will never forget.',
      emoji: '😄',
    },
    {
      title: 'Support System',
      description: 'Always there for each other, through thick and thin.',
      emoji: '💪',
    },
    {
      title: 'Adventure Time',
      description: 'Creating beautiful memories one moment at a time.',
      emoji: '🌟',
    },
    {
      title: 'Forever Friends',
      description: 'A bond that grows stronger with every passing day.',
      emoji: '💕',
    },
  ];

  const nextMemory = () => {
    setCurrentMemory((prev) => (prev + 1) % memories.length);
  };

  const prevMemory = () => {
    setCurrentMemory((prev) => (prev - 1 + memories.length) % memories.length);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="relative z-10 max-w-4xl w-full">
        <h1 className="text-5xl md:text-6xl font-script font-bold text-white text-center mb-12">
          Memory Lane 💫
        </h1>

        <div className="flex flex-col items-center gap-8">
          {/* Memory Card */}
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl border border-white/30 p-12 w-full max-w-2xl text-center transform transition-all duration-500">
            <p className="text-6xl mb-4">{memories[currentMemory].emoji}</p>
            <h2 className="text-3xl font-poppins font-bold text-white mb-4">
              {memories[currentMemory].title}
            </h2>
            <p className="text-white/80 font-poppins text-lg">
              {memories[currentMemory].description}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 items-center justify-center">
            <button
              onClick={prevMemory}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-poppins font-bold transition-all duration-300"
            >
              ← Previous
            </button>

            <div className="flex gap-2">
              {memories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentMemory(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentMemory ? 'bg-pink-500 w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextMemory}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-poppins font-bold transition-all duration-300"
            >
              Next →
            </button>
          </div>

          {/* Cat */}
          <CatAnimator
            size="medium"
            animated={true}
            position="center"
            
          />
        </div>
      </div>
    </div>
  );
}
