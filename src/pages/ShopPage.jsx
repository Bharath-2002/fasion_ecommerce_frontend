import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import GridViewToggle from '../components/GridViewToggle';
import { useGridView } from '../hooks/useGridView';
import { api } from '../lib/api';

const PER_PAGE = 12;

/* The backend is cursor-paginated (opaque tokens, forward-only, no total
   count) rather than the old fixed array with a known `.length` — there is
   no "jump to page 7" here, and no numbered page list, because there is
   nothing to compute one from. Next/Previous only. The cursor that fetched
   the *current* page lives in the URL (`?cursor=`) so a page can still be
   linked and shared, and back/forward move through it the same way the old
   `?page=` did; the history of cursors needed to go back further than one
   step is kept in component state, not the URL, since only the current
   position needs to be shareable. */
export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useGridView();
  const [items, setItems] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cursorStack, setCursorStack] = useState([]);

  const currentCursor = searchParams.get('cursor');
  const categoryId = searchParams.get('category');

  // A category switch is a different listing entirely - any cursors
  // remembered for "Previous" belonged to the old one. Adjusting state
  // during render (not in an effect) is React's own documented pattern for
  // "reset some state when a prop changes" — https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes.
  const [prevCategoryId, setPrevCategoryId] = useState(categoryId);
  if (categoryId !== prevCategoryId) {
    setPrevCategoryId(categoryId);
    setCursorStack([]);
  }

  useEffect(() => {
    let cancelled = false;
    // The "loading" flag exists for the duration of this fetch; there is no
    // prop/state to derive it from during render the way the reset above is
    // derived from categoryId. The real fix (Suspense or a data-fetching
    // library) is out of scope for this cutover.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    api
      .listProducts({
        categoryId: categoryId ?? undefined,
        cursor: currentCursor ?? undefined,
        limit: PER_PAGE,
      })
      .then((page) => {
        if (cancelled) return;
        setItems(page.items);
        setNextCursor(page.next_cursor);
      })
      .catch(() => {
        if (!cancelled) {
          setItems([]);
          setNextCursor(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [currentCursor, categoryId]);

  const goNext = () => {
    if (!nextCursor) return;
    setCursorStack((prev) => [...prev, currentCursor]);
    setSearchParams(
      categoryId ? { category: categoryId, cursor: nextCursor } : { cursor: nextCursor }
    );
  };

  const goPrevious = () => {
    const previous = cursorStack[cursorStack.length - 1];
    setCursorStack((prev) => prev.slice(0, -1));
    const next = previous ? { cursor: previous } : {};
    setSearchParams(categoryId ? { category: categoryId, ...next } : next);
  };

  const hasPrevious = cursorStack.length > 0 || Boolean(currentCursor);

  return (
    <main
      style={{
        background: 'var(--ivory)',
        // Clears the fixed navbar
        padding: 'clamp(104px, 12vw, 152px) 0 clamp(64px, 9vw, 120px)',
        minHeight: '100vh',
      }}
    >
      <div className="ks-eyebrow-row">
        <div className="ks-eyebrow">
          <span className="ks-eyebrow-rule" aria-hidden="true" />
          {/* Carries the page's h1 while looking like the small-caps label */}
          <h1 className="ks-eyebrow-text">All Sarees</h1>
        </div>
        <GridViewToggle view={view} onChange={setView} />
      </div>

      {!loading && items.length === 0 && (
        <p style={{ padding: '0 var(--gutter)', opacity: 0.7 }}>No sarees to show yet.</p>
      )}

      <div className={view === 'two' ? 'ks-grid ks-grid--two' : 'ks-grid'}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            index={i}
            /* Top row is on screen the moment a page renders, so it animates on
               mount rather than waiting to be scrolled into view. */
            revealOnMount={i < 4}
          />
        ))}
      </div>

      {(hasPrevious || nextCursor) && (
        <nav className="ks-pagination" aria-label="Shop pages">
          <button
            type="button"
            className="ks-page-arrow"
            onClick={goPrevious}
            disabled={!hasPrevious}
            aria-label="Previous page"
          >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <line x1="16" y1="5" x2="2" y2="5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6 1 2 5l4 4" stroke="currentColor" strokeWidth="1.2" fill="none" />
            </svg>
          </button>

          <button
            type="button"
            className="ks-page-arrow"
            onClick={goNext}
            disabled={!nextCursor}
            aria-label="Next page"
          >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <line x1="0" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" />
            </svg>
          </button>
        </nav>
      )}
    </main>
  );
}
