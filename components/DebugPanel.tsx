'use client';

import React, { useState } from 'react';

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-bold shadow-lg"
      >
        D
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 backdrop-blur-lg bg-white/20 rounded-lg p-4 max-w-xs text-sm text-gray-800 border border-white/30">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-2 font-bold hover:text-red-600"
      >
        ✕
      </button>

      <h3 className="font-bold mb-2">Birthday Experience</h3>

      <div className="space-y-1 text-xs">
        <p>✓ Font Script: Dancing Script</p>
        <p>✓ Font Body: Poppins</p>
        <p>✓ Animations: Floating, Butterflies, Sparkles</p>
        <p>✓ Glassmorphism: Active</p>
        <p>✓ Pages: 6</p>
        <p>✓ Navigation: Ready</p>
      </div>
    </div>
  );
}
