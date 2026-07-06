"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Film, Award, Smile, Clock } from "lucide-react";

/**
 * About Section Component
 * Displays the biography, profile statistics, and animated counter metrics.
 */

/**
 * Counter Component
 * Triggers a numerical animation when scrolled into the viewport.
 */
function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const totalTicks = 60;
    const stepTime = (duration * 1000) / totalTicks;
    
    const timer = setInterval(() => {
      start += Math.ceil(end / totalTicks);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration, isVisible]);

  return <span ref={elementRef}>{count}</span>;
}

const stats = [
  { icon: Film, value: 25, label: "Projects Edited", suffix: "+" },
  { icon: Award, value: 1, label: "Experience", suffix: " Year" },
  { icon: Smile, value: 120, label: "Happy Clients", suffix: "+" },
  { icon: Clock, value: 2000, label: "Hours in Premiere Pro", suffix: "+" },
];

export default function About() {
  return (
    <section id="about" className="relative min-h-screen w-full py-24 px-6 flex items-center justify-center overflow-hidden bg-[#0b0b0b]">
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
            About Me
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "40px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-white/30 mt-4"
          />
        </div>

        {/* Content Layout */}
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl font-bold text-white mb-6"
          >
            Visual Storyteller & Motion Designer
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-white/60 leading-relaxed font-light mb-6 max-w-3xl"
          >
            Hi, I'm <strong className="text-white font-semibold">Nagacharan</strong>. I craft high-impact video campaigns, dynamic YouTube content, high-retention Instagram reels, and premium commercials. With a passion for pacing, flow, and color harmony, I transform raw footage into premium cinematic experiences.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-white/60 leading-relaxed font-light mb-12 max-w-3xl"
          >
            Whether it’s a high-energy commercial with complex VFX, a wedding film filled with raw emotions, or a storytelling-driven YouTube video, my edits are structured to keep viewers hooked from the very first frame.
          </motion.p>

          {/* Stats Counter Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#111111] border border-white/5 p-6 rounded-xl hover:border-white/10 transition-all duration-300 group flex flex-col items-center justify-center text-center shadow-lg"
              >
                <div className="flex flex-col items-center mb-3">
                  <stat.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-300 mb-2" />
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                    {stat.label}
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-white">
                  <Counter value={stat.value} />
                  <span className="text-white/60 font-semibold">{stat.suffix}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
