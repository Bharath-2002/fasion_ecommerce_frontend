import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { api } from '../lib/api';
import { formatPrice } from '../lib/money';

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

function titleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function ProductPage() {
  const { id } = useParams();
  // Keyed by id: navigating from one product to another is a fresh mount
  // (fresh initial state for every field below) rather than this component's
  // own effect resetting stale state mid-flight — react-router does not
  // remount on a param change alone, since it's the same route element.
  return <ProductPageForId key={id} id={id} />;
}

function ProductPageForId({ id }) {
  const [product, setProduct] = useState(undefined); // undefined = loading, null = not found
  const [imageUrl, setImageUrl] = useState(null);
  const [related, setRelated] = useState([]);
  const [liked, setLiked] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    api
      .getProduct(id)
      .then((p) => {
        if (cancelled) return;
        setProduct(p);

        api
          .listProductImages(p.id)
          .then((images) => {
            if (cancelled) return;
            const primary = images.find((img) => img.is_primary) ?? images[0];
            if (primary) setImageUrl(primary.download_url);
          })
          .catch(() => {});

        api
          .listProducts({ categoryId: p.category_id, limit: 5 })
          .then((page) => {
            if (cancelled) return;
            setRelated(page.items.filter((item) => item.id !== p.id).slice(0, 4));
          })
          .catch(() => {});
      })
      .catch(() => {
        // Unknown or unpublished id (both a 404) - send them to the shop
        // rather than rendering an empty shell, same behaviour the old
        // static-lookup version had.
        if (!cancelled) setProduct(null);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (product === null) return <Navigate to="/shop" replace />;
  if (product === undefined) return null; // loading — avoid a flash of empty content

  const name = product.title || 'Untitled saree';
  const details = Object.entries(product.attributes ?? {}).map(([key, value]) => [
    titleCase(key),
    value,
  ]);
  details.push(['Blouse', 'Unstitched piece attached'], ['Care', 'Dry clean only']);

  return (
    <main className="ks-page">
      <nav className="ks-breadcrumb" aria-label="Breadcrumb">
        <Link to="/shop">Shop</Link>
      </nav>

      <div className="ks-pdp">
        <div className="ks-pdp-media">
          <div className="ks-pdp-frame">
            {imageFailed || !imageUrl ? (
              <div className="ks-product-fallback" aria-hidden="true" />
            ) : (
              <img src={imageUrl} alt={name} onError={() => setImageFailed(true)} />
            )}
          </div>
        </div>

        <div className="ks-pdp-info">
          <h1 className="ks-pdp-title">{name}</h1>
          <p className="ks-pdp-price">{formatPrice(product.price_amount, product.price_currency)}</p>
          <p className="ks-pdp-tax">Inclusive of all taxes</p>

          <div className="ks-pdp-actions">
            {/* Not wired: no cart backend exists yet (M8 checklist explicitly
                permits deferring this rather than inventing one). */}
            <button type="button" className="ks-btn ks-btn--solid" disabled>
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

      {related.length > 0 && (
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
      )}
    </main>
  );
}
