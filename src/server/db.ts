import { env } from "~/env";
import { PrismaClient } from "@prisma/client";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();
// Export `prisma` as an alias for `db` to preserve existing imports.
export const prisma = db;

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
