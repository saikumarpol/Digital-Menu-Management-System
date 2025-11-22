// src/server/api/trpc/context.ts
import { prisma } from "~/server/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function createTRPCContext() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value ?? null;

  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        email: string;
      };
      user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });
    } catch {
      user = null;
    }
  }

  return {
    prisma,
    user,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
