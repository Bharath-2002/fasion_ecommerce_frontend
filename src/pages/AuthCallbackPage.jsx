import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { completeLogin } from '../lib/auth';
import { useAuth } from '../context/AuthContext';

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [asyncError, setAsyncError] = useState(null);
  // The code/state pair Google sent is single-use - guards against
  // React 18/19 dev-mode's double-invoke of effects exchanging it twice.
  const startedRef = useRef(false);

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  // Known synchronously from the URL itself - not state, so there is
  // nothing to set inside the effect for this case.
  const missingParams = !code || !state;

  useEffect(() => {
    if (missingParams || startedRef.current) return;
    startedRef.current = true;

    completeLogin(code, state)
      .then((tokens) => {
        setSession(tokens);
        navigate('/', { replace: true });
      })
      .catch((err) => setAsyncError(err.message || 'Sign-in failed.'));
  }, [missingParams, code, state, navigate, setSession]);

  const error = missingParams
    ? 'Google did not return a code — sign-in was likely cancelled.'
    : asyncError;

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      {error ? (
        <>
          <p style={{ fontFamily: 'var(--sans)' }}>{error}</p>
          <Link to="/">Return home</Link>
        </>
      ) : (
        <p style={{ fontFamily: 'var(--sans)' }}>Signing you in…</p>
      )}
    </main>
  );
}
