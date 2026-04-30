import React from 'react';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GlassmorphicCard({ children, className = '', delay = 0 }: GlassmorphicCardProps) {
  return (
    <div
      className={`backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}
      style={{
        animation: `fade-in-up 0.8s ease-out forwards`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

interface AnimatedBackgroundProps {
  imageSrc: string;
  opacity?: number;
}

export function AnimatedBackground({ imageSrc, opacity = 0.15 }: AnimatedBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 animate-float"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: opacity,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 via-pink-200/20 to-purple-300/20" />
    </div>
  );
}

interface CatAccentProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  src: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
};

export function CatAccent({ position, src, size = 'md' }: CatAccentProps) {
  const positionMap = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  };

  return (
    <div className={`fixed ${positionMap[position]} ${sizeMap[size]} opacity-20 pointer-events-none animate-float`}>
      <img src={src} alt="decorative cat" className="w-full h-full object-cover" />
    </div>
  );
}
