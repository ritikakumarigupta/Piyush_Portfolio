import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ADMIN_COOKIE_NAME, ADMIN_SECRET_TOKEN } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const validUsernames = ["admin", "karmayogi", "karmayogistudio@gmail.com", "piyush"];
    const isUsernameValid = validUsernames.includes((username || "").toLowerCase().trim());

    if (!isUsernameValid || !db.verifyAdmin(password)) {
      return NextResponse.json(
        { error: "Invalid credentials. Hint: use password 'karmayogi2026'" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true, message: "Logged in successfully" });
    res.cookies.set(ADMIN_COOKIE_NAME, ADMIN_SECRET_TOKEN, {
      httpOnly: true,
      secure: false, // works seamlessly locally and production
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
