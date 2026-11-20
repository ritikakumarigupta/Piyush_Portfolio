import fs from 'fs';
import path from 'path';
import os from 'os';

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

function getDbFilePath(): string {
  if (process.env.VERCEL) {
    return path.join(os.tmpdir(), 'karmayogi_db.json');
  }
  return path.join(process.cwd(), 'data', 'db.json');
}

const DEFAULT_VIDEOS: VideoProject[] = [
  {
    id: "vid-brand-1",
    title: "Acne Care Skincare Authority Reel",
    category: "Personal Brand",
    categoryBadge: "PERSONAL BRAND & REELS",
    description: "High-retention skincare educational reel featuring kinetic text overlays, fast-paced cut transitions, and clinical sound design.",
    videoUrl: "/uploads/videos/acne_reels_01.mp4",
    thumbnailUrl: "/uploads/thumbnails/acne_reels_01.jpg",
    tools: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Kinetic Typography"],
    tags: ["Skincare", "Educational Reel", "Kinetic Typography", "High Retention"],
    order: 1,
    status: "published",
    views: "1.2M+",
    duration: "0:45",
    featured: true,
    createdAt: "2026-11-09T05:23:46.518Z",
  },
  {
    id: "vid-brand-2",
    title: "Dental Hygiene & Oral Care Campaign",
    category: "Personal Brand",
    categoryBadge: "COMMERCIAL & BRAND",
    description: "Engaging commercial reel for dental wellness, balancing clinical expertise with energetic pacing and visual callouts.",
    videoUrl: "/uploads/videos/brush_teeth_reels.mp4",
    thumbnailUrl: "/uploads/thumbnails/brush_teeth_reels.jpg",
    tools: ["Premiere Pro", "After Effects", "Color Grading", "Sound FX"],
    tags: ["Healthcare", "Commercial", "Brand Authority", "Sound Design"],
    order: 2,
    status: "published",
    views: "850K+",
    duration: "0:38",
    featured: true,
    createdAt: "2026-11-10T05:24:10.998Z",
  },
  {
    id: "vid-brand-3",
    title: "Celebrity Lifestyle & Viral Reel",
    category: "Personal Brand",
    categoryBadge: "VIRAL REEL & INFLUENCER",
    description: "Cinematic celebrity lifestyle cut with beat-synced transitions, punchy sound risers, and color-graded highlights.",
    videoUrl: "/uploads/videos/celebrity_reels.mp4",
    thumbnailUrl: "/uploads/thumbnails/celebrity_reels.jpg",
    tools: ["DaVinci Resolve", "Premiere Pro", "Speed Ramping", "Motion Graphics"],
    tags: ["Celebrity", "Lifestyle", "Beat Sync", "Viral Editing"],
    order: 3,
    status: "published",
    views: "2.4M+",
    duration: "0:52",
    featured: true,
    createdAt: "2026-11-11T05:24:46.998Z",
  },
  {
    id: "vid-brand-4",
    title: "Chandrika Herbal & Ayurveda Brand Reel",
    category: "Personal Brand",
    categoryBadge: "HERBAL BRAND COMMERCIAL",
    description: "Aesthetic Ayurveda product commercial showcasing macro textures, herbal ingredient callouts, and smooth pacing.",
    videoUrl: "/uploads/videos/chandrika_reels.mp4",
    thumbnailUrl: "/uploads/thumbnails/chandrika_reels.jpg",
    tools: ["Premiere Pro", "After Effects", "Color Science", "Sound Master"],
    tags: ["Product Commercial", "Ayurveda", "Aesthetic Cut", "Brand Story"],
    order: 4,
    status: "published",
    views: "1.6M+",
    duration: "0:30",
    featured: false,
    createdAt: "2026-11-12T05:25:05.998Z",
  },
  {
    id: "vid-brand-5",
    title: "Dr. Mittal Medical Authority & Trust Reel",
    category: "Personal Brand",
    categoryBadge: "DOCTOR & CLINICAL BRAND",
    description: "Medical authority building reel for Dr. Mittal with animated diagram callouts, lower thirds, and crystal clear voice master.",
    videoUrl: "/uploads/videos/dr_mittal_brand_reel.mp4",
    thumbnailUrl: "/uploads/thumbnails/dr_mittal_brand_reel.jpg",
    tools: ["Premiere Pro", "DaVinci Resolve", "Motion Graphics", "Dialogue Edit"],
    tags: ["Medical Authority", "Healthcare", "Doctor Reel", "Lower Thirds"],
    order: 5,
    status: "published",
    views: "980K+",
    duration: "0:58",
    featured: true,
    createdAt: "2026-11-13T05:25:34.998Z",
  },
  {
    id: "vid-brand-6",
    title: "Dr. Shweta Personal Brand Identity & Intro",
    category: "Personal Brand",
    categoryBadge: "BRAND IDENTITY & INTRO",
    description: "Dynamic intro reel establishing Dr. Shweta's credentials, high-energy hooks, and modern motion typography.",
    videoUrl: "/uploads/videos/dr_shweta_intro.mp4",
    thumbnailUrl: "/uploads/thumbnails/dr_shweta_intro.jpg",
    tools: ["After Effects", "Premiere Pro", "Kinetic Cut", "Typography"],
    tags: ["Personal Brand", "Founder Intro", "Kinetic Hook", "Typography"],
    order: 6,
    status: "published",
    views: "1.1M+",
    duration: "0:35",
    featured: false,
    createdAt: "2026-11-14T05:25:52.998Z",
  },
  {
    id: "vid-brand-7",
    title: "Dr. Shweta Clinical Insights & Case Study",
    category: "Personal Brand",
    categoryBadge: "CLINICAL CASE STUDY",
    description: "In-depth medical advice short video formatted for viral discovery across Instagram Reels and YouTube Shorts.",
    videoUrl: "/uploads/videos/dr_shweta_video.mp4",
    thumbnailUrl: "/uploads/thumbnails/dr_shweta_video.jpg",
    tools: ["Premiere Pro", "DaVinci Resolve", "Color Science", "B-roll Cut"],
    tags: ["Case Study", "Educational", "Short Form", "B-Roll Sync"],
    order: 7,
    status: "published",
    views: "740K+",
    duration: "0:48",
    featured: false,
    createdAt: "2026-11-15T05:26:38.998Z",
  },
  {
    id: "vid-brand-8",
    title: "Navratri Festive Brand Campaign",
    category: "Personal Brand",
    categoryBadge: "FESTIVE COMMERCIAL",
    description: "High-spirit festive commercial with vibrant color saturation, traditional audio fusion, and rhythmic motion graphics.",
    videoUrl: "/uploads/videos/navratri_festive_reels.mp4",
    thumbnailUrl: "/uploads/thumbnails/navratri_festive_reels.jpg",
    tools: ["Premiere Pro", "DaVinci Resolve", "Vibrant Grading", "Audio Sync"],
    tags: ["Festive", "Cultural Campaign", "Vibrant Colors", "High Energy"],
    order: 8,
    status: "published",
    views: "1.8M+",
    duration: "0:28",
    featured: false,
    createdAt: "2026-11-16T05:27:08.998Z",
  },
  {
    id: "vid-brand-9",
    title: "Rapid Fire Q&A Brand Engagement Reel",
    category: "Personal Brand",
    categoryBadge: "Q&A ENGAGEMENT REEL",
    description: "Snappy Q&A format designed for maximum retention, featuring pop-up question cards, meme sound effects, and kinetic pacing.",
    videoUrl: "/uploads/videos/question_answer_qa_reel.mp4",
    thumbnailUrl: "/uploads/thumbnails/question_answer_qa_reel.jpg",
    tools: ["Premiere Pro", "Sound FX", "Pop-up Graphics", "Kinetic Cut"],
    tags: ["Q&A Format", "Viewer Retention", "Pop-up Elements", "Viral Hook"],
    order: 9,
    status: "published",
    views: "1.5M+",
    duration: "0:50",
    featured: false,
    createdAt: "2026-11-17T05:27:38.998Z",
  },
  {
    id: "vid-brand-10",
    title: "Luxury Commercial Showcase 01",
    category: "Personal Brand",
    categoryBadge: "LUXURY PRODUCT COMMERCIAL",
    description: "Sleek commercial showcasing premium product design, fluid motion blur, and sophisticated cinematic color grading.",
    videoUrl: "/uploads/videos/sample_commercial_01.mp4",
    thumbnailUrl: "/uploads/thumbnails/sample_commercial_01.jpg",
    tools: ["DaVinci Resolve", "Premiere Pro", "After Effects", "ACES Color"],
    tags: ["Luxury", "Commercial", "Product Showcase", "Cinematic"],
    order: 10,
    status: "published",
    views: "620K+",
    duration: "0:30",
    featured: false,
    createdAt: "2026-11-18T05:28:05.998Z",
  },
  {
    id: "vid-brand-11",
    title: "High-Impact Brand Motion Showcase 02",
    category: "Personal Brand",
    categoryBadge: "BRAND MOTION & PACING",
    description: "Dynamic commercial sequence emphasizing bold typography, brand identity placement, and rhythmic audio-visual transitions.",
    videoUrl: "/uploads/videos/sample_commercial_02.mp4",
    thumbnailUrl: "/uploads/thumbnails/sample_commercial_02.jpg",
    tools: ["Premiere Pro", "After Effects", "Sound Design", "Typography"],
    tags: ["Motion Pacing", "Brand Identity", "Dynamic Cut", "Audio Sync"],
    order: 11,
    status: "published",
    views: "790K+",
    duration: "0:32",
    featured: false,
    createdAt: "2026-11-19T05:28:43.998Z",
  },
  {
    id: "vid-brand-12",
    title: "Snehal Lifestyle & Fashion Brand Reel",
    category: "Personal Brand",
    categoryBadge: "FASHION & LIFESTYLE",
    description: "Modern fashion lifestyle reel featuring soft pastel color grading, smooth zoom cuts, and trending audio rhythm.",
    videoUrl: "/uploads/videos/snehal_reels.mp4",
    thumbnailUrl: "/uploads/thumbnails/snehal_reels.jpg",
    tools: ["DaVinci Resolve", "Premiere Pro", "Fashion Grade", "Speed Ramps"],
    tags: ["Fashion", "Lifestyle", "Pastel Grade", "Reel Edit"],
    order: 12,
    status: "published",
    views: "1.3M+",
    duration: "0:42",
    featured: true,
    createdAt: "2026-11-20T05:29:18.998Z",
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
  logoUrl: "/assets/piyush-avatar-2026.png",
};

// Initial admin password hash for "karmayogi2026"
const DEFAULT_ADMIN_HASH = "karmayogi2026";

let memoryCache: DatabaseSchema | null = null;

function ensureDb(): DatabaseSchema {
  if (memoryCache && memoryCache.videos && memoryCache.videos.length > 0) {
    return memoryCache;
  }

  const dbFile = getDbFilePath();
  const dbDir = path.dirname(dbFile);

  try {
    if (!fs.existsSync(dbFile)) {
      // Seed from bundled data/db.json if available
      const bundledPath = path.join(process.cwd(), 'data', 'db.json');
      if (fs.existsSync(bundledPath)) {
        const raw = fs.readFileSync(bundledPath, 'utf-8');
        const parsed = JSON.parse(raw) as DatabaseSchema;
        memoryCache = parsed;
        try {
          if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
          fs.writeFileSync(dbFile, JSON.stringify(parsed, null, 2), 'utf-8');
        } catch {}
        return parsed;
      }

      const initialData: DatabaseSchema = {
        videos: DEFAULT_VIDEOS,
        enquiries: [],
        settings: DEFAULT_SETTINGS,
        adminHash: DEFAULT_ADMIN_HASH,
      };
      memoryCache = initialData;
      try {
        if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
        fs.writeFileSync(dbFile, JSON.stringify(initialData, null, 2), 'utf-8');
      } catch {}
      return initialData;
    }

    const raw = fs.readFileSync(dbFile, 'utf-8');
    const data = JSON.parse(raw) as DatabaseSchema;
    if (!data.videos || data.videos.length === 0) {
      data.videos = DEFAULT_VIDEOS;
    }
    if (!data.settings) {
      data.settings = DEFAULT_SETTINGS;
    }
    memoryCache = data;
    return data;
  } catch (err) {
    console.warn("ensureDb read error, falling back:", err);
    if (memoryCache) return memoryCache;

    try {
      const bundledPath = path.join(process.cwd(), 'data', 'db.json');
      if (fs.existsSync(bundledPath)) {
        const data = JSON.parse(fs.readFileSync(bundledPath, 'utf-8')) as DatabaseSchema;
        memoryCache = data;
        return data;
      }
    } catch {}

    const fallbackData: DatabaseSchema = {
      videos: DEFAULT_VIDEOS,
      enquiries: [],
      settings: DEFAULT_SETTINGS,
      adminHash: DEFAULT_ADMIN_HASH,
    };
    memoryCache = fallbackData;
    return fallbackData;
  }
}

function saveDb(data: DatabaseSchema) {
  memoryCache = data;
  try {
    const dbFile = getDbFilePath();
    const dbDir = path.dirname(dbFile);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn("saveDb filesystem write skipped or read-only, maintained in memory:", err);
  }
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
