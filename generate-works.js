const fs = require('fs');
const path = require('path');

const METADATA = {
  "/works/instagram/reel1.mp4": {
    title: "Metropolis Drift",
    category: "instagram",
    aspectRatio: "9:16",
    description: "Fast-paced vertical reel showing Tokyo street visuals with custom speed ramps, neon color corrections, and bass-driven sound mapping.",
    software: ["DaVinci Resolve", "After Effects", "Audition"],
    duration: "0:30",
    client: "Tokyo Vibe",
    year: "2026"
  },
  "/works/instagram/reel2.mp4": {
    title: "Urban Style Guide",
    category: "instagram",
    aspectRatio: "9:16",
    description: "Sleek portrait promo for a minimalist clothing brand. Highlights digital masking, text layouts, and film overlays.",
    software: ["Premiere Pro", "After Effects"],
    duration: "0:15",
    client: "Aura Apparel",
    year: "2026"
  },
  "/works/instagram/reel3.mp4": {
    title: "Vertical Beats Sync",
    category: "instagram",
    aspectRatio: "9:16",
    description: "High-retention DJ set short. Utilizes rhythmic jump cuts, frame-shake distortions, and high contrast filters.",
    software: ["DaVinci Resolve", "Audition"],
    duration: "0:25",
    client: "Pulse DJ",
    year: "2025"
  },
  "/works/instagram/reel4.mp4": {
    title: "Sneaker Launch Teaser",
    category: "instagram",
    aspectRatio: "9:16",
    description: "Product reveal reel optimized for mobile clicks. High speed ramps, detailed closeups, and kinetic text graphics.",
    software: ["After Effects", "Photoshop"],
    duration: "0:12",
    client: "Sole Runner",
    year: "2026"
  },
  "/works/instagram/reel5.mp4": {
    title: "Cafe Rain Vibe",
    category: "instagram",
    aspectRatio: "9:16",
    description: "Calm lifestyle edit. Focuses on warm tone grading, retro film grain, and ambient sound effects.",
    software: ["DaVinci Resolve"],
    duration: "0:45",
    client: "Brew & Co",
    year: "2025"
  },
  "/works/instagram/reel6.mp4": {
    title: "Mountain Escape",
    category: "instagram",
    aspectRatio: "9:16",
    description: "Nature vlog highlight using vertical drone footage. Smooth parallax pans, grading greens, and organic sound design.",
    software: ["Premiere Pro"],
    duration: "0:20",
    client: "Scenic Escapes",
    year: "2026"
  },
  "/works/instagram/reel7.mp4": {
    title: "Underground Subway",
    category: "instagram",
    aspectRatio: "9:16",
    description: "VFX loop showcasing digital glitch effects, 3D text tracking, and neon glows on vertical subway visuals.",
    software: ["After Effects", "Blender"],
    duration: "0:15",
    client: "Hyperloop Media",
    year: "2026"
  },
  "/works/instagram/reel8.mp4": {
    title: "Wave Flow Teaser",
    category: "instagram",
    aspectRatio: "9:16",
    description: "Coastal drone short. Focuses on blue ocean grades, cinematic sound textures, and high definition scaling.",
    software: ["DaVinci Resolve"],
    duration: "0:30",
    client: "Oceanic Vibe",
    year: "2025"
  },
  "/works/instagram/reel9.mp4": {
    title: "Modern Fitness Ramp",
    category: "instagram",
    aspectRatio: "9:16",
    description: "VFX simulation and smoke transition edit for gym ads. High energy pacing and dynamic lower thirds.",
    software: ["After Effects"],
    duration: "0:15",
    client: "FitLife Studio",
    year: "2026"
  },
  "/works/instagram/reel10.mp4": {
    title: "Glitch Music Promo",
    category: "instagram",
    aspectRatio: "9:16",
    description: "Music launch reel with color correction, neon strobing overlays, and custom subtitles sync.",
    software: ["Premiere Pro", "Audition"],
    duration: "0:40",
    client: "Loud Records",
    year: "2026"
  },
  "/works/instagram/reel11.mp4": {
    title: "Vivid Beats Sync",
    category: "instagram",
    aspectRatio: "9:16",
    description: "High impact speed ramps and transitions showcasing streetwear fashion.",
    software: ["DaVinci Resolve", "After Effects"],
    duration: "0:15",
    client: "Aura Apparel",
    year: "2026"
  },
  "/works/instagram/reel12.mp4": {
    title: "Aerial Escape Reel",
    category: "instagram",
    aspectRatio: "9:16",
    description: "Stunning drone perspectives color graded with cool cinematic tones and ambient audio sync.",
    software: ["DaVinci Resolve"],
    duration: "0:20",
    client: "Scenic Escapes",
    year: "2025"
  },
  "/works/instagram/reel13.mp4": {
    title: "3D Neon Tracking Loop",
    category: "instagram",
    aspectRatio: "9:16",
    description: "Neon glow outlines and Blender elements integrated with urban night visuals.",
    software: ["After Effects", "Blender"],
    duration: "0:15",
    client: "Hyperloop Media",
    year: "2026"
  },
  "/works/instagram/reel14.mp4": {
    title: "Dynamic Fitness Promo",
    category: "instagram",
    aspectRatio: "9:16",
    description: "Fast-paced gym promo with high-retention beat cuts and lower thirds.",
    software: ["Premiere Pro", "After Effects"],
    duration: "0:30",
    client: "FitLife Studio",
    year: "2026"
  },
  "/works/instagram/reel15.mp4": {
    title: "Urban Motion Showcase",
    category: "instagram",
    aspectRatio: "9:16",
    description: "Premium vertical edit showing cinematic motion graphics, dynamic speed adjustments, and aesthetic color transitions.",
    software: ["Premiere Pro", "After Effects"],
    duration: "0:40",
    client: "Urban Motion",
    year: "2026"
  },
  "/works/youtube/video1.mp4": {
    title: "Minimal Studio Setup Tour",
    category: "youtube",
    aspectRatio: "16:9",
    description: "Detailed tech gear tutorial and vlog layout. Focused on color grading matching, multiple focal lengths, and soft sound design.",
    software: ["Premiere Pro", "Photoshop"],
    duration: "10:15",
    client: "TechSphere Studio",
    year: "2026"
  },
  "/works/youtube/video2.mp4": {
    title: "Epic Wilderness Drone",
    category: "youtube",
    aspectRatio: "16:9",
    description: "High definition scenic B-roll montage. Highlights cinematic widescreen rendering, green tone profiles, and atmospheric tracks.",
    software: ["DaVinci Resolve", "Premiere Pro"],
    duration: "4:30",
    client: "Sky High Drone",
    year: "2025"
  },
  "/works/youtube/video3.mp4": {
    title: "Cyberpunk Street Documentaries",
    category: "youtube",
    aspectRatio: "16:9",
    description: "Night city street review narrative. Features subtitles alignment, custom transition templates, and glow grading.",
    software: ["DaVinci Resolve", "After Effects"],
    duration: "8:40",
    client: "Vantage Media",
    year: "2026"
  },
  "/works/youtube/video4.mp4": {
    title: "Fashion Runway Behind The Scenes",
    category: "youtube",
    aspectRatio: "16:9",
    description: "Model photoshoot behind the scenes vlog. Focuses on dynamic transitions, speed grading, and brand color presets.",
    software: ["Premiere Pro", "Audition"],
    duration: "6:12",
    client: "Aura Fashion",
    year: "2025"
  }
};

