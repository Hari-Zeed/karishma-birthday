'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AwesomeCardsSection() {
  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    {
      emoji: '😂',
      title: 'Master of Chaos',
      text: 'You eat like 5 people and still have room for cake 🍕🍰',
      color: 'from-pink-400 to-red-400',
    },
    {
      emoji: '🎵',
      title: 'Comedy Queen',
      text: 'Still laughs at the worst jokes (and makes them worse) 😂',
      color: 'from-purple-400 to-pink-400',
    },
    {
      emoji: '😎',
      title: 'Thinks She\'s Normal',
      text: 'She\'s not. She\'s delightfully weird and we love it 🌟',
      color: 'from-blue-400 to-purple-400',
    },
    {
      emoji: '💖',
      title: 'Heart of Gold',
      text: 'You\'re the friend everyone needs but nobody deserves ✨',
      color: 'from-pink-500 to-rose-400',
    },
    {
      emoji: '🐼',
      title: 'Forever Panda',
      text: 'Cute, cuddly, and impossible not to love 🐼💕',
      color: 'from-gray-400 to-pink-400',
    },
  ];

  const nextCard = () => setCurrentCard((prev) => (prev + 1) % cards.length);
  const prevCard = () => setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section className="relative min-h-screen py-20 px-6 bg-gradient-to-b from-pink-50 to-purple-50 overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(251,146,60,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(236,72,153,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 30%, rgba(168,85,247,0.15) 0%, transparent 50%)',
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
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 mb-4">
            Why You&apos;re Awesome
          </h2>
          <p className="text-xl text-gray-600">A certified roast of your greatness 🔥</p>
        </motion.div>

        {/* Card Carousel */}
        <motion.div
          variants={itemVariants}
          className="relative flex items-center justify-center gap-6 mb-12"
        >
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevCard}
            className="p-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full shadow-lg"
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Card Container */}
          <div className="relative w-full max-w-2xl h-96">
            <motion.div
              key={currentCard}
              initial={{ opacity: 0, x: 100, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: -90 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className={`absolute inset-0 bg-gradient-to-br ${cards[currentCard].color} rounded-3xl p-8 shadow-2xl flex flex-col justify-center items-center text-white text-center border-4 border-white/20`}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-9xl mb-6"
              >
                {cards[currentCard].emoji}
              </motion.div>
              <h3 className="text-3xl font-black mb-4">{cards[currentCard].title}</h3>
              <p className="text-xl leading-relaxed">{cards[currentCard].text}</p>
            </motion.div>
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextCard}
            className="p-4 bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-full shadow-lg"
          >
            <ChevronRight size={24} />
          </motion.button>
        </motion.div>

        {/* Card Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-3 mb-12"
        >
          {cards.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentCard(idx)}
              animate={{
                scale: currentCard === idx ? 1.2 : 1,
                backgroundColor:
                  currentCard === idx
                    ? 'rgb(236, 72, 153)'
                    : 'rgb(216, 180, 254)',
              }}
              className="w-3 h-3 rounded-full transition-colors"
            />
          ))}
        </motion.div>

        {/* Card Counter */}
        <motion.p
          variants={itemVariants}
          className="text-center text-gray-600 font-semibold text-lg"
        >
          {currentCard + 1} of {cards.length}
        </motion.p>
      </motion.div>
    </section>
  );
}
