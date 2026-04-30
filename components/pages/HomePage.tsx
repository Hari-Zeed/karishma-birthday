'use client';

import React, { useState } from 'react';
import CatAnimator from '../CatAnimator';
import Confetti from 'react-confetti';

export default function HomePage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const handleStartMagic = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    setIsReading(true);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {showConfetti && <Confetti />}

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side - Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-script font-bold text-white mb-4 text-balance">
            Happy Birthday
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-pink-300 mb-6 text-balance">
            Panda 🐼
          </h2>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8">
            <h3 className="text-2xl font-poppins font-bold text-white mb-4">
              Karishma Special Day
            </h3>
            <p className="text-white/90 font-poppins text-lg mb-6">
              Celebrating the most amazing person who makes every day beautiful
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-purple-500/20 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-yellow-300">20</p>
                <p className="text-white/70 text-sm">Amazing Years</p>
              </div>
              <div className="bg-blue-500/20 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-yellow-300">∞</p>
                <p className="text-white/70 text-sm">Memories</p>
              </div>
              <div className="bg-pink-500/20 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-yellow-300">1</p>
                <p className="text-white/70 text-sm">Best Friend</p>
              </div>
            </div>

            <button
              onClick={handleStartMagic}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-poppins font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/50"
            >
              Start the Magic
            </button>
          </div>
        </div>

        {/* Right Side - Cat */}
        <div className="flex-1">
          <CatAnimator
            size="large"
            animated={true}
            position="center"
            {/* catImage prop removed — CatAnimator now uses /cat-hero.png by default */}
          />

          {/* Chat Bubble */}
          {isReading && (
            <div className="mt-6 bg-white/90 rounded-2xl p-4 text-center shadow-lg backdrop-blur-sm animate-fade-in-up">
              <p className="text-gray-800 font-poppins text-sm">
                I have a special letter for you!
              </p>
              <p className="text-2xl mt-2">💌</p>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center font-poppins">
        <p className="text-sm mb-2 opacity-70">Scroll to explore</p>
        <p className="text-2xl animate-bounce">↓</p>
      </div>
    </div>
  );
}
