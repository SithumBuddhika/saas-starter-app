"use client";

import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  LogOut,
  CreditCard,
  LayoutDashboard,
  Shield,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();

  // theme toggle (safe with SSR)
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const currentTheme =
    theme === "system" ? (systemTheme ?? "light") : (theme ?? "light");

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-500 p-[1px] shadow-sm">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-background">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.55)]" />
            </div>
          </div>

          <div className="leading-tight">
            <p className="font-semibold tracking-tight">TodoMaster</p>
            <p className="text-xs text-muted-foreground">
              Neon • Clerk • Prisma
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="hidden sm:inline-flex gap-2"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="hidden sm:inline-flex gap-2"
          >
            <Link href="/subscribe">
              <CreditCard className="h-4 w-4" />
              Subscribe
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="hidden md:inline-flex gap-2"
          >
            <Link href="/admin/dashboard">
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          </Button>

          {/* Theme toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                aria-label="Toggle theme"
              >
                {!mounted ? (
                  <span className="h-4 w-4" />
                ) : currentTheme === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.imageUrl} alt="User avatar" />
                    <AvatarFallback>
                      {user.firstName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium leading-none">
                    {user.fullName || "Account"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.emailAddresses?.[0]?.emailAddress}
                  </p>
                </div>

                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/subscribe" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Subscription</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
