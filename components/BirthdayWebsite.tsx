'use client';

import React, {
  useState, useEffect, useRef, useCallback, memo, useMemo
} from 'react';
import dynamic from 'next/dynamic';
import BackgroundMusic from './BackgroundMusic';
import { Sparkles } from './AnimationEffects';

// Lazy-load heavy confetti only when needed
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

/* ═══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */
type PageType = 'home' | 'messages' | 'memories' | 'games' | 'surprises';

/* ═══════════════════════════════════════════════════════════════
   STATIC DATA  (outside component → never re-created)
══════════════════════════════════════════════════════════════ */
const NAV: { id: PageType; label: string }[] = [
  { id: 'home',      label: 'Home'      },
  { id: 'messages',  label: 'Messages'  },
  { id: 'memories',  label: 'Memories'  },
  { id: 'games',     label: 'Games'     },
  { id: 'surprises', label: 'Surprises' },
];

const SURPRISES = [
  "You're the kind of friend people write songs about! 🎵",
  "If friendship was a sport, you'd be the world champion 🏆",
  "You make 20 look absolutely magical ✨",
  "Panda energy: fluffy, cuddly, and 100% iconic 🐼",
  "The world got 20% better the day you were born 💫",
  "You're not just a best friend — you're a whole vibe 🌈",
  "Fun fact: you make every day feel like a celebration 🎉",
  "Your smile could outshine all the stars in this animation 🌟",
  "Plot twist: You were the real gift all along 🎁",
  "20 years of being absolutely iconic. More to come! 🚀",
];

const LETTER_TEXT = `Karishma,

Being your best friend in 2025 made this year truly special for me. Not because we talk every single day, but because I know I always have you — someone I can reach out to anytime, laugh with, and just be completely myself around.

Even if we don't talk often, nothing ever changes between us. That's what makes our friendship so real and rare. You're one of those people who makes everything better without even trying.

And yes… you are actually too beautiful, inside and out (had to say it 😌✨)

Wishing you a day as incredible as you are! May this year bring you happiness, success, endless fun, and everything your heart desires. More laughs, more unforgettable memories, and definitely more chaos together. 🎉

I'll always be there for you — whether you need a friend, a cheerleader, or someone to blame things on — I'll try my best, always. 💝

Happy 20th Birthday, Panda 🐼✨
— Your Best Friend 🌟`;

const MEMORY_CARDS = [
  { emoji:'😂', title:'The Laugh Sessions',  desc:"Those moments when we laughed until it hurt — over nothing and everything at once." },
  { emoji:'🎵', title:'Music Moments',       desc:"Sharing songs that perfectly described what words couldn't." },
  { emoji:'🌙', title:'Late Night Talks',    desc:"Conversations that stretched into the night, honest and unfiltered." },
  { emoji:'🎉', title:'Celebrations',        desc:"Every little win felt bigger because you were there to celebrate it." },
  { emoji:'🤝', title:'Being There',         desc:"Showing up when it mattered, without needing to be asked." },
  { emoji:'🌟', title:'Growing Together',    desc:"Watching each other evolve while the friendship stayed constant." },
];

/* ═══════════════════════════════════════════════════════════════
   STARS — generated once, memoised
══════════════════════════════════════════════════════════════ */
type Star = { id: number; x: number; y: number; size: number; dur: string; delay: string };

const Stars = memo(function Stars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(Array.from({ length: 60 }, (_, i) => ({
      id:    i,
      x:     Math.random() * 100,
      y:     Math.random() * 65,
      size:  Math.random() * 2.5 + 0.5,
      dur:   `${1.8 + Math.random() * 2.5}s`,
      delay: `${Math.random() * 4}s`,
    })));
  }, []);

  if (stars.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {stars.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-star-twinkle"
          style={{
            left:           `${s.x}%`,
            top:            `${s.y}%`,
            width:          s.size,
            height:         s.size,
            ['--dur' as string]: s.dur,
            animationDelay: s.delay,
            willChange:     'opacity, transform',
          }}
        />
      ))}
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   FIREFLIES — capped at 12, stable
══════════════════════════════════════════════════════════════ */
type FFPos = { left: number; top: number; fx: number; fy: number; dur: number; delay: number; col: string };
const FF_COLORS = ['#fbbf24','#ff6eb4','#c084fc','#86efac','#67e8f9'];

