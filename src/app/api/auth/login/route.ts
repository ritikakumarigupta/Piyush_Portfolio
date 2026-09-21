import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ADMIN_COOKIE_NAME, ADMIN_SECRET_TOKEN } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const username = (body.username || "").toString().trim();
    const password = (body.password || "").toString().trim();

    if (!username) {
      return NextResponse.json(
        { error: "Please enter your username." },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "Please enter your password." },
        { status: 400 }
      );
    }

    if (!db.verifyAdmin(password)) {
      return NextResponse.json(
        { error: "Invalid password. Default password is 'karmayogi2026'" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true, message: "Logged in successfully" });
    res.cookies.set(ADMIN_COOKIE_NAME, ADMIN_SECRET_TOKEN, {
      httpOnly: true,
      secure: false, // works across localhost and production
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
