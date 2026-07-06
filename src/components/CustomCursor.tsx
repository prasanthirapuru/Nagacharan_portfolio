"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) {
      cursor.style.display = "none";
      follower.style.display = "none";
      return;
    }

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power2.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power2.out" });
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.25, ease: "power3.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.25, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 1.3, backgroundColor: "#ffffff", duration: 0.2 });
      gsap.to(follower, {
        scale: 1.6,
        borderColor: "#ffffff",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderWidth: "1px",
        duration: 0.2,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "#a3a3a3", duration: 0.2 });
      gsap.to(follower, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        backgroundColor: "transparent",
        borderWidth: "1px",
        duration: 0.2,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, select, input, textarea, [role='button']");
      if (interactive) {
        onMouseEnterLink();
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, select, input, textarea, [role='button']");
      if (interactive) {
        const related = e.relatedTarget as HTMLElement | null;
        if (!related || !interactive.contains(related)) {
          onMouseLeaveLink();
        }
      }
    };

    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#a3a3a3] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-7 h-7 border border-white/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-[background-color,border-color,border-width] duration-300"
      />
    </>
  );
}
