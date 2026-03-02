import { motion } from 'framer-motion';

// Kolam-inspired SVG border motif
const KolamBorder = () => (
  <svg width="100%" height="28" viewBox="0 0 1440 28" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
    <defs>
      <pattern id="kolam" x="0" y="0" width="72" height="28" patternUnits="userSpaceOnUse">
        {/* Central lotus unit */}
        <circle cx="36" cy="14" r="4" fill="none" stroke="#9D683B" strokeWidth="0.8" opacity="0.6" />
        <circle cx="36" cy="14" r="1.5" fill="#9D683B" opacity="0.5" />
        {/* Four petals */}
        <ellipse cx="36" cy="6" rx="2.5" ry="5" fill="none" stroke="#9D683B" strokeWidth="0.6" opacity="0.45" />
        <ellipse cx="36" cy="22" rx="2.5" ry="5" fill="none" stroke="#9D683B" strokeWidth="0.6" opacity="0.45" />
        <ellipse cx="28" cy="14" rx="5" ry="2.5" fill="none" stroke="#9D683B" strokeWidth="0.6" opacity="0.45" />
        <ellipse cx="44" cy="14" rx="5" ry="2.5" fill="none" stroke="#9D683B" strokeWidth="0.6" opacity="0.45" />
        {/* Diamond connectors */}
        <polygon points="18,14 22,10 26,14 22,18" fill="none" stroke="#9D683B" strokeWidth="0.5" opacity="0.35" />
        <polygon points="46,14 50,10 54,14 50,18" fill="none" stroke="#9D683B" strokeWidth="0.5" opacity="0.35" />
        {/* Dots */}
        <circle cx="10" cy="14" r="1" fill="#9D683B" opacity="0.3" />
        <circle cx="62" cy="14" r="1" fill="#9D683B" opacity="0.3" />
        {/* Top/Bottom line segments */}
        <line x1="0" y1="1" x2="72" y2="1" stroke="#9D683B" strokeWidth="0.4" opacity="0.25" />
        <line x1="0" y1="27" x2="72" y2="27" stroke="#9D683B" strokeWidth="0.4" opacity="0.25" />
      </pattern>
    </defs>
    <rect width="1440" height="28" fill="url(#kolam)" />
  </svg>
);

// Temple symmetry top border
const TempleBorder = () => (
  <svg width="100%" height="16" viewBox="0 0 1440 16" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
    <defs>
      <pattern id="temple" x="0" y="0" width="48" height="16" patternUnits="userSpaceOnUse">
        <line x1="0" y1="8" x2="48" y2="8" stroke="#9D683B" strokeWidth="0.5" opacity="0.4" />
        <circle cx="24" cy="8" r="2" fill="none" stroke="#9D683B" strokeWidth="0.7" opacity="0.5" />
        <line x1="24" y1="0" x2="24" y2="5" stroke="#9D683B" strokeWidth="0.5" opacity="0.35" />
        <line x1="24" y1="11" x2="24" y2="16" stroke="#9D683B" strokeWidth="0.5" opacity="0.35" />
        <circle cx="0" cy="8" r="1" fill="#9D683B" opacity="0.35" />
        <circle cx="48" cy="8" r="1" fill="#9D683B" opacity="0.35" />
      </pattern>
    </defs>
    <rect width="1440" height="16" fill="url(#temple)" />
  </svg>
);

const navLinks = [
  { label: 'Collections', items: ['Bridal Kanjivaram', 'Temple Heritage', 'Pallu Narratives', 'Contemporary'] },
  { label: 'Atelier', items: ['Our Weavers', 'The Process', 'Zari Craft', 'Custom Orders'] },
  { label: 'House', items: ['Our Story', 'Heritage', 'Press', 'Careers'] },
  { label: 'Visit', items: ['Kanchipuram Atelier', 'Chennai Boutique', 'Appointments', 'Contact'] },
];

