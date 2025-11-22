// src/app/auth/verify/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // try to read email from sessionStorage (set by login)
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("otp_email");
      if (stored) setEmail(stored);
    }
  }, []);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email. Go back and enter a valid email.");
      return;
    }
    if (!/^\d{4,8}$/.test(code)) {
      setError("Enter the numeric code you received by email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code: code.trim() }),
      });

      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(data?.message ?? "OTP verification failed. Try again.");
        setLoading(false);
        return;
      }

      // On success server should set HttpOnly cookie (session)
      // Redirect to admin dashboard or desired page
      setLoading(false);
      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="auth-aurora" />
        <div className="auth-aurora" style={{ animationDelay: "10s" }} />
        <div className="auth-grid" />
        <div className="pulse-ring top-20 right-[20%]" />
        <div className="pulse-ring bottom-16 left-[12%]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-300" />
          Step 2 · Verify identity
        </div>

        <div className="grid gap-8 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.55)] backdrop-blur-3xl md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-200">
                Verify OTP
              </p>
              <h1 className="text-3xl font-semibold leading-snug text-white md:text-4xl">
                Enter the one-time passcode we just sent.
              </h1>
              <p className="text-sm text-slate-200/90 md:text-base">
                Your code is valid for the next 10 minutes. If you need to make
                changes, you can update the email address here or request
                another code.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/20">
                <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
                  Active email
                </p>
                <p className="mt-2 text-lg font-semibold text-white break-words">
                  {email || "you@example.com"}
                </p>
                <button
                  type="button"
                  className="mt-3 text-xs font-semibold text-indigo-200 underline-offset-4 hover:underline"
                  onClick={() => router.push("/auth/login")}
                >
                  Use a different email
                </button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/20">
                <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
                  Code status
                </p>
                <p className="mt-2 flex items-center gap-2 text-base font-semibold text-emerald-200">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                  Ready to verify
                </p>
                <p className="text-xs text-slate-300">
                  Didn&apos;t get it?{" "}
                  <button
                    type="button"
                    className="font-semibold text-indigo-200 underline-offset-4 hover:underline"
                    onClick={() => router.push("/auth/login")}
                  >
                    Resend OTP
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/25 backdrop-blur-2xl md:p-8">
            <div className="space-y-2 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200">
                Secure step
              </p>
              <h2 className="text-2xl font-semibold text-white">Enter OTP</h2>
              <p className="text-sm text-slate-300">
                Type the 4-8 digit code from your inbox.
              </p>
            </div>

            <form onSubmit={handleVerify} className="mt-8 space-y-5">
              <div className="group">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 transition focus:border-indigo-300 focus:bg-white/20 focus:outline-none"
                />
              </div>

              <div className="group">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
                  OTP Code
                </label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={8}
                  placeholder="123456"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center text-lg tracking-[0.4em] text-white placeholder:tracking-normal placeholder:text-slate-400 transition focus:border-emerald-300 focus:bg-white/20 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`relative mt-4 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:scale-[1.01] hover:shadow-2xl focus:outline-none ${
                  loading ? "opacity-70" : ""
                }`}
              >
                {loading ? "Verifying..." : "Verify & Sign In"}
              </button>
            </form>

            {error && (
              <p className="mt-5 rounded-2xl border border-rose-300/40 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </p>
            )}

            <p className="mt-6 text-center text-[11px] text-slate-400">
              Need another code? Return to login to request a fresh OTP. Codes
              expire 10 minutes after delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
