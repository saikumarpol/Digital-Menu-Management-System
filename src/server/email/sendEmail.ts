// src/server/email/sendEmail.ts
import nodemailer from "nodemailer";

export async function sendEmail(to: string, text: string) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    // If SMTP isn't configured, log the message instead of throwing.
    // This is useful for local dev without valid SMTP credentials.
    console.warn("SMTP not fully configured, skipping sending email. Log below:");
    console.warn({ to, text });
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  try {
    await transporter.sendMail({
      from: "no-reply@digitalmenu.com",
      to,
      subject: "Your OTP Code",
      text,
    });
  } catch (err) {
    // Don't throw in development — log and continue so OTP flow doesn't fail hard.
    console.warn("Failed to send email via SMTP, falling back to console log:", err);
    console.warn({ to, text });
  }
}
