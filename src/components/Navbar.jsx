import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '24px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(234,235,224,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(157,104,59,0.15)' : '1px solid transparent',
        transition: 'background 0.5s ease, border-color 0.5s ease',
      }}
    >
      {/* Left links */}
      <div style={{ display: 'flex', gap: '40px' }}>
        {['Collections', 'Heritage'].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              fontWeight: 300,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#000',
              opacity: 0.7,
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 1)}
            onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Center brand */}
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(14px, 2vw, 18px)',
          fontWeight: 400,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#000',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        Kanchi Silks
      </div>

      {/* Right links */}
      <div style={{ display: 'flex', gap: '40px' }}>
        {['Atelier', 'Visit'].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              fontWeight: 300,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#000',
              opacity: 0.7,
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 1)}
            onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
          >
            {item}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
