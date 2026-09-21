import fs from 'fs';
import path from 'path';

export interface VideoProject {
  id: string;
  title: string;
  category: string;
  categoryBadge?: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  tools: string[];
  tags?: string[];
  order: number;
  status: 'published' | 'draft';
  views?: string;
  duration?: string;
  featured?: boolean;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  referenceLink?: string;
  uploadedFile?: string;
  status: 'NEW' | 'IN PROGRESS' | 'COMPLETED';
  createdAt: string;
}

export interface StudioSettings {
  studioName: string;
  studioTagline: string;
  heroGreeting: string;
  heroHeading: string;
  heroDescription: string;
  contactEmail: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  youtube: string;
  footerContent: string;
  logoUrl: string;
}

interface DatabaseSchema {
  videos: VideoProject[];
  enquiries: Enquiry[];
  settings: StudioSettings;
  adminHash: string;
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

const DEFAULT_VIDEOS: VideoProject[] = [
  {
    id: "vid-piyush-reel",
    title: "Piyush Kumar Gupta — Viral Authority Portfolio Reel",
    category: "Personal Brand",
    categoryBadge: "VIRAL REEL & AUTHORITY",
    description: "Resume gets you shortlisted. Portfolio gets you hired. High-converting personal brand showcase featuring kinetic cuts, motion typography, and 3D screen animation.",
    videoUrl: "/uploads/videos/swion_product_reveal.mp4",
    thumbnailUrl: "/assets/piyush_portfolio_laptop_reel.png",
    tools: ["After Effects", "Blender 3D", "Premiere Pro", "DaVinci Resolve"],
    tags: ["After Effects", "Blender 3D", "Premiere Pro", "DaVinci Resolve"],
    order: 0,
    status: "published",
    views: "1.2M+",
    duration: "0:48",
    featured: true,
    createdAt: "2026-09-21T13:00:00.000Z",
  },
  {
    id: "vid-1",
    title: "Aurabella Luxury Brand Launch",
    category: "AI Video",
    categoryBadge: "AI & COMMERCIAL",
    description: "High-converting luxury cosmetic commercial combining cinematic AI visuals, hyper-realistic macro textures, and refined motion pacing.",
    videoUrl: "/uploads/videos/aurabella_luxury_brand.mp4",
    thumbnailUrl: "/uploads/thumbnails/aurabella_luxury_brand.jpg",
    tools: ["After Effects", "Premiere Pro", "Midjourney", "Runway Gen-3", "DaVinci Resolve"],
    order: 1,
    status: "published",
    views: "1.4M",
    duration: "45s",
    createdAt: new Date().toISOString(),
  },
  {
    id: "vid-2",
    title: "The Bald Lion — AI Character Reel",
    category: "Motion Graphics",
    categoryBadge: "AI CHARACTER & ANIMATION",
    description: "Expressive AI character animation study featuring photorealistic lion anatomy, dynamic lighting, and punchy rhythmic editing.",
    videoUrl: "/uploads/videos/bald_lion_reel.mp4",
    thumbnailUrl: "/uploads/thumbnails/bald_lion_reel.jpg",
    tools: ["After Effects", "Midjourney", "Luma Dream Machine", "Topaz Video AI"],
    order: 2,
    status: "published",
    views: "890K",
    duration: "32s",
    createdAt: new Date().toISOString(),
  },
  {
    id: "vid-3",
    title: "Age Transformation VFX Reel",
    category: "Reels",
    categoryBadge: "VFX & TRANSFORMATION",
    description: "Seamless age progression visual effects showcasing subtle facial morphing, skin texture aging, and color science grading.",
    videoUrl: "/uploads/videos/age_transformation_vfx.mp4",
    thumbnailUrl: "/uploads/thumbnails/age_transformation_vfx.jpg",
    tools: ["DaVinci Resolve", "After Effects", "Premiere Pro", "EBSynth"],
    order: 3,
    status: "published",
    views: "2.8M",
    duration: "28s",
    createdAt: new Date().toISOString(),
  },
  {
    id: "vid-4",
    title: "Mahadev Shiv Celestial VFX Concept",
    category: "Cinematic",
    categoryBadge: "CINEMATIC SHORT FILM",
    description: "Mythological celestial concept video featuring cosmic smoke simulations, divine particle glows, and majestic cinematic sound design.",
    videoUrl: "/uploads/videos/mahadev_shiv_concept.mp4",
    thumbnailUrl: "/uploads/thumbnails/mahadev_shiv_concept.jpg",
    tools: ["After Effects", "Midjourney", "Kling AI", "Audition"],
    order: 4,
    status: "published",
    views: "3.5M",
    duration: "40s",
    createdAt: new Date().toISOString(),
  },
  {
    id: "vid-5",
    title: "Kingdom Momo Brand Commercial",
    category: "Ads",
    categoryBadge: "BRAND COMMERCIAL",
    description: "Sensory-rich food advertisement emphasizing steaming hot momos, sizzle sound design, fluid text callouts, and fast-paced hook editing.",
    videoUrl: "/uploads/videos/kingdom_momo_ad.mp4",
    thumbnailUrl: "/uploads/thumbnails/kingdom_momo_ad.jpg",
    tools: ["Premiere Pro", "CapCut Pro", "After Effects", "Color Finale"],
    order: 5,
    status: "published",
    views: "650K",
    duration: "25s",
    createdAt: new Date().toISOString(),
  },
  {
    id: "vid-6",
    title: "Siwon Premium Brand Master Commercial",
    category: "Ads",
    categoryBadge: "LUXURY BRANDING",
    description: "Minimalist luxury product commercial with fluid infinity-loop motion graphics, golden particle embers, and premium typographic hierarchy.",
    videoUrl: "/uploads/videos/siwon_premium_brand.mp4",
    thumbnailUrl: "/uploads/thumbnails/siwon_premium_brand.jpg",
    tools: ["Cinema 4D", "After Effects", "Premiere Pro"],
    order: 6,
    status: "published",
    views: "1.9M",
    duration: "50s",
    createdAt: new Date().toISOString(),
  },
  {
    id: "vid-7",
    title: "Epic Mahabharat Concept Scene",
    category: "Corporate",
    categoryBadge: "UPCOMING CINEMATIC TRAILER",
    description: "Atmospheric cinematic teaser exploring ancient battlefields, mythical atmospheric lighting, and high-impact sound design.",
    videoUrl: "/uploads/videos/mahabharat_scene.mp4",
    thumbnailUrl: "/uploads/thumbnails/mahabharat_scene.jpg",
    tools: ["Unreal Engine", "After Effects", "Premiere Pro", "AI Foley"],
    order: 7,
    status: "published",
    views: "1.1M",
    duration: "30s",
    createdAt: new Date().toISOString(),
  }
];

const DEFAULT_SETTINGS: StudioSettings = {
  studioName: "KARMAYOG STUDIO",
  studioTagline: "Karmayog Production House",
  heroGreeting: "Hi there! 👋",
  heroHeading: "Thanks for messaging (KARMAYOG STUDIO).",
  heroDescription: "We specialize in professional Video Editing, Motion Graphics & AI-Powered Video Content — for YouTube, Reels, Ads & Corporate projects.\n\nShare your requirements here, and we'll get back to you shortly!",
  contactEmail: "karmayogistudio@gmail.com",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  instagram: "https://instagram.com/karmayogistudio",
  youtube: "https://youtube.com/@karmayogistudio",
  footerContent: "© 2026 Karmayog Studio. All Rights Reserved. Transforming creative visions into high-impact cinematic video experiences.",
  logoUrl: "/assets/karmayogi-gold-logo.jpg",
};

// Initial admin password hash for "karmayogi2026"
const DEFAULT_ADMIN_HASH = "karmayogi2026";

function ensureDb(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      videos: DEFAULT_VIDEOS,
      enquiries: [],
      settings: DEFAULT_SETTINGS,
      adminHash: DEFAULT_ADMIN_HASH,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const data = JSON.parse(raw) as DatabaseSchema;
    if (!data.videos || data.videos.length === 0) {
      data.videos = DEFAULT_VIDEOS;
      saveDb(data);
    }
    if (!data.settings) {
      data.settings = DEFAULT_SETTINGS;
      saveDb(data);
    }
    return data;
  } catch {
    const fallbackData: DatabaseSchema = {
      videos: DEFAULT_VIDEOS,
      enquiries: [],
      settings: DEFAULT_SETTINGS,
      adminHash: DEFAULT_ADMIN_HASH,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(fallbackData, null, 2), 'utf-8');
    return fallbackData;
  }
}

