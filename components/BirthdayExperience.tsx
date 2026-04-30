'use client';

import React, { useState } from 'react';
import { LandingPage } from './LandingPage';
import { HeartfeltMessagePage } from './HeartfeltMessagePage';
import { WhyYouAreAwesomePage } from './WhyAwesomePage';
import { MemoryLanePage } from './MemoryLanePage';
import { SpecialMomentsPage } from './SpecialMomentsPage';
import { FinalCelebrationPage } from './FinalCelebrationPage';
import { PageNavigator, PageContainer } from './PageNavigation';
import { FloatingHearts, Butterflies, Sparkles } from './AnimationEffects';
import { DebugPanel } from './DebugPanel';

const pages = [
  { name: 'Welcome', component: LandingPage },
  { name: 'Message', component: HeartfeltMessagePage },
  { name: 'Awesome', component: WhyYouAreAwesomePage },
  { name: 'Memories', component: MemoryLanePage },
  { name: 'Moments', component: SpecialMomentsPage },
  { name: 'Celebrate', component: FinalCelebrationPage },
];

export function BirthdayExperience() {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const CurrentPageComponent = pages[currentPage].component;

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <FloatingHearts />
      <Butterflies />
      <Sparkles />
      <DebugPanel />

      <div className="absolute inset-0">
        {pages.map((page, index) => {
          const Page = page.component;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ${
                index === currentPage ? 'opacity-100 z-10' : 'opacity-0 -z-10'
              }`}
            >
              <Page />
            </div>
          );
        })}
      </div>

      <PageNavigator
        currentPage={currentPage}
        totalPages={pages.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        pageNames={pages.map(p => p.name)}
      />
    </div>
  );
}
