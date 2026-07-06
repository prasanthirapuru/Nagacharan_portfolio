"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Works", href: "#works" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setActiveSection(targetId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "py-4 bg-[#050505]/70 backdrop-blur-md"
          : "py-6 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          style={{ fontFamily: "var(--font-cinzel), serif" }}
          className="text-xl font-bold tracking-tight text-white hover:text-white/80 transition-all duration-300"
        >
          NAGACHARAN
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 glass-panel px-3 py-1.5 rounded-full border-white/5 shadow-2xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 rounded-full text-white/50 hover:text-white"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={isActive ? "text-white" : ""}>
                  {item.name}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/15 text-white bg-white/5 hover:bg-white hover:text-black transition-all duration-300"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 py-6 px-6 flex flex-col space-y-4 md:hidden shadow-2xl"
          >
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className={`text-sm font-semibold uppercase tracking-wider py-2 border-b border-white/5 flex items-center justify-between ${isActive ? "text-white" : "text-white/50"
                    }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </motion.a>
              );
            })}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider rounded-xl border border-white/10 text-white hover:bg-white hover:text-black transition-colors"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
