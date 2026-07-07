/* eslint-disable */
const fs = require('fs');

const works = [
  {
    id: "reel-1",
    title: "Metropolis Drift",
    category: "instagram",
    aspectRatio: "9:16",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424569/reel1_brorlu.mp4",
    description: "Fast-paced vertical reel showing Tokyo street visuals with custom speed ramps, neon color corrections, and bass-driven sound mapping.",
    software: ["DaVinci Resolve", "After Effects", "Audition"],
    duration: "0:30",
    client: "Tokyo Vibe",
    year: "2026"
  },
  {
    id: "reel-2",
    title: "Urban Style Guide",
    category: "instagram",
    aspectRatio: "9:16",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424539/reel2_prcx7l.mp4",
    description: "Sleek portrait promo for a minimalist clothing brand. Highlights digital masking, text layouts, and film overlays.",
    software: ["Premiere Pro", "After Effects"],
    duration: "0:15",
    client: "Aura Apparel",
    year: "2026"
  },
  {
    id: "reel-3",
    title: "Vertical Beats Sync",
    category: "instagram",
    aspectRatio: "9:16",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424552/reel3_ravg4h.mp4",
    description: "High-retention DJ set short. Utilizes rhythmic jump cuts, frame-shake distortions, and high contrast filters.",
    software: ["DaVinci Resolve", "Audition"],
    duration: "0:25",
    client: "Pulse DJ",
    year: "2025"
  },
  {
    id: "reel-5",
    title: "Cafe Rain Vibe",
    category: "instagram",
    aspectRatio: "9:16",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424554/reel5_ba5fqk.mp4",
    description: "Calm lifestyle edit. Focuses on warm tone grading, retro film grain, and ambient sound effects.",
    software: ["DaVinci Resolve"],
    duration: "0:45",
    client: "Brew & Co",
    year: "2025"
  },
  {
    id: "reel-6",
    title: "Mountain Escape",
    category: "instagram",
    aspectRatio: "9:16",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424567/reel6_pbqlxx.mp4",
    description: "Nature vlog highlight using vertical drone footage. Smooth parallax pans, grading greens, and organic sound design.",
    software: ["Premiere Pro"],
    duration: "0:20",
    client: "Scenic Escapes",
    year: "2026"
  },
  {
    id: "reel-8",
    title: "Wave Flow Teaser",
    category: "instagram",
    aspectRatio: "9:16",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424544/reel8_btgqza.mp4",
    description: "Coastal drone short. Focuses on blue ocean grades, cinematic sound textures, and high definition scaling.",
    software: ["DaVinci Resolve"],
    duration: "0:30",
    client: "Oceanic Vibe",
    year: "2025"
  },
  {
    id: "reel-9",
    title: "Modern Fitness Ramp",
    category: "instagram",
    aspectRatio: "9:16",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424575/reel9_sivurr.mp4",
    description: "VFX simulation and smoke transition edit for gym ads. High energy pacing and dynamic lower thirds.",
    software: ["After Effects"],
    duration: "0:15",
    client: "FitLife Studio",
    year: "2026"
  },
  {
    id: "reel-10",
    title: "Glitch Music Promo",
    category: "instagram",
    aspectRatio: "9:16",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424549/reel10_z9qkla.mp4",
    description: "Music launch reel with color correction, neon strobing overlays, and custom subtitles sync.",
    software: ["Premiere Pro", "Audition"],
    duration: "0:40",
    client: "Loud Records",
    year: "2026"
  },
  {
    id: "reel-11",
    title: "Vivid Beats Sync",
    category: "instagram",
    aspectRatio: "9:16",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424555/reel11_oaiz4d.mp4",
    description: "High impact speed ramps and transitions showcasing streetwear fashion.",
    software: ["DaVinci Resolve", "After Effects"],
    duration: "0:15",
    client: "Aura Apparel",
    year: "2026"
  },
  {
    id: "reel-12",
    title: "Aerial Escape Reel",
    category: "instagram",
    aspectRatio: "9:16",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424574/reel12_qlxy3n.mp4",
    description: "Stunning drone perspectives color graded with cool cinematic tones and ambient audio sync.",
    software: ["DaVinci Resolve"],
    duration: "0:20",
    client: "Scenic Escapes",
    year: "2025"
  },
  {
    id: "reel-13",
    title: "3D Neon Tracking Loop",
    category: "instagram",
    aspectRatio: "9:16",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424566/reel13_tlverw.mp4",
    description: "Neon glow outlines and Blender elements integrated with urban night visuals.",
    software: ["After Effects", "Blender"],
    duration: "0:15",
    client: "Hyperloop Media",
    year: "2026"
  },
  {
    id: "reel-14",
    title: "Dynamic Fitness Promo",
    category: "instagram",
    aspectRatio: "9:16",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424566/reel14_pt6qvl.mp4",
    description: "Fast-paced gym promo with high-retention beat cuts and lower thirds.",
    software: ["Premiere Pro", "After Effects"],
    duration: "0:30",
    client: "FitLife Studio",
    year: "2026"
  },
  {
    id: "yt-1",
    title: "Minimal Studio Setup Tour",
    category: "youtube",
    aspectRatio: "16:9",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424951/video1_x278lw.mp4",
    description: "Detailed tech gear tutorial and vlog layout. Focused on color grading matching, multiple focal lengths, and soft sound design.",
    software: ["Premiere Pro", "Photoshop"],
    duration: "10:15",
    client: "TechSphere Studio",
    year: "2026"
  },
  {
    id: "yt-2",
    title: "Epic Wilderness Drone",
    category: "youtube",
    aspectRatio: "16:9",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424953/video2_kf2fmi.mp4",
    description: "High definition scenic B-roll montage. Highlights cinematic widescreen rendering, green tone profiles, and atmospheric tracks.",
    software: ["DaVinci Resolve", "Premiere Pro"],
    duration: "4:30",
    client: "Sky High Drone",
    year: "2025"
  },
  {
    id: "yt-3",
    title: "Cyberpunk Street Documentaries",
    category: "youtube",
    aspectRatio: "16:9",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424954/Video3_zmrfuu.mp4",
    description: "Night city street review narrative. Features subtitles alignment, custom transition templates, and glow grading.",
    software: ["DaVinci Resolve", "After Effects"],
    duration: "8:40",
    client: "Vantage Media",
    year: "2026"
  },
  {
    id: "yt-4",
    title: "Fashion Runway Behind The Scenes",
    category: "youtube",
    aspectRatio: "16:9",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424947/Video4_cdjcrt.mp4",
    description: "Model photoshoot behind the scenes vlog. Focuses on dynamic transitions, speed grading, and brand color presets.",
    software: ["Premiere Pro", "Audition"],
    duration: "6:12",
    client: "Aura Fashion",
    year: "2025"
  },
  {
    id: "yt-5",
    title: "YouTube Video 5",
    category: "youtube",
    aspectRatio: "16:9",
    video: "https://res.cloudinary.com/ky4xk9zo/video/upload/q_auto,f_auto/v1783424949/Video5_taigzz.mp4",
    description: "High-quality YouTube video production.",
    software: ["Premiere Pro"],
    duration: "10:00",
    client: "Client Name",
    year: "2026"
  }
];

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