function saveDb(data: DatabaseSchema) {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  getVideos(onlyPublished = false): VideoProject[] {
    const data = ensureDb();
    const list = onlyPublished 
      ? data.videos.filter(v => v.status === 'published')
      : data.videos;
    return list.sort((a, b) => a.order - b.order);
  },

  getVideoById(id: string): VideoProject | undefined {
    const data = ensureDb();
    return data.videos.find(v => v.id === id);
  },

  createVideo(video: Omit<VideoProject, 'id' | 'createdAt'>): VideoProject {
    const data = ensureDb();
    const newVideo: VideoProject = {
      ...video,
      id: 'vid-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    data.videos.push(newVideo);
    saveDb(data);
    return newVideo;
  },

  updateVideo(id: string, updates: Partial<VideoProject>): VideoProject | null {
    const data = ensureDb();
    const idx = data.videos.findIndex(v => v.id === id);
    if (idx === -1) return null;
    data.videos[idx] = { ...data.videos[idx], ...updates };
    saveDb(data);
    return data.videos[idx];
  },

  deleteVideo(id: string): boolean {
    const data = ensureDb();
    const initialLen = data.videos.length;
    data.videos = data.videos.filter(v => v.id !== id);
    if (data.videos.length !== initialLen) {
      saveDb(data);
      return true;
    }
    return false;
  },

  reorderVideos(orderedIds: string[]): VideoProject[] {
    const data = ensureDb();
    const videoMap = new Map(data.videos.map(v => [v.id, v]));
    const updated: VideoProject[] = [];

    orderedIds.forEach((id, index) => {
      const vid = videoMap.get(id);
      if (vid) {
        vid.order = index + 1;
        updated.push(vid);
        videoMap.delete(id);
      }
    });

    // Append any remaining
    let nextOrder = orderedIds.length + 1;
    videoMap.forEach(vid => {
      vid.order = nextOrder++;
      updated.push(vid);
    });

    data.videos = updated;
    saveDb(data);
    return updated.sort((a, b) => a.order - b.order);
  },

  // ENQUIRIES
  getEnquiries(): Enquiry[] {
    const data = ensureDb();
    return (data.enquiries || []).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  createEnquiry(enquiry: Omit<Enquiry, 'id' | 'status' | 'createdAt'>): Enquiry {
    const data = ensureDb();
    if (!data.enquiries) data.enquiries = [];
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: 'enq-' + Date.now(),
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    data.enquiries.unshift(newEnquiry);
    saveDb(data);
    return newEnquiry;
  },

  updateEnquiryStatus(id: string, status: 'NEW' | 'IN PROGRESS' | 'COMPLETED'): Enquiry | null {
    const data = ensureDb();
    const idx = (data.enquiries || []).findIndex(e => e.id === id);
    if (idx === -1) return null;
    data.enquiries[idx].status = status;
    saveDb(data);
    return data.enquiries[idx];
  },

  deleteEnquiry(id: string): boolean {
    const data = ensureDb();
    const initialLen = (data.enquiries || []).length;
    data.enquiries = data.enquiries.filter(e => e.id !== id);
    if (data.enquiries.length !== initialLen) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // SETTINGS
  getSettings(): StudioSettings {
    const data = ensureDb();
    return data.settings || DEFAULT_SETTINGS;
  },

  updateSettings(updates: Partial<StudioSettings>): StudioSettings {
    const data = ensureDb();
    data.settings = { ...(data.settings || DEFAULT_SETTINGS), ...updates };
    saveDb(data);
    return data.settings;
  },

  // ADMIN AUTH
  verifyAdmin(password: string): boolean {
    const data = ensureDb();
    return password === (data.adminHash || DEFAULT_ADMIN_HASH);
  },

  updateAdminPassword(newPassword: string): boolean {
    const data = ensureDb();
    data.adminHash = newPassword;
    saveDb(data);
    return true;
  }
};
