import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { api } from '../lib/api';

/* Categories come from the real API now (`GET /public/categories`) instead
   of a hardcoded list — but `Category` has no image or tagline field (only
   products carry photos, via catalog images), so a card without a photo of
   its own cycles through the same seven placeholder jpegs the old array
   used, keyed by position rather than by category id. Real per-category
   imagery is a real gap, not simulated here. */
const PLACEHOLDER_IMAGES = [
  '/collections/1.jpeg',
  '/collections/2.jpeg',
  '/collections/3.jpeg',
  '/collections/4.jpeg',
  '/collections/5.jpeg',
  '/collections/6.jpeg',
  '/collections/7.jpeg',
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

          <Link to={`/shop?category=${collection.id}`} className="ks-pill">
            Explore
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function CollectionsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    let cancelled = false;
    api
      .listCategories()
      .then((categories) => {
        if (cancelled) return;
        setCollections(
          categories.map((category, i) => ({
            id: category.id,
            name: category.name,
            tagline: category.description || '',
            image: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
            alt: category.name,
          }))
        );
      })
      .catch(() => {
        if (!cancelled) setCollections([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
