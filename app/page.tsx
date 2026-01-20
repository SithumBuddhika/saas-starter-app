// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-[radial-gradient(1100px_520px_at_15%_-10%,rgba(16,185,129,.28),transparent_60%),radial-gradient(900px_520px_at_90%_10%,rgba(59,130,246,.22),transparent_55%),radial-gradient(700px_520px_at_60%_120%,rgba(34,211,238,.16),transparent_55%)]">
//       {/* Top bar */}
//       <header className="sticky top-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur">
//         <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
//           <div className="flex items-center gap-2">
//             <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500 p-[1px] shadow-[0_0_0_1px_rgba(255,255,255,.10)]">
//               <div className="flex h-full w-full items-center justify-center rounded-xl bg-background">
//                 <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.75)]" />
//               </div>
//             </div>
//             <div className="leading-tight">
//               <p className="font-semibold tracking-tight">TodoMaster</p>
//               <p className="text-xs text-muted-foreground">
//                 Neon • Clerk • Prisma
//               </p>
//             </div>
//           </div>

//           <nav className="flex items-center gap-2">
//             <Link
//               href="/sign-in"
//               className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground hover:bg-white/10 sm:inline-flex"
//             >
//               Sign in
//             </Link>
//             <Link
//               href="/sign-up"
//               className="inline-flex rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 px-4 py-2 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(59,130,246,.18)] hover:opacity-95"
//             >
//               Sign up
//             </Link>
//           </nav>
//         </div>
//       </header>

//       {/* Hero */}
//       <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
//         <div className="grid items-center gap-10 lg:grid-cols-2">
//           {/* Left */}
//           <div>
//             <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
//               <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.7)]" />
//               Futuristic productivity for your day
//             </div>

//             <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
//               Your tasks,{" "}
//               <span className="bg-gradient-to-r from-emerald-300 to-blue-400 bg-clip-text text-transparent">
//                 upgraded
//               </span>{" "}
//               for focus.
//             </h1>

//             <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
//               TodoMaster is a modern, minimal, and fast todo experience powered
//               by <span className="text-foreground">Clerk</span> authentication
//               and <span className="text-foreground">Neon</span> +{" "}
//               <span className="text-foreground">Prisma</span> persistence. Track
//               execution, not clutter.
//             </p>

//             {/* CTA */}
//             <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
//               <Link
//                 href="/dashboard"
//                 className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 to-blue-500 px-5 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(59,130,246,.18)] hover:opacity-95"
//               >
//                 Launch Dashboard
//               </Link>

//               <Link
//                 href="/sign-in"
//                 className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-foreground hover:bg-white/10"
//               >
//                 I already have an account
//               </Link>
//             </div>

//             {/* Micro trust */}
//             <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
//               <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
//                 Fast search
//               </span>
//               <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
//                 Pagination
//               </span>
//               <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
//                 Subscription gate
//               </span>
//               <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
//                 Mobile responsive
//               </span>
//             </div>
//           </div>

//           {/* Right */}
//           <div className="relative">
//             <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-emerald-400/15 to-blue-500/15 blur-2xl" />

//             <div className="relative rounded-3xl border border-white/10 bg-background/60 p-5 backdrop-blur sm:p-7">
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <p className="text-sm font-semibold tracking-tight">
//                     Mission Control
//                   </p>
//                   <p className="mt-1 text-xs text-muted-foreground">
//                     A clean UI that feels premium on every device.
//                   </p>
//                 </div>
//                 <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
//                   Live
//                 </div>
//               </div>

//               <div className="mt-5 space-y-3">
//                 <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                   <p className="text-sm font-medium">Ship the MVP</p>
//                   <p className="mt-1 text-xs text-muted-foreground">
//                     Keep tasks short, actionable, and measurable.
//                   </p>
//                 </div>
//                 <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                   <p className="text-sm font-medium">Study for finals</p>
//                   <p className="mt-1 text-xs text-muted-foreground">
//                     Search, complete, delete — everything synced.
//                   </p>
//                 </div>
//                 <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                   <p className="text-sm font-medium">Deploy to Vercel</p>
//                   <p className="mt-1 text-xs text-muted-foreground">
//                     Production-ready stack with Clerk + Neon.
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-6 grid gap-3 sm:grid-cols-3">
//                 <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
//                   <p className="text-xs text-muted-foreground">Total</p>
//                   <p className="mt-1 text-lg font-semibold">∞</p>
//                 </div>
//                 <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
//                   <p className="text-xs text-muted-foreground">Speed</p>
//                   <p className="mt-1 text-lg font-semibold">Fast</p>
//                 </div>
//                 <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
//                   <p className="text-xs text-muted-foreground">UX</p>
//                   <p className="mt-1 text-lg font-semibold">Clean</p>
//                 </div>
//               </div>

//               <div className="mt-6 flex flex-col gap-2 sm:flex-row">
//                 <Link
//                   href="/sign-up"
//                   className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 to-blue-500 px-5 text-sm font-semibold text-black hover:opacity-95"
//                 >
//                   Create account
//                 </Link>
//                 <Link
//                   href="/subscribe"
//                   className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-foreground hover:bg-white/10"
//                 >
//                   View subscription
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         <footer className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-muted-foreground">
//           <p>
//             Built with Next.js • Clerk Auth • Neon Postgres • Prisma • Tailwind
//             • shadcn/ui
//           </p>
//         </footer>
//       </main>
//     </div>
//   );
// }

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
