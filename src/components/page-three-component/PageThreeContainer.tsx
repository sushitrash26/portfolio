import React, { useState, useEffect } from 'react'
import PageThreeHeading from './PageThreeHeading'
import Cards from './Cards'
import { TearableCloth } from '../ui/tearable-cloth'
import { motion, AnimatePresence } from 'framer-motion'

const PageThreeContainer = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
    };

    window.addEventListener("mousedown", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    return () => {
      window.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  return (
    <div className="relative w-full sm:w-[90vw] md:w-[80vw] lg:w-[75vw] max-w-7xl bg-white/95 mx-auto rounded-xl sm:rounded-2xl overflow-hidden p-4 sm:p-6">
      {/* Sarcastic Hint Sticker */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -3 }}
            exit={{ opacity: 0, scale: 0.8, y: -10, transition: { duration: 0.2 } }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 pointer-events-none select-none"
          >
            <div className="bg-yellow-50/95 border border-yellow-200 text-neutral-800 px-3.5 py-2.5 rounded shadow-lg font-mono text-[10px] sm:text-[11px] max-w-[200px] sm:max-w-[240px]">
              <div className="font-bold text-yellow-600 mb-1 flex items-center gap-1">
                <span>⚠️ THERAPEUTIC ADVICE:</span>
              </div>
              Drag/slash your cursor across this paper to rip it open. Yes, vandalize my website. No, it won&apos;t break your screen.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Foreground Paper Tear Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <TearableCloth />
      </div>

      <div className="relative z-10">
        <PageThreeHeading/>
      </div>
      
      <div className="relative z-10">
        <Cards/>
      </div>

      <div className='relative z-10 w-full grid justify-center items-center mt-6 sm:mt-10 text-lg sm:text-xl md:text-2xl lg:text-3xl font-manrope font-bold mx-auto px-4 text-center'>
        <span>Interactive video editor platforms, SaaS websites,</span>
        <span className='w-full flex justify-center items-center'>3D websites, and modern web experiences.</span>
      </div>
    </div>
  )
}

export default PageThreeContainer
