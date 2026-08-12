import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductById, getRelated, getCopy, inr } from '../data/products';

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.5 4.2 13a4.8 4.8 0 0 1 6.8-6.8l1 1 1-1A4.8 4.8 0 1 1 19.8 13Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const [liked, setLiked] = useState(false);
  const [failed, setFailed] = useState(false);

  // Unknown id — send them to the shop rather than rendering an empty shell
  if (!product) return <Navigate to="/shop" replace />;

  const copy = getCopy(product);
  const related = getRelated(product);

  const details = [
    ['Fabric', copy.fabric],
    ['Length', copy.length],
    ['Blouse', 'Unstitched piece attached'],
    ['Care', 'Dry clean only'],
  ];

  return (
    <main className="ks-page">
      <nav className="ks-breadcrumb" aria-label="Breadcrumb">
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <span>{copy.label}</span>
      </nav>

      <div className="ks-pdp">
        <div className="ks-pdp-media">
          <div className="ks-pdp-frame">
            {failed ? (
              <div className="ks-product-fallback" aria-hidden="true" />
            ) : (
              <img src={product.image} alt={product.alt} onError={() => setFailed(true)} />
            )}
          </div>
        </div>

        <div className="ks-pdp-info">
          <div className="ks-eyebrow" style={{ marginBottom: '20px' }}>
            <span className="ks-eyebrow-rule" aria-hidden="true" />
            <p className="ks-eyebrow-text">{copy.label}</p>
          </div>

          <h1 className="ks-pdp-title">{product.name}</h1>
          <p className="ks-pdp-price">{inr.format(product.price)}</p>
          <p className="ks-pdp-tax">Inclusive of all taxes</p>

          <p className="ks-pdp-blurb">{copy.blurb}</p>

          <div className="ks-pdp-actions">
            <button type="button" className="ks-btn ks-btn--solid">
              Add to Bag
            </button>
            <button
              type="button"
              className={liked ? 'ks-btn ks-btn--icon is-liked' : 'ks-btn ks-btn--icon'}
              onClick={() => setLiked((v) => !v)}
              aria-pressed={liked}
              aria-label={liked ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <HeartIcon filled={liked} />
              <span>{liked ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          <dl className="ks-details">
            {details.map(([term, value]) => (
              <div key={term} className="ks-details-row">
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <p className="ks-pdp-note">
            Free delivery across India on orders above ₹2,000. Returns accepted within 7 days,
            unworn and with tags attached.
          </p>
        </div>
      </div>

      <section className="ks-related">
        <div className="ks-eyebrow-row">
          <div className="ks-eyebrow">
            <span className="ks-eyebrow-rule" aria-hidden="true" />
            <h2 className="ks-eyebrow-text">You May Also Like</h2>
          </div>
        </div>

        {/* Always two-up on mobile: these are a secondary browse strip, not the
            main grid, so they stay compact rather than following the shop
            page's one-per-row default. */}
        <div className="ks-grid ks-grid--two">
          {related.map((item, i) => (
            <ProductCard key={item.id} product={item} index={i} revealOnMount={i < 4} />
          ))}
        </div>
      </section>
    </main>
  );
}
