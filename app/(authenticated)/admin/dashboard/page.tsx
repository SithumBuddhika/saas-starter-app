"use client";

import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { TodoItem } from "@/components/TodoItem";
import type { Todo, User } from "@/app/generated/prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/Pagination";
import { useDebounceValue } from "usehooks-ts";
import { Shield, Search } from "lucide-react";

interface UserWithTodos extends User {
  todos: Todo[];
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [debouncedEmail] = useDebounceValue(email, 300);

  const [user, setUser] = useState<UserWithTodos | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUserData = useCallback(
    async (page: number) => {
      if (!debouncedEmail) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/admin?email=${encodeURIComponent(debouncedEmail)}&page=${page}`,
        );
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data.user);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch user data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedEmail, toast],
  );

  useEffect(() => {
    if (debouncedEmail) {
      fetchUserData(1);
    } else {
      setUser(null);
      setTotalPages(1);
      setCurrentPage(1);
    }
  }, [debouncedEmail, fetchUserData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserData(1);
  };

  const handleUpdateSubscription = async () => {
    toast({ title: "Updating", description: "Applying subscription change…" });

    try {
      const response = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: debouncedEmail,
          isSubscribed: !user?.isSubscribed,
        }),
      });

      if (!response.ok) throw new Error("Failed to update subscription");

      fetchUserData(currentPage);
      toast({ title: "Done", description: "Subscription updated." });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTodo = async (id: string, completed: boolean) => {
    toast({ title: "Updating", description: "Syncing todo…" });

    try {
      const response = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: debouncedEmail,
          todoId: id,
          todoCompleted: completed,
        }),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      fetchUserData(currentPage);
      toast({ title: "Done", description: "Todo updated." });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update todo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    toast({ title: "Deleting", description: "Removing todo…" });

    try {
      const response = await fetch("/api/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todoId: id }),
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      fetchUserData(currentPage);
      toast({ title: "Done", description: "Todo deleted." });
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
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10 space-y-6">
        {/* Header */}
        <Card className="border-border bg-card">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  Admin
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Admin Dashboard
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Search users, manage subscriptions, and moderate todos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Search User</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSearch}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter user email"
                  className="h-11 pl-9"
                  required
                />
              </div>
              <Button type="submit" className="h-11">
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Loading / Results */}
        {isLoading ? (
          <Card className="border-border bg-card">
            <CardContent className="py-10 text-center text-muted-foreground">
              Loading user data…
            </CardContent>
          </Card>
        ) : user ? (
          <>
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>User Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {user.email}
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Subscription:</span>{" "}
                  {user.isSubscribed ? "Subscribed" : "Not Subscribed"}
                </p>
                {user.subscriptionEnds && (
                  <p className="text-sm">
                    <span className="text-muted-foreground">Ends:</span>{" "}
                    {new Date(user.subscriptionEnds).toLocaleDateString()}
                  </p>
                )}

                <div className="pt-2">
                  <Button onClick={handleUpdateSubscription}>
                    {user.isSubscribed
                      ? "Cancel Subscription"
                      : "Subscribe User"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>User Todos</CardTitle>
              </CardHeader>
              <CardContent>
                {user.todos.length > 0 ? (
                  <>
                    <ul className="space-y-3">
                      {user.todos.map((todo) => (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          isAdmin={true}
                          onUpdate={handleUpdateTodo}
                          onDelete={handleDeleteTodo}
                        />
                      ))}
                    </ul>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => fetchUserData(page)}
                    />
                  </>
                ) : (
                  <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
                    This user has no todos.
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : debouncedEmail ? (
          <Card className="border-border bg-card">
            <CardContent className="py-10 text-center text-muted-foreground">
              No user found with this email.
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
