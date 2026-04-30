'use client';

import React, { useState } from 'react';
import Confetti from 'react-confetti';
import CatAnimator from '../CatAnimator';

export default function SurprisesPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [revealedSurprises, setRevealedSurprises] = useState<number[]>([]);

  const surprises = [
    {
      id: 1,
      emoji: '🎁',
      title: 'Special Gift',
      description: 'A gift wrapped with love and memories',
      color: 'from-pink-500 to-red-500',
    },
    {
      id: 2,
      emoji: '🎂',
      title: 'Birthday Cake',
      description: 'Your favorite flavor, made with love',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 3,
      emoji: '🎊',
      title: 'Party Time',
      description: 'Celebrate with confetti and joy!',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 4,
      emoji: '✨',
      title: 'Magic Moment',
      description: 'Something special is coming your way',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  const handleSurpriseClick = (id: number) => {
    setRevealedSurprises([...revealedSurprises, id]);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {showConfetti && <Confetti />}

      <div className="relative z-10 max-w-5xl w-full">
        <h1 className="text-5xl md:text-6xl font-script font-bold text-white text-center mb-12">
          Surprises for You 🎉
        </h1>

        {/* Surprise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {surprises.map((surprise) => {
            const isRevealed = revealedSurprises.includes(surprise.id);

            return (
              <div
                key={surprise.id}
                onClick={() => handleSurpriseClick(surprise.id)}
                className={`bg-gradient-to-br ${surprise.color} rounded-2xl p-8 cursor-pointer transform transition-all duration-500 hover:scale-105 shadow-lg backdrop-blur-sm border border-white/30 ${
                  isRevealed ? 'opacity-75' : 'opacity-100'
                }`}
              >
                {!isRevealed ? (
                  <div className="text-center py-8">
                    <p className="text-6xl mb-4 animate-bounce">🎁</p>
                    <p className="text-white font-poppins font-bold text-lg">
                      Click to open!
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-6xl mb-4">{surprise.emoji}</p>
                    <h3 className="text-2xl font-poppins font-bold text-white mb-2">
                      {surprise.title}
                    </h3>
                    <p className="text-white/90 font-poppins">
                      {surprise.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="text-center mb-12">
          <p className="text-white font-poppins text-xl">
            Surprises Opened:{' '}
            <span className="text-3xl font-bold text-yellow-300">
              {revealedSurprises.length} / {surprises.length}
            </span>
          </p>
        </div>

        {/* Cat */}
        <div className="flex justify-center">
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
