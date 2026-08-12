import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import GridViewToggle from '../components/GridViewToggle';
import { useGridView } from '../hooks/useGridView';
import { products } from '../data/products';

const PER_PAGE = 12;

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useGridView();
  const totalPages = Math.max(1, Math.ceil(products.length / PER_PAGE));

  /* Page lives in the URL so a page of results can be linked and shared, and
     so back/forward move through pages instead of leaving the shop. Clamped
     because ?page=99 is one hand-edit away. */
  const requested = Number.parseInt(searchParams.get('page') ?? '1', 10);
  const page = Number.isNaN(requested) ? 1 : Math.min(Math.max(requested, 1), totalPages);

  const start = (page - 1) * PER_PAGE;
  const visible = products.slice(start, start + PER_PAGE);

  // ScrollToTop reacts to the query change, so no manual scroll needed here.
  const goTo = (next) => {
    setSearchParams(next === 1 ? {} : { page: String(next) });
  };

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

      <div className={view === 'two' ? 'ks-grid ks-grid--two' : 'ks-grid'}>
        {visible.map((product, i) => (
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

      {totalPages > 1 && (
        <nav className="ks-pagination" aria-label="Shop pages">
          <button
            type="button"
            className="ks-page-arrow"
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <line x1="16" y1="5" x2="2" y2="5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6 1 2 5l4 4" stroke="currentColor" strokeWidth="1.2" fill="none" />
            </svg>
          </button>

          <ol className="ks-page-list">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                <button
                  type="button"
                  className={n === page ? 'ks-pagenum is-current' : 'ks-pagenum'}
                  onClick={() => goTo(n)}
                  aria-current={n === page ? 'page' : undefined}
                  aria-label={`Page ${n}`}
                >
                  {n}
                </button>
              </li>
            ))}
          </ol>

          <button
            type="button"
            className="ks-page-arrow"
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
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