const socialLinks = [
  {
    name: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.18-.77 1.22-5.16 1.22-5.16s-.31-.62-.31-1.54c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.48-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.27-1.95 3.27-4.76 0-2.49-1.79-4.23-4.34-4.23-2.96 0-4.69 2.22-4.69 4.51 0 .89.34 1.85.77 2.37.08.1.09.19.07.29l-.29 1.17c-.05.19-.16.23-.37.14-1.39-.65-2.26-2.68-2.26-4.32 0-3.51 2.55-6.74 7.35-6.74 3.86 0 6.86 2.75 6.86 6.42 0 3.83-2.41 6.91-5.76 6.91-1.13 0-2.19-.59-2.55-1.28l-.69 2.58c-.25.97-.93 2.18-1.38 2.92.04.01.09.01.13.01" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function TraditionalFooter() {
  return (
    <footer
      style={{
        background: '#DEC8B5',
        borderTop: '1px solid #9D683B',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Temple border pattern at very top */}
      <div style={{ opacity: 0.8 }}>
        <TempleBorder />
      </div>

      {/* Kolam border */}
      <div style={{ opacity: 0.7, marginTop: '2px' }}>
        <KolamBorder />
      </div>

      {/* Brand name — centered, palatial */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        style={{
          textAlign: 'center',
          padding: '80px 24px 60px',
          borderBottom: '1px solid rgba(157,104,59,0.2)',
        }}
      >
        {/* Ornamental top mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div style={{ width: '80px', height: '1px', background: '#9D683B', opacity: 0.4 }} />
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ opacity: 0.5 }}>
            <polygon points="8,0 16,8 8,16 0,8" fill="none" stroke="#9D683B" strokeWidth="1" />
            <circle cx="8" cy="8" r="2" fill="#9D683B" />
          </svg>
          <div style={{ width: '80px', height: '1px', background: '#9D683B', opacity: 0.4 }} />
        </div>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(42px, 8vw, 96px)',
            fontWeight: 400,
            color: '#000',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            lineHeight: 1.0,
            margin: '0 0 16px',
          }}
        >
          Kanchi Silks
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#9D683B',
            fontWeight: 300,
            margin: '0 0 8px',
          }}
        >
          Kanchipuram · Tamil Nadu
        </p>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: '#000',
            opacity: 0.5,
            fontWeight: 400,
            letterSpacing: '0.04em',
          }}
        >
          Heritage woven since 1947
        </p>

        {/* Ornamental bottom mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '32px',
          }}
        >
          <div style={{ width: '40px', height: '1px', background: '#9D683B', opacity: 0.3 }} />
          <div style={{ width: '4px', height: '4px', background: '#9D683B', borderRadius: '50%', opacity: 0.4 }} />
          <div style={{ width: '80px', height: '1px', background: '#9D683B', opacity: 0.3 }} />
          <div style={{ width: '4px', height: '4px', background: '#9D683B', borderRadius: '50%', opacity: 0.4 }} />
          <div style={{ width: '40px', height: '1px', background: '#9D683B', opacity: 0.3 }} />
        </div>
      </motion.div>

      {/* Nav columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '48px',
          padding: 'clamp(48px, 6vw, 80px) clamp(32px, 10vw, 160px)',
          borderBottom: '1px solid rgba(157,104,59,0.18)',
        }}
      >
        {navLinks.map((group) => (
          <div key={group.label}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#9D683B',
                fontWeight: 400,
                marginBottom: '20px',
              }}
            >
              {group.label}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {group.items.map((item) => (
                <li key={item} style={{ marginBottom: '10px' }}>
                  <a
                    href="#"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '14px',
                      fontWeight: 300,
                      color: '#000',
                      opacity: 0.65,
                      letterSpacing: '0.02em',
                      transition: 'opacity 0.25s',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = 1)}
                    onMouseLeave={(e) => (e.target.style.opacity = 0.65)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      {/* Bottom strip: social + legal */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          padding: 'clamp(24px, 3vw, 40px) clamp(32px, 10vw, 160px)',
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            fontWeight: 300,
            color: '#000',
            opacity: 0.4,
            letterSpacing: '0.04em',
          }}
        >
          © 2025 Kanchi Silks. All rights reserved.
        </p>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href="#"
              style={{
                color: '#000',
                opacity: 0.5,
                transition: 'opacity 0.25s',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.5)}
              aria-label={s.name}
            >
              {s.icon}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          {['Privacy', 'Terms', 'Sitemap'].map((t) => (
            <a
              key={t}
              href="#"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 300,
                color: '#000',
                opacity: 0.4,
                letterSpacing: '0.08em',
                transition: 'opacity 0.25s',
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
              onMouseLeave={(e) => (e.target.style.opacity = 0.4)}
            >
              {t}
            </a>
          ))}
        </div>
      </div>

      {/* Pallu closing line — thicker */}
      <div style={{ height: '4px', background: '#9D683B', opacity: 0.35 }} />
    </footer>
  );
}
