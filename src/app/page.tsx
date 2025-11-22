
import Link from "next/link";
import { appRouter } from "~/server/api/trpc/routers/root";
import { createTRPCContext } from "~/server/api/trpc/context";
import MenuShare from "~/components/MenuShare";

export default async function HomePage() {
  const ctx = await createTRPCContext();
  const caller = appRouter.createCaller(ctx);
  const restaurants = await caller.restaurants.getPublicList();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-gray-900">
      {/* Top navigation */}
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-gradient-to-r from-green-300 to-green-300 via-gray-100 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 via-lime-400 to-amber-300 text-xl font-bold text-white shadow-lg shadow-emerald-500/30">
              DM
            </div>
          <div>
              <p className="text-sm font-semibold tracking-tight">
                Digital Management
              </p>
              <p className="text-xs text-slate-500">
                Smart QR menus for modern restaurants
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-slate-900">
              How it works
            </a>
            <a href="#live-menus" className="hover:text-slate-900">
              Live menus
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 md:inline-flex"
            >
              Admin Login
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-12 md:pt-16">
        {/* Hero section */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm shadow-slate-200/60">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px]">
                ✓
              </span>
              No more paper menus, instant updates in seconds
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-600">
                Smart Menu Suite
              </p>
              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
                The Digital Menu
                <span className="text-slate-400"> Journey </span>
                Starts Here
              </h1>
            </div>

            <p className="max-w-xl text-balance text-sm leading-relaxed text-slate-600 md:text-base">
              Launch a beautiful QR-powered menu in minutes. Manage categories,
              dishes, and pricing from one dashboard while guests explore your
              menu from any device.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600"
              >
                Launch Admin Panel
                <span className="text-lg leading-none">↗</span>
              </Link>
              <a
                href="#live-menus"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                View public menus
                <span className="text-base">●</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-2 text-xs text-slate-500 md:text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[11px] text-white">
                  QR
                </span>
                Real-time QR code updates
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-sm">
                  💾
                </span>
                Cloud stored menus & media
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-sm">
                  ⚡
                </span>
                Effortless edits in seconds
              </div>
            </div>
          </div>

          {/* Phone mock + animated cards */}
          <div className="relative flex justify-center md:justify-end">
            <div className="pointer-events-none absolute -left-6 top-10 h-40 w-40 rounded-[36px] bg-emerald-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-4 bottom-0 h-32 w-32 rounded-[36px] bg-amber-200/50 blur-3xl" />

            <div className="relative h-[420px] w-[230px] rounded-[38px] border border-slate-200 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-[10px] text-white shadow-[0_28px_60px_rgba(15,23,42,0.55)] md:h-[460px] md:w-[250px]">
              <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-slate-900/80">
                <div className="flex items-center justify-between px-4 pt-4 text-[11px] text-slate-300">
                  <span className="text-[10px] uppercase tracking-[0.26em] text-emerald-300">
                    Live Menu
                  </span>
                  <span>9:41</span>
                </div>

                <div className="px-4 pt-3">
                  <p className="text-[11px] text-slate-400">Hey, Guest 👋</p>
                  <p className="mt-1 text-base font-semibold">
                    Tonight&apos;s Digital Menu
                  </p>
                </div>

                <div className="mt-4 space-y-2 px-4">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-800/80 px-3 py-3 text-[11px]">
                    <div>
                      <p className="font-semibold text-white">
                        Signature Burgers
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        8 items · updated just now
                      </p>
                    </div>
                    <div className="rounded-xl bg-emerald-500/20 px-3 py-1 text-[10px] text-emerald-200">
                      Best seller
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-800/60 px-3 py-3 text-[11px]">
                    <p className="flex items-center justify-between text-slate-200">
                      QR orders
                      <span className="rounded-full bg-slate-900/60 px-2 py-0.5 text-[9px] text-emerald-200">
                        Active
                      </span>
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      Scan from table, view full allergen info & photos.
                    </p>
                  </div>

                  <div className="flex gap-2 text-[10px]">
                    <div className="flex-1 rounded-2xl bg-gradient-to-br from-emerald-500/40 via-emerald-400/60 to-emerald-500/40 p-[1px]">
                      <div className="h-full rounded-[18px] bg-slate-900/80 px-3 py-2">
                        <p className="text-[9px] uppercase tracking-[0.16em] text-emerald-200">
                          Performance
                        </p>
                        <div className="mt-1 flex items-end gap-1">
                          <div className="h-8 w-1 rounded-full bg-emerald-500/30" />
                          <div className="h-10 w-1 rounded-full bg-emerald-400/40" />
                          <div className="h-7 w-1 rounded-full bg-emerald-500/60" />
                          <div className="h-11 w-1 rounded-full bg-emerald-400/80" />
                          <div className="h-6 w-1 rounded-full bg-emerald-500/30" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 rounded-2xl bg-slate-800/70 px-3 py-2">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400">
                        Covers
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        124
                      </p>
                      <p className="text-[10px] text-emerald-300">
                        +18% vs yesterday
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-slate-800/80 px-4 py-3 text-[10px] text-slate-300">
                  <span>All Day · Dine‑In</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/90 px-2 py-1 text-[9px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Synced
                  </span>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="pointer-events-none absolute -left-6 top-4 hidden w-40 animate-float-slow md:block">
              <div className="rounded-3xl bg-white/90 p-3 text-xs shadow-xl shadow-slate-400/20 ring-1 ring-slate-100">
                <p className="text-[11px] font-medium text-slate-700">
                  Menu updates in
                  <span className="font-semibold text-emerald-500">
                    {" "}
                    12 seconds
                  </span>
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Sync across QR codes & devices instantly.
                </p>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-10 bottom-10 hidden w-44 animate-float md:block">
              <div className="flex items-center gap-3 rounded-3xl bg-white/90 p-3 text-xs shadow-xl shadow-slate-400/20 ring-1 ring-slate-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-amber-100 text-lg">
                  🍽️
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-800">
                    Multi‑branch ready
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Manage all locations from one login.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section
          id="features"
          className="mt-20 grid gap-6 md:grid-cols-3 md:gap-8"
        >
          <div className="group rounded-3xl bg-white/80 p-6 shadow-sm shadow-slate-200/80 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/50">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-emerald-500">
              QR First
            </p>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">
              Beautiful QR experiences
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Generate branded QR codes for each table or location and route
              guests to the right menu in seconds.
            </p>
          </div>

          <div className="group rounded-3xl bg-white/80 p-6 shadow-sm shadow-slate-200/80 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/50">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-amber-500">
              Operations
            </p>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">
              Edit once, sync everywhere
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Update prices, descriptions, and item availability from a single
              dashboard—no printing, no delays.
            </p>
          </div>

          <div className="group rounded-3xl bg-white/80 p-6 shadow-sm shadow-slate-200/80 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/50">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-indigo-500">
              Insights
            </p>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">
              Understand your guests
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              See which categories perform best, when guests view your menu, and
              which dishes are trending.
            </p>
          </div>
        </section>

        {/* How it works cards */}
        <section
          id="how-it-works"
          className="mt-20 grid gap-6 rounded-3xl bg-slate-900 px-6 py-10 text-slate-50 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
        >
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
              Workflow
            </p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Customized digital menus for every service style.
            </h2>
            <p className="text-sm text-slate-300 md:text-[15px]">
              Use one system to power dine‑in tables, takeaway, and room
              service. Create different menus and schedules per branch or
              service type without duplicating work.
            </p>

            <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
              <div className="rounded-2xl bg-slate-800/80 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  Step 01
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Set up your brand
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Add logo, colors, and location details in minutes.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-800/80 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  Step 02
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Build categories
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Organize starters, mains, drinks, and seasonal sections.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-800/80 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  Step 03
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Share & print QR
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Download QR codes or share links directly with guests.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-3xl bg-slate-800/70 p-5 md:p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-300">
              Live Activity
            </p>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-emerald-500/20 text-sm">
                    📱
                  </span>
                  <div>
                    <p className="text-[11px] font-medium text-slate-50">
                      New scan
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Table 7 · 2 guests browsing desserts
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">Now</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-900/40 px-3 py-2.5">
                <div>
                  <p className="text-[11px] font-medium text-slate-50">
                    Item updated
                  </p>
                  <p className="text-[10px] text-slate-400">
                    &quot;Truffle Fries&quot; now in Tonight Specials.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] text-emerald-200">
                  Live
                </span>
                </div>

              <div className="rounded-2xl bg-slate-900/40 px-3 py-3">
                <p className="flex items-center justify-between text-[11px] text-slate-300">
                  Scans per hour
                  <span className="text-[10px] text-emerald-300">
                    +26% today
                  </span>
                </p>
                <div className="mt-2 flex h-16 items-end gap-1.5">
                  <div className="h-5 flex-1 rounded-full bg-slate-700" />
                  <div className="h-7 flex-1 rounded-full bg-slate-700" />
                  <div className="h-10 flex-1 rounded-full bg-emerald-500/60" />
                  <div className="h-8 flex-1 rounded-full bg-emerald-500/40" />
                  <div className="h-6 flex-1 rounded-full bg-slate-700" />
                  <div className="h-9 flex-1 rounded-full bg-emerald-500/60" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live menus section, using actual restaurants */}
        {restaurants.length > 0 && (
          <section id="live-menus" className="mt-20 space-y-6">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600">
                  Live Menus
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                  Explore real menus built with Digital Management.
                </h2>
              </div>
              <p className="max-w-md text-sm text-slate-600">
                Scan a QR or open a public link to see how your guests will
                experience their next visit.
              </p>
            </div>

            <div className="space-y-4">
              {restaurants.map((r) => (
                <article
                  key={r.id}
                  className="group rounded-[32px] border border-emerald-100 bg-white/95 p-5 shadow-sm shadow-emerald-100/60 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:justify-between">
                    {/* Left: restaurant info */}
                    <div className="flex flex-1 flex-col justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {r.name}
                        </h3>
                        {r.location && (
                          <p className="mt-1 text-sm text-slate-500">
                            {r.location}
                          </p>
                        )}
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        QR menu online
                      </div>
                    </div>

                    {/* Middle: helper text */}
                    <div className="hidden w-36 shrink-0 flex-col justify-center text-xs text-slate-500 md:flex">
                      <p className="font-semibold text-slate-700">
                        Scan to preview
                      </p>
                      <p>Open live digital menu</p>
                    </div>

                    {/* Right: QR + link (existing MenuShare UI) */}
                    <div className="flex flex-[1.4] items-center justify-end rounded-[26px] bg-slate-50/90 px-4 py-3 shadow-inner shadow-slate-100 md:px-5 md:py-4">
                      <MenuShare slug={r.slug} size={112} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 text-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Empower every step of service.
            </h3>
            <p className="text-sm text-slate-400">
              Start today, keep menus fresh forever. Your guests get a beautiful
              experience, your team gets full control.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-md shadow-slate-900/40 hover:bg-slate-100"
            >
              Open Admin Panel
            </Link>
          </div>

          <div className="grid flex-1 gap-8 text-sm text-slate-400 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Product
              </p>
              <ul className="mt-3 space-y-2">
                <li>Overview</li>
                <li>Features</li>
                <li>Use cases</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Resources
              </p>
              <ul className="mt-3 space-y-2">
                <li>Help center</li>
                <li>Support</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Company
              </p>
              <ul className="mt-3 space-y-2">
                <li>About</li>
                <li>Contact</li>
                <li>Partners</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-6xl items-center justify-between px-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Digital Management. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
