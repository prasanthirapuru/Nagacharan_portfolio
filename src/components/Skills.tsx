"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";

/**
 * Skills Section Component
 * Renders technical software proficiency matrices and core creative competencies.
 */
interface Tool {
  name: string;
  borderColor: string;
  icon: React.ReactNode;
}

const tools: Tool[] = [
  {
    name: "Adobe Premiere Pro",
    borderColor: "rgba(255, 255, 255, 0.1)",
    icon: (
      <svg className="w-10 h-10 opacity-90 sm:opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="#000000" stroke="#333" strokeWidth="2" />
        <text x="50" y="62" fill="#FFFFFF" fontSize="38" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Pr</text>
      </svg>
    ),
  },
  {
    name: "Adobe After Effects",
    borderColor: "rgba(255, 255, 255, 0.1)",
    icon: (
      <svg className="w-10 h-10 opacity-90 sm:opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="#000000" stroke="#333" strokeWidth="2" />
        <text x="50" y="62" fill="#FFFFFF" fontSize="38" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Ae</text>
      </svg>
    ),
  },
  {
    name: "DaVinci Resolve",
    borderColor: "rgba(255, 255, 255, 0.1)",
    icon: (
      <svg className="w-10 h-10 opacity-90 sm:opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="#000000" stroke="#333" strokeWidth="2" />
        <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="2" strokeDasharray="6,4" />
        <circle cx="50" cy="50" r="10" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: "CapCut",
    borderColor: "rgba(255, 255, 255, 0.1)",
    icon: (
      <svg className="w-10 h-10 opacity-90 sm:opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="#000000" stroke="#333" strokeWidth="2" />
        <circle cx="38" cy="50" r="12" stroke="#ffffff" strokeWidth="4" fill="none" />
        <circle cx="62" cy="50" r="12" stroke="#ffffff" strokeWidth="4" fill="none" />
      </svg>
    ),
  },
  {
    name: "Canva",
    borderColor: "rgba(255, 255, 255, 0.1)",
    icon: (
      <svg className="w-10 h-10 opacity-90 sm:opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="#000000" stroke="#333" strokeWidth="2" />
        <circle cx="50" cy="50" r="22" stroke="#ffffff" strokeWidth="3" fill="none" />
        <text x="50" y="58" fill="#FFFFFF" fontSize="24" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">C</text>
      </svg>
    ),
  },
];

const skillTags = [
  "Video Editing",
  "Motion Graphics",
  "Color Grading",
  "Storytelling",
  "Sound Design",
  "VFX",
  "YouTube Editing",
  "Instagram Reels",
  "Commercial Ads",
  "Wedding Films",
];

function SkillCard({ tool }: { tool: Tool }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    card.style.borderColor = "rgba(255, 255, 255, 0.15)";
    card.style.backgroundColor = "#181818";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.borderColor = "rgba(255, 255, 255, 0.05)";
    card.style.backgroundColor = "#111111";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ease-out h-40 select-none group"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="mb-3 transform translate-z-10" style={{ transform: "translateZ(20px)" }}>
        {tool.icon}
      </div>
      <h4
        className="text-xs font-semibold text-white/50 group-hover:text-white transition-colors duration-300 uppercase tracking-widest"
        style={{ transform: "translateZ(10px)" }}
      >
        {tool.name}
      </h4>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative min-h-screen w-full py-24 px-6 flex items-center justify-center overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-white"
          >
            SKILLS
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "40px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-white/30 mt-4"
          />
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-20">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <SkillCard tool={tool} />
            </motion.div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
            {skillTags.map((tag, idx) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#111111] border border-white/5 text-white/50 hover:border-white/15 hover:text-white transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
