"use client";

import React, { useState, useEffect } from "react";

interface Props {
  slug: string;
  size?: number; // QR size in pixels
}

export default function MenuShare({ slug, size = 240 }: Props) {
  const [copied, setCopied] = useState(false);
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [url, setUrl] = useState<string>(`/menu/${slug}`);

  // fetch server-generated QR (base64) on mount
  useEffect(() => {
    // build absolute url if window available
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    setUrl(`${origin}/menu/${slug}`);

    let cancelled = false;
    fetch(`/api/qr/${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.qr) {
          setQrSrc(data.qr);
        } else {
          // fallback to Google Charts QR
          setQrSrc(`https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${encodeURIComponent(`${origin}/menu/${slug}`)}`);
        }
      })
      .catch(() => {
        if (cancelled) return;
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        setQrSrc(`https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${encodeURIComponent(`${origin}/menu/${slug}`)}`);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, size]);

  function handleCopy() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
      {/* QR container */}
      <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm shadow-slate-200">
        {qrSrc ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img
              src={qrSrc}
              alt="QR code"
              style={{ width: size, height: size }}
              className="rounded-xl border border-slate-200 shadow-sm"
            />
          </a>
        ) : (
          <div
            style={{ width: size, height: size }}
            className="flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400"
          >
            Generating...
          </div>
        )}
      </div>

      {/* Link container */}
      <div className="flex flex-1 flex-col justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-200">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Public menu link
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            readOnly
            value={url}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none ring-0 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-500/40 transition hover:bg-indigo-500"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
