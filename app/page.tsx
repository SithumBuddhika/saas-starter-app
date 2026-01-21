// // import Link from "next/link";
// // import { SignedOut } from "@clerk/nextjs";

// // export default function Home() {
// //   return (
// //     <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
// //       {/* Background: ambient glow + light rays (no extra packages) */}
// //       <div className="pointer-events-none absolute inset-0 -z-10">
// //         {/* Soft glow blobs */}
// //         <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/25 blur-[120px]" />
// //         <div className="absolute -top-24 right-[-180px] h-[520px] w-[520px] rounded-full bg-blue-500/25 blur-[120px]" />
// //         <div className="absolute bottom-[-220px] left-[-180px] h-[560px] w-[560px] rounded-full bg-cyan-400/15 blur-[140px]" />

// //         {/* Light rays */}
// //         <div className="absolute left-1/2 top-[-200px] h-[900px] w-[1200px] -translate-x-1/2 rotate-12">
// //           <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(16,185,129,.14),rgba(59,130,246,.12),rgba(34,211,238,.10),transparent_60%)] blur-[2px]" />
// //           <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(closest-side,rgba(0,0,0,0.55),transparent)]" />
// //         </div>

// //         {/* Subtle vignette so content stays readable */}
// //         <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,transparent_20%,rgba(0,0,0,0.06)_70%,rgba(0,0,0,0.10)_100%)] dark:bg-[radial-gradient(1200px_700px_at_50%_0%,transparent_20%,rgba(0,0,0,0.45)_70%,rgba(0,0,0,0.60)_100%)]" />
// //       </div>

// //       {/* IMPORTANT:
// //           No header here.
// //           Your signed-out header already lives in app/layout.tsx (prevents double navbar). */}

// //       <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 sm:py-24">
// //         <div className="w-full max-w-3xl text-center">
// //           <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
// //             The clean todo app that feels{" "}
// //             <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
// //               premium
// //             </span>
// //             .
// //           </h1>

// //           <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
// //             Fast search, smooth sync, and a simple subscription limit — built
// //             for demos and real usage.
// //           </p>

// //           <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
// //             <SignedOut>
// //               <Link
// //                 href="/sign-up"
// //                 className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-6 text-sm font-semibold text-white shadow-sm hover:opacity-95"
// //               >
// //                 Create account
// //               </Link>
// //               <Link
// //                 href="/sign-in"
// //                 className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
// //               >
// //                 Sign in
// //               </Link>
// //             </SignedOut>

// //             {/* If user is signed-in, middleware usually redirects "/" -> dashboard,
// //                 so they normally won't see this page while signed in. */}
// //             <Link
// //               href="/dashboard"
// //               className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-6 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
// //             >
// //               Go to dashboard
// //             </Link>
// //           </div>

// //           {/* Minimal feature strip (useful, not bulky) */}
// //           <div className="mt-10 grid gap-3 sm:grid-cols-3">
// //             {[
// //               { title: "Search + Pagination", desc: "Find tasks instantly." },
// //               { title: "Subscription Gate", desc: "Free plan limit (3)." },
// //               { title: "Reliable Auth + DB", desc: "Clerk + Neon + Prisma." },
// //             ].map((f) => (
// //               <div
// //                 key={f.title}
// //                 className="rounded-2xl border border-black/10 bg-white/70 p-4 text-left shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
// //               >
// //                 <p className="text-sm font-semibold">{f.title}</p>
// //                 <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </main>

// //       <footer className="border-t border-black/5 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">
// //         <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
// //           <p>© {new Date().getFullYear()} TodoMaster</p>
// //           <p>© {new Date().getFullYear()} Sithum Buddhika Jayalal</p>
// //           <p>Built with Next.js • Clerk • Neon • Prisma</p>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }

// import Link from "next/link";
// import { SignedOut } from "@clerk/nextjs";

// export default function Home() {
//   return (
//     <div className="relative h-[100svh] overflow-hidden bg-background text-foreground">
//       {/* Background: ambient glow + visible light rays */}
//       <div className="pointer-events-none absolute inset-0 -z-10">
//         {/* Soft glow blobs */}
//         <div className="absolute -top-44 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-emerald-400/25 blur-[150px] dark:bg-emerald-400/15" />
//         <div className="absolute -top-36 right-[-240px] h-[700px] w-[700px] rounded-full bg-blue-500/22 blur-[170px] dark:bg-blue-500/12" />
//         <div className="absolute bottom-[-320px] left-[-260px] h-[720px] w-[720px] rounded-full bg-cyan-400/18 blur-[190px] dark:bg-cyan-400/10" />

