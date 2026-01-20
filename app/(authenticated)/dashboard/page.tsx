// "use client";

// import { useToast } from "@/hooks/use-toast";
// import { useCallback, useEffect, useState } from "react";
// import { TodoItem } from "@/components/TodoItem";
// import { TodoForm } from "@/components/TodoForm";
// import type { Todo } from "@/app/generated/prisma/client";

// import { useUser } from "@clerk/nextjs";
// import { AlertTriangle } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Input } from "@/components/ui/input";
// import { Pagination } from "@/components/Pagination";
// import Link from "next/link";
// import { useDebounceValue } from "usehooks-ts";

// export default function Dashboard() {
//   const { user } = useUser();
//   const { toast } = useToast();
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearchTerm] = useDebounceValue(searchTerm, 300);

//   const fetchTodos = useCallback(
//     async (page: number) => {
//       try {
//         const response = await fetch(
//           `/api/todos?page=${page}&search=${debouncedSearchTerm}`,
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch todos");
//         }
//         const data = await response.json();
//         setTodos(data.todos);
//         setTotalPages(data.totalPages);
//         setCurrentPage(data.currentPage);
//         setIsLoading(false);
//         toast({
//           title: "Success",
//           description: "Todos fetched successfully.",
//         });
//       } catch (error) {
//         setIsLoading(false);
//         toast({
//           title: "Error",
//           description: "Failed to fetch todos. Please try again.",
//           variant: "destructive",
//         });
//       }
//     },
//     [toast, debouncedSearchTerm],
//   );

//   useEffect(() => {
//     fetchTodos(1);
//     fetchSubscriptionStatus();
//   }, [fetchTodos]);

//   const fetchSubscriptionStatus = async () => {
//     const response = await fetch("/api/subscription");
//     if (response.ok) {
//       const data = await response.json();
//       setIsSubscribed(data.isSubscribed);
//     }
//   };

