import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

/**
 * Global Page Metadata Configurations
 * Defines the website's SEO properties, Open Graph headers, and Twitter Card representations.
 */
export const metadata: Metadata = {
  title: "Nagacharan Portfolio",
  description: "Awwwards-style premium, cinematic video editor portfolio. Specializing in High-Retention Instagram Reels, commercial advertisements, VFX, motion graphics, and professional color grading.",
  keywords: [
    "Nagacharan",
    "Charan Video Editor",
    "Video Editor Portfolio",
    "Premiere Pro Editor",
    "After Effects VFX",
    "DaVinci Resolve Color Grading",
    "Instagram Reels Editor",
    "Commercial Video Editor",
    "Motion Designer",
  ],
  authors: [{ name: "Nagacharan" }],
  openGraph: {
    title: "Nagacharan Portfolio",
    description: "Anti-gravity cinematic experiences, customized storytelling, high-retention reel edits, and detailed 3D VFX motion graphics.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagacharan Portfolio",
    description: "Anti-gravity cinematic experiences, customized storytelling, high-retention reel edits, and detailed 3D VFX motion graphics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-background text-foreground flex flex-col antialiased">
        <SmoothScroll>
          <LoadingScreen />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
