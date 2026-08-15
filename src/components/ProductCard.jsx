import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { api } from '../lib/api';
import { formatPrice } from '../lib/money';

function HeartIcon({ filled }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
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

/* `revealOnMount` animates immediately instead of waiting for an intersection.
   Cards that are already on screen when they mount — the first row after a
   pagination change, which also resets scroll — can have their observer
   callback miss, leaving them stuck at opacity 0 until something else forces
   a re-evaluation. Animating on mount removes that race entirely. */
export default function ProductCard({ product, index = 0, revealOnMount = false }) {
  const [liked, setLiked] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [failed, setFailed] = useState(false);
  const reduceMotion = useReducedMotion();

  // The public API has no bulk "images for these N products" route — each
  // card fetches its own, the same known-interim shape the backend's own
  // images route already documents (one presign per image server-side; one
  // fetch per card here). No reset of imageUrl/failed at the top: every
  // call site keys its `.map()` by product.id, so a different product is a
  // fresh mount (fresh initial state) rather than this effect re-running
  // against a reused instance.
  useEffect(() => {
    let cancelled = false;
    api
      .listProductImages(product.id)
      .then((images) => {
        if (cancelled) return;
        const primary = images.find((img) => img.is_primary) ?? images[0];
        if (primary) setImageUrl(primary.download_url);
        else setFailed(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [product.id]);

  // Stagger by column so each row appears to settle together
  const transition = { duration: 0.6, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] };

  let reveal = {};
  if (!reduceMotion) {
    reveal = revealOnMount
      ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          // No negative margin: requiring the card to sit 60px inside the
          // viewport made borderline cases fail to trigger at all.
          viewport: { once: true, amount: 0.15 },
          transition,
        };
  }

  const name = product.title || 'Untitled saree';

  return (
    <motion.article {...reveal} className="ks-product">
      <div className="ks-product-frame">
        {failed || !imageUrl ? (
          <div className="ks-product-fallback" aria-hidden="true" />
        ) : (
          <img
            src={imageUrl}
            alt={name}
            loading={index < 4 ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}

        {/* Decorative click target over the image. The real, focusable link is
            the name below — this is hidden from assistive tech so the card
            isn't announced twice. */}
        <Link
          to={`/product/${product.id}`}
          className="ks-product-hit"
          aria-hidden="true"
          tabIndex={-1}
        />

        <div className="ks-glass ks-glass--sm ks-frost">
          <div style={{ minWidth: 0 }}>
            <h3 className="ks-product-name">
              <Link to={`/product/${product.id}`}>{name}</Link>
            </h3>
            <p className="ks-product-price">
              {formatPrice(product.price_amount, product.price_currency)}
            </p>
          </div>

          <button
            type="button"
            className={liked ? 'ks-like is-liked' : 'ks-like'}
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
            aria-label={liked ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
          >
            <HeartIcon filled={liked} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
