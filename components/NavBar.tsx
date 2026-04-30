'use client';

import React, { memo } from 'react';

type PageType = 'home' | 'messages' | 'memories' | 'games' | 'surprises';

interface NavBarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const PAGES: { id: PageType; label: string }[] = [
  { id: 'home',      label: 'Home'      },
  { id: 'messages',  label: 'Messages'  },
  { id: 'memories',  label: 'Memories'  },
  { id: 'games',     label: 'Games'     },
  { id: 'surprises', label: 'Surprises' },
];

const NavBar = memo(function NavBar({ currentPage, onPageChange }: NavBarProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40"
      style={{ background:'rgba(10,4,22,0.72)', backdropFilter:'blur(20px)',
        borderBottom:'1px solid rgba(255,255,255,0.08)' }}
      aria-label="Site navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-script text-xl gradient-text-pink">Karishma's Day</span>
          <span className="text-xl" aria-hidden="true">🐼</span>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {PAGES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onPageChange(id)}
              aria-current={currentPage === id ? 'page' : undefined}
              className={`px-3 py-1.5 rounded-lg text-xs font-poppins font-semibold transition-all ${
                currentPage === id
                  ? 'text-white shadow-lg'
                  : 'text-white/65 hover:text-white hover:bg-white/10'
              }`}
              style={currentPage === id ? {
                background: 'linear-gradient(135deg,#ec4899,#7c3aed)',
                boxShadow:  '0 0 14px rgba(236,72,153,0.48)',
              } : {}}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
});

export default NavBar;
