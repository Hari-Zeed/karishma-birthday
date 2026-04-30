'use client';

import React from 'react';

export default function MagicalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* String Lights */}
      <div className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-60">
        <div className="absolute inset-0 flex justify-around">
          {[...Array(12)].map((_, i) => (
            <div
              key={`light-${i}`}
              className="w-3 h-3 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300/80"
              style={{
                animation: `pulse-light 2s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Lanterns */}
      <div className="absolute bottom-1/3 right-10">
        <div className="text-6xl animate-bounce" style={{ animationDuration: '3s' }}>
          🏮
        </div>
      </div>

      <div className="absolute bottom-1/4 left-10">
        <div className="text-5xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
          🏮
        </div>
      </div>

      {/* Flowers */}
      <div className="absolute bottom-20 left-1/4 text-4xl animate-float">
        🌸
      </div>

      <div className="absolute bottom-32 right-1/4 text-5xl animate-float" style={{ animationDelay: '1s' }}>
        🌺
      </div>

      <div className="absolute bottom-24 right-1/3 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>
        🌷
      </div>

      {/* Sparkles */}
      <div className="absolute top-1/3 left-1/4 text-2xl animate-pulse">
        ✨
      </div>

      <div className="absolute top-1/2 right-1/4 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>
        ✨
      </div>

      <div className="absolute bottom-1/3 left-1/3 text-xl animate-pulse" style={{ animationDelay: '1s' }}>
        ✨
      </div>

      {/* Hearts */}
      <div className="absolute top-1/4 right-1/3 text-3xl animate-floating-heart">
        💖
      </div>

      <div className="absolute top-1/3 left-1/3 text-2xl animate-floating-heart" style={{ animationDelay: '1s' }}>
        💕
      </div>

      <style jsx>{`
        @keyframes pulse-light {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 10px rgba(253, 224, 71, 0.8);
          }
          50% {
            opacity: 0.5;
            box-shadow: 0 0 20px rgba(253, 224, 71, 0.4);
          }
        }
      `}</style>
    </div>
  );
}
