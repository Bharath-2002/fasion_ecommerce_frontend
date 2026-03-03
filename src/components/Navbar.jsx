import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = ['Collections', 'Heritage', 'Atelier', 'Visit'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (!menuOpen) return;
    const onScroll = () => setMenuOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  return (
    <>
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
          background: scrolled || menuOpen ? 'rgba(234,235,224,0.96)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled || menuOpen ? '1px solid rgba(157,104,59,0.15)' : '1px solid transparent',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Left links — desktop only */}
        <div style={{ display: 'flex', gap: '40px' }} className="nav-links">
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
                textDecoration: 'none',
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
            whiteSpace: 'nowrap',
          }}
        >
          Kanchi Silks
        </div>

        {/* Right links — desktop only */}
        <div style={{ display: 'flex', gap: '40px' }} className="nav-links">
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
                textDecoration: 'none',
                transition: 'opacity 0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 1)}
              onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            marginLeft: 'auto',
            color: '#1A0E08',
          }}
        >
          <motion.div
            animate={menuOpen ? 'open' : 'closed'}
            style={{ width: 22, height: 16, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 7 },
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'block', height: '1px', background: '#1A0E08', transformOrigin: 'center' }}
            />
            <motion.span
              variants={{
                closed: { opacity: 1, scaleX: 1 },
                open: { opacity: 0, scaleX: 0 },
              }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', height: '1px', background: '#1A0E08', transformOrigin: 'center' }}
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -7 },
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'block', height: '1px', background: '#1A0E08', transformOrigin: 'center' }}
            />
          </motion.div>
        </button>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              zIndex: 99,
              background: 'rgba(234,235,224,0.97)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(157,104,59,0.15)',
              display: 'flex',
              flexDirection: 'column',
              padding: '8px 0 20px',
            }}
            className="mobile-menu"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item}
                href="#"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 + 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 300,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#1A0E08',
                  textDecoration: 'none',
                  padding: '14px 32px',
                  borderBottom: i < NAV_ITEMS.length - 1 ? '1px solid rgba(157,104,59,0.1)' : 'none',
                  opacity: 0.85,
                }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 98,
              background: 'rgba(0,0,0,0.12)',
            }}
            className="mobile-menu"
          />
        )}
      </AnimatePresence>
    </>
  );
}
