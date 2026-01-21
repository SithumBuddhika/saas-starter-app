import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-950">
      {/* Subtle futuristic background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[110px]" />
        <div className="absolute -top-24 right-[-160px] h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[110px]" />
        <div className="absolute bottom-[-200px] left-[-160px] h-[520px] w-[520px] rounded-full bg-cyan-400/15 blur-[120px]" />
      </div>

      {/* Single top bar (NO duplication) */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,.55)]" />
            </span>
            <span className="font-semibold tracking-tight">TodoMaster</span>
          </Link>

          <div className="flex items-center gap-2">
            <SignedOut>
              <Link
                href="/sign-in"
                className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              >
                Sign up
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/dashboard"
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              >
                Go to dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-zinc-600">
              Emerald × Blue • Clean • Fast • Mobile-ready
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Focus on work.
              <span className="block bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                Not clutter.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
              TodoMaster is a clean, fast todo experience with Clerk auth and
              Neon + Prisma persistence. Built to look premium and feel smooth
              on every device.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-6 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                >
                  Open dashboard
                </Link>
              </SignedIn>

              <SignedOut>
                <Link
                  href="/sign-up"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-6 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                >
                  Create account
                </Link>
                <Link
                  href="/sign-in"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50"
                >
                  I already have an account
                </Link>
              </SignedOut>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                "Fast search",
                "Pagination",
                "Subscription gate",
                "Clerk auth",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-zinc-700 shadow-sm"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right side simple preview (not annoying / not “mission control”) */}
          <div className="rounded-3xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur sm:p-6">
            <p className="text-sm font-semibold">Preview</p>
            <p className="mt-1 text-sm text-zinc-600">
              Your dashboard is where the real work happens.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-black/10 bg-white px-4 py-4 shadow-sm">
                <p className="text-sm font-medium">Ship the MVP</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Short tasks. Clear progress.
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white px-4 py-4 shadow-sm">
                <p className="text-sm font-medium">Study for finals</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Search, complete, delete — synced.
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white px-4 py-4 shadow-sm">
                <p className="text-sm font-medium">Deploy to Vercel</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Production-ready setup.
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-4 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                >
                  Open dashboard
                </Link>
              </SignedIn>
              <SignedOut>
                <Link
                  href="/sign-up"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-4 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                >
                  Sign up
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-black/5 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TodoMaster</p>
          <p>Clerk • Neon • Prisma • Next.js</p>
        </div>
      </footer>
    </div>
  );
}
