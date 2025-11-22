// src/app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; code?: string };
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and code are required" },
        { status: 400 }
      );
    }

    // 1) Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 2) Find OTP
    const otp = await prisma.emailOtp.findFirst({
      where: {
        userId: user.id,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otp) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }

    // 3) Mark OTP as used
    await prisma.emailOtp.update({
      where: { id: otp.id },
      data: { used: true },
    });

    // 4) Create JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email } as { userId: string; email: string },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // 5) Set session cookie - await cookies() before using it
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
