"use client";

import { Film, ArrowUp } from "lucide-react";

// Local custom inline SVG definitions for compatibility safety
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

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

const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.82 0 5.38-1.17 7.22-3.05l-1.42-1.42C16.27 19.07 14.24 20 12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8v1c0 .55-.45 1-1 1s-1-.45-1-1v-5c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.63-.56 3.54-1.46.65.89 1.7 1.46 2.96 1.46 2.21 0 4-1.79 4-4v-1c0-5.52-4.48-10-10-10zm0 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { icon: FacebookIcon, href: "https://facebook.com", name: "Facebook" },
  { icon: InstagramIcon, href: "https://instagram.com", name: "Instagram" },
  { icon: YoutubeIcon, href: "https://youtube.com", name: "YouTube" },
  { icon: ThreadsIcon, href: "https://threads.net", name: "Threads" },
  { icon: XIcon, href: "https://x.com", name: "X" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    const home = document.getElementById("home");
    if (home) {
      home.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full py-16 px-6 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative">
        {/* Left branding */}
        <div className="flex flex-col items-center md:items-start">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleBackToTop();
            }}
            style={{ fontFamily: "var(--font-cinzel), serif" }}
            className="text-lg font-bold tracking-tight text-white hover:text-white/80 transition-colors duration-300 mb-2"
          >
            NAGACHARAN
          </a>
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-white/30" />
            Professional Video Editor
          </p>
        </div>

        {/* Center Socials */}
        <div className="flex items-center space-x-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-11 h-11 rounded-full border border-white/10 bg-transparent flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 relative shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 hover:border-white/80 group"
              >
                <Icon className="w-4.5 h-4.5 relative z-10 transition-transform duration-300 group-hover:rotate-6" />
              </a>
            );
          })}
        </div>

        {/* Right copyright & Back-to-top */}
        <div className="flex flex-col items-center md:items-end gap-3 text-xs text-white/30 font-light">
          <button
            onClick={handleBackToTop}
            className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300"
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <div className="text-[10px] text-white/30 font-light">
            <p>© {currentYear} Nagacharan. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