const Firefly = memo(function Firefly({ index }: { index: number }) {
  // Stable random value per index (not per render)
  const pos = useMemo<FFPos>(() => ({
    left:  (index * 7.3 + 5) % 95,
    top:   (index * 11.7 + 8) % 88,
    fx:    ((index % 5) - 2) * 55,
    fy:    -(50 + (index % 4) * 35),
    dur:   6 + (index % 7),
    delay: index * 0.55,
    col:   FF_COLORS[index % FF_COLORS.length],
  }), [index]);

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left:       `${pos.left}%`,
        top:        `${pos.top}%`,
        width:      5,
        height:     5,
        borderRadius:'50%',
        background: pos.col,
        boxShadow:  `0 0 8px 3px ${pos.col}88`,
        animation:  `firefly-move ${pos.dur}s ease-in-out ${pos.delay}s infinite`,
        ['--fx' as string]: `${pos.fx}px`,
        ['--fy' as string]: `${pos.fy}px`,
        willChange: 'transform, opacity',
        zIndex:     2,
      }}
    />
  );
});

const FIREFLY_COUNT = 12; // reduced from 18
const Fireflies = memo(function Fireflies() {
  return (
    <>
      {Array.from({ length: FIREFLY_COUNT }, (_, i) => (
        <Firefly key={i} index={i} />
      ))}
    </>
  );
});

/* ═══════════════════════════════════════════════════════════════
   STRING LIGHTS — pure CSS, no JS
══════════════════════════════════════════════════════════════ */
const LIGHT_COUNT = 20;
const LIGHT_COLORS = ['#fbbf24','#ff6eb4','#c084fc','#67e8f9','#86efac'];
const StringLights = memo(function StringLights() {
  const lights = useMemo(
    () => Array.from({ length: LIGHT_COUNT }, (_, i) => ({
      pct:  (i / (LIGHT_COUNT - 1)) * 100,
      yOff: Math.sin((i / (LIGHT_COUNT - 1)) * Math.PI * 2) * 10 + 24,
      col:  LIGHT_COLORS[i % LIGHT_COLORS.length],
      dur:  1.6 + (i % 5) * 0.35,
      delay:(i * 0.16).toFixed(2),
    })),
    []
  );
  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none z-[20]" style={{ height: 80 }} aria-hidden="true">
      <svg width="100%" height="80" className="absolute top-0 left-0" preserveAspectRatio="none">
        <path d="M0,20 Q250,40 500,20 Q750,0 1000,20 Q1250,40 1500,20 Q1750,0 2000,20"
          stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none" />
      </svg>
      {lights.map((l, i) => (
        <div key={i} className="absolute rounded-sm"
          style={{
            left:     `${l.pct}%`,
            top:      l.yOff,
            width:    6,
            height:   9,
            background: l.col,
            boxShadow:`0 0 10px 3px ${l.col}99`,
            animation:`star-twinkle ${l.dur}s ease-in-out infinite`,
            animationDelay:`${l.delay}s`,
            willChange:'opacity, transform',
          }}
        />
      ))}
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   FLOATING HEART
══════════════════════════════════════════════════════════════ */
const HEART_EMOJIS = ['💗','💖','💝','💕','💓','💞'];
const FloatingHeart = memo(function FloatingHeart({
  x, emoji, onDone
}: { x: number; emoji: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      className="fixed pointer-events-none text-2xl"
      style={{ left: x, bottom: '18%', animation: 'heart-float 2.2s ease-out forwards', zIndex: 50, willChange:'transform,opacity' }}
    >
      {emoji}
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   SPARKLE BURST
══════════════════════════════════════════════════════════════ */
const SPARKLE_CHARS = ['✦','✧','⋆','✨','★','✩'];
const SparkleBurst = memo(function SparkleBurst({ x, y }: { x: number; y: number }) {
  return (
    <>
      {SPARKLE_CHARS.map((s, i) => (
        <div key={i} className="fixed pointer-events-none text-yellow-300 text-lg"
          style={{
            left:     x + Math.cos((i / SPARKLE_CHARS.length) * Math.PI * 2) * 42,
            top:      y + Math.sin((i / SPARKLE_CHARS.length) * Math.PI * 2) * 42,
            animation:'sparkle-burst 1s ease-out forwards',
            animationDelay:`${i * 0.07}s`,
            zIndex:   50,
            willChange:'transform,opacity',
          }}>
          {s}
        </div>
      ))}
    </>
  );
});

/* ═══════════════════════════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════════════════════════ */
const Typewriter = memo(function Typewriter({ text, speed = 15 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done,      setDone]      = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i >= text.length) { clearInterval(timer); setDone(true); return; }
      setDisplayed(text.slice(0, ++i));
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-4 bg-pink-400 ml-0.5 align-middle"
          style={{ animation: 'typewriter-cursor 0.7s ease-in-out infinite',
            boxShadow: '0 0 8px rgba(255,110,180,0.9)' }} />
      )}
    </span>
  );
});

/* ═══════════════════════════════════════════════════════════════
   LETTER MODAL
══════════════════════════════════════════════════════════════ */
const LetterModal = memo(function LetterModal({ onClose }: { onClose: () => void }) {
  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(8,2,20,0.88)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      {showConfetti && (
        <Confetti
          numberOfPieces={200}
          recycle={false}
          colors={['#ff6eb4','#c084fc','#fbbf24','#fff','#86efac']}
        />
      )}

      <div
        className="relative max-w-lg w-full animate-envelope-open rounded-3xl overflow-hidden"
        style={{
          background:     'linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))',
          backdropFilter: 'blur(32px)',
          border:         '1px solid rgba(255,110,180,0.3)',
          boxShadow:      '0 0 70px rgba(255,110,180,0.3),0 0 130px rgba(124,58,237,0.2)',
        }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Birthday letter"
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute pointer-events-none text-lg"
            style={{ left:`${8+i*16}%`, top:-24,
              animation:`heart-float ${2.2+i*0.4}s ease-out infinite`,
              animationDelay:`${i*0.45}s` }}>
            {HEART_EMOJIS[i]}
          </div>
        ))}

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2 animate-float-gentle">💌</div>
            <h3 className="font-script text-3xl gradient-text-pink text-glow-pink">A Letter From The Heart</h3>
          </div>
          <div className="rounded-2xl p-5 max-h-72 overflow-y-auto"
            style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)' }}>
            <p className="font-poppins text-white/90 leading-relaxed text-sm whitespace-pre-line">
              <Typewriter text={LETTER_TEXT} speed={12} />
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-6 w-full btn-shimmer text-white font-poppins font-bold py-3 rounded-2xl hover:scale-105 transition-all shadow-lg"
          >
            Close with Love 💖
          </button>
        </div>
      </div>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   CATCH THE CAT GAME
