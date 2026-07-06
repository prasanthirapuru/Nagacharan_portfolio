"use client";

import React from "react";

export default function Marquee() {
  const words = Array(10).fill("VIDEO EDITOR");

  return (
    <div className="w-full overflow-hidden py-12 border-y border-white/5 bg-transparent select-none pointer-events-none relative flex">
      {/* Opacity mask overlays at edges to create a natural, premium fade-in/fade-out cinematic feel */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#050505] to-transparent z-10" />

      {/* GPU accelerated continuous ticker track */}
      <div className="animate-marquee flex whitespace-nowrap gap-10">
        {/* Track Group 1 */}
        <div className="flex items-center gap-10 pr-10">
          {words.map((word, idx) => (
            <div key={`g1-${idx}`} className="flex items-center gap-10">
              <span 
                style={{ fontFamily: "var(--font-cinzel), serif" }}
                className="text-xs sm:text-sm font-light uppercase tracking-[0.45em] text-white/20 transition-opacity duration-300"
              >
                {word}
              </span>
              <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
            </div>
          ))}
        </div>

        {/* Track Group 2 (identical duplicate for seamless infinite loop wrapper) */}
        <div className="flex items-center gap-10 pr-10" aria-hidden="true">
          {words.map((word, idx) => (
            <div key={`g2-${idx}`} className="flex items-center gap-10">
              <span 
                style={{ fontFamily: "var(--font-cinzel), serif" }}
                className="text-xs sm:text-sm font-light uppercase tracking-[0.45em] text-white/20 transition-opacity duration-300"
              >
                {word}
              </span>
              <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
