import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import GridViewToggle from './GridViewToggle';
import { useGridView } from '../hooks/useGridView';
import { products, FEATURED_COUNT } from '../data/products';

/* Fills the eighth cell of the 4-column grid, so the collage always reads as
   two complete rows rather than a row with a hole in it. */
function SeeAllTile() {
  return (
    <Link to="/shop" className="ks-seeall" aria-label="See the full collection">
      <span className="ks-seeall-inner">
        <span className="ks-seeall-icon" aria-hidden="true">
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
            <line x1="0" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.3" />
            <path d="M13 1.5 18.5 7 13 12.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
          </svg>
        </span>
        <span className="ks-seeall-label">
          See Full
          <br />
          Collection
        </span>
        <span className="ks-seeall-count">{products.length} sarees</span>
      </span>
    </Link>
  );
}

export default function ProductGrid() {
  const [view, setView] = useGridView();
  const featured = products.slice(0, FEATURED_COUNT);

  return (
    <section
      id="shop"
      style={{
        background: 'var(--ivory)',
        borderTop: '1px solid var(--rule)',
        padding: 'clamp(56px, 8vw, 104px) 0 clamp(64px, 9vw, 120px)',
      }}
    >
      <div
        style={{
          padding: '0 var(--gutter)',
          marginBottom: 'clamp(32px, 4.5vw, 56px)',
          maxWidth: '760px',
        }}
      >
        <div className="ks-eyebrow" style={{ marginBottom: '18px' }}>
          <span className="ks-eyebrow-rule" aria-hidden="true" />
          <p className="ks-eyebrow-text">The Shop</p>
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
          New <span style={{ color: 'var(--brown-deep)' }}>This Week</span>
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
          Fresh off the racks, from everyday cotton to bridal silk. Tap the heart to save
          anything you want to come back to.
        </p>
      </div>

      <div className="ks-eyebrow-row ks-eyebrow-row--toggleonly">
        <GridViewToggle view={view} onChange={setView} />
      </div>

      <div className={view === 'two' ? 'ks-grid ks-grid--two' : 'ks-grid'}>
        {featured.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
        <SeeAllTile />
      </div>
    </section>
  );
}
