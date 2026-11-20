import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import ffmpegStatic from "ffmpeg-static";

const ffmpeg = ffmpegStatic;
console.log("Using ffmpeg at:", ffmpeg);

const INPUT_DIR = "C:\\Users\\HP\\Desktop\\video";
const VIDEOS_OUT_DIR = path.join(process.cwd(), "public", "uploads", "videos");
const THUMBS_OUT_DIR = path.join(process.cwd(), "public", "uploads", "thumbnails");

if (!fs.existsSync(VIDEOS_OUT_DIR)) fs.mkdirSync(VIDEOS_OUT_DIR, { recursive: true });
if (!fs.existsSync(THUMBS_OUT_DIR)) fs.mkdirSync(THUMBS_OUT_DIR, { recursive: true });

// Clean old files from uploads if requested
console.log("Cleaning up previous uploaded videos and thumbnails...");
fs.readdirSync(VIDEOS_OUT_DIR).forEach(f => {
  try { fs.unlinkSync(path.join(VIDEOS_OUT_DIR, f)); } catch {}
});
fs.readdirSync(THUMBS_OUT_DIR).forEach(f => {
  try { fs.unlinkSync(path.join(THUMBS_OUT_DIR, f)); } catch {}
});

const VIDEOS_INFO = [
  {
    src: "acne reels 01.mp4",
    id: "vid-brand-1",
    filename: "acne_reels_01.mp4",
    thumb: "acne_reels_01.jpg",
    title: "Acne Care Skincare Authority Reel",
    category: "Personal Brand",
    categoryBadge: "PERSONAL BRAND & REELS",
    description: "High-retention skincare educational reel featuring kinetic text overlays, fast-paced cut transitions, and clinical sound design.",
    tools: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Kinetic Typography"],
    tags: ["Skincare", "Educational Reel", "Kinetic Typography", "High Retention"],
    order: 1,
    views: "1.2M+",
    duration: "0:45",
    featured: true
  },
  {
    src: "brush teeth reels.mp4",
    id: "vid-brand-2",
    filename: "brush_teeth_reels.mp4",
    thumb: "brush_teeth_reels.jpg",
    title: "Dental Hygiene & Oral Care Campaign",
    category: "Personal Brand",
    categoryBadge: "COMMERCIAL & BRAND",
    description: "Engaging commercial reel for dental wellness, balancing clinical expertise with energetic pacing and visual callouts.",
    tools: ["Premiere Pro", "After Effects", "Color Grading", "Sound FX"],
    tags: ["Healthcare", "Commercial", "Brand Authority", "Sound Design"],
    order: 2,
    views: "850K+",
    duration: "0:38",
    featured: true
  },
  {
    src: "celebrity reels .mp4",
    id: "vid-brand-3",
    filename: "celebrity_reels.mp4",
    thumb: "celebrity_reels.jpg",
    title: "Celebrity Lifestyle & Viral Reel",
    category: "Personal Brand",
    categoryBadge: "VIRAL REEL & INFLUENCER",
    description: "Cinematic celebrity lifestyle cut with beat-synced transitions, punchy sound risers, and color-graded highlights.",
    tools: ["DaVinci Resolve", "Premiere Pro", "Speed Ramping", "Motion Graphics"],
    tags: ["Celebrity", "Lifestyle", "Beat Sync", "Viral Editing"],
    order: 3,
    views: "2.4M+",
    duration: "0:52",
    featured: true
  },
  {
    src: "CHANDRIKA REELS .mp4",
    id: "vid-brand-4",
    filename: "chandrika_reels.mp4",
    thumb: "chandrika_reels.jpg",
    title: "Chandrika Herbal & Ayurveda Brand Reel",
    category: "Personal Brand",
    categoryBadge: "HERBAL BRAND COMMERCIAL",
    description: "Aesthetic Ayurveda product commercial showcasing macro textures, herbal ingredient callouts, and smooth pacing.",
    tools: ["Premiere Pro", "After Effects", "Color Science", "Sound Master"],
    tags: ["Product Commercial", "Ayurveda", "Aesthetic Cut", "Brand Story"],
    order: 4,
    views: "1.6M+",
    duration: "0:30",
    featured: false
  },
  {
    src: "dr mittal.mp4",
    id: "vid-brand-5",
    filename: "dr_mittal_brand_reel.mp4",
    thumb: "dr_mittal_brand_reel.jpg",
    title: "Dr. Mittal Medical Authority & Trust Reel",
    category: "Personal Brand",
    categoryBadge: "DOCTOR & CLINICAL BRAND",
    description: "Medical authority building reel for Dr. Mittal with animated diagram callouts, lower thirds, and crystal clear voice master.",
    tools: ["Premiere Pro", "DaVinci Resolve", "Motion Graphics", "Dialogue Edit"],
    tags: ["Medical Authority", "Healthcare", "Doctor Reel", "Lower Thirds"],
    order: 5,
    views: "980K+",
    duration: "0:58",
    featured: true
  },
  {
    src: "dr shweta intro .mp4",
    id: "vid-brand-6",
    filename: "dr_shweta_intro.mp4",
    thumb: "dr_shweta_intro.jpg",
    title: "Dr. Shweta Personal Brand Identity & Intro",
    category: "Personal Brand",
    categoryBadge: "BRAND IDENTITY & INTRO",
    description: "Dynamic intro reel establishing Dr. Shweta's credentials, high-energy hooks, and modern motion typography.",
    tools: ["After Effects", "Premiere Pro", "Kinetic Cut", "Typography"],
    tags: ["Personal Brand", "Founder Intro", "Kinetic Hook", "Typography"],
    order: 6,
    views: "1.1M+",
    duration: "0:35",
    featured: false
  },
  {
    src: "dr shweta video .mp4",
    id: "vid-brand-7",
    filename: "dr_shweta_video.mp4",
    thumb: "dr_shweta_video.jpg",
    title: "Dr. Shweta Clinical Insights & Case Study",
    category: "Personal Brand",
    categoryBadge: "CLINICAL CASE STUDY",
    description: "In-depth medical advice short video formatted for viral discovery across Instagram Reels and YouTube Shorts.",
    tools: ["Premiere Pro", "DaVinci Resolve", "Color Science", "B-roll Cut"],
    tags: ["Case Study", "Educational", "Short Form", "B-Roll Sync"],
    order: 7,
    views: "740K+",
    duration: "0:48",
    featured: false
  },
  {
    src: "navratri reels .mp4",
    id: "vid-brand-8",
    filename: "navratri_festive_reels.mp4",
    thumb: "navratri_festive_reels.jpg",
    title: "Navratri Festive Brand Campaign",
    category: "Personal Brand",
    categoryBadge: "FESTIVE COMMERCIAL",
    description: "High-spirit festive commercial with vibrant color saturation, traditional audio fusion, and rhythmic motion graphics.",
    tools: ["Premiere Pro", "DaVinci Resolve", "Vibrant Grading", "Audio Sync"],
    tags: ["Festive", "Cultural Campaign", "Vibrant Colors", "High Energy"],
    order: 8,
    views: "1.8M+",
    duration: "0:28",
    featured: false
  },
  {
    src: "question answer .mp4",
    id: "vid-brand-9",
    filename: "question_answer_qa_reel.mp4",
    thumb: "question_answer_qa_reel.jpg",
    title: "Rapid Fire Q&A Brand Engagement Reel",
    category: "Personal Brand",
    categoryBadge: "Q&A ENGAGEMENT REEL",
    description: "Snappy Q&A format designed for maximum retention, featuring pop-up question cards, meme sound effects, and kinetic pacing.",
    tools: ["Premiere Pro", "Sound FX", "Pop-up Graphics", "Kinetic Cut"],
    tags: ["Q&A Format", "Viewer Retention", "Pop-up Elements", "Viral Hook"],
    order: 9,
    views: "1.5M+",
    duration: "0:50",
    featured: false
  },
  {
    src: "Sample .mov",
    id: "vid-brand-10",
    filename: "sample_commercial_01.mp4",
    thumb: "sample_commercial_01.jpg",
    title: "Luxury Commercial Showcase 01",
    category: "Personal Brand",
    categoryBadge: "LUXURY PRODUCT COMMERCIAL",
    description: "Sleek commercial showcasing premium product design, fluid motion blur, and sophisticated cinematic color grading.",
    tools: ["DaVinci Resolve", "Premiere Pro", "After Effects", "ACES Color"],
    tags: ["Luxury", "Commercial", "Product Showcase", "Cinematic"],
    order: 10,
    views: "620K+",
    duration: "0:30",
    featured: false
  },
  {
    src: "sample 01.mov",
    id: "vid-brand-11",
    filename: "sample_commercial_02.mp4",
    thumb: "sample_commercial_02.jpg",
    title: "High-Impact Brand Motion Showcase 02",
    category: "Personal Brand",
    categoryBadge: "BRAND MOTION & PACING",
    description: "Dynamic commercial sequence emphasizing bold typography, brand identity placement, and rhythmic audio-visual transitions.",
    tools: ["Premiere Pro", "After Effects", "Sound Design", "Typography"],
    tags: ["Motion Pacing", "Brand Identity", "Dynamic Cut", "Audio Sync"],
    order: 11,
    views: "790K+",
    duration: "0:32",
    featured: false
  },
  {
    src: "SNEHAL REELS .mp4",
    id: "vid-brand-12",
    filename: "snehal_reels.mp4",
    thumb: "snehal_reels.jpg",
    title: "Snehal Lifestyle & Fashion Brand Reel",
    category: "Personal Brand",
    categoryBadge: "FASHION & LIFESTYLE",
    description: "Modern fashion lifestyle reel featuring soft pastel color grading, smooth zoom cuts, and trending audio rhythm.",
    tools: ["DaVinci Resolve", "Premiere Pro", "Fashion Grade", "Speed Ramps"],
    tags: ["Fashion", "Lifestyle", "Pastel Grade", "Reel Edit"],
    order: 12,
    views: "1.3M+",
    duration: "0:42",
    featured: true
  }
];