══════════════════════════════════════════════════════════════ */
const CatchTheCatGame = memo(function CatchTheCatGame() {
  const [pos,      setPos]      = useState({ x: 40, y: 40 });
  const [score,    setScore]    = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [phase,    setPhase]    = useState<'idle'|'playing'|'ended'>('idle');

  useEffect(() => {
    if (phase !== 'playing') return;
    const mv = setInterval(() => {
      setPos({ x: 5 + Math.random() * 82, y: 8 + Math.random() * 80 });
    }, 850);
    return () => clearInterval(mv);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (timeLeft <= 0) { setPhase('ended'); return; }
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [phase, timeLeft]);

  const handleCatch = useCallback(() => {
    setScore(s => s + 1);
    setPos({ x: 5 + Math.random() * 82, y: 8 + Math.random() * 80 });
  }, []);

  const resetGame = useCallback(() => {
    setScore(0); setTimeLeft(30); setPhase('idle');
  }, []);

  const msg = score >= 15 ? 'LEGENDARY CATCHER! Karishma would be proud 👑'
    : score >= 8  ? 'YOU ARE A CAT WHISPERER! 🎉'
    : score >= 4  ? 'Not bad! The cat respects you now 🐱'
    : 'The cat is WAY too fast for you 😂';

  return (
    <div className="rounded-3xl p-6 text-center"
      style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))',
        backdropFilter:'blur(24px)', border:'1px solid rgba(255,110,180,0.25)',
        boxShadow:'0 8px 32px rgba(124,58,237,0.18)' }}>
      <h3 className="font-script text-3xl gradient-text-pink mb-4">🐱 Catch The Cat!</h3>

      {phase === 'idle' && (
        <>
          <p className="text-white/65 font-poppins mb-5 text-sm">Tap the cat as many times as you can in 30 seconds!</p>
          <button onClick={() => setPhase('playing')}
            className="btn-shimmer text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-all">
            Start! 🚀
          </button>
        </>
      )}

      {phase === 'playing' && (
        <>
          <div className="flex justify-between rounded-2xl px-4 py-2 mb-4 text-sm font-bold font-poppins"
            style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)' }}>
            <span className="text-pink-300">Score: {score} 🐾</span>
            <span className={timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-yellow-300'}>{timeLeft}s ⏱</span>
          </div>
          <div className="relative rounded-2xl overflow-hidden" style={{ height:290,
            background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={handleCatch}
              className="absolute text-5xl cursor-pointer hover:scale-125"
              style={{
                left:`${pos.x}%`, top:`${pos.y}%`,
                transform:'translate(-50%,-50%)',
                transition:'left 0.4s cubic-bezier(0.175,0.885,0.32,1.275),top 0.4s cubic-bezier(0.175,0.885,0.32,1.275)',
                filter:'drop-shadow(0 0 14px rgba(255,110,180,0.7))',
                willChange:'left,top',
              }}
              aria-label="Catch the cat"
            >
              🐱
            </button>
          </div>
        </>
      )}

      {phase === 'ended' && (
        <div className="animate-zoom-in">
          <div className="text-7xl mb-4">{score>=15?'🏆':score>=8?'🎉':score>=4?'😸':'😹'}</div>
          <p className="text-3xl font-bold gradient-text-pink mb-2">{score} catches!</p>
          <p className="text-white/75 font-poppins text-lg mb-6">{msg}</p>
          <button onClick={resetGame}
            className="btn-shimmer text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-all">
            Play Again! 🔄
          </button>
        </div>
      )}
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   GLASS CARD helper
══════════════════════════════════════════════════════════════ */
function GlassCard({ children, className = '', glow = 'pink' }: {
  children: React.ReactNode; className?: string; glow?: 'pink'|'purple'|'gold';
}) {
  const glowMap = { pink:'rgba(255,110,180,0.2)', purple:'rgba(124,58,237,0.2)', gold:'rgba(251,191,36,0.2)' };
  return (
    <div className={`rounded-2xl ${className}`}
      style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))',
        backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
        border:'1px solid rgba(255,110,180,0.22)',
        boxShadow:`0 8px 32px ${glowMap[glow]}` }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGES (memoised sub-components)
══════════════════════════════════════════════════════════════ */
const HomePage = memo(function HomePage({
  onOpenLetter, onSurprise, onFireworks, onAddHearts, catZoomed
}: {
  onOpenLetter: (e?: React.MouseEvent) => void;
  onSurprise:   () => void;
  onFireworks:  () => void;
  onAddHearts:  () => void;
  catZoomed:    boolean;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 page-enter">
      <div className="grid md:grid-cols-2 gap-10 items-center" style={{ minHeight:'calc(100vh - 10rem)' }}>

        {/* Left */}
        <div className="space-y-7 animate-slide-up">
          <div>
            <p className="text-pink-400/55 font-poppins text-xs tracking-[4px] uppercase mb-4">✦ A Magical Celebration ✦</p>
            <h1 className="font-script leading-none animate-hero-title"
              style={{ fontSize:'clamp(3.2rem,8vw,5.8rem)',
                background:'linear-gradient(135deg,#ff6eb4,#ffa8d5,#fbbf24)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                filter:'drop-shadow(0 0 18px rgba(255,110,180,0.55))' }}>
              Happy Birthday
            </h1>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="font-script text-glow-gold"
                style={{ fontSize:'clamp(2.8rem,7vw,5rem)', color:'#fbbf24' }}>Panda</span>
              <span className="text-5xl animate-float-gentle">🐼</span>
              <span className="text-4xl animate-float-gentle" style={{animationDelay:'.6s'}}>💖</span>
            </div>
          </div>

          <div className="inline-block rounded-full px-5 py-2"
            style={{ background:'rgba(255,110,180,0.12)', border:'1px solid rgba(255,110,180,0.28)' }}>
            <p className="text-pink-300 font-poppins text-sm">🎀 Karishma's Special Day</p>
          </div>

          <p className="text-white/65 font-poppins text-base leading-relaxed max-w-md">
            Celebrating the most amazing person who makes every day beautiful ✨
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { val:'20', label:'Amazing Years', col:'#fbbf24' },
              { val:'∞',  label:'Memories',      col:'#ff6eb4' },
              { val:'1',  label:'Best Friend',    col:'#c084fc' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4 text-center hover:scale-105 transition-transform cursor-default"
                style={{ background:'rgba(255,255,255,0.06)', backdropFilter:'blur(16px)',
                  border:`1px solid ${s.col}33`, boxShadow:`0 0 20px ${s.col}18` }}>
                <p className="text-3xl font-bold mb-1" style={{ color:s.col, textShadow:`0 0 16px ${s.col}99` }}>{s.val}</p>
                <p className="text-xs text-white/55 font-poppins">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button onClick={onOpenLetter}
              className="btn-shimmer text-white font-poppins font-bold px-7 py-3 rounded-full hover:scale-105 transition-transform shadow-lg animate-pulsate-glow">
              💌 Open The Letter ✨
            </button>
            <button onClick={onSurprise}
              className="font-poppins font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform text-white"
              style={{ background:'rgba(255,255,255,0.08)', backdropFilter:'blur(16px)',
                border:'1px solid rgba(255,110,180,0.35)' }}>
              Open Surprise 🎁
            </button>
          </div>

          <div className="flex gap-3 items-center flex-wrap">
            {[
              { icon:'🎆', fn: onFireworks, label:'Fireworks' },
              { icon:'🐾', fn: onSurprise,  label:'Surprise'  },
              { icon:'💖', fn: onAddHearts, label:'Hearts'    },
            ].map(b => (
              <button key={b.icon} onClick={b.fn} aria-label={b.label}
                className="w-11 h-11 rounded-full flex items-center justify-center text-xl hover:scale-110 active:scale-95 transition-transform"
                style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.15)' }}>
                {b.icon}
              </button>
            ))}
            <span className="text-white/35 font-poppins text-xs">Tap for magic!</span>
          </div>
        </div>

        {/* Right — Cat */}
        <div className="flex justify-center items-center relative animate-cat-enter">
          <div className="absolute pointer-events-none"
            style={{ width:'130%', height:'130%', borderRadius:'50%',
              background:'radial-gradient(circle,rgba(255,110,180,0.11),rgba(124,58,237,0.07) 50%,transparent 70%)',
              filter:'blur(40px)' }} />

          <button
            onClick={onOpenLetter}
            className="relative transition-all duration-500 select-none cursor-pointer group"
            style={{ filter:catZoomed ? 'blur(3px) brightness(1.4)' : 'none',
              transform:catZoomed ? 'scale(1.07)' : 'scale(1)' }}
            aria-label="Open birthday letter"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cat-hero.png"
              alt="Birthday Cat carrying a love letter"
              className="w-full object-contain animate-breathe"
              style={{ maxWidth:460, maxHeight:'70vh',
                filter:'drop-shadow(0 0 32px rgba(255,110,180,0.5)) drop-shadow(0 0 65px rgba(124,58,237,0.28))' }}
              loading="eager"
              decoding="async"
            />

            <div className="absolute -top-5 -right-4 rounded-2xl rounded-br-none px-4 py-3 text-sm font-poppins font-semibold text-white animate-float-gentle max-w-44 text-center"
              style={{ background:'rgba(255,255,255,0.13)', backdropFilter:'blur(20px)',
                border:'1px solid rgba(255,110,180,0.35)',
                boxShadow:'0 0 24px rgba(255,110,180,0.28)', animationDelay:'1.2s' }}>
              I have a special letter for you! 💌
            </div>

            {!catZoomed && (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                <p className="text-pink-300/60 font-poppins text-xs animate-pulse text-center whitespace-nowrap">
                  ✦ Click me ✦
                </p>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 pb-10 mt-4">
        <p className="text-white/30 font-poppins text-xs tracking-[3px] uppercase">Scroll to explore</p>
        <div className="text-white/40 animate-bounce text-lg" aria-hidden="true">↓</div>
      </div>
    </div>
  );
});

const MessagesPage = memo(function MessagesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 page-enter">
      <div className="text-center mb-10">
        <div className="text-6xl mb-4 animate-float-gentle" aria-hidden="true">💌</div>
        <h2 className="font-script text-5xl gradient-text-pink text-glow-pink">A Special Message</h2>
      </div>
      <GlassCard className="p-8 space-y-5">
        {[
          "Being your best friend in 2025 honestly made this year special for me. Not because we talk every single day, but because I know I always have you — someone I can reach out to anytime, laugh with, and just be completely myself around.",
          "Even if we don't talk often, nothing ever changes between us. That's what makes our friendship so real and rare. You're one of those people who just makes everything better without even trying.",
          "And yes… you are actually too beautiful, inside and out (had to say it 😌✨)",
          "Wishing you a day as incredible as you are! May this year bring you happiness, success, endless fun, and all your favourite things. More laughs, more memories, and definitely more chaos together.",
          "I'll always be there for you — whether you need a friend, a cheerleader, or even a brother — I'll try my best, always 💝",
        ].map((para, i) => (
          <p key={i} className="text-white/85 font-poppins leading-relaxed text-sm">{para}</p>
        ))}
        <div className="pt-4 text-center space-y-3">
          <p className="font-script text-3xl gradient-text-pink">Happy 20th Birthday Panda 🐼✨</p>
          <div className="flex justify-center gap-2 text-2xl" aria-hidden="true">
            {['💖','🌟','✨','💝','🎂'].map((e, i) => (
              <span key={i} className="animate-float-gentle" style={{animationDelay:`${i*.3}s`}}>{e}</span>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
});

const MemoriesPage = memo(function MemoriesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 page-enter">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4 animate-float-gentle" aria-hidden="true">🌸</div>
        <h2 className="font-script text-5xl gradient-text-pink text-glow-pink">Memory Lane</h2>
        <p className="text-white/45 font-poppins mt-2 text-sm">Cherishing every beautiful moment</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {MEMORY_CARDS.map((m, i) => (
          <div key={i} className="rounded-2xl p-6 hover:scale-[1.03] transition-transform cursor-default group"
            style={{ background:'rgba(255,255,255,0.06)', backdropFilter:'blur(20px)',
              border:'1px solid rgba(255,110,180,0.2)', boxShadow:'0 0 20px rgba(124,58,237,0.1)' }}>
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">{m.emoji}</div>
            <h3 className="font-poppins font-bold text-pink-300 mb-2">{m.title}</h3>
            <p className="text-white/60 font-poppins text-sm leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

const GamesPage = memo(function GamesPage({ onSurprise }: { onSurprise: () => void }) {
  const COMING_SOON = [
    {name:'Birthday Quiz 🎯',  emoji:'❓'},
    {name:'Memory Match 🃏',  emoji:'🎴'},
    {name:'Guess The Song 🎵', emoji:'🎶'},
    {name:'Wish Maker ⭐',    emoji:'🌠'},
  ];
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 page-enter">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4 animate-float-gentle" aria-hidden="true">🎮</div>
        <h2 className="font-script text-5xl gradient-text-pink text-glow-pink">Fun Games</h2>
      </div>
      <CatchTheCatGame />
      <div className="grid grid-cols-2 gap-4 mt-6">
        {COMING_SOON.map((g, i) => (
          <button key={i} onClick={onSurprise}
            className="rounded-2xl p-6 text-center hover:scale-105 transition-transform group"
            style={{ background:'rgba(255,255,255,0.06)', backdropFilter:'blur(20px)',
              border:'1px solid rgba(124,58,237,0.25)' }}>
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform" aria-hidden="true">{g.emoji}</div>
            <p className="font-poppins font-semibold text-white/80 text-sm">{g.name}</p>
            <p className="text-xs text-white/35 mt-1">Coming soon!</p>
          </button>
        ))}
      </div>
    </div>
  );
});

const SurprisesPage = memo(function SurprisesPage({
  onFireworks, onSurprise, onOpenLetter, onAddHearts, onSparks
}: {
  onFireworks:  () => void;
  onSurprise:   () => void;
  onOpenLetter: () => void;
  onAddHearts:  () => void;
  onSparks:     (e: React.MouseEvent) => void;
}) {
  const BUTTONS = [
    { label:'Confetti Blast 🎊',    fn: onFireworks  },
    { label:'Sweet Message 💬',     fn: onSurprise   },
    { label:'Open Letter 💌',       fn: onOpenLetter },
    { label:'Rain Hearts ❤️',       fn: onAddHearts  },
    { label:'Magic Sparkles ✨',    fn: onSparks     },
    { label:'Fireworks! 🎆',        fn: onFireworks  },
  ];
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 page-enter">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4 animate-float-gentle" aria-hidden="true">🎁</div>
        <h2 className="font-script text-5xl gradient-text-pink text-glow-pink">Surprises!</h2>
        <p className="text-white/45 font-poppins mt-2 text-sm">Tap anything for a magical moment</p>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-8">
        {BUTTONS.map((s, i) => (
          <button key={i} onClick={s.fn as React.MouseEventHandler}
            className="rounded-2xl p-6 text-center font-poppins font-bold text-white/90 hover:scale-105 active:scale-95 transition-transform"
            style={{ background:'rgba(255,255,255,0.07)', backdropFilter:'blur(20px)',
              border:'1px solid rgba(255,110,180,0.28)', boxShadow:'0 0 18px rgba(255,110,180,0.08)' }}>
            {s.label}
          </button>
        ))}
      </div>

      <GlassCard className="p-10 text-center">
        <div className="flex justify-center gap-3 text-4xl mb-5" aria-hidden="true">
          {['🎂','🎉','🐼','💖','✨'].map((e, i) => (
            <span key={i} className="animate-float-gentle" style={{animationDelay:`${i*.3}s`}}>{e}</span>
          ))}
        </div>
        <h3 className="font-script text-4xl gradient-text-pink mb-3">Here's to You, Karishma!</h3>
        <p className="text-white/65 font-poppins text-sm leading-relaxed max-w-md mx-auto mb-7">
          May your 20th year be filled with everything that makes your heart sing.
          You deserve every bit of joy the universe has to offer. 🌟
        </p>
        <button
          onClick={() => { onFireworks(); onSurprise(); }}
          className="btn-shimmer text-white font-poppins font-bold px-9 py-3.5 rounded-full hover:scale-105 transition-transform shadow-xl"
        >
          🎆 Launch the Finale! 🎆
        </button>
      </GlassCard>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function BirthdayWebsite() {
  const [page,       setPage]       = useState<PageType>('home');
  const [showLetter, setShowLetter] = useState(false);
  const [catZoomed,  setCatZoomed]  = useState(false);
  const [hearts,     setHearts]     = useState<{ id: number; x: number; emoji: string }[]>([]);
  const [sparks,     setSparks]     = useState<{ id: number; x: number; y: number } | null>(null);
  const [surprise,   setSurprise]   = useState<string | null>(null);
  const [fireworks,  setFireworks]  = useState(false);
  const hIdRef     = useRef(0);
  const surpriseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fireworkRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Periodic hearts on home only */
  useEffect(() => {
    if (page !== 'home') return;
    const iv = setInterval(() => {
      const id = ++hIdRef.current;
      const emoji = HEART_EMOJIS[id % HEART_EMOJIS.length];
      setHearts(h => [...h.slice(-6), { id, x: 10 + Math.random() * 80, emoji }]);
    }, 3500);
    return () => clearInterval(iv);
  }, [page]);

  /* Cleanup surprise timer */
  useEffect(() => () => {
    if (surpriseRef.current) clearTimeout(surpriseRef.current);
    if (fireworkRef.current) clearTimeout(fireworkRef.current);
  }, []);

  const openLetter = useCallback((e?: React.MouseEvent) => {
    setCatZoomed(true);
    if (e) setSparks({ id: Date.now(), x: e.clientX, y: e.clientY });
    setTimeout(() => setShowLetter(true), 650);
  }, []);

  const closeLetter = useCallback(() => {
    setShowLetter(false);
    setCatZoomed(false);
  }, []);

  const showSurprise = useCallback(() => {
    if (surpriseRef.current) clearTimeout(surpriseRef.current);
    setSurprise(SURPRISES[Math.floor(Math.random() * SURPRISES.length)]);
    surpriseRef.current = setTimeout(() => setSurprise(null), 3800);
  }, []);

  const fireFireworks = useCallback(() => {
    if (fireworkRef.current) clearTimeout(fireworkRef.current);
    setFireworks(true);
    fireworkRef.current = setTimeout(() => setFireworks(false), 5500);
  }, []);

  const addHearts = useCallback(() => {
    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        const id = ++hIdRef.current;
        const emoji = HEART_EMOJIS[id % HEART_EMOJIS.length];
        setHearts(h => [...h.slice(-12), { id, x: 5 + Math.random() * 90, emoji }]);
      }, i * 180);
    }
  }, []);

  const handleSparks = useCallback((e: React.MouseEvent) => {
    setSparks({ id: Date.now(), x: e.clientX, y: e.clientY });
  }, []);

  const removeHeart = useCallback((id: number) => {
    setHearts(hs => hs.filter(h => h.id !== id));
  }, []);

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{ background:'linear-gradient(145deg,#0d0618 0%,#1a0a2e 45%,#0a1040 100%)' }}
    >
      {/* ─── SINGLE AUDIO SYSTEM ─── */}
      <BackgroundMusic />

      {/* ─── BACKGROUND ─── */}
      <Stars />
      <StringLights />
      <Fireflies />
      <Sparkles />

      {/* Ambient glow orbs (pure CSS, no JS) */}
      <div className="fixed pointer-events-none z-0" style={{ inset:0 }} aria-hidden="true">
        <div style={{ position:'absolute', width:550, height:550, borderRadius:'50%',
          left:'58%', top:'18%',
          background:'radial-gradient(circle,rgba(124,58,237,0.11),transparent 70%)',
          filter:'blur(60px)' }} />
        <div style={{ position:'absolute', width:450, height:450, borderRadius:'50%',
          left:'8%', top:'48%',
          background:'radial-gradient(circle,rgba(255,110,180,0.09),transparent 70%)',
          filter:'blur(50px)' }} />
      </div>

      {/* ─── FLOATING HEARTS ─── */}
      {hearts.map(h => (
        <FloatingHeart
          key={h.id}
          x={h.x}
          emoji={h.emoji}
          onDone={() => removeHeart(h.id)}
        />
      ))}

      {/* ─── SPARKS ─── */}
      {sparks && <SparkleBurst key={sparks.id} x={sparks.x} y={sparks.y} />}

      {/* ─── SURPRISE TOAST ─── */}
      {surprise && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 rounded-2xl px-6 py-4 text-center animate-zoom-in max-w-xs w-full"
          style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(24px)',
            border:'1px solid rgba(255,110,180,0.35)', boxShadow:'0 0 40px rgba(255,110,180,0.32)' }}>
          <p className="text-white font-poppins font-semibold text-sm">{surprise}</p>
        </div>
      )}

      {/* ─── FIREWORKS ─── */}
      {fireworks && (
        <Confetti
          numberOfPieces={280}
          recycle={false}
          colors={['#ff6eb4','#c084fc','#fbbf24','#ffffff','#86efac','#67e8f9']}
        />
      )}

      {/* ─── LETTER MODAL ─── */}
      {showLetter && <LetterModal onClose={closeLetter} />}

      {/* ─── NAV ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40"
        style={{ background:'rgba(10,4,22,0.72)', backdropFilter:'blur(20px)',
          borderBottom:'1px solid rgba(255,255,255,0.08)', paddingTop: 48 }}
        aria-label="Site navigation"
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-script text-xl gradient-text-pink">Karishma's Day</span>
            <span className="text-xl" aria-hidden="true">🐼</span>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setPage(id)}
                aria-current={page === id ? 'page' : undefined}
                className={`px-3 py-1.5 rounded-lg text-xs font-poppins font-semibold transition-all ${
                  page === id
                    ? 'text-white shadow-lg'
                    : 'text-white/65 hover:text-white hover:bg-white/10'
                }`}
                style={page === id ? {
                  background:'linear-gradient(135deg,#ec4899,#7c3aed)',
                  boxShadow: '0 0 14px rgba(236,72,153,0.48)',
                } : {}}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── PAGE CONTENT ─── */}
      <main className="relative z-10 pt-28 min-h-screen">
        {page === 'home' && (
          <HomePage
            onOpenLetter={openLetter}
            onSurprise={showSurprise}
            onFireworks={fireFireworks}
            onAddHearts={addHearts}
            catZoomed={catZoomed}
          />
        )}
        {page === 'messages'  && <MessagesPage />}
        {page === 'memories'  && <MemoriesPage />}
        {page === 'games'     && <GamesPage onSurprise={showSurprise} />}
        {page === 'surprises' && (
          <SurprisesPage
            onFireworks={fireFireworks}
            onSurprise={showSurprise}
            onOpenLetter={() => openLetter()}
            onAddHearts={addHearts}
            onSparks={handleSparks}
          />
        )}
      </main>
    </div>
  );
}
