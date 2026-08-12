import { useState, useEffect } from 'react';

const KEY = 'bb:grid-view';

/* Mobile grid density: 'one' or 'two' cards per row.
   Persisted so the choice survives navigating between the home grid and the
   shop, rather than resetting on every page. Defaults to 'one'. */
export function useGridView() {
  const [view, setView] = useState(() => {
    try {
      return window.localStorage.getItem(KEY) === 'two' ? 'two' : 'one';
    } catch {
      // Private mode / storage disabled — fall back to the default
      return 'one';
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, view);
    } catch {
      // Nothing to do; the in-memory value still drives this session
    }
  }, [view]);

  return [view, setView];
}
