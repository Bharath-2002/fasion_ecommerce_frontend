import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const collections = [
  {
    id: 1,
    name: 'Bridal Kanjivaram',
    tagline: 'For the dawn of forever',
    description:
      'Handwoven over forty days by master weavers of Kanchipuram. Pure mulberry silk interlaced with real zari.',
    colorA: '#9D683B',
    colorB: '#DEC8B5',
  },
  {
    id: 2,
    name: 'Temple Heritage',
    tagline: 'Devotion made visible',
    description:
      'Inspired by the celestial frescoes of Brihadeeswara. Each motif a prayer, each border a procession.',
    colorA: '#DEC8B5',
    colorB: '#EAEBE0',
  },
  {
    id: 3,
    name: 'Pallu Narratives',
    tagline: 'Stories at the hem',
    description:
      'The pallu — where mythology meets craftsmanship. Peacocks, lotuses, and ancient geometric poetry.',
    colorA: '#000',
    colorB: '#9D683B',
  },
  {
    id: 4,
    name: 'Contemporary Silk',
    tagline: 'Heritage without nostalgia',
    description:
      'For women who carry tradition lightly. Understated weaves with modern sensibility and timeless finish.',
    colorA: '#EAEBE0',
    colorB: '#DEC8B5',
  },
];

// SVG panel visual for each collection
const CollectionVisual = ({ colorA, colorB, index }) => {
  const patterns = [
    // Bridal - dense floral medallion
    (
      <g key="bridal">
        <defs>
          <radialGradient id={`g${index}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={colorA} />
            <stop offset="100%" stopColor={colorB} />
          </radialGradient>
          <pattern id={`p${index}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="20" fill="none" stroke={colorA} strokeWidth="0.5" opacity="0.3" />
            <circle cx="30" cy="30" r="10" fill="none" stroke={colorA} strokeWidth="0.4" opacity="0.4" />
            {Array.from({ length: 6 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 6;
              return (
                <circle key={i} cx={30 + Math.cos(a) * 14} cy={30 + Math.sin(a) * 14} r="3" fill={colorA} opacity="0.25" />
              );
            })}
          </pattern>
        </defs>
        <rect width="540" height="760" fill={`url(#g${index})`} />
        <rect width="540" height="760" fill={`url(#p${index})`} />
        {/* Large medallion */}
        <g transform="translate(270,360)">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 12;
            const r = 120;
            return (
              <ellipse key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r}
                rx="18" ry="36"
                fill="none" stroke={colorB} strokeWidth="0.8" opacity="0.4"
                transform={`rotate(${(i * 360) / 12} ${Math.cos(a) * r} ${Math.sin(a) * r})`}
              />
            );
          })}
          <circle cx="0" cy="0" r="50" fill="none" stroke={colorB} strokeWidth="1" opacity="0.5" />
          <polygon points="0,-24 14,0 0,24 -14,0" fill={colorB} opacity="0.5" />
        </g>
      </g>
    ),
    // Temple - chevron & mandala
    (
      <g key="temple">
        <defs>
          <linearGradient id={`g${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorA} />
            <stop offset="100%" stopColor={colorB} />
          </linearGradient>
          <pattern id={`p${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="#9D683B" strokeWidth="0.4" opacity="0.3" />
            <circle cx="20" cy="20" r="2" fill="#9D683B" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="540" height="760" fill={`url(#g${index})`} />
        <rect width="540" height="760" fill={`url(#p${index})`} />
        {/* Temple arch motifs */}
        {[180, 270, 360].map((y, i) => (
          <g key={i} transform={`translate(270, ${y})`}>
            <path d="M -60,60 L -60,-20 Q -60,-60 0,-60 Q 60,-60 60,-20 L 60,60 Z"
              fill="none" stroke="#9D683B" strokeWidth="0.8" opacity={0.2 + i * 0.1} />
          </g>
        ))}
      </g>
    ),
    // Pallu - peacock / nature
    (
      <g key="pallu">
        <defs>
          <radialGradient id={`g${index}`} cx="30%" cy="30%" r="80%">
            <stop offset="0%" stopColor={colorB} />
            <stop offset="100%" stopColor={colorA} />
          </radialGradient>
          <pattern id={`p${index}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <line x1="25" y1="0" x2="25" y2="50" stroke={colorB} strokeWidth="0.4" opacity="0.3" />
            <line x1="0" y1="25" x2="50" y2="25" stroke={colorB} strokeWidth="0.4" opacity="0.3" />
            <circle cx="25" cy="25" r="1.5" fill={colorB} opacity="0.4" />
          </pattern>
        </defs>
        <rect width="540" height="760" fill={`url(#g${index})`} />
        <rect width="540" height="760" fill={`url(#p${index})`} />
        {/* Stylised peacock eye / feather centers */}
        {[[180, 200], [350, 400], [140, 560]].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx}, ${cy})`}>
            <ellipse cx="0" cy="0" rx="28" ry="48" fill="none" stroke={colorB} strokeWidth="0.8" opacity="0.4" />
            <ellipse cx="0" cy="0" rx="12" ry="20" fill="none" stroke={colorB} strokeWidth="0.6" opacity="0.5" />
            <circle cx="0" cy="0" r="5" fill={colorB} opacity="0.35" />
          </g>
        ))}
      </g>
    ),
    // Contemporary - minimal geometry
    (
      <g key="contemporary">
        <defs>
          <linearGradient id={`g${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colorA} />
            <stop offset="100%" stopColor={colorB} />
          </linearGradient>
          <pattern id={`p${index}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <line x1="0" y1="15" x2="30" y2="15" stroke="#9D683B" strokeWidth="0.3" opacity="0.25" />
            <line x1="15" y1="0" x2="15" y2="30" stroke="#9D683B" strokeWidth="0.3" opacity="0.25" />
          </pattern>
        </defs>
        <rect width="540" height="760" fill={`url(#g${index})`} />
        <rect width="540" height="760" fill={`url(#p${index})`} />
        {/* Clean geometric strips */}
        <rect x="0" y="0" width="540" height="60" fill="rgba(157,104,59,0.12)" />
        <rect x="0" y="700" width="540" height="60" fill="rgba(157,104,59,0.12)" />
        <line x1="0" y1="60" x2="540" y2="60" stroke="#9D683B" strokeWidth="1" opacity="0.4" />
        <line x1="0" y1="700" x2="540" y2="700" stroke="#9D683B" strokeWidth="1" opacity="0.4" />
        <g transform="translate(270,380)">
          {[60, 100, 140].map((r, i) => (
            <rect key={i} x={-r} y={-r} width={r * 2} height={r * 2}
              fill="none" stroke="#9D683B" strokeWidth="0.6" opacity={0.25 - i * 0.05}
              transform={`rotate(${i * 15})`}
            />
          ))}
        </g>
      </g>
    ),
  ];

  return (
    <svg width="540" height="760" viewBox="0 0 540 760" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {/* Sides border */}
      <rect x="0" y="0" width="6" height="760" fill="#9D683B" opacity="0.4" />
      <rect x="534" y="0" width="6" height="760" fill="#9D683B" opacity="0.4" />
      {patterns[index % 4]}
    </svg>
  );
};

function CollectionPanel({ collection, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: 'clamp(280px, 36vw, 480px)',
        height: '100%',
        overflow: 'hidden',
        borderRight: index < collections.length - 1 ? '1px solid rgba(157,104,59,0.25)' : 'none',
      }}
    >
      {/* Image with zoom */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          scale,
          transformOrigin: 'center center',
        }}
      >
        <CollectionVisual colorA={collection.colorA} colorB={collection.colorB} index={index} />
      </motion.div>

      {/* Vertical name — side label */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'center center',
          whiteSpace: 'nowrap',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          fontWeight: 300,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#9D683B',
          opacity: 0.7,
          zIndex: 2,
        }}
      >
        {collection.name}
      </div>

      {/* Bottom caption overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '48px 32px 36px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#DEC8B5',
            fontWeight: 300,
            marginBottom: '8px',
            opacity: 0.9,
          }}
        >
          {collection.tagline}
        </p>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(20px, 2.4vw, 32px)',
            fontWeight: 400,
            color: '#EAEBE0',
            letterSpacing: '0.02em',
            margin: '0 0 12px',
            lineHeight: 1.1,
          }}
        >
          {collection.name}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 300,
            color: '#DEC8B5',
            lineHeight: 1.8,
            margin: '0 0 20px',
            opacity: 0.85,
            maxWidth: '280px',
          }}
        >
          {collection.description}
        </p>
        <button
          style={{
            background: 'transparent',
            border: '1px solid rgba(222,200,181,0.6)',
            color: '#DEC8B5',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 300,
            padding: '12px 24px',
            cursor: 'pointer',
            transition: 'background 0.3s, border-color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(222,200,181,0.12)';
            e.target.style.borderColor = 'rgba(222,200,181,0.9)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.borderColor = 'rgba(222,200,181,0.6)';
          }}
        >
          Explore
        </button>
      </div>
    </div>
  );
}

export default function CollectionsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Total horizontal distance: panels - viewport
  const panelWidth = typeof window !== 'undefined' ? Math.min(480, window.innerWidth * 0.36) : 480;
  const totalWidth = panelWidth * collections.length;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const maxTranslate = -(totalWidth - viewportWidth + 200);

  const x = useTransform(scrollYProgress, [0, 1], [0, maxTranslate]);

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], [0, -20]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        height: `${collections.length * 100 + 50}vh`,
        background: '#EAEBE0',
      }}
    >
      {/* Section intro — fades as scroll begins */}
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          padding: '80px 0 0 clamp(32px, 8vw, 120px)',
          pointerEvents: 'none',
          opacity: headingOpacity,
          y: headingY,
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
          The Collections
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 400,
            color: '#000',
            letterSpacing: '0.02em',
            lineHeight: 1.0,
            margin: 0,
          }}
        >
          Silk as
          <br />
          <em style={{ fontStyle: 'italic', color: '#9D683B' }}>Language</em>
        </h2>
        <div
          style={{
            marginTop: '20px',
            width: '48px',
            height: '1px',
            background: '#9D683B',
            opacity: 0.5,
          }}
        />
      </motion.div>

      {/* Sticky horizontal scroll container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          marginTop: '-100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <motion.div
          style={{
            display: 'flex',
            height: 'min(760px, 85vh)',
            x,
            paddingLeft: 'clamp(32px, 12vw, 160px)',
            paddingRight: '80px',
            gap: 0,
          }}
        >
          {collections.map((col, i) => (
            <CollectionPanel key={col.id} collection={col} index={i} />
          ))}
        </motion.div>

        {/* Thin top divider */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'rgba(157,104,59,0.2)',
          }}
        />
      </div>
    </section>
  );
}
