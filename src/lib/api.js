// Client for the backend's public storefront read API
// (`/api/v1/public/*` — see `docs/ARCHITECTURE.md` A1 in the backend repo).
//
// `VITE_API_BASE_URL` is unset (empty string, i.e. relative fetches) by
// default, which is correct in production: the built frontend and the API
// are served from the *same* host (A1 — "one multi-tenant storefront
// deployment... the incoming domain resolves to a tenant"), so the browser's
// own Host header is already the tenant's. `.env.development` points it at
// the local backend for `npm run dev`, where the frontend (port 5173) and
// backend (port 8000) are different origins — CORS on the backend already
// allows this origin, and a `tenant_domains` row for hostname `localhost`
// (`scripts/seed_demo_storefront.py` in the backend repo) makes the real
// Host-header resolver work locally, not a bypass of it.
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export class ApiError extends Error {
  constructor(status, body) {
    super(body?.detail || body?.title || `Request failed with status ${status}`);
    this.status = status;
    this.body = body;
  }
}

async function request(path, { params } = {}) {
  const query = params
    ? '?' +
      new URLSearchParams(
        Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null))
      )
    : '';
  const response = await fetch(`${API_BASE}/api/v1/public${path}${query}`);
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(response.status, body);
  }
  return response.json();
}

export const api = {
  listCategories: (parentId) => request('/categories', { params: { parent_id: parentId } }),

  listProducts: ({ categoryId, cursor, limit } = {}) =>
    request('/products', { params: { category_id: categoryId, cursor, limit } }),

  getProduct: (id) => request(`/products/${id}`),

  listProductImages: (id) => request(`/products/${id}/images`),
};
