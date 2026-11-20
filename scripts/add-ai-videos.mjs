import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import ffmpegStatic from "ffmpeg-static";

const ffmpeg = ffmpegStatic;
console.log("Using ffmpeg at:", ffmpeg);

const AI_VIDEOS = [
  {
    folder: "Brand",
    file: "aurabella 01.mp4",
    id: "vid-ai-1",
    filename: "ai_aurabella_brand_launch.mp4",
    thumb: "ai_aurabella_brand_launch.jpg",
    title: "Aurabella AI Luxury Skincare Commercial",
    category: "AI Content",
    categoryBadge: "AI & COMMERCIAL CINEMA",
    description: "Cinematic cosmetic commercial combining neural macro water simulations, hyper-realistic skin textures, and AI visual pacing.",
    tools: ["Runway Gen-3", "Midjourney", "Premiere Pro", "DaVinci Resolve"],
    tags: ["Runway Gen-3", "Midjourney", "AI Cinema", "Macro Textures"],
    order: 13,
    views: "1.8M+",
    duration: "0:45",
    featured: true
  },
  {
    folder: "Brand",
    file: "bald lion.mp4",
    id: "vid-ai-2",
    filename: "ai_bald_lion_animation.mp4",
    thumb: "ai_bald_lion_animation.jpg",
    title: "The Bald Lion — AI Character Reel",
    category: "AI Content",
    categoryBadge: "SYNTHETIC CHARACTER VFX",
    description: "Expressive AI character animation study featuring photorealistic lion anatomy, dynamic lighting, and punchy rhythmic editing.",
    tools: ["Midjourney", "Luma Dream Machine", "Topaz Video AI", "After Effects"],
    tags: ["Luma Dream Machine", "Topaz Video AI", "Character VFX", "Kinetic Cut"],
    order: 14,
    views: "2.1M+",
    duration: "0:32",
    featured: true
  },
  {
    folder: "Brand",
    file: "facial old to young.mp4",
    id: "vid-ai-3",
    filename: "ai_facial_age_transformation.mp4",
    thumb: "ai_facial_age_transformation.jpg",
    title: "Age Transformation Neural VFX Reel",
    category: "AI Content",
    categoryBadge: "NEURAL FACE MORPH",
    description: "Seamless age progression visual effects showcasing subtle facial morphing, skin texture aging, and color science grading.",
    tools: ["ComfyUI", "Runway Gen-3", "After Effects", "DaVinci Resolve"],
    tags: ["ComfyUI", "Neural Face", "Age Morph", "Visual Effects"],
    order: 15,
    views: "3.2M+",
    duration: "0:28",
    featured: true
  },
  {
    folder: "Brand",
    file: "shiv .mp4",
    id: "vid-ai-4",
    filename: "ai_shiv_mythological_cinema.mp4",
    thumb: "ai_shiv_mythological_cinema.jpg",
    title: "Mahadev Shiv Celestial AI Visuals",
    category: "AI Content",
    categoryBadge: "3D & MYTHOLOGY CINEMA",
    description: "Mythological celestial concept video featuring cosmic smoke simulations, divine particle glows, and majestic cinematic sound design.",
    tools: ["Midjourney", "Kling AI", "Blender 3D", "After Effects"],
    tags: ["Mythology", "Cosmic Smoke", "Kling AI", "Cinematic Grade"],
    order: 16,
    views: "4.1M+",
    duration: "0:40",
    featured: true
  },
  {
    folder: "Brand",
    file: "SIWON  FINAL VIDEO.mp4",
    id: "vid-ai-5",
    filename: "ai_siwon_bottle_reveal.mp4",
    thumb: "ai_siwon_bottle_reveal.jpg",
    title: "Siwon Premium AI Product Commercial",
    category: "AI Content",
    categoryBadge: "AI 3D PRODUCT COMMERCIAL",
    description: "Minimalist luxury product commercial with fluid infinity-loop motion graphics, golden particle embers, and premium typographic hierarchy.",
    tools: ["Cinema 4D", "Runway Gen-3", "After Effects", "ACES Color"],
    tags: ["Product 3D", "Liquid Dynamics", "Runway Gen-3", "Luxury Brand"],
    order: 17,
    views: "1.9M+",
    duration: "0:50",
    featured: true
  },
  {
    folder: "Brand",
    file: "siwon bulb 01.mp4",
    id: "vid-ai-6",
    filename: "ai_siwon_bulb_commercial.mp4",
    thumb: "ai_siwon_bulb_commercial.jpg",
    title: "Siwon Glow Bulb Illumination Commercial",
    category: "AI Content",
    categoryBadge: "AI LIGHTING & COMMERCIAL",
    description: "Atmospheric product lighting study with neon refraction, macro lens flare, and rhythmic electronic soundtrack.",
    tools: ["Runway Gen-3", "After Effects", "Premiere Pro", "Color Grade"],
    tags: ["Macro Flare", "Neon Refraction", "Lighting Study", "Reel Edit"],
    order: 18,
    views: "850K+",
    duration: "0:24",
    featured: false
  },
  {
    folder: "Brand",
    file: "stomach fat .mp4",
    id: "vid-ai-7",
    filename: "ai_fitness_fat_burn_science.mp4",
    thumb: "ai_fitness_fat_burn_science.jpg",
    title: "Metabolic Anatomy & Health 3D Visual",
    category: "AI Content",
    categoryBadge: "3D MEDICAL & HEALTH VISUAL",
    description: "Hyper-detailed anatomical medical visualization showcasing cellular metabolism and fat breakdown dynamics.",
    tools: ["Blender 3D", "ComfyUI", "After Effects", "Sound Design"],
    tags: ["Medical 3D", "Anatomy", "Educational Visual", "Sound FX"],
    order: 19,
    views: "1.3M+",
    duration: "0:22",
    featured: false
  },
  {
    folder: "Brand",
    file: "SWION REVEAL.mp4",
    id: "vid-ai-8",
    filename: "ai_swion_product_reveal.mp4",
    thumb: "ai_swion_product_reveal.jpg",
    title: "Swion Luxury Product Reveal Sequence",
    category: "AI Content",
    categoryBadge: "VIRAL REVEAL & COMMERCIAL",
    description: "High-octane product reveal with volumetric lighting, water droplet collision physics, and 4K export.",
    tools: ["After Effects", "Blender 3D", "Premiere Pro", "DaVinci Resolve"],
    tags: ["Volumetric Light", "Water Collision", "Product Launch", "Kinetic Cut"],
    order: 20,
    views: "2.7M+",
    duration: "0:48",
    featured: true
  },
  {
    folder: "Product ads",
    file: "Luxury_skincare_commercial_prompt_202606271617_gwr_video_mvp.mp4",
    id: "vid-ai-9",
    filename: "ai_luxury_skincare_mvp.mp4",
    thumb: "ai_luxury_skincare_mvp.jpg",
    title: "Next-Gen AI Skincare Macro Commercial",
    category: "AI Content",
    categoryBadge: "PROMPT-BASED CINEMA",
    description: "Prompt-driven photorealistic skincare commercial crafted with state-of-the-art generative video model architectures.",
    tools: ["Google Veo", "Midjourney", "Premiere Pro", "Color Science"],
    tags: ["Prompt Cinema", "Google Veo", "Photorealistic", "Aesthetic"],
    order: 21,
    views: "920K+",
    duration: "0:15",
    featured: false
  },
  {
    folder: "Product ads",
    file: "Skincare_advertisement_prompt_202606260044_gwr_video_mvp.mp4",
    id: "vid-ai-10",
    filename: "ai_skincare_ad_mvp.mp4",
    thumb: "ai_skincare_ad_mvp.jpg",
    title: "Botanical Serum Synthetic Advertisement",
    category: "AI Content",
    categoryBadge: "AI PRODUCT SPOT",
    description: "Synthetic advertisement combining organic plant life, serum droplets, and soft diffuse ambient lighting.",
    tools: ["Runway Gen-3", "Midjourney", "After Effects", "ACES Grade"],
    tags: ["Organic Plant Life", "Liquid Serum", "Diffuse Light", "Commercial"],
    order: 22,
    views: "1.1M+",
    duration: "0:15",
    featured: false
  },
  {
    folder: "Product ads",
    file: "59839254-7ce7-4c9a-b0a1-7faf137bba9a.mp4",
    id: "vid-ai-11",
    filename: "ai_smart_gadget_commercial.mp4",
    thumb: "ai_smart_gadget_commercial.jpg",
    title: "Smart Tech Aesthetic Commercial",
    category: "AI Content",
    categoryBadge: "AI TECH COMMERCIAL",
    description: "Futuristic tech device visualization featuring clean industrial design and holographic UI elements.",
    tools: ["Kling AI", "Midjourney", "After Effects", "Sound Design"],
    tags: ["Tech Commercial", "Industrial Design", "Holographic UI", "Kling AI"],
    order: 23,
    views: "640K+",
    duration: "0:12",
    featured: false
  },
  {
    folder: "ugc video",
    file: "siwon ads 01.mp4",
    id: "vid-ai-12",
    filename: "ai_siwon_ugc_commercial.mp4",
    thumb: "ai_siwon_ugc_commercial.jpg",
    title: "UGC Style Brand Conversion Ad",
    category: "AI Content",
    categoryBadge: "UGC & CONVERSION AD",
    description: "High-converting UGC video ad structured for paid meta advertising with strong visual hooks and captioning.",
    tools: ["CapCut Pro", "Premiere Pro", "Kinetic Hook", "Voiceover Mix"],
    tags: ["UGC Ad", "Meta Ads", "Paid Social", "High Conversion"],
    order: 24,
    views: "890K+",
    duration: "0:18",
    featured: false
  }
];

