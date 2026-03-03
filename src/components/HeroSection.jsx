import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO_IMAGE } from './CardStackEntrance';

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
      zIndex: 2,
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

export default function HeroSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // ── Phase 1 (0 → 0.3): side words fade out, card stays centered ──
  const sideTextOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const sideTextX_L = useTransform(scrollYProgress, [0, 0.22], [0, -40]);
  const sideTextX_R = useTransform(scrollYProgress, [0, 0.22], [0, 40]);

  // ── Phase 2 (0.2 → 0.55): card expands to fill screen ──
  // Card width: from centered portrait to full viewport width
  const cardWidth = useTransform(
    scrollYProgress,
    [0.2, 0.55],
    ['min(300px, 68vw)', '96vw']
  );
  const cardHeight = useTransform(
    scrollYProgress,
    [0.2, 0.55],
    ['min(400px, 62vh)', '82vh']
  );
  const cardRadius = useTransform(scrollYProgress, [0.2, 0.5], [6, 16]);
  const cardShadow = useTransform(
    scrollYProgress,
    [0, 0.25],
    [
      '0 24px 64px rgba(157,104,59,0.2)',
      '0 32px 80px rgba(157,104,59,0.28)',
    ]
  );

  // Slight initial zoom on the card image (settle effect from intro)
  // Then continues zooming as card expands
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1.04, 1.15]);

  // ── Phase 3 (0.4 → 0.65): overlay text fades in on the expanded image ──
  const overlayOpacity = useTransform(scrollYProgress, [0.4, 0.62], [0, 1]);
  const overlayY = useTransform(scrollYProgress, [0.4, 0.62], [20, 0]);

  // Dark scrim deepens as card fills screen
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.55], [0.25, 0.52]);

  // Label + border motive fade out as card expands (they're card details, not hero details)
  const cardDetailsOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);

  return (
    <section
      ref={containerRef}
      style={{ position: 'relative', height: '280vh' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#EAEBE0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

        {/* ── LEFT FLANKING TEXT ── */}
        <motion.div
          style={{
            position: 'absolute',
            left: 'clamp(32px, 7vw, 112px)',
            top: '50%',
            y: '-50%',
            opacity: sideTextOpacity,
            x: sideTextX_L,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 5.5vw, 80px)',
              fontWeight: 400,
              color: '#000',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Woven
            <br />
            in
            <br />
            <em style={{ fontStyle: 'italic', color: '#9D683B' }}>Silk</em>
          </h1>
        </motion.div>

        {/* ── RIGHT FLANKING TEXT ── */}
        <motion.div
          style={{
            position: 'absolute',
            right: 'clamp(32px, 7vw, 112px)',
            top: '50%',
            y: '-50%',
            opacity: sideTextOpacity,
            x: sideTextX_R,
            zIndex: 2,
            pointerEvents: 'none',
            textAlign: 'right',
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 5.5vw, 80px)',
              fontWeight: 400,
              color: '#000',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Tamil
            <br />
            Nadu
            <br />
            <em style={{ fontStyle: 'italic', color: '#9D683B' }}>Heritage</em>
          </h1>
        </motion.div>

        {/* ── CENTRAL IMAGE CARD ── */}
        <motion.div
          style={{
            position: 'relative',
            width: cardWidth,
            height: cardHeight,
            borderRadius: cardRadius,
            overflow: 'hidden',
            boxShadow: cardShadow,
            zIndex: 3,
            flexShrink: 0,
          }}
        >
          {/* Image zooms inside */}
          <motion.img
            src={HERO_IMAGE}
            alt="Heritage Kanchipuram Silk"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              scale: imageScale,
              transformOrigin: 'center center',
            }}
          />

          {/* Scrim darkens on expansion */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.48) 100%)',
              opacity: scrimOpacity,
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* Card label — fades out as card expands */}
          <motion.div
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
              opacity: cardDetailsOpacity,
              zIndex: 2,
            }}
          >
            Heritage
          </motion.div>

          {/* Side border lines — fade with card details */}
          <motion.div style={{ opacity: cardDetailsOpacity, position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '16px', left: '16px', bottom: '16px', width: '1px', background: 'rgba(234,235,224,0.22)' }} />
            <div style={{ position: 'absolute', top: '16px', right: '16px', bottom: '16px', width: '1px', background: 'rgba(234,235,224,0.22)' }} />
            <BorderMotive />
          </motion.div>

          {/* ── OVERLAY TEXT — appears on expanded image ── */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: overlayOpacity,
              y: overlayY,
              zIndex: 4,
              pointerEvents: 'none',
              gap: '0px',
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#DEC8B5',
                fontWeight: 300,
                marginBottom: '20px',
              }}
            >
              Tamil Nadu · Since 1947
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(28px, 4.5vw, 60px)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#EAEBE0',
                textAlign: 'center',
                letterSpacing: '0.03em',
                lineHeight: 1.25,
                padding: '0 32px',
                margin: 0,
              }}
            >
              Each thread carries
              <br />a thousand years
            </p>
            <div
              style={{
                width: '1px',
                height: '52px',
                background: '#DEC8B5',
                marginTop: '28px',
                opacity: 0.5,
              }}
            />
          </motion.div>
        </motion.div>

        {/* ── SCROLL INDICATOR — fades with side text ── */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '50%',
            x: '-50%',
            opacity: sideTextOpacity,
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'none',
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#9D683B',
              fontWeight: 300,
            }}
          >
            Scroll
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '1px',
              height: '36px',
              background: '#9D683B',
              opacity: 0.5,
            }}
          />
        </motion.div>

        {/* ── BRAND LABEL — top center, always visible ── */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#9D683B',
            fontWeight: 300,
            zIndex: 6,
            pointerEvents: 'none',
            opacity: 0,  // navbar handles this
          }}
        >
          Kanchi Silks
        </div>

      </div>
    </section>
  );
}