const processedDbVideos = [];

for (let i = 0; i < VIDEOS_INFO.length; i++) {
  const item = VIDEOS_INFO[i];
  const inputPath = path.join(INPUT_DIR, item.src);
  const outVideoPath = path.join(VIDEOS_OUT_DIR, item.filename);
  const outThumbPath = path.join(THUMBS_OUT_DIR, item.thumb);

  console.log(`\n========================================`);
  console.log(`[${i + 1}/${VIDEOS_INFO.length}] Processing: ${item.src} -> ${item.filename}`);
  console.log(`========================================`);

  if (!fs.existsSync(inputPath)) {
    console.error(`ERROR: Input file not found: ${inputPath}`);
    continue;
  }

  // 1. Extract high-quality thumbnail
  console.log(`  Extracting thumbnail to: ${item.thumb}...`);
  const thumbRes = spawnSync(ffmpeg, [
    "-ss", "00:00:01",
    "-i", inputPath,
    "-vframes", "1",
    "-q:v", "2",
    outThumbPath,
    "-y"
  ]);

  if (!fs.existsSync(outThumbPath) || fs.statSync(outThumbPath).size === 0) {
    // fallback at 0.5s
    spawnSync(ffmpeg, [
      "-ss", "00:00:00.5",
      "-i", inputPath,
      "-vframes", "1",
      "-q:v", "2",
      outThumbPath,
      "-y"
    ]);
  }

  if (fs.existsSync(outThumbPath)) {
    console.log(`  Thumbnail created: ${(fs.statSync(outThumbPath).size / 1024).toFixed(1)} KB`);
  }

  // 2. Encode to web-optimized MP4 with faststart
  console.log(`  Encoding video with H.264 CRF 23 + AAC + faststart...`);
  const encodeRes = spawnSync(ffmpeg, [
    "-i", inputPath,
    "-c:v", "libx264",
    "-preset", "fast",
    "-crf", "23",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "128k",
    "-movflags", "+faststart",
    outVideoPath,
    "-y"
  ], { stdio: "inherit" });

  if (fs.existsSync(outVideoPath)) {
    const sizeMb = (fs.statSync(outVideoPath).size / 1024 / 1024).toFixed(2);
    console.log(`  SUCCESS! Video output size: ${sizeMb} MB`);
  } else {
    console.error(`  ERROR: Video output was not created for ${item.src}`);
  }

  processedDbVideos.push({
    id: item.id,
    title: item.title,
    category: item.category,
    categoryBadge: item.categoryBadge,
    description: item.description,
    videoUrl: `/uploads/videos/${item.filename}`,
    thumbnailUrl: `/uploads/thumbnails/${item.thumb}`,
    tools: item.tools,
    tags: item.tags,
    order: item.order,
    status: "published",
    views: item.views,
    duration: item.duration,
    featured: item.featured,
    createdAt: new Date(Date.now() - (12 - item.order) * 86400000).toISOString()
  });
}

// 3. Update data/db.json
const dbJsonPath = path.join(process.cwd(), "data", "db.json");
let currentDb = { videos: [], enquiries: [], settings: {}, adminHash: "karmayogi2026" };
if (fs.existsSync(dbJsonPath)) {
  try {
    currentDb = JSON.parse(fs.readFileSync(dbJsonPath, "utf-8"));
  } catch {}
}

currentDb.videos = processedDbVideos;
fs.writeFileSync(dbJsonPath, JSON.stringify(currentDb, null, 2), "utf-8");
console.log(`\n\nAll ${processedDbVideos.length} brand videos processed and saved to database!`);
