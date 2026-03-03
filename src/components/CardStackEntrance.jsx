import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const cards = [
  {
    id: 1,
    image: 'https://i.pinimg.com/1200x/d7/78/a0/d778a097299ba913f2cd7b048a4dd6f5.jpg',
    label: 'Kanjivaram',
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/736x/e5/33/47/e533470ae3fa4c0f7d58ad0897e7f335.jpg',
    label: 'Bridal',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?w=800&q=80',
    label: 'Heritage',
  },
];

export const HERO_IMAGE = cards[cards.length - 1].image;

function useViewport() {
  const [vp, setVp] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900,
  }));
  useEffect(() => {
    const handler = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return vp;
}

export default function CardStackEntrance({ onComplete }) {
  const [phase, setPhase] = useState('rising');
  const vp = useViewport();

  // Identical to HeroSection's initW / initH
  const heroW = Math.min(252, vp.w * 0.56);
  const heroH = Math.min(360, vp.h * 0.54);

  const isExiting = phase === 'exit';

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('headline'), 1800);
    const t2 = setTimeout(() => setPhase('exit'), 3200);
    const t3 = setTimeout(() => onComplete?.(), 3900);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  const exitEase = [0.22, 1, 0.36, 1];
  const bgTransition = { duration: 0.55, ease: 'easeOut' };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, overflow: 'hidden' }}>

      {/* Background */}
      <motion.div
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={bgTransition}
        style={{ position: 'absolute', inset: 0, background: '#EAEBE0' }}
      />

      {/* Top accent */}
      <motion.div
        animate={{ opacity: isExiting ? 0 : 0.4 }}
        transition={bgTransition}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#9D683B' }}
      />

      {/* Centered layout */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Card stack — size locked to hero dimensions, no position shift on exit */}
        <div style={{ position: 'relative', width: heroW, height: heroH }}>
          {cards.map((card, i) => {
            const isTop = i === cards.length - 1;
            const offset = (cards.length - 1 - i) * 14;
            const rotation = i === 0 ? -1.5 : i === 1 ? 0 : 1.5;

            return (
              <motion.div
                key={card.id}
                initial={{ y: 140 + i * 30, opacity: 0, rotate: rotation }}
                animate={{
                  y: isTop ? 0 : -offset,
                  opacity: isTop ? 1 : isExiting ? 0 : 1,
                  rotate: isTop ? (isExiting ? 0 : rotation * 0.4) : rotation * 0.4,
                }}
                transition={
                  isExiting
                    ? { duration: isTop ? 0.55 : 0.25, ease: exitEase }
                    : { duration: 1.4, delay: i * 0.12, ease: exitEase }
                }
                style={{
                  position: 'absolute',
                  inset: 0,
                  overflow: 'hidden',
                  borderRadius: 12,
                  zIndex: isTop ? 10 : i,
                  // Top card shadow matches HeroSection exactly; others are lighter
                  boxShadow: isTop
                    ? '0 28px 72px rgba(120,55,18,0.24)'
                    : `0 ${8 + i * 4}px ${28 + i * 10}px rgba(157,104,59,${0.08 + i * 0.04})`,
                }}
              >
                <img
                  src={card.image}
                  alt={card.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                    // Top card matches HeroSection's initial imageScale (1.05)
                    transform: isTop ? 'scale(1.05)' : 'none',
                    transformOrigin: 'center center',
                  }}
                />

                {/* Label — fades out for top card on exit */}
                <motion.div
                  animate={{ opacity: isTop && isExiting ? 0 : 0.9 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '10px',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: '#EAEBE0',
                    fontWeight: 300,
                    zIndex: 1,
                    textShadow: '0 1px 6px rgba(0,0,0,0.35)',
                  }}
                >
                  {card.label}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Brand headline */}
        <AnimatePresence>
          {phase === 'headline' && (
            <motion.div
              key="headline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.8, ease: exitEase }}
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
                transition={{ duration: 0.8, ease: exitEase }}
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
      </div>

      {/* Bottom accent */}
      <motion.div
        animate={{ opacity: isExiting ? 0 : 0.4 }}
        transition={bgTransition}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: '#9D683B' }}
      />
    </div>
  );
}
