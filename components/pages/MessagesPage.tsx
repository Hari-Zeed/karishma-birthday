'use client';

import React, { useState } from 'react';
import CatAnimator from '../CatAnimator';

export default function MessagesPage() {
  const [letterOpen, setLetterOpen] = useState(false);

  const heartfeltMessage = `Karishma,

Being your best friend in 2025 honestly made this year special for me. 
Not because we talk every single day, but because I know I always have you — 
someone I can talk to anytime, laugh with, and just be myself around.

Even if we don't talk often, nothing changes. That's what makes our friendship real 😌💞

You're one of those people who just makes everything better without even trying.
And yes… you are actually too beautiful (had to say it 😌✨)

Wishing you a day that's as awesome as you are!
May this year bring you happiness, success, fun, and all your favorite things.

More laughs, more memories, and definitely more chaos together 🥳💕

And just remember…
I'll always be there for you — whether you need a friend, 
or even a brother — I'll try my best, always 💝

Stay the same amazing, funny, slightly crazy Panda 🐼😄

Happy 20th Birthday 🎉✨`;

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="relative z-10 max-w-4xl w-full">
        <h1 className="text-5xl md:text-6xl font-script font-bold text-white text-center mb-12">
          A Special Message 💌
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Letter Card */}
          <div className="flex-1">
            <div
              onClick={() => setLetterOpen(!letterOpen)}
              className="bg-white/10 backdrop-blur-lg rounded-2xl border-2 border-pink-300 p-8 cursor-pointer transform transition-all duration-500 hover:scale-105 shadow-2xl"
              style={{
                transform: letterOpen ? 'rotateX(0deg)' : 'rotateX(0deg)',
              }}
            >
              {!letterOpen ? (
                <div className="text-center py-12">
                  <p className="text-5xl mb-4">💌</p>
                  <p className="text-white font-poppins text-xl font-bold">
                    Click to open the letter
                  </p>
                  <p className="text-white/60 font-poppins mt-2">
                    A heartfelt message for you
                  </p>
                </div>
              ) : (
                <div className="text-white font-poppins leading-relaxed whitespace-pre-line">
                  {heartfeltMessage}
                </div>
              )}
            </div>
          </div>

          {/* Cat with Letter */}
          <div className="flex-1 flex flex-col items-center">
            <CatAnimator
              size="medium"
              animated={true}
              position="center"
              
            />
            <p className="text-white font-poppins text-lg mt-4 text-center">
              {letterOpen ? '💖 Read all the way?' : 'Open the letter →'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
