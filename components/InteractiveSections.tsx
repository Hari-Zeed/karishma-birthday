'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const CatClickGame = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const { width, height } = useWindowSize();

  const messages = [
    '🐱 You found a cute cat! Keep clicking! 🎉',
    '😸 More cats incoming! 🎪',
    '🐈 You are a cat whisperer! 🌟',
    '😻 MEOW! You have magic powers! ✨',
    '🐾 You unlocked the cat dimension! 🌌',
  ];

  const handleCatClick = () => {
    setClickCount((prev) => prev + 1);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="relative">
      {showMessage && (
        <Confetti width={width} height={height} numberOfPieces={50} gravity={0.2} />
      )}
      <motion.button
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCatClick}
        className="text-9xl cursor-pointer drop-shadow-xl"
      >
        🐱
      </motion.button>
      {showMessage && (
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 text-xl font-bold text-pink-600 bg-white rounded-full px-6 py-2"
        >
          {messages[clickCount % messages.length]}
        </motion.p>
      )}
      <p className="text-center text-gray-600 mt-4">Clicks: {clickCount}</p>
    </div>
  );
};

const MemorySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '🐼',
    '🎂',
    '🎉',
    '🎈',
    '🌸',
    '💖',
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="text-9xl drop-shadow-xl"
      >
        {images[currentIndex]}
      </motion.div>
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          className="px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold rounded-full shadow-lg"
        >
          ← Prev
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          className="px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-500 text-white font-bold rounded-full shadow-lg"
        >
          Next →
        </motion.button>
      </div>
      <p className="text-gray-600 font-semibold">
        Memory {currentIndex + 1} of {images.length}
      </p>
    </div>
  );
};

const SecretBox = () => {
  const [isOpened, setIsOpened] = useState(false);
  const secrets = [
    '🤫 Your laugh is contagious!',
    '✨ You light up every room!',
    '💪 You\'re stronger than you think!',
    '🌟 You inspire everyone around you!',
    '💖 You deserve all the happiness!',
  ];

  const randomSecret = secrets[Math.floor(Math.random() * secrets.length)];

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpened(!isOpened)}
        animate={{
          rotateY: isOpened ? 180 : 0,
        }}
        className="relative w-32 h-32"
      >
        <motion.div
          className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center text-6xl font-bold text-white shadow-xl cursor-pointer"
        >
          {isOpened ? '💝' : '🎁'}
        </motion.div>
      </motion.button>

      {isOpened && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-300 shadow-xl"
        >
          <p className="text-xl font-bold text-center text-gray-800">{randomSecret}</p>
        </motion.div>
      )}
    </div>
  );
};

export default function InteractiveSections() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen py-20 px-6 bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 30% 60%, rgba(216,180,254,0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 40%, rgba(252,165,210,0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(216,180,254,0.2) 0%, transparent 50%)',
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
        className="max-w-5xl mx-auto"
      >
        {/* Click the Cat Game */}
        <motion.div
          variants={sectionVariants}
          className="bg-gradient-to-br from-white to-pink-100 backdrop-blur-xl rounded-3xl p-12 border border-white/40 shadow-2xl mb-12 text-center"
        >
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8">
            🎮 Click the Cat Game
          </h2>
          <CatClickGame />
        </motion.div>

        {/* Memory Slider */}
        <motion.div
          variants={sectionVariants}
          className="bg-gradient-to-br from-white to-purple-100 backdrop-blur-xl rounded-3xl p-12 border border-white/40 shadow-2xl mb-12 text-center"
        >
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-8">
            🎞️ Memory Slider
          </h2>
          <MemorySlider />
        </motion.div>

        {/* Secret Message Box */}
        <motion.div
          variants={sectionVariants}
          className="bg-gradient-to-br from-white to-blue-100 backdrop-blur-xl rounded-3xl p-12 border border-white/40 shadow-2xl text-center"
        >
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 mb-8">
            🤫 Secret Message Box
          </h2>
          <SecretBox />
        </motion.div>
      </motion.div>
    </section>
  );
}
