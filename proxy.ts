// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook/register",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // Not signed in + not public route => go to sign in
  if (!userId && !isPublicRoute(req)) {
    // return redirectToSignIn({ returnBackUrl: req.url });
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // role from publicMetadata (in session token claims)
  const role = (sessionClaims?.publicMetadata as any)?.role as
    | "admin"
    | undefined;

  // Admin hitting /dashboard -> send to admin dashboard
  if (role === "admin" && req.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // Non-admin trying /admin -> send to normal dashboard
  if (role !== "admin" && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Signed-in users shouldn't stay on public routes
  if (userId && isPublicRoute(req)) {
    return NextResponse.redirect(
      new URL(role === "admin" ? "/admin/dashboard" : "/dashboard", req.url),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
