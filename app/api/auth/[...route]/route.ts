import { NextRequest, NextResponse } from "next/server";
import { registerUser, loginUser, verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest, { params }: { params: { route: string[] } }) {
  const route = params.route[0];

  try {
    const body = await req.json();

    if (route === "register") {
      const { name, email, password } = body;
      if (!name || !email || !password) {
        return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
      }

      const { user, token, isFirstUserAdmin } = await registerUser(name, email, password);
      const res = NextResponse.json({
        success: true,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        isFirstUserAdmin,
      });

      res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return res;
    }

    if (route === "login") {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
      }

      const { user, token } = await loginUser(email, password);
      const res = NextResponse.json({
        success: true,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });

      res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return res;
    }

    if (route === "logout") {
      const res = NextResponse.json({ success: true });
      res.cookies.set(COOKIE_NAME, "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      });
      return res;
    }

    return NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Authentication error" }, { status: 400 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { route: string[] } }) {
  const route = params.route[0];

  if (route === "me") {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ user: null });
    }

    const payload = verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ user: null });
    }

    const user = db.getUserById(payload.userId);
    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
