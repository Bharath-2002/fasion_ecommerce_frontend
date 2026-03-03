import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const cards = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    label: 'Kanjivaram',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
    label: 'Bridal',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?w=800&q=80',
    label: 'Heritage',
  },
];

// Exported so HeroSection can use the same image seamlessly
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

const BorderMotive = () => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40px',
      borderTop: '1px solid rgba(234,235,224,0.35)',
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
  // 'rising' → 'headline' → 'exit'
  const [phase, setPhase] = useState('rising');
  const vp = useViewport();

  // Identical to HeroSection's initW/initH — card size never changes during exit
  const heroW = Math.min(252, vp.w * 0.56);
  const heroH = Math.min(360, vp.h * 0.54);

  const isExiting = phase === 'exit';

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('headline'), 1800);
    const t2 = setTimeout(() => setPhase('exit'), 3200);
    // Unmount after the exit animation completes (0.7 s)
    const t3 = setTimeout(() => onComplete?.(), 3900);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  const exitEase = [0.22, 1, 0.36, 1];
  const bgTransition = { duration: 0.55, ease: 'easeOut' };
  const cardTransition = { duration: 0.65, ease: exitEase };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, overflow: 'hidden' }}>

      {/* ── Background — fades out on exit ── */}
      <motion.div
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={bgTransition}
        style={{ position: 'absolute', inset: 0, background: '#EAEBE0' }}
      />

      {/* ── Top accent ── */}
      <motion.div
        animate={{ opacity: isExiting ? 0 : 0.4 }}
        transition={bgTransition}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#9D683B' }}
      />

      {/* ── Centered layout ── */}
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
        {/* Card stack container — fixed at hero card dimensions from the start */}
        <motion.div
          animate={{
            marginBottom: isExiting ? 0 : phase === 'headline' ? 48 : 0,
          }}
          transition={cardTransition}
          style={{ position: 'relative', width: heroW, height: heroH }}
        >
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
                    ? { duration: isTop ? 0.65 : 0.3, ease: exitEase }
                    : { duration: 1.4, delay: i * 0.12, ease: exitEase }
                }
                style={{
                  position: 'absolute',
                  inset: 0,
                  overflow: 'hidden',
                  borderRadius: 12,
                  zIndex: isTop ? 10 : i,
                  boxShadow: `0 ${8 + i * 4}px ${28 + i * 10}px rgba(157,104,59,${0.1 + i * 0.06})`,
                }}
              >
                <img
                  src={card.image}
                  alt={card.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    // Match HeroSection's objectPosition so the image crop is identical
                    objectPosition: isTop ? 'center top' : 'center',
                    display: 'block',
                  }}
                />

                {/* Gradient overlay — fades out for top card on exit */}
                <motion.div
                  animate={{ opacity: isTop && isExiting ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.42) 100%)',
                  }}
                />

                {/* Label — fades out for top card on exit */}
                <motion.div
                  animate={{ opacity: isTop && isExiting ? 0 : 0.9 }}
                  transition={{ duration: 0.25 }}
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
                    zIndex: 1,
                  }}
                >
                  {card.label}
                </motion.div>

                {/* Side border lines — fade out for top card on exit */}
                <motion.div
                  animate={{ opacity: isTop && isExiting ? 0 : 1 }}
                  transition={{ duration: 0.25 }}
                  style={{ position: 'absolute', top: '16px', left: '16px', bottom: '16px', width: '1px', background: 'rgba(234,235,224,0.22)' }}
                />
                <motion.div
                  animate={{ opacity: isTop && isExiting ? 0 : 1 }}
                  transition={{ duration: 0.25 }}
                  style={{ position: 'absolute', top: '16px', right: '16px', bottom: '16px', width: '1px', background: 'rgba(234,235,224,0.22)' }}
                />

                {/* BorderMotive — fades out for top card on exit */}
                <motion.div
                  animate={{ opacity: isTop && isExiting ? 0 : 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <BorderMotive />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Brand headline */}
        <AnimatePresence>
          {phase === 'headline' && (
            <motion.div
              key="headline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
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

      {/* ── Bottom accent ── */}
      <motion.div
        animate={{ opacity: isExiting ? 0 : 0.4 }}
        transition={bgTransition}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: '#9D683B' }}
      />
    </div>
  );
}
