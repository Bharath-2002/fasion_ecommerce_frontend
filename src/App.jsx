import { useState, useCallback } from 'react';
import './App.css';

import CardStackEntrance from './components/CardStackEntrance';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HeritageIntroSection from './components/HeritageIntroSection';
import CollectionsSection from './components/CollectionsSection';
import TraditionalFooter from './components/TraditionalFooter';
export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      {/* Main site — always in DOM so hero card is ready for seamless handoff */}
      <Navbar />
      <main>
        <HeroSection />
        <HeritageIntroSection />
        <CollectionsSection />
      </main>
      <TraditionalFooter />

      {/* Cinematic entrance overlay — unmounts after self-managed exit */}
      {!introComplete && (
        <CardStackEntrance onComplete={handleIntroComplete} />
      )}
    </>
  );
}
