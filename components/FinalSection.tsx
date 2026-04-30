'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const Fireworks = ({ isActive }: { isActive: boolean }) => {
  const { width, height } = useWindowSize();

  if (!isActive) return null;

  return <Confetti width={width} height={height} numberOfPieces={200} gravity={0.3} />;
};

export default function FinalSection() {
  const [showFireworks, setShowFireworks] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);

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
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const handleReplay = () => {
    setIsReplaying(true);
    setShowFireworks(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsReplaying(false);
    }, 500);
  };

  return (
    <section className="relative min-h-screen py-20 px-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden flex items-center justify-center">
      <Fireworks isActive={showFireworks} />

      {/* Background animation */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 25% 75%, rgba(196,181,253,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 75% 25%, rgba(252,165,210,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(165,243,252,0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0 -z-10"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl w-full text-center"
      >
        {/* Character Image */}
        <motion.div
          variants={itemVariants}
          className="mb-12 flex justify-center"
        >
          <motion.img
            src="/panda-character.png"
            alt="Panda Character"
            className="max-w-xs md:max-w-md rounded-3xl shadow-2xl border-4 border-white"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>

        {/* Main Message */}
        <motion.div variants={itemVariants}>
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              Stay Awesome
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500">
              Stay Weird
            </span>
            <br />
            <span className="text-6xl md:text-8xl">Panda 🐼💖</span>
          </h2>
        </motion.div>

        {/* Inspirational Messages */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12"
        >
          {[
            { emoji: '🌟', text: 'You shine brighter than the stars' },
            { emoji: '💪', text: 'Keep being that bold version of you' },
            { emoji: '❤️', text: 'We\'re all lucky to know you' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1, y: -10 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/40 shadow-xl"
            >
              <p className="text-5xl mb-3">{item.emoji}</p>
              <p className="text-lg font-semibold text-gray-800">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFireworks(true)}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            🎆 Celebrate Now! 🎆
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReplay}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            🔄 Replay Celebration 🔄
          </motion.button>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-8 text-6xl flex-wrap"
        >
          <motion.span
            animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎂
          </motion.span>
          <motion.span
            animate={{ y: [0, -30, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
          >
            🎉
          </motion.span>
          <motion.span
            animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
          >
            🎈
          </motion.span>
          <motion.span
            animate={{ y: [0, -30, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
          >
            ✨
          </motion.span>
          <motion.span
            animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
          >
            💖
          </motion.span>
        </motion.div>

        {/* Footer message */}
        <motion.p
          variants={itemVariants}
          className="mt-16 text-xl md:text-2xl font-semibold text-gray-700"
        >
          Made with 💖 for the one and only{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-black">
            Karishma Panda
          </span>
        </motion.p>
      </motion.div>
    </section>
  );
}
