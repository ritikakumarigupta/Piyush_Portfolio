import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string) || "video"; // "video" | "thumbnail" | "logo"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    let subfolder = "videos";
    if (type === "thumbnail") subfolder = "thumbnails";
    if (type === "logo") subfolder = "assets";

    const uploadDir = type === "logo"
      ? path.join(process.cwd(), "public", "assets")
      : path.join(process.cwd(), "public", "uploads", subfolder);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ext = path.extname(file.name) || (type === "thumbnail" ? ".jpg" : ".mp4");
    const safeName = type === "logo"
      ? `logo_${Date.now()}${ext}`
      : `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const filePath = path.join(uploadDir, safeName);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const publicUrl = type === "logo" ? `/assets/${safeName}` : `/uploads/${subfolder}/${safeName}`;

    return NextResponse.json({ url: publicUrl, filename: safeName }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
