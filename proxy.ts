import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public PAGES (so signed-in users can be redirected away from these)
const isPublicPage = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

// Public API routes (should NEVER be redirected just because user is signed in)
const isPublicApi = createRouteMatcher(["/api/webhook/register"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  const isPublic = isPublicPage(req) || isPublicApi(req);

  // Not signed in + not public => go to sign in
  if (!userId && !isPublic) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // role from sessionClaims publicMetadata
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

  // Signed-in users shouldn't stay on public PAGES (but allow public APIs)
  if (userId && isPublicPage(req)) {
    return NextResponse.redirect(
      new URL(role === "admin" ? "/admin/dashboard" : "/dashboard", req.url),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
