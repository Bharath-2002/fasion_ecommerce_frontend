import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

import CardStackEntrance from './components/CardStackEntrance';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HeritageIntroSection from './components/HeritageIntroSection';
import CollectionsSection from './components/CollectionsSection';
import TraditionalFooter from './components/TraditionalFooter';
import MobileNav from './components/MobileNav';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      {/* Cinematic entrance overlay */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <CardStackEntrance onComplete={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main site — fades in after intro */}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Navbar />

            <main>
              <HeroSection />
              <HeritageIntroSection />
              <CollectionsSection />
            </main>

            <TraditionalFooter />
            <MobileNav />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
