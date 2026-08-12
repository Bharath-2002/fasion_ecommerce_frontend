import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { inr } from '../data/products';

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
  const [failed, setFailed] = useState(false);
  const reduceMotion = useReducedMotion();

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

  return (
    <motion.article {...reveal} className="ks-product">
      <div className="ks-product-frame">
        {failed ? (
          <div className="ks-product-fallback" aria-hidden="true" />
        ) : (
          <img
            src={product.image}
            alt={product.alt}
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
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="ks-product-price">{inr.format(product.price)}</p>
          </div>

          <button
            type="button"
            className={liked ? 'ks-like is-liked' : 'ks-like'}
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
            aria-label={
              liked ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`
            }
          >
            <HeartIcon filled={liked} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
