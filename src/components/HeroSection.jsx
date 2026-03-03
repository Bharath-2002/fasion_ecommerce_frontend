import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO_IMAGE } from './CardStackEntrance';

export default function HeroSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Image continues the zoom that started during the card expansion
  const imageScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.18]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.22], [0, -24]);
  const overlayOpacity = useTransform(scrollYProgress, [0.18, 0.48], [0, 1]);
  const overlayY = useTransform(scrollYProgress, [0.18, 0.48], [8, 0]);
  // Dark overlay deepens as image fills screen
  const dimOpacity = useTransform(scrollYProgress, [0, 0.5], [0.35, 0.62]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        height: '200vh',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Hero image — same as the Heritage card, zooms on scroll */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            scale: imageScale,
            transformOrigin: 'center center',
          }}
        >
          <img
            src={HERO_IMAGE}
            alt="Heritage Kanchipuram Silk"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </motion.div>

        {/* Darkening overlay — deepens on scroll */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#000',
            opacity: dimOpacity,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Ivory gradient bleed at very bottom — grounds it */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '180px',
            background: 'linear-gradient(to top, #EAEBE0 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Initial headline — fades out on scroll */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '14%',
            left: '50%',
            x: '-50%',
            opacity: headlineOpacity,
            y: headlineY,
            zIndex: 3,
            textAlign: 'center',
            pointerEvents: 'none',
            width: 'max-content',
            maxWidth: '90vw',
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#DEC8B5',
              fontWeight: 300,
              marginBottom: '16px',
            }}
          >
            Tamil Nadu · Since 1947
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(40px, 7vw, 88px)',
              fontWeight: 400,
              color: '#EAEBE0',
              letterSpacing: '0.04em',
              lineHeight: 1.0,
              margin: 0,
            }}
          >
            Woven in
            <br />
            <em style={{ fontStyle: 'italic', color: '#DEC8B5' }}>Gold</em>
          </h1>
          <div
            style={{
              width: '48px',
              height: '1px',
              background: '#DEC8B5',
              margin: '20px auto 0',
              opacity: 0.6,
            }}
          />
        </motion.div>

        {/* Scroll-reveal overlay text — appears as image becomes immersive */}
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
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(22px, 4vw, 52px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#EAEBE0',
              textAlign: 'center',
              letterSpacing: '0.04em',
              lineHeight: 1.3,
              padding: '0 24px',
            }}
          >
            Each thread carries
            <br />a thousand years
          </p>
          <div
            style={{
              width: '1px',
              height: '56px',
              background: '#DEC8B5',
              margin: '28px auto 0',
              opacity: 0.5,
            }}
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '50%',
            x: '-50%',
            opacity: headlineOpacity,
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#DEC8B5',
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
              height: '40px',
              background: '#DEC8B5',
              opacity: 0.5,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