const instDir = 'src/assets/works/instagram';
const ytDir = 'src/assets/works/youtube';

const diskInstFiles = fs.readdirSync(instDir).filter(f => f.endsWith('.mp4'));
const diskYtFiles = fs.readdirSync(ytDir).filter(f => f.endsWith('.mp4'));

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
diskInstFiles.sort(collator.compare);
diskYtFiles.sort(collator.compare);

// Force regeneration because the previous generate run output incorrect IDs
console.log('Regenerating works.ts with correct ID parsing...');

// Generate file content
let code = `export interface ProjectData {
  id: string;
  title: string;
  category: string;
  aspectRatio: string;
  video: string;
  description: string;
  software: string[];
  duration: string;
  client: string;
  year: string;
}

export const works: ProjectData[] = [
  // ==========================================
  // INSTAGRAM REELS (9:16)
  // ==========================================
`;

diskInstFiles.forEach((file, index) => {
  const url = `/works/instagram/${file}`;
  const nameWithoutExt = path.basename(file, '.mp4');
  const num = nameWithoutExt.replace(/\D/g, '') || (index + 1);
  const metadata = METADATA[url] || {
    title: `Instagram Reel ${num}`,
    category: "instagram",
    aspectRatio: "9:16",
    description: "Dynamic vertical reel showcase.",
    software: ["Premiere Pro", "After Effects"],
    duration: "0:30",
    client: "Creative Client",
    year: "2026"
  };

  code += `  {
    id: "reel-${num}",
    title: "${metadata.title}",
    category: "instagram",
    aspectRatio: "${metadata.aspectRatio}",
    video: "${url}",
    description: "${metadata.description}",
    software: ${JSON.stringify(metadata.software)},
    duration: "${metadata.duration}",
    client: "${metadata.client}",
    year: "${metadata.year}",
  },\n`;
});

