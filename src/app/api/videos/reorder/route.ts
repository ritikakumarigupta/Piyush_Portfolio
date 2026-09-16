import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function POST(req: Request) {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { orderedIds } = await req.json();
    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "orderedIds array is required" }, { status: 400 });
    }

    const reordered = db.reorderVideos(orderedIds);
    return NextResponse.json(reordered);
  } catch (error) {
    return NextResponse.json({ error: "Failed to reorder videos" }, { status: 500 });
  }
}
