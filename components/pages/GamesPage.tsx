'use client';

import React, { useState } from 'react';
import CatAnimator from '../CatAnimator';

export default function GamesPage() {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [clicks, setClicks] = useState(0);

  const games = [
    {
      id: 'cat-click',
      name: 'Click the Cat',
      description: 'Click the cute cat as many times as you can in 10 seconds!',
      icon: '🐱',
    },
    {
      id: 'heart-collect',
      name: 'Heart Collector',
      description: 'Collect all the hearts to win!',
      icon: '💖',
    },
    {
      id: 'balloon-pop',
      name: 'Balloon Pop',
      description: 'Pop all the birthday balloons!',
      icon: '🎈',
    },
  ];

  const handleCatClick = () => {
    setClicks(clicks + 1);
    setScore(score + 10);
  };

  const startGame = () => {
    setGameActive(true);
    setClicks(0);
    setTimeout(() => {
      setGameActive(false);
    }, 10000);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="relative z-10 max-w-4xl w-full">
        <h1 className="text-5xl md:text-6xl font-script font-bold text-white text-center mb-12">
          Fun Games 🎮
        </h1>

        {!gameActive ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/30 p-6 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
              >
                <p className="text-5xl mb-4">{game.icon}</p>
                <h3 className="text-xl font-poppins font-bold text-white mb-2">
                  {game.name}
                </h3>
                <p className="text-white/70 font-poppins text-sm mb-4">
                  {game.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mb-8">
            <p className="text-white font-poppins text-lg mb-4">
              Score: <span className="text-4xl font-bold text-yellow-300">{score}</span>
            </p>
            <p className="text-white/70 font-poppins">Clicks: {clicks}</p>
          </div>
        )}

        {/* Cat Game Area */}
        <div className="flex flex-col items-center gap-8 mb-12">
          {gameActive && (
            <div
              onClick={handleCatClick}
              className="transform transition-all duration-100 hover:scale-110 cursor-pointer"
            >
              <CatAnimator
                size="large"
                animated={false}
                position="center"
                
              />
            </div>
          )}

          <button
            onClick={startGame}
            disabled={gameActive}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 text-white font-poppins font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/50"
          >
            {gameActive ? `Game Active (${clicks} clicks)` : 'Start Clicking Game'}
          </button>

          {!gameActive && clicks > 0 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
              <p className="text-white font-poppins text-lg">
                Last Score: <span className="text-2xl font-bold text-yellow-300">{clicks}</span> clicks
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
