import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* React Router keeps the window's scroll offset across navigations, so moving
   from the bottom of the home page to /shop lands you at the bottom of /shop.
   Browsers separately restore the previous offset on back/forward, which drops
   you mid-hero while the entrance animation is still playing.

   Both are handled here: scroll restoration is switched to manual, and every
   pathname or query change resets to the top. useLayoutEffect so it lands
   before paint rather than as a visible jump. */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    /* Set on every navigation, not once on mount: scrollRestoration belongs to
       the current history entry, so a single assignment leaves every entry
       pushed afterwards back on 'auto'. */
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    /* And again after the next frame. The home page keeps growing after mount —
       the collections section measures its own width, images decode — and a
       restored offset can be reapplied once the document is finally tall
       enough to accept it. */
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(raf);
  }, [pathname, search]);

  return null;
}
