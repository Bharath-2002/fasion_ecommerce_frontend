import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/* Product photography lives in public/collections/ and is served from the site
   root. Each card crops its image to 3:4; if one fails to load the card falls
   back to a woven pattern in the brand palette rather than a broken-image icon.
   7.jpeg is currently spare — six cards, seven photos. */
const collections = [
  {
    id: 'bridal',
    name: 'Bridal & Wedding',
    tagline: 'For the big day',
    image: '/collections/3.jpeg',
    alt: 'Bridal saree in molten orange and gold brocade with a deep purple zari border',
  },
  {
    id: 'silk',
    name: 'Pure Silk',
    tagline: 'Kanchipuram, Banarasi & more',
    image: '/collections/2.jpeg',
    alt: 'Peacock-blue silk saree with a magenta contrast border of gold zari',
  },
  {
    id: 'festive',
    name: 'Party & Festive',
    tagline: 'Dressed for the occasion',
    image: '/collections/7.jpeg',
    alt: 'Sea-green tissue silk saree draped to show a heavy gold zari pallu with floral motifs',
  },
  {
    id: 'cotton',
    name: 'Daily Cotton',
    tagline: 'Light, breathable, everyday',
    image: '/collections/6.jpeg',
    alt: 'Mint green cotton saree with a fine silver border and a printed paisley pallu',
  },
  {
    id: 'printed',
    name: 'Printed Casuals',
    tagline: 'Easy on the wallet',
    image: '/collections/4.jpeg',
    alt: 'Black and cream chequered saree with a thin gold border, draped on a mannequin',
  },
  {
    id: 'handloom',
    name: 'Handloom & Dyed',
    tagline: 'Small batch, hand-finished',
    image: '/collections/5.jpeg',
    alt: 'Indigo blue saree with white resist-dyed diamond patterns and a silver border',
  },
];

/* Shown when a product image fails to load. */
function WovenFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background: `
          repeating-linear-gradient(90deg, var(--beige) 0 3px, var(--ivory-dark) 3px 6px),
          repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0 3px, transparent 3px 6px)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Literal hex, not var() — CSS variables in SVG presentation attributes
          have patchy support, and this path only runs after an image failed. */}
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{ opacity: 0.5 }}>
        <circle cx="36" cy="36" r="26" stroke="#8A8A8A" strokeWidth="1" />
        <circle cx="36" cy="36" r="14" stroke="#8A8A8A" strokeWidth="1" />
        <polygon points="36,22 46,36 36,50 26,36" fill="#8A8A8A" opacity="0.35" />
      </svg>
    </div>
  );
}

function CollectionCard({ collection, index }) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="ks-card">
      <div className="ks-card-frame">
        {failed ? (
          <WovenFallback />
        ) : (
          <img
            src={collection.image}
            alt={collection.alt}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}

        <span className="ks-index ks-frost">{String(index + 1).padStart(2, '0')}</span>

        <div className="ks-glass ks-frost">
          {/* minWidth:0 lets long names wrap instead of forcing the flex row
              wider than the card and squashing the pill. */}
          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(14px, 1.4vw, 18px)',
                fontWeight: 700,
                color: 'var(--on-glass)',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                lineHeight: 1.25,
                margin: '0 0 5px',
              }}
            >
              {collection.name}
            </h3>
            <p
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--on-glass-dim)',
                fontWeight: 500,
                margin: 0,
              }}
            >
              {collection.tagline}
            </p>
          </div>

          <a href={`#collection-${collection.id}`} className="ks-pill">
            Explore
          </a>
        </div>
      </div>
    </article>
  );
}

export default function CollectionsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const reduceMotion = useReducedMotion();

  /* How far the track has to travel to bring its right edge into view. The
     section is then made that much taller than the viewport, so one pixel of
     vertical scroll moves the track one pixel sideways. Measured rather than
     computed from assumed card widths — that arithmetic was what broke on
     resize before. */
  const [measured, setMeasured] = useState(0);
  // Derived rather than stored, so preferring reduced motion needs no setState.
  const distance = reduceMotion ? 0 : measured;

  useLayoutEffect(() => {
    if (reduceMotion) return undefined;

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const next = Math.max(0, track.scrollWidth - window.innerWidth);
      // Bail out when unchanged: this also fires on the resize the new section
      // height causes, and an unguarded set would cascade.
      setMeasured((prev) => (prev === next ? prev : next));
    };

    // No synchronous first call — ResizeObserver delivers an initial
    // observation on observe(), which also catches images finishing decode.
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      id="collections"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'var(--ivory)',
        borderTop: '1px solid var(--rule)',
        // Extra height IS the horizontal travel; 100vh alone when not pinning.
        height: distance > 0 ? `calc(100vh + ${distance}px)` : 'auto',
      }}
    >
      <div
        style={{
          position: distance > 0 ? 'sticky' : 'static',
          top: 0,
          height: distance > 0 ? '100vh' : 'auto',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'clamp(24px, 3.5vw, 48px)',
          paddingTop: 'clamp(28px, 4vw, 56px)',
          paddingBottom: 'clamp(28px, 4vw, 56px)',
        }}
      >
        {/* Header — stays put while the track slides beneath it */}
        <div style={{ padding: '0 var(--gutter)', maxWidth: '760px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '18px' }}>
            <div style={{ width: '48px', height: '1px', background: 'var(--brown)', opacity: 0.6 }} />
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--brown-deep)',
                fontWeight: 400,
              }}
            >
              Shop by Category
            </p>
          </div>

          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(30px, 4.5vw, 60px)',
              fontWeight: 700,
              color: 'var(--black)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              lineHeight: 1.02,
              margin: '0 0 14px',
            }}
          >
            Every Occasion, <span style={{ color: 'var(--brown-deep)' }}>Every Budget</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              fontWeight: 300,
              color: 'var(--black)',
              opacity: 0.7,
              lineHeight: 1.7,
              maxWidth: '52ch',
              margin: 0,
            }}
          >
            From easy cotton drapes to bridal silk, across six categories and every price point.
            Each piece is picked by hand, and new arrivals land on the racks every week.
          </p>
        </div>

        {/* Track — translated by page scroll when pinned, a native swipe rail
            when the visitor prefers reduced motion. */}
        <motion.div
          ref={trackRef}
          className={reduceMotion ? 'ks-track ks-track--static' : 'ks-track'}
          style={reduceMotion ? undefined : { x }}
        >
          {collections.map((collection, i) => (
            <CollectionCard key={collection.id} collection={collection} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
