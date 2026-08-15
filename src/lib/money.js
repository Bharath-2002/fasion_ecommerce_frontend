// The backend stores price as integer minor units (paise, not rupees) plus
// a currency code — never a float (see backend CLAUDE.md §12). `price` in
// the old src/data/products.js fixture was a plain rupee number; this is
// the real shape's formatter.
const formatters = new Map();

export function formatPrice(amountMinor, currency = 'INR') {
  if (amountMinor == null) return '';
  if (!formatters.has(currency)) {
    formatters.set(
      currency,
      new Intl.NumberFormat('en-IN', { style: 'currency', currency, minimumFractionDigits: 0 })
    );
  }
  return formatters.get(currency).format(amountMinor / 100);
}
