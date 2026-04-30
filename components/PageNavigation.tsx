import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageNavigatorProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  pageNames: string[];
}

export function PageNavigator({ currentPage, totalPages, onPrevious, onNext, pageNames }: PageNavigatorProps) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 backdrop-blur-lg bg-white/10 rounded-full px-6 py-3 border border-white/20">
        <button
          onClick={onPrevious}
          disabled={currentPage === 0}
          className="p-2 hover:bg-white/20 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 text-purple-600" />
        </button>

        <div className="text-center min-w-max">
          <p className="text-sm font-script text-purple-700">{pageNames[currentPage]}</p>
          <p className="text-xs text-purple-500">{currentPage + 1} of {totalPages}</p>
        </div>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages - 1}
          className="p-2 hover:bg-white/20 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 text-purple-600" />
        </button>
      </div>

      <div className="flex gap-2 justify-center mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === currentPage ? 'bg-purple-500 w-6' : 'bg-white/30 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

interface PageContainerProps {
  children: React.ReactNode;
  isActive: boolean;
  delay?: number;
}

export function PageContainer({ children, isActive, delay = 0 }: PageContainerProps) {
  return (
    <div
      className={`min-h-screen w-full transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{
        animation: isActive ? `page-fade 0.6s ease-out forwards` : 'none',
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
