/* Mobile-only toggle (hidden by CSS above 768px) that flips the product grid
   between one and two cards per row. The icon shows the layout you'll get by
   tapping, not the one you're in. */
export default function GridViewToggle({ view, onChange }) {
  const next = view === 'one' ? 'two' : 'one';

  return (
    <button
      type="button"
      className="ks-viewtoggle"
      onClick={() => onChange(next)}
      aria-label={next === 'two' ? 'Show two sarees per row' : 'Show one saree per row'}
    >
      {next === 'two' ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1.5" y="1.5" width="5.5" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <rect x="9" y="1.5" width="5.5" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      )}
    </button>
  );
}
