import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Curated color palettes for visual card variety using only brand colors
const cards = [
  {
    id: 1,
    bg: 'linear-gradient(135deg, #9D683B 0%, #DEC8B5 100%)',
    label: 'Kanjivaram',
    accent: '#EAEBE0',
  },
  {
    id: 2,
    bg: 'linear-gradient(160deg, #DEC8B5 0%, #9D683B 60%, #000 100%)',
    label: 'Bridal',
    accent: '#EAEBE0',
  },
  {
    id: 3,
    bg: 'linear-gradient(120deg, #EAEBE0 0%, #DEC8B5 50%, #9D683B 100%)',
    label: 'Heritage',
    accent: '#9D683B',
  },
];

const SilkPattern = () => (
  <svg
    width="100%"
    height="100%"
    style={{ position: 'absolute', inset: 0, opacity: 0.08 }}
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern id="silk" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <circle cx="30" cy="30" r="1.5" fill="#9D683B" />
        <circle cx="0" cy="0" r="1.5" fill="#9D683B" />
        <circle cx="60" cy="0" r="1.5" fill="#9D683B" />
        <circle cx="0" cy="60" r="1.5" fill="#9D683B" />
        <circle cx="60" cy="60" r="1.5" fill="#9D683B" />
        <line x1="0" y1="30" x2="60" y2="30" stroke="#9D683B" strokeWidth="0.4" />
        <line x1="30" y1="0" x2="30" y2="60" stroke="#9D683B" strokeWidth="0.4" />
        <rect x="20" y="20" width="20" height="20" fill="none" stroke="#9D683B" strokeWidth="0.3" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#silk)" />
  </svg>
);

const BorderMotive = ({ color }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40px',
      borderTop: `1px solid ${color}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '0 24px',
      opacity: 0.6,
    }}
  >
    {Array.from({ length: 9 }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === 4 ? '8px' : '4px',
          height: i === 4 ? '8px' : '4px',
          borderRadius: '50%',
          background: color,
          opacity: i === 4 ? 1 : 0.5,
        }}
      />
    ))}
  </div>
);

export default function CardStackEntrance({ onComplete }) {
  const [phase, setPhase] = useState('cards'); // 'cards' | 'headline' | 'done'

  useEffect(() => {
    // After cards settle (~1.8s), show headline
    const t1 = setTimeout(() => setPhase('headline'), 1800);
    // After headline (800ms fade), signal done
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#EAEBE0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      {/* Thin top border line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: '#9D683B',
          opacity: 0.4,
        }}
      />

      {/* Card stack */}
      <div
        style={{
          position: 'relative',
          width: 'min(320px, 72vw)',
          height: 'min(420px, 64vh)',
          marginBottom: phase === 'headline' ? '48px' : '0px',
          transition: 'margin 0.8s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {cards.map((card, i) => {
          const offset = (cards.length - 1 - i) * 14;
          const rotation = i === 0 ? -1.5 : i === 1 ? 0 : 1.5;

          return (
            <motion.div
              key={card.id}
              initial={{ y: 120 + i * 30, opacity: 0, rotate: rotation }}
              animate={{ y: -offset, opacity: 1, rotate: rotation * 0.4 }}
              transition={{
                duration: 1.4,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '4px',
                background: card.bg,
                boxShadow: `0 ${8 + i * 4}px ${24 + i * 8}px rgba(157,104,59,${0.12 + i * 0.06})`,
                overflow: 'hidden',
              }}
            >
              <SilkPattern />

              {/* Top label */}
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: card.accent,
                  fontWeight: 300,
                  opacity: 0.8,
                }}
              >
                {card.label}
              </div>

              {/* Center ornament */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -54%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '1px',
                    background: card.accent,
                    opacity: 0.5,
                  }}
                />
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    border: `1px solid ${card.accent}`,
                    transform: 'rotate(45deg)',
                    opacity: 0.7,
                  }}
                />
                <div
                  style={{
                    width: '40px',
                    height: '1px',
                    background: card.accent,
                    opacity: 0.5,
                  }}
                />
              </div>

              <BorderMotive color={card.accent} />
            </motion.div>
          );
        })}
      </div>

      {/* Brand headline */}
      <AnimatePresence>
        {phase === 'headline' && (
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.22em' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              textAlign: 'center',
              position: 'absolute',
              bottom: '14%',
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(28px, 5vw, 52px)',
                fontWeight: 400,
                color: '#000',
                letterSpacing: '0.22em',
                lineHeight: 1.1,
                textTransform: 'uppercase',
              }}
            >
              Kanchi Silks
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 300,
                color: '#9D683B',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                marginTop: '12px',
              }}
            >
              Est. 1947 · Kanchipuram
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thin bottom border */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: '#9D683B',
          opacity: 0.4,
        }}
      />
    </div>
  );
}
