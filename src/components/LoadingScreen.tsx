"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Disable scroll on mounting loader
    document.body.style.overflow = "hidden";

    const duration = 1500; // 1.5 seconds total
    const startTime = performance.now();

    let rafId: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);

      // Add a slight step/stutter to progress count to feel human/handcrafted rather than purely linear
      const organicPct = Math.floor(pct);

      setProgress(organicPct);

      if (elapsed < duration) {
        rafId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsComplete(true);
          // Restore overflow on body
          document.body.style.overflow = "";
          if (typeof window !== "undefined") {
            (window as any).__portfolioLoaded = true;
            window.dispatchEvent(new CustomEvent("portfolio-loaded"));
          }
        }, 300); // Elegant delay after progress finishes
      }
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-[#050505] z-[99999] flex flex-col items-center justify-center select-none"
        >
          <div className="flex flex-col items-center">
            {/* Elegant agency logo styling using Cinzel font */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-cinzel), serif" }}
              className="text-xl sm:text-2xl uppercase tracking-[0.35em] text-white font-light mb-2.5"
            >
              NAGACHARAN
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[9px] uppercase tracking-[0.4em] text-white/50 mb-10 font-mono"
            >
              Video Editor
            </motion.p>

            {/* Ultra thin elegant luxury loader line */}
            <div className="w-36 h-[1px] bg-white/10 relative overflow-hidden mb-3.5">
              <motion.div
                className="absolute left-0 top-0 h-full bg-white/70"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.05 }}
              />
            </div>

            {/* Progress Percentage Counter */}
            <motion.span
              className="text-[10px] font-mono text-white/30 tracking-widest font-light"
            >
              {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
