import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { createDb } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    // Get DB instance from env
    const db = createDb(process.env as any);

    // Check if user already exists
    const existing = await db.select().from(users).where(eq(users.email, email));
    if (existing.length > 0) {
      return NextResponse.json({ error: "User already exists." }, { status: 400 });
    }

    // Hash password
    const passwordHash = await hash(password, 10);

    // Insert new user
    await db.insert(users).values({ email, passwordHash });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Sign up failed." }, { status: 500 });
  }
} 