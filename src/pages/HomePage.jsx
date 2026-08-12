import { useState, useCallback, useLayoutEffect } from 'react';

import CardStackEntrance from '../components/CardStackEntrance';
import HeroSection from '../components/HeroSection';
import CollectionsSection from '../components/CollectionsSection';
import ProductGrid from '../components/ProductGrid';

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  /* The entrance overlay covers the viewport for ~4s, during which the page
     below is still settling — and on a back-navigation the browser may restore
     the offset the visitor left from. Pin to the top and freeze scrolling until
     the overlay is gone, so the hero is always what's revealed underneath. */
  useLayoutEffect(() => {
    if (introComplete) return undefined;

    window.scrollTo(0, 0);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [introComplete]);

  return (
    <>
      {/* Always in the DOM so the hero card is ready for a seamless handoff
          from the entrance animation. */}
      <main>
        <HeroSection />
        <CollectionsSection />
        <ProductGrid />
      </main>

      {/* Cinematic entrance overlay — home only, and unmounts after its own
          exit. Replaying it on every route change would be tiresome. */}
      {!introComplete && <CardStackEntrance onComplete={handleIntroComplete} />}
    </>
  );
}
