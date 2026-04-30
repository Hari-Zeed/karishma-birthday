'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index > text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <>{displayedText}</>;
};

export default function MainWishSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-pink-50 to-purple-50 overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(252,165,210,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(216,180,254,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, rgba(252,165,210,0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0 -z-10"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-4xl w-full"
      >
        {/* Main Heading */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Happy Birthday
            </span>
          </motion.h1>
          <motion.p
            animate={{ fontSize: ['3rem', '3.5rem', '3rem'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl md:text-5xl font-black text-purple-600 mb-2"
          >
            Panda 🐼🎉
          </motion.p>
        </motion.div>

        {/* Typewriter Text */}
        <motion.div
          variants={itemVariants}
          className="text-center bg-gradient-to-r from-pink-100 to-purple-100 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/40 shadow-2xl mb-12"
        >
          <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
            <span className="text-pink-600">Karishma</span>, you&apos;re turning{' '}
            <span className="text-4xl font-black text-purple-600">20</span> and still the most amazing human ever{' '}
            <span className="text-2xl">😄</span>
          </p>
        </motion.div>

        {/* Fun Facts */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { emoji: '🐱', text: 'Certified cutie' },
            { emoji: '✨', text: 'Too beautiful for this world' },
            { emoji: '😂', text: "Still not acting your age" },
            { emoji: '😎', text: 'Professional chaos creator' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.08, y: -10 }}
              className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg"
            >
              <p className="text-5xl mb-3">{item.emoji}</p>
              <p className="text-xl font-bold text-gray-800">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated decorative elements */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6 text-6xl"
        >
          <motion.span
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎂
          </motion.span>
          <motion.span
            animate={{ y: [0, -20, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
          >
            🎈
          </motion.span>
          <motion.span
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
          >
            🎉
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
