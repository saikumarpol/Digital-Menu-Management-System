// src/app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function validateEmail(e: string) {
    return /\S+@\S+\.\S+/.test(e);
  }

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), fullName: fullName.trim(), country: country.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || "Failed to send OTP. Try again later.");
        setLoading(false);
        return;
      }

      // Save email to sessionStorage so verify page can read it
      if (typeof window !== "undefined") {
        sessionStorage.setItem("otp_email", email.trim().toLowerCase());
      }

      setMessage("OTP sent to your email. Please check your inbox (or spam).");
      setLoading(false);

      // navigate to verify page
      router.push("/auth/verify");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* animated background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="auth-aurora" />
        <div className="auth-aurora" style={{ animationDelay: "6s" }} />
        <div className="auth-grid" />
        <div className="pulse-ring top-10 left-[10%]" />
        <div className="pulse-ring bottom-16 right-[15%]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
          Secure OTP access
        </div>

        <div className="grid gap-8 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.55)] backdrop-blur-3xl md:grid-cols-[1.2fr_1fr] md:p-10">
          {/* Headline + highlights */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-200">
                Admin Console
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                Sign in to manage
                <span className="text-slate-300"> every menu touchpoint.</span>
              </h1>
              <p className="text-sm text-slate-200/90 md:text-base">
                Use your email to receive a one-time passcode. Add your name and
                country if it’s your first time and we’ll personalize your
                workspace instantly.
              </p>
            </div>

            <div className="grid gap-4 text-sm text-slate-200 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/20 transition hover:border-emerald-200/60 hover:bg-white/10">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Verification
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  &lt;30s
                </p>
                <p className="text-xs text-slate-300">Average OTP delivery</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/20 transition hover:border-indigo-200/60 hover:bg-white/10">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Coverage
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">190+</p>
                <p className="text-xs text-slate-300">Countries supported</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl md:p-8">
            <div className="space-y-1 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-200">
                Access Portal
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Sign in / Register
              </h2>
              <p className="text-sm text-slate-300">
                Enter your email to receive a one-time verification code.
              </p>
            </div>

            <form onSubmit={handleSendOtp} className="mt-8 space-y-4">
              <div className="group">
                <label className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-300">
                  Email
                  <span className="text-[10px] text-emerald-300">Required</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 transition focus:border-emerald-300 focus:bg-white/20 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div className="group">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
                  Full name (optional)
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 transition focus:border-indigo-200 focus:bg-white/15 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div className="group">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
                  Country (optional)
                </label>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 transition focus:border-indigo-200 focus:bg-white/15 focus:outline-none"
                  placeholder="India"
                />
              </div>

              <button
                type="submit"
                className={`relative mt-2 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-400 via-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:scale-[1.01] hover:shadow-2xl focus:outline-none ${
                  loading ? "opacity-70" : ""
                }`}
                disabled={loading}
              >
                <span className="relative z-10">
                  {loading ? "Sending OTP..." : "Send OTP"}
                </span>
                <span className="absolute inset-0 opacity-0 transition group-hover:opacity-40" />
              </button>
            </form>

            {message && (
              <p className="mt-4 rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-200">
                {message}
              </p>
            )}
            {error && (
              <p className="mt-4 rounded-2xl border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </p>
            )}

            <p className="mt-6 text-center text-[11px] text-slate-400">
              OTPs expire in 10 minutes. By continuing you agree to our terms of
              service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