//   const handleAddTodo = async (title: string) => {
//     toast({
//       title: "Adding Todo",
//       description: "Please wait...",
//     });
//     try {
//       const response = await fetch("/api/todos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to add todo");
//       }
//       await fetchTodos(currentPage);
//       toast({
//         title: "Success",
//         description: "Todo added successfully.",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to add todo. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleUpdateTodo = async (id: string, completed: boolean) => {
//     toast({
//       title: "Updating Todo",
//       description: "Please wait...",
//     });
//     try {
//       const response = await fetch(`/api/todos/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ completed }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update todo");
//       }
//       await fetchTodos(currentPage);
//       toast({
//         title: "Success",
//         description: "Todo updated successfully.",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update todo. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDeleteTodo = async (id: string) => {
//     toast({
//       title: "Deleting Todo",
//       description: "Please wait...",
//     });
//     try {
//       const response = await fetch(`/api/todos/${id}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) {
//         throw new Error("Failed to delete todo");
//       }
//       await fetchTodos(currentPage);
//       toast({
//         title: "Success",
//         description: "Todo deleted successfully.",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete todo. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-3xl mb-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">
//         Welcome, {user?.emailAddresses[0].emailAddress}!
//       </h1>
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Add New Todo</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <TodoForm onSubmit={(title) => handleAddTodo(title)} />
//         </CardContent>
//       </Card>
//       {!isSubscribed && todos.length >= 3 && (
//         <Alert variant="destructive" className="mb-8">
//           <AlertTriangle className="h-4 w-4" />
//           <AlertDescription>
//             You&apos;ve reached the maximum number of free todos.{" "}
//             <Link href="/subscribe" className="font-medium underline">
//               Subscribe now
//             </Link>{" "}
//             to add more.
//           </AlertDescription>
//         </Alert>
//       )}
//       <Card>
//         <CardHeader>
//           <CardTitle>Your Todos</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Input
//             type="text"
//             placeholder="Search todos..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="mb-4"
//           />
//           {isLoading ? (
//             <p className="text-center text-muted-foreground">
//               Loading your todos...
//             </p>
//           ) : todos.length === 0 ? (
//             <p className="text-center text-muted-foreground">
//               You don&apos;t have any todos yet. Add one above!
//             </p>
//           ) : (
//             <>
//               <ul className="space-y-4">
//                 {todos.map((todo: Todo) => (
//                   <TodoItem
//                     key={todo.id}
//                     todo={todo}
//                     onUpdate={handleUpdateTodo}
//                     onDelete={handleDeleteTodo}
//                   />
//                 ))}
//               </ul>
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={(page) => fetchTodos(page)}
//               />
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useToast } from "@/hooks/use-toast";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TodoItem } from "@/components/TodoItem";
import { TodoForm } from "@/components/TodoForm";
import type { Todo } from "@/app/generated/prisma/client";
import { useUser } from "@clerk/nextjs";
import {
  AlertTriangle,
  Sparkles,
  Search,
  CheckCircle2,
  ListTodo,
} from "lucide-react";
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
    return {
      total,
      completed,
      active: Math.max(0, total - completed),
    };
  }, [todos]);

  const fetchSubscriptionStatus = async () => {
    const response = await fetch("/api/subscription");
    if (response.ok) {
      const data = await response.json();
      setIsSubscribed(Boolean(data.isSubscribed));
    }
  };

  const fetchTodos = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/todos?page=${page}&search=${debouncedSearchTerm}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

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
  }, [fetchTodos]);

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

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

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

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

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
    <div className="relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/15 blur-[90px]" />
        <div className="absolute -top-10 right-[-120px] h-[520px] w-[520px] rounded-full bg-blue-500/15 blur-[90px]" />
        <div className="absolute bottom-[-160px] left-[-140px] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[90px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10 space-y-6">
        {/* Header */}
        <div className="rounded-3xl border border-white/10 bg-background/60 p-6 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Productivity Mode
              </div>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Welcome,{" "}
                <span className="bg-gradient-to-r from-emerald-300 to-blue-400 bg-clip-text text-transparent">
                  {email}
                </span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Fast, clean, synced — your tasks on Neon.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <Card className="border-white/10 bg-background/60 backdrop-blur">
                <CardContent className="p-3 text-center">
                  <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                    <ListTodo className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-lg font-semibold">{stats.total}</p>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-background/60 backdrop-blur">
                <CardContent className="p-3 text-center">
                  <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Done</p>
                  <p className="text-lg font-semibold">{stats.completed}</p>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-background/60 backdrop-blur">
                <CardContent className="p-3 text-center">
                  <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Active</p>
                  <p className="text-lg font-semibold">{stats.active}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Subscription limit warning */}
        {!isSubscribed && todos.length >= 3 && (
          <Alert
            variant="destructive"
            className="border-red-500/30 bg-red-500/10"
          >
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
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          {/* Todos */}
          <Card className="border-white/10 bg-background/60 backdrop-blur">
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
                  <div className="h-16 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
                  <div className="h-16 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
                  <div className="h-16 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
                </div>
              ) : todos.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-muted-foreground">
                  No todos yet. Add your first one on the right ✨
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

          {/* Right */}
          <div className="space-y-6">
            <Card className="border-white/10 bg-background/60 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle>Create</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold">Add a new todo</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Keep it short and actionable.
                  </p>
                  <div className="mt-4">
                    <TodoForm onSubmit={(title) => handleAddTodo(title)} />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold">Subscription</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {isSubscribed
                      ? "You’re subscribed ✅"
                      : "Free plan (3 todos max) ⚠️"}
                  </p>

                  <Button asChild className="mt-4 w-full">
                    <Link href="/subscribe">Manage subscription</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-background/60 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle>Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Use search to instantly filter tasks.</p>
                <p>• Mark complete to keep progress visible.</p>
                <p>• Upgrade if you need unlimited todos.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground pt-2">
          Built with Clerk • Neon • Prisma • Next.js
        </div>
      </div>
    </div>
  );
}
