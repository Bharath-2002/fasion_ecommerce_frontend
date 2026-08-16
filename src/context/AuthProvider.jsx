import { useCallback, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  clearStoredTokens,
  decodeAccessToken,
  getStoredTokens,
  logout as logoutRequest,
  startLogin,
} from '../lib/auth';

export default function AuthProvider({ children }) {
  const [tokens, setTokens] = useState(() => getStoredTokens());
  const claims = tokens ? decodeAccessToken(tokens.access_token) : null;

  const login = useCallback(() => {
    startLogin();
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    clearStoredTokens();
    setTokens(null);
  }, []);

  // Called by AuthCallbackPage once completeLogin() resolves, so the app
  // re-renders with the new session immediately rather than needing a
  // full page reload to notice localStorage changed.
  const setSession = useCallback((newTokens) => setTokens(newTokens), []);

  const value = {
    isAuthenticated: Boolean(tokens),
    claims,
    login,
    logout,
    setSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
