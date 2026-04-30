'use client';

import React, { memo } from 'react';

interface CatAnimatorProps {
  size?:     'small' | 'medium' | 'large';
  animated?: boolean;
  position?: 'left' | 'center' | 'right';
}

const CatAnimator = memo(function CatAnimator({
  size     = 'large',
  animated = true,
  position = 'center',
}: CatAnimatorProps) {
  const sizeClasses = {
    small:  'w-24 h-24',
    medium: 'w-40 h-40',
    large:  'w-80 h-80',
  } as const;

  const positionClasses = {
    left:   'justify-start pl-8',
    center: 'justify-center',
    right:  'justify-end pr-8',
  } as const;

  return (
    <div className={`flex ${positionClasses[position]} items-center w-full`}>
      <div className={`${sizeClasses[size]} relative ${animated ? 'animate-breathe' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cat-hero.png"
          alt="Birthday Cat"
          className="w-full h-full object-contain"
          style={{
            filter: 'drop-shadow(0 0 24px rgba(255,110,180,0.45))',
            willChange: animated ? 'transform' : 'auto',
          }}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
});

export default CatAnimator;
