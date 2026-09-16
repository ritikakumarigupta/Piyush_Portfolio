import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function GET() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const enquiries = db.getEnquiries();
    return NextResponse.json(enquiries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let name = "";
    let email = "";
    let phone = "";
    let projectType = "YouTube Video";
    let budget = "Custom";
    let message = "";
    let referenceLink = "";
    let file: File | null = null;

    if (contentType.includes("application/json")) {
      const json = await req.json();
      name = json.name || json.clientName || "";
      email = json.email || "";
      phone = json.phone || "Not provided";
      projectType = json.projectType || "Brand Commercial / Reel";
      budget = json.budget || "Custom";
      message = json.message || "";
      referenceLink = json.referenceLink || "";
    } else {
      const formData = await req.formData();
      name = (formData.get("name") as string) || (formData.get("clientName") as string) || "";
      email = (formData.get("email") as string) || "";
      phone = (formData.get("phone") as string) || "Not provided";
      projectType = (formData.get("projectType") as string) || "Brand Commercial / Reel";
      budget = (formData.get("budget") as string) || "Custom";
      message = (formData.get("message") as string) || "";
      referenceLink = (formData.get("referenceLink") as string) || "";
      file = formData.get("file") as File | null;
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    let uploadedFilePath = "";
    if (file && file.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "files");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadDir, safeName);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      uploadedFilePath = `/uploads/files/${safeName}`;
    }

    const newEnquiry = db.createEnquiry({
      name,
      email,
      phone,
      projectType,
      budget,
      message,
      referenceLink,
      uploadedFile: uploadedFilePath,
    });

    return NextResponse.json(newEnquiry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save enquiry" }, { status: 500 });
  }
}
