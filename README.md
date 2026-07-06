# Nagacharan Portfolio

A premium, high-end, cinematic web portfolio built specifically for **Nagacharan (Charan)**, a professional Video Editor & Motion Graphics Designer. This portfolio features a monochrome luxury aesthetic, hardware-accelerated 3D abstract interactions, smooth page transitions, custom cursors, and custom video streaming carousels designed to showcase high-retention editing work.

---

## Project Overview

The Nagacharan Portfolio is a state-of-the-art Single Page Application (SPA) designed to resemble award-winning creative agency websites. It focuses on presenting video editing services, software proficiencies, client statistics, and video work (Instagram Reels and YouTube Videos) in an elegant, responsive, and performance-optimized interface.

---

## Features

- **Cinematic Monochrome Aesthetic**: A premium dark theme using HSL tailored shades of grey and black, frosted glass elements, and subtle lighting accents.
- **Interactive 3D Abstract Ring**: Uses React Three Fiber and Three.js to render a hardware-accelerated, physical glass ring in the landing section that slow-rotates and reacts to cursor movements.
- **Smooth Inertial Scrolling**: Integrates Lenis Smooth Scroll for a luxurious, natural viewport transition.
- **Custom Adaptive Cursor**: A cursor follower that dynamically snaps, expands, and changes style when hovering over interactive elements.
- **Dynamic Video Carousels**: Custom horizontal carousels that support responsive layouts and allow users to slide through video showcases.
- **Instant Video Previews**: Hover-to-play functionality on video thumbnail cards that automatically resets to the first frame on mouse exit.
- **High-Performance Video Serving**: Supports HTML5 Range Request streaming to deliver seamless video playback on both desktop and mobile browsers (iOS Safari compatible).
- **Contact Form with EmailJS**: A fully validated project brief planner that fires automatic confetti celebrations upon successful form submissions.

---

## Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Core Library**: [React 19](https://react.dev/)
- **Styling**: [Vanilla Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/) & [GSAP 3](https://gsap.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) with [@react-three/fiber](https://r3f.docs.pmnd.rs/) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Email Delivery**: [@emailjs/browser](https://www.emailjs.com/)
- **Visual Feedback**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Folder Structure

Below is an overview of the primary workspace folders:

```bash
video-editor-portfolio/
├── public/                 # Static public assets (icons, global images, profile)
├── src/
│   ├── app/                # Next.js App Router folders, layout, and global styles
│   │   ├── works/          # Custom streaming API route handler for range requests
│   │   ├── globals.css     # Tailored custom CSS styles, fonts, and grid animations
│   │   ├── layout.tsx      # Main wrapper defining font loaders, custom cursor, and SEO metadata
│   │   └── page.tsx        # Composition page hosting all components in a sticky layout
│   ├── assets/             # Raw media assets
│   │   └── works/          # Video source files (.mp4 format) sorted by category
│   │       ├── instagram/  # 9:16 vertical video reel files
│   │       └── youtube/    # 16:9 widescreen video files
│   ├── components/         # Reusable presentation and interactive components
│   ├── data/               # Project database files
│   │   └── works.ts        # Generated details and metadata of all works
│   └── types/              # TypeScript ambient module declarations
├── generate-works.js       # Pre-build script that scans assets and generates data list
├── media-loader.js         # Custom Webpack configuration loader for video paths
├── next.config.ts          # Next.js configuration and custom Webpack loaders
└── package.json            # Node project configuration, build scripts, and npm dependencies
```

---

## Component Overview

### Core UI Wrappers & Layout
- **[layout.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/app/layout.tsx)**: Registers standard fonts (`Geist`, `Geist_Mono`, `Cinzel`), sets global SEO tags, and wraps pages in `SmoothScroll`, `LoadingScreen`, and `CustomCursor`.
- **[Navbar.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/components/Navbar.tsx)**: Sticky blurred header navigation with active section tracking using IntersectionObserver.
- **[Footer.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/components/Footer.tsx)**: Displays social links for Facebook, Instagram, YouTube, Threads, and X (Twitter) inside glowing circular hover wrappers.
- **[LoadingScreen.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/components/LoadingScreen.tsx)**: Introductory brand preloader animation using percentage counts and fade-outs.
- **[CustomCursor.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/components/CustomCursor.tsx)**: Renders the custom GSAP cursor follower that scales dynamically over buttons.
- **[SmoothScroll.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/components/SmoothScroll.tsx)**: Wraps application children in a Lenis scroll loop.

### Section Components
- **[Hero.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/components/Hero.tsx)**: Displays the large name title `CHARAN` (Cinzel font) backed by the 3D Scene canvas and magnetic control buttons.
- **[Scene3D.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/components/Scene3D.tsx)**: Renders the three.js glass ring material, positioning lights, and mouse mouse-follow behavior.
- **[Marquee.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/components/Marquee.tsx)**: Continuous scrolling infinite ticker displaying "VIDEO EDITOR".
- **[About.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/components/About.tsx)**: Displays a biography layout and uses IntersectionObserver to run numbers animations for metrics cards.
- **[Skills.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/components/Skills.tsx)**: Renders custom tool vectors and progress ratings in a dark grid.
- **[Works.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/components/Works.tsx)**: Carousel container displaying video cards and controlling fullscreen video overlays.
- **[Services.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/components/Services.tsx)**: Lists specialized creative services with custom hover border glows.
- **[Contact.tsx](file:///c:/Users/prasa/.gemini/antigravity-ide/scratch/video-editor-portfolio/src/components/Contact.tsx)**: Project brief form integrating state mapping and EmailJS triggers.

---

## Work Section Mechanics

### Video Storage
All video source files (.mp4 format) are stored physically in:
`src/assets/works/instagram/` (for reels) and `src/assets/works/youtube/` (for videos).

### Asset Streaming
Since local videos can be extremely large, standard file serving fails on mobile devices that expect HTTP Range requests.
The custom Next.js route:
`src/app/works/[...path]/route.ts`
intercepts video requests under `/works/...`, reads the file from `src/assets/works/`, and feeds a custom chunk-stream back to the browser supporting `Content-Range` and `206 Partial Content` status.

### Performance Optimizations
- **Static Metadata Preloading**: Every card video uses `preload="metadata"` and has a hardcoded source suffix `#t=0.001`. This allows browsers to load only the first frame metadata to render as a thumbnail preview instantly. No separate image thumbnails are required.
- **Stable References**: Cards are memoized using `React.memo` and `useCallback` triggers are bound to parent methods. This stops the entire grid from re-rendering during sliding.
- **Hover Playback**: Cards use a React `ref` pointing to their local HTML5 video element. On `onMouseEnter`, `video.play()` is invoked. On `onMouseLeave`, the video is paused and reset to the first frame (`video.currentTime = 0.001`).

---

## Adding New Reels

Adding new work items to the carousel is fully automated:

1. **Place Video File**: Copy your new `.mp4` file into:
   - `src/assets/works/instagram/reel{X}.mp4`
   - `src/assets/works/youtube/video{Y}.mp4`
2. **Scan/Generate Data**: Run `npm run build` or `npm run dev`. The build script `generate-works.js` runs automatically. It will:
   - Scan physical folders.
   - Match the files against custom details in the script's configuration table (`METADATA`).
   - Re-generate `src/data/works.ts` with correct sequential IDs and path links.
3. **Customize Details**: If you want to change titles, durations, software used, or client names, you can modify the `METADATA` map in `generate-works.js` before running the build.
4. **Future Placeholders**: The generator automatically includes 30 commented-out templates for Instagram Reels and YouTube Videos at the end of `src/data/works.ts` for documentation.

---

## EmailJS Configuration

The Contact form handles email dispatch securely in the browser.
The configuration credentials are bound in:
`src/components/Contact.tsx`

```javascript
emailjs.send(
  "service_f0bflkg",        // EmailJS Service ID
  "template_nnc93ps",       // EmailJS Template ID
  {
    name: form.name,
    email: form.email,
    phone: form.phone || "Not provided",
    project: form.projectType,
    message: form.message,
  },
  "0kJm0kWUB3gMoqkny"       // EmailJS Public API Key
);
```

To use a different inbox, update these three parameters with your own EmailJS dashboard keys.

---

## Deployment

### Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   This automatically runs `generate-works.js` and launches the Next.js development server.

3. **Verify App**:
   Open [http://localhost:3000](http://localhost:3000) to preview.

### Build and Compilation

Verify that the TypeScript configuration builds successfully for production:
```bash
npm run build
```

### Vercel Deployment

Deploy directly by importing your repository to Vercel:
1. Connect your Github/Gitlab account to Vercel.
2. Select this repository.
3. Keep default settings (the Vercel build script will execute `generate-works.js && next build` automatically).
4. Click **Deploy**.



### Handling Large Media Files with Git LFS


  This project uses Git Large File Storage (Git LFS) to manage heavy media assets such as high-quality video files included in the portfolio. Since standard Git is not optimized for storing large binary files like .mp4 videos, Git LFS is used to efficiently track and upload these files without bloating the repository history. Instead of storing the full video content directly in Git commits, Git LFS replaces them with lightweight pointer files while handling the actual media storage separately. This approach allows the repository to remain manageable while still supporting high-resolution portfolio content. However, it is important to note that Git LFS has storage and bandwidth limits depending on the GitHub plan, and exceeding these limits may require upgrading storage or optimizing assets in the future. Therefore, if more videos are added or existing ones are frequently updated, it is recommended to consider external media hosting solutions such as a CDN or cloud storage to ensure scalability and maintain smooth repository performance.
