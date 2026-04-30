'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CatAccent } from './GlassmorphicComponents';
import { FloatingHearts, Butterflies } from './AnimationEffects';

const FloatingElements = () => {
  const floatingVariants = {
    animate: (i: number) => ({
      y: [0, -30, 0],
      x: [0, Math.sin(i) * 20, 0],
      rotate: [0, 360],
      transition: {
        duration: 4 + i * 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    }),
  };

  const elements = ['🐱', '🎉', '🐼', '✨', '🎈', '🎂', '💖', '🌸'];

  return (
    <div className="fixed inset-0 pointer-events-none">
      {elements.map((emoji, i) => (
        <motion.div
          key={i}
          custom={i}
          animate="animate"
          variants={floatingVariants}
          className="absolute text-4xl"
          style={{
            left: `${(i * 12.5) % 100}%`,
            top: `${(i * 15) % 80}%`,
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
};

export function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <CatAccent position="top-left" src="/cat-cute.png" size="md" />
      <CatAccent position="bottom-right" src="/cat-cozy.png" size="md" />

      <FloatingElements />
      <FloatingHearts />
      <Butterflies />

      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          🐼
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <h1 className="text-6xl md:text-8xl font-script text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Welcome! 🎉
          </h1>

          <p className="text-2xl md:text-3xl font-poppins text-purple-700 max-w-2xl">
            Ready for an unforgettable celebration?
          </p>

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl"
          >
            ↓
          </motion.div>

          <p className="text-xl font-script text-purple-600">
            Scroll down to begin
          </p>
        </motion.div>
      )}
    </div>
  );
}
