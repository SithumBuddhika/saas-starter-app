import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";

export default function Home() {
  // Your signed-out header in app/layout.tsx is h-14 (56px)
  // So Home must be: (100svh - 56px) to prevent scroll.
  return (
    <div className="relative h-[calc(100svh-56px)] overflow-hidden bg-background text-foreground">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Glow blobs */}
        <div className="absolute -top-44 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-emerald-400/25 blur-[160px] dark:bg-emerald-400/14" />
        <div className="absolute -top-40 right-[-260px] h-[760px] w-[760px] rounded-full bg-blue-500/22 blur-[180px] dark:bg-blue-500/12" />
        <div className="absolute bottom-[-360px] left-[-280px] h-[820px] w-[820px] rounded-full bg-cyan-400/18 blur-[200px] dark:bg-cyan-400/10" />

        {/* Light Rays - inline styles so they ALWAYS render */}
        <div
          className="absolute left-1/2 top-[-420px] h-[1400px] w-[1800px] -translate-x-1/2 rotate-12 opacity-80 dark:opacity-40"
          style={{
            backgroundImage:
              "repeating-conic-gradient(from 200deg at 50% 50%, rgba(16,185,129,0.22) 0deg, rgba(16,185,129,0.22) 9deg, rgba(59,130,246,0.18) 12deg, transparent 18deg, transparent 30deg)",
            filter: "blur(0.2px)",
            mixBlendMode: "screen",
            WebkitMaskImage:
              "radial-gradient(closest-side, rgba(0,0,0,0.65), transparent 70%)",
            maskImage:
              "radial-gradient(closest-side, rgba(0,0,0,0.65), transparent 70%)",
          }}
        />

        {/* Secondary soft wash */}
        <div
          className="absolute left-1/2 top-[-380px] h-[1400px] w-[1800px] -translate-x-1/2 rotate-12 opacity-60 dark:opacity-25"
          style={{
            backgroundImage:
              "conic-gradient(from 180deg at 50% 50%, rgba(16,185,129,0.18), rgba(59,130,246,0.16), rgba(34,211,238,0.14), transparent 60%)",
            mixBlendMode: "screen",
            WebkitMaskImage:
              "radial-gradient(closest-side, rgba(0,0,0,0.55), transparent 72%)",
            maskImage:
              "radial-gradient(closest-side, rgba(0,0,0,0.55), transparent 72%)",
          }}
        />

        {/* Gentle vignette (does NOT kill rays) */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(255,255,255,0)_15%,rgba(0,0,0,0.05)_70%,rgba(0,0,0,0.10)_100%)] dark:bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(0,0,0,0)_15%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* No header here (prevents double navbar) */}

      {/* Full-height layout: footer always visible without scroll */}
      <div className="mx-auto flex h-full max-w-6xl flex-col px-4">
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              The clean todo app that feels{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                premium
              </span>
              .
            </h1>

            <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              Fast search, smooth sync, and a simple subscription limit — built
              for demos and real usage.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <SignedOut>
                <Link
                  href="/sign-up"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-6 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                >
                  Create account
                </Link>

                <Link
                  href="/sign-in"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                >
                  Sign in
                </Link>
              </SignedOut>

              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-6 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
              >
                Go to dashboard
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                { title: "Search + Pagination", desc: "Find tasks instantly." },
                { title: "Subscription Gate", desc: "Free plan limit (3)." },
                { title: "Reliable Auth + DB", desc: "Clerk + Neon + Prisma." },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-black/10 bg-white/70 p-4 text-left shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="pb-5 pt-4 text-center text-sm text-muted-foreground sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} TodoMaster</p>
          <p>© {new Date().getFullYear()} Sithum Buddhika Jayalal</p>
        </footer>
      </div>
    </div>
  );
}
