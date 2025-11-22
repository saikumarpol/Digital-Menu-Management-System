// src/app/api/auth/send-otp/route.ts
import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { sendEmail } from "~/server/email/sendEmail"; // we will create this helper

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email?: string;
      fullName?: string;
      country?: string;
    };
    const { email, fullName, country } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // 1) Create or update user
    let user = await prisma.user.findUnique({ where: { email } });
    user ??= await prisma.user.create({
      data: {
        email,
        fullName: fullName ?? "",
        country: country ?? "",
      },
    });

    // 2) Generate OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 3) Store in DB (expires in 10 mins)
    await prisma.emailOtp.create({
      data: {
        userId: user.id,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    // 4) Send email
    await sendEmail(email, `Your login code is: ${code}`);

    return NextResponse.json({ message: "OTP sent" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