const BASE_DIR = "C:\\Users\\HP\\Desktop\\ai_video_download";
const VIDEOS_OUT_DIR = path.join(process.cwd(), "public", "uploads", "videos");
const THUMBS_OUT_DIR = path.join(process.cwd(), "public", "uploads", "thumbnails");

if (!fs.existsSync(VIDEOS_OUT_DIR)) fs.mkdirSync(VIDEOS_OUT_DIR, { recursive: true });
if (!fs.existsSync(THUMBS_OUT_DIR)) fs.mkdirSync(THUMBS_OUT_DIR, { recursive: true });

const newAiVideoEntries = [];

for (let i = 0; i < AI_VIDEOS.length; i++) {
  const item = AI_VIDEOS[i];
  const inputPath = path.join(BASE_DIR, item.folder, item.file);
  const outVideoPath = path.join(VIDEOS_OUT_DIR, item.filename);
  const outThumbPath = path.join(THUMBS_OUT_DIR, item.thumb);

  console.log(`\n[${i + 1}/${AI_VIDEOS.length}] Processing AI Video: ${item.file} -> ${item.filename}`);

  if (!fs.existsSync(inputPath)) {
    console.error(`  ERROR: Input file not found: ${inputPath}`);
    continue;
  }

  // 1. Extract thumbnail at 1s
  console.log(`  Extracting thumbnail: ${item.thumb}...`);
  spawnSync(ffmpeg, [
    "-ss", "00:00:01",
    "-i", inputPath,
    "-vframes", "1",
    "-q:v", "2",
    outThumbPath,
    "-y"
  ]);

  if (!fs.existsSync(outThumbPath) || fs.statSync(outThumbPath).size === 0) {
    spawnSync(ffmpeg, [
      "-ss", "00:00:00.5",
      "-i", inputPath,
      "-vframes", "1",
      "-q:v", "2",
      outThumbPath,
      "-y"
    ]);
  }

  // 2. Encode / optimize with faststart
  console.log(`  Encoding with H.264 faststart...`);
  spawnSync(ffmpeg, [
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

  const stat = fs.statSync(outVideoPath);
  console.log(`  Done: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);

  newAiVideoEntries.push({
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
    createdAt: new Date().toISOString()
  });
}

// 3. Append to data/db.json
const dbJsonPath = path.join(process.cwd(), "data", "db.json");
let currentDb = { videos: [], enquiries: [], settings: {}, adminHash: "karmayogi2026" };
if (fs.existsSync(dbJsonPath)) {
  try {
    currentDb = JSON.parse(fs.readFileSync(dbJsonPath, "utf-8"));
  } catch {}
}

// Keep existing brand videos and add AI videos
const existingBrandVideos = currentDb.videos.filter(v => v.category === "Personal Brand");
currentDb.videos = [...existingBrandVideos, ...newAiVideoEntries];
fs.writeFileSync(dbJsonPath, JSON.stringify(currentDb, null, 2), "utf-8");

console.log(`\n\nDatabase updated! Total videos: ${currentDb.videos.length} (${existingBrandVideos.length} Brand + ${newAiVideoEntries.length} AI Content)`);
