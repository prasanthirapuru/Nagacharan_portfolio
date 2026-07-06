"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Tv,
  Palette,
  Heart,
  Briefcase,
} from "lucide-react";

// Local custom inline SVG definitions for compatibility safety
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" fill="none" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

/**
 * Services Section Component
 * Displays the core service offerings of the creative video editing portfolio,
 * complete with smooth hover animations and monochrome glow states.
 */
interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  glow: string;
}

const services: Service[] = [
  {
    icon: InstagramIcon,
    title: "Instagram Reel Editing",
    description: "High-retention vertical edits with fast cuts, trend integration, captions, sound designs, and visual hooks to boost engagement and reach.",
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236, 72, 153, 0.4)",
  },
  {
    icon: YoutubeIcon,
    title: "YouTube Editing",
    description: "Long-form pacing, narrative-focused edits with B-roll sequencing, custom memes/popups, and audio enhancement designed for max watch time.",
    color: "from-red-500 to-orange-500",
    glow: "rgba(239, 68, 68, 0.4)",
  },
  {
    icon: Sparkles,
    title: "Motion Graphics",
    description: "Sleek kinetic typography, animated infographics, dynamic lower thirds, and logo intro animations to elevate production value.",
    color: "from-purple-500 to-indigo-500",
    glow: "rgba(168, 85, 247, 0.4)",
  },
  {
    icon: Tv,
    title: "Commercial Ads",
    description: "High-end product or service promo edits tailored for high conversion rates. Optimized pacing and modern cinematic styling for social media ads.",
    color: "from-blue-500 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.4)",
  },
  {
    icon: Palette,
    title: "Color Grading",
    description: "Professional tone-matching, color correction, and cinematic grading using custom LUTs to set the perfect emotional atmosphere.",
    color: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.4)",
  },
  {
    icon: Heart,
    title: "Wedding Films",
    description: "Emotional storytelling through sound mapping, dialogue overlays, warm color grading, and beautiful chronological flow of special memories.",
    color: "from-amber-400 to-pink-500",
    glow: "rgba(251, 191, 36, 0.4)",
  },
  {
    icon: Briefcase,
    title: "Corporate Videos",
    description: "Polished and professional brand stories, event teasers, presentations, or interview setups optimized for public relation campaigns.",
    color: "from-cyan-500 to-blue-500",
    glow: "rgba(6, 182, 212, 0.4)",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative min-h-screen w-full py-24 px-6 flex items-center justify-center overflow-hidden">
      {/* Background glow dots */}
      <div className="absolute top-[30%] left-[-5%] w-[400px] h-[400px] bg-neon-purple/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-neon-cyan/5 rounded-full filter blur-[150px] pointer-events-none -z-10 animate-pulse-glow" />

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
            Services
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "40px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-white/30 mt-4"
          />
        </div>

        {/* Services Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative group p-[1px] rounded-3xl overflow-hidden bg-white/5 border border-white/5 hover:border-transparent transition-all duration-300"
              >
                {/* Neon Hover Border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                {/* Inner Card content */}
                <div className="bg-dark-surface/90 rounded-[23px] p-8 h-full flex flex-col justify-between transition-all duration-300 group-hover:bg-dark-surface/75 group-hover:translate-y-[-2px] group-hover:shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
                  <div>
                    {/* Icon container */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r ${service.color} text-white mb-6 shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-foreground/70 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