works.filter(p => p.category === 'instagram').forEach(project => {
  code += `  {
    id: "${project.id}",
    title: "${project.title}",
    category: "instagram",
    aspectRatio: "${project.aspectRatio}",
    video: "${project.video}",
    description: "${project.description}",
    software: ${JSON.stringify(project.software)},
    duration: "${project.duration}",
    client: "${project.client}",
    year: "${project.year}",
  },\n`;
});

code += `\n  // ==========================================
  // YOUTUBE VIDEOS (16:9)
  // ==========================================
`;

works.filter(p => p.category === 'youtube').forEach(project => {
  code += `  {
    id: "${project.id}",
    title: "${project.title}",
    category: "youtube",
    aspectRatio: "${project.aspectRatio}",
    video: "${project.video}",
    description: "${project.description}",
    software: ${JSON.stringify(project.software)},
    duration: "${project.duration}",
    client: "${project.client}",
    year: "${project.year}",
  },\n`;
});

// Add 30 templates for Instagram Reels (Commented out)
code += `\n  // ==========================================
  // FUTURE INSTAGRAM REELS TEMPLATES (COMMENTS)
  // ==========================================
  // To use: uncomment a block below and place the video file at the matching path.
  //\n`;
for (let i = 15; i <= 44; i++) {
  code += `  // {\n  //   id: "reel-${i}",\n  //   title: "Future Instagram Reel ${i}",\n  //   category: "instagram",\n  //   aspectRatio: "9:16",\n  //   video: "/works/instagram/reel${i}.mp4",\n  //   description: "Enter video description here...",\n  //   software: ["Premiere Pro", "After Effects"],\n  //   duration: "0:30",\n  //   client: "Client Name",\n  //   year: "2026",\n  // },\n`;
}

// Add 30 templates for YouTube Videos (Commented out)
code += `\n  // ==========================================
  // FUTURE YOUTUBE VIDEOS TEMPLATES (COMMENTS)
  // ==========================================
  // To use: uncomment a block below and place the video file at the matching path.
  //\n`;
for (let i = 6; i <= 35; i++) {
  code += `  // {\n  //   id: "yt-${i}",\n  //   title: "Future YouTube Video ${i}",\n  //   category: "youtube",\n  //   aspectRatio: "16:9",\n  //   video: "/works/youtube/video${i}.mp4",\n  //   description: "Enter video description here...",\n  //   software: ["Premiere Pro"],\n  //   duration: "10:00",\n  //   client: "Client Name",\n  //   year: "2026",\n  // },\n`;
}

code += `];\n`;

fs.writeFileSync('src/data/works.ts', code, 'utf8');
console.log('Successfully regenerated src/data/works.ts with Cloudinary URLs!');
