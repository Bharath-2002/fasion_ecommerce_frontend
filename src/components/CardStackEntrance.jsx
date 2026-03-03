import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Real saree/textile images from Unsplash (free, no auth needed)
export const cards = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    label: 'Kanjivaram',
    accent: '#EAEBE0',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
    label: 'Bridal',
    accent: '#EAEBE0',
  },
  {
    id: 3,
    // Heritage card — this one zooms into the hero
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&q=85',
    label: 'Heritage',
    accent: '#EAEBE0',
  },
];

// The hero image is always the top (last) card
export const HERO_IMAGE = cards[cards.length - 1].image;

const BorderMotive = () => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40px',
      borderTop: '1px solid rgba(234,235,224,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '0 24px',
    }}
  >
    {Array.from({ length: 9 }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === 4 ? '8px' : '4px',
          height: i === 4 ? '8px' : '4px',
          borderRadius: '50%',
          background: '#EAEBE0',
          opacity: i === 4 ? 0.7 : 0.35,
        }}
      />
    ))}
  </div>
);

export default function CardStackEntrance({ onComplete }) {
  // phases: 'rising' → 'settled' → 'headline' → 'expanding' → 'done'
  const [phase, setPhase] = useState('rising');

  useEffect(() => {
    // Cards finish rising → settled
    const t1 = setTimeout(() => setPhase('settled'), 1600);
    // Show headline
    const t2 = setTimeout(() => setPhase('headline'), 1800);
    // Top card begins expanding to fill screen
    const t3 = setTimeout(() => setPhase('expanding'), 3200);
    // Signal parent (main page fades in underneath)
    const t4 = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 4000);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  const isExpanding = phase === 'expanding' || phase === 'done';

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
      {/* Thin top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#9D683B', opacity: 0.4 }} />

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
          const isTop = i === cards.length - 1;
          const offset = (cards.length - 1 - i) * 14;
          const rotation = i === 0 ? -1.5 : i === 1 ? 0 : 1.5;

          return (
            <motion.div
              key={card.id}
              initial={{ y: 140 + i * 30, opacity: 0, rotate: rotation }}
              animate={
                isTop && isExpanding
                  ? {
                      // Expand hero card to fill the entire viewport
                      y: 0,
                      x: 0,
                      rotate: 0,
                      opacity: 1,
                      top: 0,
                      left: 0,
                      width: '100vw',
                      height: '100vh',
                      borderRadius: 0,
                    }
                  : {
                      y: -offset,
                      opacity: 1,
                      rotate: rotation * 0.4,
                    }
              }
              transition={
                isTop && isExpanding
                  ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 1.4, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
              }
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: isTop
                  ? `0 ${8 + i * 4}px ${24 + i * 8}px rgba(157,104,59,${0.12 + i * 0.06})`
                  : `0 ${8 + i * 4}px ${24 + i * 8}px rgba(157,104,59,${0.08 + i * 0.04})`,
                zIndex: isTop ? 10 : i,
              }}
            >
              {/* Real image */}
              <img
                src={card.image}
                alt={card.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />

              {/* Dark overlay for text legibility */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.4) 100%)',
                }}
              />

              {/* Top label */}
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '10px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: '#EAEBE0',
                  fontWeight: 300,
                  opacity: 0.9,
                  zIndex: 1,
                }}
              >
                {card.label}
              </div>

              {/* Thin right border line — saree-inspired */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  bottom: '16px',
                  width: '1px',
                  background: 'rgba(234,235,224,0.25)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  bottom: '16px',
                  width: '1px',
                  background: 'rgba(234,235,224,0.25)',
                }}
              />

              <BorderMotive />
            </motion.div>
          );
        })}
      </div>

      {/* Brand headline — fades in then fades out as card expands */}
      <AnimatePresence>
        {phase === 'headline' && (
          <motion.div
            key="headline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              textAlign: 'center',
              position: 'absolute',
              bottom: '12%',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              initial={{ letterSpacing: '0.1em' }}
              animate={{ letterSpacing: '0.22em' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(26px, 5vw, 50px)',
                fontWeight: 400,
                color: '#000',
                lineHeight: 1.1,
                textTransform: 'uppercase',
              }}
            >
              Kanchi Silks
            </motion.div>
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

      {/* Ivory fade-out overlay — dissolves the intro once card is full-screen */}
      <AnimatePresence>
        {isExpanding && (
          <motion.div
            key="fadeout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{ position: 'absolute', inset: 0, background: '#EAEBE0', zIndex: 20, pointerEvents: 'none' }}
          />
        )}
      </AnimatePresence>

      {/* Bottom accent */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: '#9D683B', opacity: 0.4 }} />
    </div>
  );
}
