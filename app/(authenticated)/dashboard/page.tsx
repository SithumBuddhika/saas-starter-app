"use client";

import { useToast } from "@/hooks/use-toast";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TodoItem } from "@/components/TodoItem";
import { TodoForm } from "@/components/TodoForm";
import type { Todo } from "@/app/generated/prisma/client";
import { useUser } from "@clerk/nextjs";
import { AlertTriangle, Search, CheckCircle2, ListTodo } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import { useDebounceValue } from "usehooks-ts";

export default function Dashboard() {
  const { user } = useUser();
  const { toast } = useToast();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 300);

  const email = user?.emailAddresses?.[0]?.emailAddress ?? "User";

  const stats = useMemo(() => {
    const completed = todos.filter((t) => t.completed).length;
    const total = todos.length;
    return { total, completed, active: Math.max(0, total - completed) };
  }, [todos]);

  const fetchSubscriptionStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/subscription");
      if (response.ok) {
        const data = await response.json();
        setIsSubscribed(Boolean(data.isSubscribed));
      }
    } catch {
      // keep quiet - not critical for UI render
    }
  }, []);

  const fetchTodos = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/todos?page=${page}&search=${debouncedSearchTerm}`,
        );

        if (!response.ok) throw new Error("Failed to fetch todos");

        const data = await response.json();
        setTodos(data.todos);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch todos. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast, debouncedSearchTerm],
  );

  useEffect(() => {
    fetchTodos(1);
    fetchSubscriptionStatus();
  }, [fetchTodos, fetchSubscriptionStatus]);

  const handleAddTodo = async (title: string) => {
    toast({ title: "Adding", description: "Creating your task…" });
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to add todo");
      }

      await fetchTodos(currentPage);

      toast({
        title: "Success",
        description: "Todo added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to add todo.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTodo = async (id: string, completed: boolean) => {
    toast({ title: "Updating", description: "Syncing changes…" });
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      await fetchTodos(currentPage);

      toast({
        title: "Success",
        description: "Todo updated successfully.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update todo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    toast({ title: "Deleting", description: "Removing task…" });
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      await fetchTodos(currentPage);

      toast({
        title: "Success",
        description: "Todo deleted successfully.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete todo. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10 space-y-6">
        {/* Header */}
        <Card className="border-border bg-card">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Dashboard
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Welcome,{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {email}
                  </span>
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Clean, fast, synced — your tasks on Neon.
                </p>
              </div>

              {/* Compact stats */}
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm">
                  <ListTodo className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-semibold">{stats.total}</span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Done</span>
                  <span className="font-semibold">{stats.completed}</span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-muted-foreground">Active</span>
                  <span className="font-semibold">{stats.active}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription limit warning */}
        {!isSubscribed && todos.length >= 3 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You&apos;ve reached the free limit (3 todos).{" "}
              <Link
                href="/subscribe"
                className="font-semibold underline underline-offset-4"
              >
                Upgrade
              </Link>{" "}
              to unlock unlimited todos.
            </AlertDescription>
          </Alert>
        )}

        {/* Main layout */}
        <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          {/* Todos */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle>Your Todos</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search todos…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-16 rounded-2xl border border-border bg-muted/40 animate-pulse" />
                  <div className="h-16 rounded-2xl border border-border bg-muted/40 animate-pulse" />
                  <div className="h-16 rounded-2xl border border-border bg-muted/40 animate-pulse" />
                </div>
              ) : todos.length === 0 ? (
                <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
                  No todos yet. Create one on the right.
                </div>
              ) : (
                <>
                  <ul className="space-y-3">
                    {todos.map((todo) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onUpdate={handleUpdateTodo}
                        onDelete={handleDeleteTodo}
                      />
                    ))}
                  </ul>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => fetchTodos(page)}
                  />
                </>
              )}
            </CardContent>
          </Card>

          {/* Right side: Create + Subscription only */}
          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle>Create</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <TodoForm onSubmit={(title) => handleAddTodo(title)} />

                <div className="rounded-xl border border-border bg-muted/20 p-4">
                  <p className="text-sm font-semibold">Subscription</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {isSubscribed
                      ? "You’re subscribed ✅"
                      : "Free plan (3 todos max)"}
                  </p>

                  <Button asChild className="mt-3 w-full">
                    <Link href="/subscribe">Manage subscription</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-muted-foreground">
              Clerk • Neon • Prisma • Next.js
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
