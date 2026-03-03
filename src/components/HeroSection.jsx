import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO_IMAGE } from './CardStackEntrance';

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

export default function HeroSection() {
  const containerRef = useRef(null);
  const vp = useViewport();

  // Initial card size — numeric px values so framer-motion can interpolate cleanly
  const initW = Math.min(252, vp.w * 0.56);   // ≈252px on any screen >450px wide
  const initH = Math.min(360, vp.h * 0.54);   // ≈360px on any screen >666px tall
  const endW  = vp.w * 0.92;
  const endH  = vp.h * 0.76;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const isMobile = vp.w < 640;

  // ── Phase 1 (0 → 0.25): side words fade + blur out ──
  const sideOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const sideFilter  = useTransform(scrollYProgress, [0, 0.25], ['blur(0px)', 'blur(14px)']);
  // Desktop: slide left/right. Mobile: slide up/down.
  const sideX_L = useTransform(scrollYProgress, [0, 0.25], [0, isMobile ? 0 : -28]);
  const sideX_R = useTransform(scrollYProgress, [0, 0.25], [0, isMobile ? 0 :  28]);
  const sideY_T = useTransform(scrollYProgress, [0, 0.25], [0, isMobile ? -20 : 0]);
  const sideY_B = useTransform(scrollYProgress, [0, 0.25], [0, isMobile ?  20 : 0]);

  // ── Phase 2 (0.2 → 0.55): card expands to fill screen ──
  const cardWidth  = useTransform(scrollYProgress, [0.2, 0.55], [initW, endW]);
  const cardHeight = useTransform(scrollYProgress, [0.2, 0.55], [initH, endH]);
  const cardRadius = useTransform(scrollYProgress, [0.2, 0.55], [12, 24]);

  // Image zooms inside card as it expands
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1.05, 1.18]);

  // ── Phase 3 (0.4 → 0.62): overlay text fades in ──
  const overlayOpacity = useTransform(scrollYProgress, [0.4, 0.62], [0, 1]);
  const overlayY       = useTransform(scrollYProgress, [0.4, 0.62], [24, 0]);

  // Scrim deepens as card fills screen (starts at 0 so the initial state matches the card stack handoff)
  const scrimOpacity = useTransform(scrollYProgress, [0.1, 0.55], [0, 0.5]);

  return (
    <section ref={containerRef} style={{ position: 'relative', height: '280vh' }}>
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

        {/* ── LEFT FLANKING TEXT (desktop: left side | mobile: top) ── */}
        <motion.div
          style={{
            position: 'absolute',
            ...(isMobile
              ? { top: 'clamp(90px, 18vh, 140px)', left: '50%', x: '-50%', y: sideY_T }
              : { left: 'clamp(36px, 7.5vw, 110px)', top: '50%', y: '-50%', x: sideX_L }),
            opacity: sideOpacity,
            filter: sideFilter,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: isMobile ? 'clamp(22px, 7vw, 34px)' : 'clamp(36px, 5.6vw, 82px)',
              fontWeight: 400,
              color: '#1A0E08',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              margin: 0,
              textTransform: 'uppercase',
              textAlign: isMobile ? 'center' : 'left',
              whiteSpace: isMobile ? 'nowrap' : 'normal',
            }}
          >
            {isMobile ? 'NAJ KRAJŠIA VERZIA' : (<>NAJ<br />KRAJŠIA<br />VERZIA</>)}
          </h1>
        </motion.div>

        {/* ── RIGHT FLANKING TEXT (desktop: right side | mobile: bottom) ── */}
        <motion.div
          style={{
            position: 'absolute',
            ...(isMobile
              ? { bottom: 'clamp(90px, 18vh, 140px)', left: '50%', x: '-50%', y: sideY_B }
              : { right: 'clamp(36px, 7.5vw, 110px)', top: '50%', y: '-50%', x: sideX_R }),
            opacity: sideOpacity,
            filter: sideFilter,
            zIndex: 2,
            pointerEvents: 'none',
            textAlign: isMobile ? 'center' : 'right',
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: isMobile ? 'clamp(22px, 7vw, 34px)' : 'clamp(36px, 5.6vw, 82px)',
              fontWeight: 400,
              color: '#1A0E08',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              margin: 0,
              textTransform: 'uppercase',
              whiteSpace: isMobile ? 'nowrap' : 'normal',
            }}
          >
            {isMobile ? 'SAMEJ SEBA' : (<>SAMEJ<br />SEBA</>)}
          </h1>
        </motion.div>

        {/* ── CENTRAL IMAGE CARD ── */}
        <div style={{ zIndex: 3, flexShrink: 0 }}>
          <motion.div
            style={{
              position: 'relative',
              width: cardWidth,
              height: cardHeight,
              borderRadius: cardRadius,
              overflow: 'hidden',
              boxShadow: '0 28px 72px rgba(120,55,18,0.24)',
            }}
          >
            {/* Image — zooms on scroll */}
            <motion.img
              src={HERO_IMAGE}
              alt="Žuffa"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                scale: imageScale,
                transformOrigin: 'center center',
              }}
            />

            {/* Scrim darkens as card fills screen */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.5) 100%)',
                opacity: scrimOpacity,
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />

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
                padding: '0 clamp(24px, 8vw, 120px)',
              }}
            >
              {/* ž logo in circle */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid rgba(234,235,224,0.55)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '28px',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '18px',
                    color: '#EAEBE0',
                    fontWeight: 400,
                  }}
                >
                  ž
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(12px, 1.35vw, 17px)',
                  fontWeight: 300,
                  color: '#EAEBE0',
                  textAlign: 'center',
                  letterSpacing: '0.09em',
                  lineHeight: 1.7,
                  textTransform: 'uppercase',
                  margin: 0,
                  maxWidth: '640px',
                }}
              >
                Autentické tvárové terapie navrhnuté
                <br />
                pre prirodzené omladenie. Tvárové
                <br />
                terapie a škola tváre vytvorené Evou
                <br />
                Žuffa prinášajú to najkvalitnejšie, čo v
                <br />
                oblasti prirodzeného omladenia existuje.
                <br />
                Prebuďte svoju prirodzenú krásu.
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
