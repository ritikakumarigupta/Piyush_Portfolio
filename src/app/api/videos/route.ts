import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const onlyPublished = !all;
    const videos = db.getVideos(onlyPublished);
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, category, categoryBadge, description, videoUrl, thumbnailUrl, tools, order, status, views, duration } = body;

    if (!title || !videoUrl) {
      return NextResponse.json({ error: "Title and video URL are required" }, { status: 400 });
    }

    const newVideo = db.createVideo({
      title,
      category: category || "Video Editing",
      categoryBadge: categoryBadge || category || "COMMERCIAL",
      description: description || "",
      videoUrl,
      thumbnailUrl: thumbnailUrl || "/uploads/thumbnails/placeholder.jpg",
      tools: Array.isArray(tools) ? tools : (tools ? tools.split(",").map((t: string) => t.trim()) : []),
      order: Number(order) || (db.getVideos(false).length + 1),
      status: status === "draft" ? "draft" : "published",
      views: views || "100K+",
      duration: duration || "30s",
    });

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
  }
}
