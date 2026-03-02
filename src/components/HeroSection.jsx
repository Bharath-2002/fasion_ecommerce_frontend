import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// SVG silk weave pattern for the hero image stand-in
const HeroSilkVisual = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 900"
    preserveAspectRatio="xMidYMid slice"
    style={{ position: 'absolute', inset: 0 }}
  >
    <defs>
      <radialGradient id="heroGrad" cx="50%" cy="40%" r="70%">
        <stop offset="0%" stopColor="#9D683B" stopOpacity="1" />
        <stop offset="45%" stopColor="#DEC8B5" stopOpacity="1" />
        <stop offset="100%" stopColor="#EAEBE0" stopOpacity="1" />
      </radialGradient>

      <pattern id="weave" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <rect width="24" height="24" fill="none" />
        {/* Horizontal threads */}
        <line x1="0" y1="6" x2="24" y2="6" stroke="rgba(157,104,59,0.25)" strokeWidth="1.5" />
        <line x1="0" y1="18" x2="24" y2="18" stroke="rgba(157,104,59,0.25)" strokeWidth="1.5" />
        {/* Vertical threads */}
        <line x1="6" y1="0" x2="6" y2="24" stroke="rgba(157,104,59,0.18)" strokeWidth="1" />
        <line x1="18" y1="0" x2="18" y2="24" stroke="rgba(157,104,59,0.18)" strokeWidth="1" />
      </pattern>

      <pattern id="zari" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        {/* Gold zari motif */}
        <polygon points="40,5 55,30 75,30 60,47 67,72 40,57 13,72 20,47 5,30 25,30" fill="none" stroke="rgba(157,104,59,0.35)" strokeWidth="0.8" />
        <circle cx="40" cy="40" r="3" fill="rgba(157,104,59,0.3)" />
      </pattern>

      <mask id="heroMask">
        <rect width="800" height="900" fill="white" />
        <rect y="700" width="800" height="200" fill="url(#fadeOut)" />
      </mask>
    </defs>

    {/* Base gradient */}
    <rect width="800" height="900" fill="url(#heroGrad)" />

    {/* Weave texture */}
    <rect width="800" height="900" fill="url(#weave)" opacity="0.6" />

    {/* Zari pattern overlay */}
    <rect width="800" height="900" fill="url(#zari)" opacity="0.9" />

    {/* Border strips — saree pallu style */}
    <rect x="0" y="0" width="8" height="900" fill="rgba(157,104,59,0.5)" />
    <rect x="792" y="0" width="8" height="900" fill="rgba(157,104,59,0.5)" />

    {/* Top zari band */}
    <rect x="0" y="0" width="800" height="80" fill="rgba(157,104,59,0.15)" />
    <line x1="0" y1="80" x2="800" y2="80" stroke="#9D683B" strokeWidth="1.5" opacity="0.6" />

    {/* Bottom zari band */}
    <rect x="0" y="820" width="800" height="80" fill="rgba(157,104,59,0.15)" />
    <line x1="0" y1="820" x2="800" y2="820" stroke="#9D683B" strokeWidth="1.5" opacity="0.6" />

    {/* Center medallion */}
    <g transform="translate(400,420)">
      <circle cx="0" cy="0" r="140" fill="none" stroke="rgba(157,104,59,0.2)" strokeWidth="1" />
      <circle cx="0" cy="0" r="100" fill="none" stroke="rgba(157,104,59,0.3)" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(157,104,59,0.25)" strokeWidth="0.6" />

      {/* Petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const x = Math.cos(angle) * 80;
        const y = Math.sin(angle) * 80;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="12"
            ry="22"
            fill="rgba(157,104,59,0.12)"
            stroke="rgba(157,104,59,0.35)"
            strokeWidth="0.5"
            transform={`rotate(${(i * 360) / 8} ${x} ${y})`}
          />
        );
      })}

      {/* Center gem */}
      <polygon
        points="0,-18 12,0 0,18 -12,0"
        fill="rgba(157,104,59,0.4)"
        stroke="rgba(157,104,59,0.6)"
        strokeWidth="0.8"
      />
    </g>
  </svg>
);

export default function HeroSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.1]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.25], [0, -24]);
  const overlayOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const overlayY = useTransform(scrollYProgress, [0.2, 0.5], [8, 0]);
  const bgBeige = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['rgba(234,235,224,0)', 'rgba(222,200,181,0.3)']
  );

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background tint that shifts on scroll */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: bgBeige,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Central image */}
        <motion.div
          style={{
            position: 'relative',
            width: 'min(480px, 82vw)',
            height: 'min(600px, 80vh)',
            borderRadius: '2px',
            overflow: 'hidden',
            scale: imageScale,
            boxShadow: '0 32px 80px rgba(157,104,59,0.18)',
            zIndex: 2,
          }}
        >
          <HeroSilkVisual />
        </motion.div>

        {/* Initial headline */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '50%',
            x: '-50%',
            opacity: headlineOpacity,
            y: headlineY,
            zIndex: 3,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#9D683B',
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
              color: '#000',
              letterSpacing: '0.04em',
              lineHeight: 1.0,
              margin: 0,
            }}
          >
            Woven in
            <br />
            <em
              style={{
                fontStyle: 'italic',
                color: '#9D683B',
              }}
            >
              Gold
            </em>
          </h1>
          <div
            style={{
              width: '48px',
              height: '1px',
              background: '#9D683B',
              margin: '20px auto 0',
              opacity: 0.6,
            }}
          />
        </motion.div>

        {/* Scroll overlay text — appears as user enters the fabric */}
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
              fontSize: 'clamp(22px, 4vw, 48px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#000',
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
              height: '60px',
              background: '#9D683B',
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
              height: '40px',
              background: '#9D683B',
              opacity: 0.5,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
