import fs from "fs";
import path from "path";

const dbJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "db.json"), "utf-8"));
const videos = dbJson.videos;

// 1. Update src/lib/db.ts
const dbTsPath = path.join(process.cwd(), "src", "lib", "db.ts");
let dbTs = fs.readFileSync(dbTsPath, "utf-8");

const startIdx = dbTs.indexOf("const DEFAULT_VIDEOS: VideoProject[] = [");
const endIdx = dbTs.indexOf("const DEFAULT_SETTINGS: StudioSettings = {", startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const formattedVideos = `const DEFAULT_VIDEOS: VideoProject[] = ${JSON.stringify(videos, null, 2)};\n\n`;
  dbTs = dbTs.slice(0, startIdx) + formattedVideos + dbTs.slice(endIdx);
  fs.writeFileSync(dbTsPath, dbTs, "utf-8");
  console.log("Updated src/lib/db.ts with", videos.length, "videos!");
}

// 2. Update src/components/ProjectsSection.tsx
const projPath = path.join(process.cwd(), "src", "components", "ProjectsSection.tsx");
let projTs = fs.readFileSync(projPath, "utf-8");

const pStart = projTs.indexOf("  const displayProjects: VideoProject[] = videos.length > 0 ? videos : [");
const pEnd = projTs.indexOf("  // Manual scroll handler", pStart);

if (pStart !== -1 && pEnd !== -1) {
  const formattedFallback = `  const displayProjects: VideoProject[] = videos.length > 0 ? videos : ${JSON.stringify(videos, null, 4)};\n\n`;
  projTs = projTs.slice(0, pStart) + formattedFallback + projTs.slice(pEnd);
  fs.writeFileSync(projPath, projTs, "utf-8");
  console.log("Updated src/components/ProjectsSection.tsx fallback with", videos.length, "videos!");
}