code += `\n  // ==========================================
  // YOUTUBE VIDEOS (16:9)
  // ==========================================
`;

diskYtFiles.forEach((file, index) => {
  const url = `/works/youtube/${file}`;
  const nameWithoutExt = path.basename(file, '.mp4');
  const num = nameWithoutExt.replace(/\D/g, '') || (index + 1);
  const metadata = METADATA[url] || {
    title: `YouTube Video ${num}`,
    category: "youtube",
    aspectRatio: "16:9",
    description: "High-quality YouTube video production.",
    software: ["Premiere Pro"],
    duration: "10:00",
    client: "Client Name",
    year: "2026"
  };

  code += `  {
    id: "yt-${num}",
    title: "${metadata.title}",
    category: "youtube",
    aspectRatio: "${metadata.aspectRatio}",
    video: "${url}",
    description: "${metadata.description}",
    software: ${JSON.stringify(metadata.software)},
    duration: "${metadata.duration}",
    client: "${metadata.client}",
    year: "${metadata.year}",
  },\n`;
});

// Add 30 templates for Instagram Reels (Commented out)
code += `\n  // ==========================================
  // FUTURE INSTAGRAM REELS TEMPLATES (COMMENTS)
  // ==========================================
  // To use: uncomment a block below and place the video file at the matching path.
  //\n`;

const lastInstFile = diskInstFiles[diskInstFiles.length - 1];
const lastInstNum = lastInstFile ? parseInt(path.basename(lastInstFile, '.mp4').replace(/\D/g, '') || diskInstFiles.length) : 0;
for (let i = 1; i <= 30; i++) {
  const num = lastInstNum + i;
  code += `  // {\n  //   id: "reel-${num}",\n  //   title: "Future Instagram Reel ${num}",\n  //   category: "instagram",\n  //   aspectRatio: "9:16",\n  //   video: "/works/instagram/reel${num}.mp4",\n  //   description: "Enter video description here...",\n  //   software: ["Premiere Pro", "After Effects"],\n  //   duration: "0:30",\n  //   client: "Client Name",\n  //   year: "2026",\n  // },\n`;
}

// Add 30 templates for YouTube Videos (Commented out)
code += `\n  // ==========================================
  // FUTURE YOUTUBE VIDEOS TEMPLATES (COMMENTS)
  // ==========================================
  // To use: uncomment a block below and place the video file at the matching path.
  //\n`;

const lastYtFile = diskYtFiles[diskYtFiles.length - 1];
const lastYtNum = lastYtFile ? parseInt(path.basename(lastYtFile, '.mp4').replace(/\D/g, '') || diskYtFiles.length) : 0;
for (let i = 1; i <= 30; i++) {
  const num = lastYtNum + i;
  code += `  // {\n  //   id: "yt-${num}",\n  //   title: "Future YouTube Video ${num}",\n  //   category: "youtube",\n  //   aspectRatio: "16:9",\n  //   video: "/works/youtube/video${num}.mp4",\n  //   description: "Enter video description here...",\n  //   software: ["Premiere Pro"],\n  //   duration: "10:00",\n  //   client: "Client Name",\n  //   year: "2026",\n  // },\n`;
}

code += `];\n`;

fs.writeFileSync('src/data/works.ts', code, 'utf8');
console.log('Successfully regenerated src/data/works.ts with correct IDs!');
