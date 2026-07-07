"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

/**
 * Hero Section Component
 * Renders the landing screen with an interactive 3D abstract Scene, 
 * GSAP-based magnetic buttons, and cinematic typography.
 */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewWorksBtnRef = useRef<HTMLAnchorElement>(null);
  const hireMeBtnRef = useRef<HTMLAnchorElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // IntersectionObserver to unmount Scene3D Canvas when out-of-screen (performance optimization)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "200px", // Pre-load 200px before scroll-in
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, []);

  // Set up magnetic button physics for desktop hover micro-interactions
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const setupMagnetic = (buttonRef: React.RefObject<HTMLAnchorElement | null>) => {
      const btn = buttonRef.current;
      if (!btn) return;

      let bounds: DOMRect | null = null;

      const onMouseEnter = () => {
        bounds = btn.getBoundingClientRect();
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!bounds) {
          bounds = btn.getBoundingClientRect();
        }
        const mouseX = e.clientX - bounds.left - bounds.width / 2;
        const mouseY = e.clientY - bounds.top - bounds.height / 2;

        // Smoothly lerp button position towards cursor coordinates
        gsap.to(btn, {
          x: mouseX * 0.25,
          y: mouseY * 0.25,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        bounds = null;
        // Elastic snap back to origin
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
        });
      };

      btn.addEventListener("mouseenter", onMouseEnter);
      btn.addEventListener("mousemove", onMouseMove);
      btn.addEventListener("mouseleave", onMouseLeave);

      return () => {
        btn.removeEventListener("mouseenter", onMouseEnter);
        btn.removeEventListener("mousemove", onMouseMove);
        btn.removeEventListener("mouseleave", onMouseLeave);
      };
    };

    const cleanupWorks = setupMagnetic(viewWorksBtnRef);
    const cleanupHire = setupMagnetic(hireMeBtnRef);

    return () => {
      if (cleanupWorks) cleanupWorks();
      if (cleanupHire) cleanupHire();
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 grid-bg bg-[#050505]"
    >
      {/* 3D Glass Ring canvas overlay */}
      {isHeroVisible && <Scene3D />}

      {/* Extremely subtle dark radial gradients to create calm depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/[0.01] rounded-full filter blur-[140px] pointer-events-none -z-10" />

      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center justify-center text-center z-10 select-none">

        {/* Soft tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3] mb-6 shadow-sm"
        >
          <span>VIDEO EDITOR</span>
        </motion.div>

        {/* Minimal text-reveal name: CHARAN */}
        <div className="relative overflow-visible">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-cinzel), serif" }}
            className="text-[14vw] sm:text-[11vw] font-black tracking-tight leading-none text-reveal text-white"
          >
            CHARAN
          </motion.h1>
        </div>

        {/* Premium storytelling pitch */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.0 }}
          className="max-w-xl text-sm sm:text-base text-white/50 mt-6 mb-12 tracking-wide font-light leading-relaxed"
        >
          Crafting premium stories, minimal motion design, and high-end color grading.
          Focusing on cinematic pacing and visual excellence.
        </motion.p>

        {/* Minimal Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.0 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            ref={viewWorksBtnRef}
            href="#works"
            onClick={(e) => handleScrollTo(e, "works")}
            className="group px-7 py-3.5 rounded-full font-semibold text-xs uppercase tracking-widest text-[#050505] bg-white hover:bg-white/90 transition-all duration-300 flex items-center gap-2"
          >
            <span>View Works</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>

          <a
            ref={hireMeBtnRef}
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            className="px-7 py-3.5 rounded-full font-semibold text-xs uppercase tracking-widest text-white border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-all duration-300"
          >
            <span>Get In Touch</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
