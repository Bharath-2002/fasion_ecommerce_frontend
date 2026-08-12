import { motion, useReducedMotion } from 'framer-motion';

const navGroups = [
  {
    label: 'Shop',
    items: ['New Arrivals', 'Bridal & Wedding', 'Pure Silk', 'Daily Cotton'],
  },
  {
    // Price bands are placeholders — set these to the ranges you actually stock.
    label: 'Shop by Budget',
    items: ['Under ₹1,000', '₹1,000 – ₹3,000', '₹3,000 – ₹10,000', 'Premium'],
  },
  {
    label: 'Help',
    items: ['Size & Fit Guide', 'Shipping', 'Returns & Exchange', 'Track Order'],
  },
  {
    label: 'Boutique',
    items: ['About Us', 'Visit the Store', 'Contact', 'Instagram'],
  },
];

const socialLinks = [
  {
    name: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.5 20c-.4-1.3.1-3 .4-4.2l1-4.1" strokeLinecap="round" />
        <path d="M8.6 10.4a3.5 3.5 0 116.6 2c-.6 1.7-2 2.7-3.3 2.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const eyebrowStyle = {
  fontFamily: 'var(--sans)',
  fontSize: '10px',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'var(--brown-deep)',
  fontWeight: 400,
  marginBottom: '20px',
};

export default function TraditionalFooter() {
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-40px' },
      };

  return (
    <footer style={{ background: 'var(--beige)', borderTop: '1px solid var(--brown)', overflow: 'hidden' }}>
      {/* Wordmark */}
      <motion.div
        {...reveal}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          textAlign: 'center',
          padding: 'clamp(56px, 8vw, 88px) clamp(24px, 6vw, 48px) clamp(40px, 6vw, 64px)',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(28px, 7vw, 88px)',
            fontWeight: 700,
            color: 'var(--black)',
            /* Tracking in px, not em — an em-based value scales with the clamped
               font size and pushes the wordmark past the viewport at 375px. */
            letterSpacing: 'clamp(2px, 1.2vw, 14px)',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            margin: '0 0 18px',
            /* Trailing tracking adds phantom width on the right; shift back by
               half of it to re-centre the wordmark. */
            textIndent: 'clamp(1px, 0.6vw, 7px)',
          }}
        >
          Baby Botique
        </h2>

        <p className="ks-tagline" style={{ margin: 0 }}>
          Sarees · Every Occasion · Every Budget
        </p>
      </motion.div>

      {/* Link columns */}
      <motion.nav
        {...reveal}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Footer"
        className="ks-footer-nav"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'clamp(32px, 5vw, 56px)',
          padding: 'clamp(48px, 6vw, 80px) var(--gutter)',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        {navGroups.map((group) => (
          <div key={group.label}>
            <h3 style={eyebrowStyle}>{group.label}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {group.items.map((item) => (
                <li key={item} style={{ marginBottom: '12px' }}>
                  <a href="#" className="ks-navlink">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.nav>

      {/* Legal strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'clamp(20px, 3vw, 32px)',
          padding: 'clamp(28px, 3vw, 40px) var(--gutter)',
        }}
      >
        <p
          className="ks-footer-copy"
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '12px',
            fontWeight: 300,
            color: 'var(--black)',
            opacity: 0.55,
            letterSpacing: '0.03em',
            margin: 0,
          }}
        >
          © 2026 Baby Botique. All rights reserved.
        </p>

        <div
          className="ks-footer-socials"
          style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
        >
          {socialLinks.map((s) => (
            <a key={s.name} href="#" className="ks-social" aria-label={s.name}>
              {s.icon}
            </a>
          ))}
        </div>

        <div
          className="ks-footer-legal"
          style={{ display: 'flex', gap: 'clamp(20px, 3vw, 32px)', flexWrap: 'wrap' }}
        >
          {['Privacy', 'Terms', 'Shipping & Returns'].map((t) => (
            <a key={t} href="#" className="ks-legal">
              {t}
            </a>
          ))}
        </div>
      </div>

      <div style={{ height: '4px', background: 'var(--brown)', opacity: 0.4 }} />
    </footer>
  );
}
