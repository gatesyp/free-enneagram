import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminToken, hashToken } from "@/lib/auth";

export async function POST(request: Request) {
  const adminToken = getAdminToken();
  if (!adminToken) {
    return NextResponse.json(
      { error: "Admin access is not configured" },
      { status: 503 }
    );
  }

  const body = await request.json();
  const password = typeof body.password === "string" ? body.password : "";

  if (hashToken(password) !== adminToken) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, adminToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}