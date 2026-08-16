// Minimal Google SSO client for the backend's /api/v1/auth/* routes.
//
// This is deliberately small: enough to sign in, land as the bootstrap
// tenant owner on the one seeded demo tenant, and prove the whole chain
// works end to end in a real browser. It is NOT a tenant switcher (real
// multi-tenant login UI — picking from a list of memberships — is separate,
// not-yet-built work); VITE_DEMO_TENANT_ID is a demo-only shortcut, not how
// this would work with more than one tenant.
//
// State/nonce round-trip through sessionStorage (single browser tab, single
// redirect round-trip — see the backend's auth.py docstring, which
// documents this as the caller's responsibility). Tokens persist in
// localStorage so a page reload doesn't sign you out.
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';
const DEMO_TENANT_ID = import.meta.env.VITE_DEMO_TENANT_ID || null;

const STATE_KEY = 'auth.pending';
const TOKENS_KEY = 'auth.tokens';

export function getCallbackUrl() {
  return `${window.location.origin}/auth/callback`;
}

export function getStoredTokens() {
  const raw = localStorage.getItem(TOKENS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setStoredTokens(tokens) {
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
}

export function clearStoredTokens() {
  localStorage.removeItem(TOKENS_KEY);
}

// Decodes the JWT payload without verifying the signature — display only.
// The backend verifies every token on every real request; nothing here is
// trusted for authorization.
export function decodeAccessToken(accessToken) {
  try {
    const payload = accessToken.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function startLogin() {
  const redirectUri = getCallbackUrl();
  const response = await fetch(
    `${API_BASE}/api/v1/auth/google/login?redirect_uri=${encodeURIComponent(redirectUri)}`
  );
  if (!response.ok) throw new Error('Could not start Google login.');
  const { authorization_url, state, nonce } = await response.json();
  sessionStorage.setItem(STATE_KEY, JSON.stringify({ state, nonce, redirectUri }));
  window.location.href = authorization_url;
}

export async function completeLogin(receivedCode, receivedState) {
  const raw = sessionStorage.getItem(STATE_KEY);
  if (!raw) throw new Error('No login was in progress in this browser tab.');
  const { state: expectedState, nonce, redirectUri } = JSON.parse(raw);
  sessionStorage.removeItem(STATE_KEY);

  const response = await fetch(`${API_BASE}/api/v1/auth/google/callback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: receivedCode,
      redirect_uri: redirectUri,
      state: receivedState,
      expected_state: expectedState,
      nonce,
    }),
  });
  if (!response.ok) throw new Error('Google sign-in failed.');
  let tokens = await response.json();

  // Every new session starts with no active tenant (the backend's own
  // design — tenant selection is a separate step). This demo has exactly
  // one tenant, so auto-select it if configured; a real multi-tenant login
  // would show a tenant picker here instead.
  if (DEMO_TENANT_ID) {
    const selectResponse = await fetch(`${API_BASE}/api/v1/auth/select-tenant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: tokens.refresh_token, tenant_id: DEMO_TENANT_ID }),
    });
    if (selectResponse.ok) {
      tokens = await selectResponse.json();
    }
    // If tenant selection fails (e.g. this email has no membership there
    // yet), keep the platform-level tokens rather than losing the sign-in
    // entirely.
  }

  setStoredTokens(tokens);
  return tokens;
}

export async function logout() {
  const tokens = getStoredTokens();
  clearStoredTokens();
  if (!tokens?.refresh_token) return;
  await fetch(`${API_BASE}/api/v1/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: tokens.refresh_token }),
  }).catch(() => {});
}