//         {/* LIGHT RAYS (stronger + ray-like) */}
//         <div className="absolute left-1/2 top-[-320px] h-[1200px] w-[1600px] -translate-x-1/2 rotate-12">
//           {/* sharp rays */}
//           <div
//             className="
//               absolute inset-0
//               opacity-70 dark:opacity-35
//               mix-blend-screen
//               bg-[repeating-conic-gradient(from_180deg_at_50%_50%,rgba(16,185,129,.18)_0deg,rgba(16,185,129,.18)_10deg,transparent_12deg,transparent_26deg)]
//               blur-[0.5px]
//             "
//           />
//           {/* color wash overlay */}
//           <div
//             className="
//               absolute inset-0
//               opacity-60 dark:opacity-30
//               mix-blend-screen
//               bg-[conic-gradient(from_180deg_at_50%_50%,rgba(16,185,129,.14),rgba(59,130,246,.12),rgba(34,211,238,.10),transparent_60%)]
//             "
//           />
//           {/* mask (fade rays out) */}
//           <div
//             className="
//               absolute inset-0
//               [mask-image:radial-gradient(closest-side,rgba(0,0,0,0.55),transparent)]
//             "
//           />
//         </div>

//         {/* Vignette (keep readable but NOT killing rays) */}
//         <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(255,255,255,0.0)_10%,rgba(0,0,0,0.06)_70%,rgba(0,0,0,0.10)_100%)] dark:bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(0,0,0,0.0)_10%,rgba(0,0,0,0.40)_70%,rgba(0,0,0,0.55)_100%)]" />
//       </div>

//       {/* No header here (prevents double navbar) */}

//       {/* Layout: main fills, footer stays visible, NO scrolling */}
//       <div className="mx-auto flex h-full max-w-6xl flex-col px-4">
//         <main className="flex flex-1 items-center justify-center">
//           <div className="w-full max-w-3xl text-center">
//             <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
//               The clean todo app that feels{" "}
//               <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
//                 premium
//               </span>
//               .
//             </h1>

//             <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
//               Fast search, smooth sync, and a simple subscription limit — built
//               for demos and real usage.
//             </p>

//             <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
//               <SignedOut>
//                 <Link
//                   href="/sign-up"
//                   className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-6 text-sm font-semibold text-white shadow-sm hover:opacity-95"
//                 >
//                   Create account
//                 </Link>

//                 <Link
//                   href="/sign-in"
//                   className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
//                 >
//                   Sign in
//                 </Link>
//               </SignedOut>

//               <Link
//                 href="/dashboard"
//                 className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-6 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
//               >
//                 Go to dashboard
//               </Link>
//             </div>

//             {/* Minimal feature strip */}
//             <div className="mt-10 grid gap-3 sm:grid-cols-3">
//               {[
//                 { title: "Search + Pagination", desc: "Find tasks instantly." },
//                 { title: "Subscription Gate", desc: "Free plan limit (3)." },
//                 { title: "Reliable Auth + DB", desc: "Clerk + Neon + Prisma." },
//               ].map((f) => (
//                 <div
//                   key={f.title}
//                   className="rounded-2xl border border-black/10 bg-white/70 p-4 text-left shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
//                 >
//                   <p className="text-sm font-semibold">{f.title}</p>
//                   <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </main>

//         <footer className="pb-5 pt-4 text-center text-sm text-muted-foreground sm:flex sm:items-center sm:justify-between sm:text-left">
//           <p>© {new Date().getFullYear()} TodoMaster</p>
//           <p className="hidden sm:block">
//             Built with Next.js • Clerk • Neon • Prisma
//           </p>
//         </footer>
//       </div>
//     </div>
//   );
// }

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
          <p className="hidden sm:block">
            Built with Next.js • Clerk • Neon • Prisma
          </p>
        </footer>
      </div>
    </div>
  );
}
