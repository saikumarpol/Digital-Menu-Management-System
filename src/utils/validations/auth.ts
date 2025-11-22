import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  fullName: z.string().optional(),
  country: z.string().optional(),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  code: z.string().min(4).max(8),
});
