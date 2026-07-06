"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";

import { works } from "@/data/works";

interface Project {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  description: string;
  software: string[];
  duration: string;
  client: string;
  year: string;
}

const reelsData: Project[] = works
  .filter((p) => p.category === "instagram")
  .map((p) => ({
    id: p.id,
    title: p.title,
    category: "Instagram Reels",
    videoUrl: p.video,
    description: p.description,
    software: p.software,
    duration: p.duration,
    client: p.client,
    year: p.year,
  }));

const youtubeData: Project[] = works
  .filter((p) => p.category === "youtube")
  .map((p) => ({
    id: p.id,
    title: p.title,
    category: "YouTube Videos",
    videoUrl: p.video,
    description: p.description,
    software: p.software,
    duration: p.duration,
    client: p.client,
    year: p.year,
  }));

// Carousel Slider Hook/Wrapper
function useCarousel(itemsCount: number, visibleCards: number) {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prevIndex) => {
      return Math.max(0, prevIndex - 1);
    });
  };

  const next = () => {
    setIndex((prevIndex) => {
      const maxIndex = Math.max(0, itemsCount - visibleCards);
      return Math.min(prevIndex + 1, maxIndex);
    });
  };

  useEffect(() => {
    setIndex((prevIndex) => {
      const maxIndex = Math.max(0, itemsCount - visibleCards);
      if (prevIndex > maxIndex) return maxIndex;
      return prevIndex;
    });
  }, [itemsCount, visibleCards]);

  return { index, prev, next };
}

// 3D Tilt Card Component
/**
 * 3D Tilt Card Component for Portfolio Works
 * Uses React.memo and stable onClick callbacks to avoid unnecessary re-renders when scrolling.
 * Preloads metadata to display the first frame as a high-quality thumbnail without downloading the video.
 */
interface WorkCardProps {
  project: Project;
  isReel: boolean;
  onClick: (project: Project) => void;
}

const WorkCard = memo(function WorkCard({ project, isReel, onClick }: WorkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isMounted = useRef(false);

  // Play video on hover; pause and reset to first frame when mouse leaves
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !video.getAttribute("src")) return;

    if (isHovered) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      if (isMounted.current) {
        video.pause();
        video.currentTime = 0.001;
      }
    }
  }, [isHovered]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (card) {
      rectRef.current = card.getBoundingClientRect();
    }
    setIsHovered(true);
  };

  // Perform subtle 3D card tilt based on mouse position relative to card boundaries
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    if (!rectRef.current) {
      rectRef.current = card.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setIsHovered(false);
    rectRef.current = null;
  };

  const handleClick = useCallback(() => {
    onClick(project);
  }, [project, onClick]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className="glass-panel border-white/5 rounded-2xl overflow-hidden cursor-pointer-target group transition-all duration-300 ease-out select-none shadow-2xl relative w-full h-full flex flex-col"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={`relative w-full overflow-hidden bg-[#050505] flex-1 ${isReel ? "aspect-[9/16]" : "aspect-[16/9]"}`}>
        <video
          ref={videoRef}
          src={`${project.videoUrl}#t=0.001`}
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 pointer-events-none group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />
        
        {/* Play Icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-4 h-4 text-black fill-black ml-0.5" />
          </div>
        </div>

      </div>
    </div>
  );
});

/**
 * Works Section Component
 * Renders horizontal slide carousels for Instagram Reels (9:16) and YouTube videos (16:9).
 * Uses a custom responsive hook to manage carousel positions and handles modal video playback.
 */
export default function Works() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [reelsVisible, setReelsVisible] = useState(5);
  const [ytVisible, setYtVisible] = useState(4);

  const reelsCarousel = useCarousel(reelsData.length, reelsVisible);
  const ytCarousel = useCarousel(youtubeData.length, ytVisible);

  // Set visible items based on screen breakpoints
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setReelsVisible(1.2);
        setYtVisible(1.2);
      } else if (w < 1024) {
        setReelsVisible(2.2);
        setYtVisible(2.2);
      } else if (w < 1280) {
        setReelsVisible(4);
        setYtVisible(3);
      } else {
        setReelsVisible(5);
        setYtVisible(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Stable callback for opening the video player modal with a soft silver confetti burst
  const handleOpenModal = useCallback((project: Project) => {
    setSelectedProject(project);
    confetti({
      particleCount: 50,
      spread: 40,
      origin: { y: 0.8 },
      colors: ["#ffffff", "#a3a3a3", "#475569"],
    });
  }, []);

  return (
    <section id="works" className="relative min-h-screen w-full py-24 px-6 overflow-hidden bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-white"
          >
            Works
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "40px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-white/30 mt-4"
          />
        </div>

        {/* 1. Instagram Reels Carousel */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide uppercase">Instagram Reels</h3>
            </div>
            {/* Nav Arrows */}
            <div className="flex items-center space-x-2">
              <button
                onClick={reelsCarousel.prev}
                disabled={reelsCarousel.index <= 0}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Previous Reel"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={reelsCarousel.next}
                disabled={reelsCarousel.index >= reelsData.length - reelsVisible}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Next Reel"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Track */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) will-change-transform"
              style={{
                transform: `translate3d(-${reelsCarousel.index * (100 / reelsData.length)}%, 0, 0)`,
                width: `${(reelsData.length / reelsVisible) * 100}%`,
              }}
            >
              {reelsData.map((project) => {
                return (
                  <div
                    key={project.id}
                    className="px-3"
                    style={{ width: `${100 / reelsData.length}%` }}
                  >
                    <WorkCard project={project} isReel={true} onClick={handleOpenModal} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. YouTube Videos Carousel */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide uppercase">YouTube Videos</h3>
            </div>
            {/* Nav Arrows */}
            <div className="flex items-center space-x-2">
              <button
                onClick={ytCarousel.prev}
                disabled={ytCarousel.index <= 0}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Previous Video"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={ytCarousel.next}
                disabled={ytCarousel.index >= youtubeData.length - ytVisible}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Next Video"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Track */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) will-change-transform"
              style={{
                transform: `translate3d(-${ytCarousel.index * (100 / youtubeData.length)}%, 0, 0)`,
                width: `${(youtubeData.length / ytVisible) * 100}%`,
              }}
            >
              {youtubeData.map((project) => {
                return (
                  <div
                    key={project.id}
                    className="px-3"
                    style={{ width: `${100 / youtubeData.length}%` }}
                  >
                    <WorkCard project={project} isReel={false} onClick={handleOpenModal} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.98, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className={`relative w-full bg-black border border-white/5 rounded-2xl overflow-hidden shadow-2xl z-[101] ${
                selectedProject.category === "Instagram Reels"
                  ? "max-w-[350px] aspect-[9/16]"
                  : "max-w-4xl aspect-video"
              }`}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/50 border border-white/10 text-white hover:bg-white hover:text-black transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full h-full bg-black flex items-center justify-center">
                <video
                  src={selectedProject.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Backdrop click to close */}
            <div className="absolute inset-0 cursor-none" onClick={() => setSelectedProject(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
