// "use client";

// import { useState, useCallback, useEffect } from "react";
// import { useToast } from "@/hooks/use-toast";
// import { TodoItem } from "@/components/TodoItem";
// import type { Todo, User } from "@/app/generated/prisma/client";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Pagination } from "@/components/Pagination";
// import { useDebounceValue } from "usehooks-ts";

// interface UserWithTodos extends User {
//   todos: Todo[];
// }

// export default function AdminDashboard() {
//   const { toast } = useToast();
//   const [email, setEmail] = useState("");
//   const [debouncedEmail] = useDebounceValue(email, 300);

//   const [user, setUser] = useState<UserWithTodos | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchUserData = useCallback(
//     async (page: number) => {
//       if (!debouncedEmail) return;

//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           `/api/admin?email=${encodeURIComponent(debouncedEmail)}&page=${page}`,
//         );
//         if (!response.ok) throw new Error("Failed to fetch user data");
//         const data = await response.json();

//         setUser(data.user);
//         setTotalPages(data.totalPages);
//         setCurrentPage(data.currentPage);

//         toast({
//           title: "Success",
//           description: "User data fetched successfully.",
//         });
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to fetch user data. Please try again.",
//           variant: "destructive",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [debouncedEmail, toast],
//   );

//   useEffect(() => {
//     if (debouncedEmail) {
//       fetchUserData(1);
//     } else {
//       setUser(null);
//       setTotalPages(1);
//       setCurrentPage(1);
//     }
//   }, [debouncedEmail, fetchUserData]);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     // debouncedEmail updates automatically from `email`
//     fetchUserData(1);
//   };

//   const handleUpdateSubscription = async () => {
//     toast({
//       title: "Updating Subscription",
//       description: "Please wait...",
//     });

//     try {
//       const response = await fetch("/api/admin", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: debouncedEmail,
//           isSubscribed: !user?.isSubscribed,
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to update subscription");

//       fetchUserData(currentPage);

//       toast({
//         title: "Success",
//         description: "Subscription updated successfully.",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update subscription. Please try again.",
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
//       const response = await fetch("/api/admin", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: debouncedEmail,
//           todoId: id,
//           todoCompleted: completed,
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to update todo");

//       fetchUserData(currentPage);
//       toast({ title: "Success", description: "Todo updated successfully." });
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
//       const response = await fetch("/api/admin", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ todoId: id }),
//       });

//       if (!response.ok) throw new Error("Failed to delete todo");

//       fetchUserData(currentPage);
//       toast({ title: "Success", description: "Todo deleted successfully." });
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
//       <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Search User</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSearch} className="flex space-x-2">
//             <Input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter user email"
//               required
//             />
//             <Button type="submit">Search</Button>
//           </form>
//         </CardContent>
//       </Card>

//       {isLoading ? (
//         <Card>
//           <CardContent className="text-center py-8">
//             <p className="text-muted-foreground">Loading user data...</p>
//           </CardContent>
//         </Card>
//       ) : user ? (
//         <>
//           <Card className="mb-8">
//             <CardHeader>
//               <CardTitle>User Details</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>Email: {user.email}</p>
//               <p>
//                 Subscription Status:{" "}
//                 {user.isSubscribed ? "Subscribed" : "Not Subscribed"}
//               </p>
//               {user.subscriptionEnds && (
//                 <p>
//                   Subscription Ends:{" "}
//                   {new Date(user.subscriptionEnds).toLocaleDateString()}
//                 </p>
//               )}
//               <Button onClick={handleUpdateSubscription} className="mt-2">
//                 {user.isSubscribed ? "Cancel Subscription" : "Subscribe User"}
//               </Button>
//             </CardContent>
//           </Card>

//           {user.todos.length > 0 ? (
//             <Card>
//               <CardHeader>
//                 <CardTitle>User Todos</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-4">
//                   {user.todos.map((todo) => (
//                     <TodoItem
//                       key={todo.id}
//                       todo={todo}
//                       isAdmin={true}
//                       onUpdate={handleUpdateTodo}
//                       onDelete={handleDeleteTodo}
//                     />
//                   ))}
//                 </ul>
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPageChange={(page) => fetchUserData(page)}
//                 />
//               </CardContent>
//             </Card>
//           ) : (
//             <Card>
//               <CardContent className="text-center py-8">
//                 <p className="text-muted-foreground">This user has no todos.</p>
//               </CardContent>
//             </Card>
//           )}
//         </>
//       ) : debouncedEmail ? (
//         <Card>
//           <CardContent className="text-center py-8">
//             <p className="text-muted-foreground">
//               No user found with this email.
//             </p>
//           </CardContent>
//         </Card>
//       ) : null}
//     </div>
//   );
// }

// "use client";

// import { useToast } from "@/hooks/use-toast";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import { TodoItem } from "@/components/TodoItem";
// import { TodoForm } from "@/components/TodoForm";
// import type { Todo } from "@/app/generated/prisma/client";
// import { useUser } from "@clerk/nextjs";
// import { AlertTriangle, Sparkles, Search } from "lucide-react";
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

//   const email = user?.emailAddresses?.[0]?.emailAddress ?? "User";

//   const stats = useMemo(() => {
//     const completed = todos.filter((t) => t.completed).length;
//     return {
//       total: todos.length,
//       completed,
//       active: Math.max(0, todos.length - completed),
//     };
//   }, [todos]);

//   const fetchSubscriptionStatus = async () => {
//     const response = await fetch("/api/subscription");
//     if (response.ok) {
//       const data = await response.json();
//       setIsSubscribed(data.isSubscribed);
//     }
//   };

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
//       } catch {
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

//   const handleAddTodo = async (title: string) => {
//     toast({ title: "Adding", description: "Creating your task…" });
//     try {
//       const response = await fetch("/api/todos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title }),
//       });
//       if (!response.ok) throw new Error("Failed to add todo");
//       await fetchTodos(currentPage);
//       toast({ title: "Done", description: "Todo added successfully." });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to add todo. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleUpdateTodo = async (id: string, completed: boolean) => {
//     toast({ title: "Updating", description: "Syncing changes…" });
//     try {
//       const response = await fetch(`/api/todos/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ completed }),
//       });
//       if (!response.ok) throw new Error("Failed to update todo");
//       await fetchTodos(currentPage);
//       toast({ title: "Done", description: "Todo updated successfully." });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to update todo. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDeleteTodo = async (id: string) => {
//     toast({ title: "Deleting", description: "Removing task…" });
//     try {
//       const response = await fetch(`/api/todos/${id}`, { method: "DELETE" });
//       if (!response.ok) throw new Error("Failed to delete todo");
//       await fetchTodos(currentPage);
//       toast({ title: "Done", description: "Todo deleted successfully." });
//     } catch {
//       toast({
//         title: "Error",
//         description: "Failed to delete todo. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
//             <Sparkles className="h-3.5 w-3.5" />
//             Futuristic Productivity Mode
//           </div>
//           <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
//             Welcome,{" "}
//             <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
//               {email}
//             </span>
//           </h1>
//           <p className="mt-1 text-sm text-muted-foreground">
//             Build focus. Track execution. Keep it clean.
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-3 gap-2 sm:gap-3">
//           <Card className="border-white/10 bg-background/60 backdrop-blur">
//             <CardContent className="p-3 text-center">
//               <p className="text-xs text-muted-foreground">Total</p>
//               <p className="text-lg font-semibold">{stats.total}</p>
//             </CardContent>
//           </Card>
//           <Card className="border-white/10 bg-background/60 backdrop-blur">
//             <CardContent className="p-3 text-center">
//               <p className="text-xs text-muted-foreground">Active</p>
//               <p className="text-lg font-semibold">{stats.active}</p>
//             </CardContent>
//           </Card>
//           <Card className="border-white/10 bg-background/60 backdrop-blur">
//             <CardContent className="p-3 text-center">
//               <p className="text-xs text-muted-foreground">Done</p>
//               <p className="text-lg font-semibold">{stats.completed}</p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Subscription warning */}
//       {!isSubscribed && todos.length >= 3 && (
//         <Alert
//           variant="destructive"
//           className="border-red-500/30 bg-red-500/10"
//         >
//           <AlertTriangle className="h-4 w-4" />
//           <AlertDescription>
//             You&apos;ve hit the free limit.{" "}
//             <Link
//               href="/subscribe"
//               className="font-semibold underline underline-offset-4"
//             >
//               Upgrade
//             </Link>{" "}
//             to unlock unlimited tasks.
//           </AlertDescription>
//         </Alert>
//       )}

//       {/* Main grid */}
//       <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
//         {/* Todos */}
//         <Card className="border-white/10 bg-background/60 backdrop-blur">
//           <CardHeader className="pb-2">
//             <CardTitle>Your Tasks</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="relative">
//               <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Search tasks…"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="h-11 pl-9"
//               />
//             </div>

//             {isLoading ? (
//               <div className="space-y-3">
//                 <div className="h-16 rounded-xl bg-white/5" />
//                 <div className="h-16 rounded-xl bg-white/5" />
//                 <div className="h-16 rounded-xl bg-white/5" />
//               </div>
//             ) : todos.length === 0 ? (
//               <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
//                 <p className="text-sm text-muted-foreground">
//                   No tasks yet. Add your first mission above.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <ul className="space-y-3">
//                   {todos.map((todo) => (
//                     <TodoItem
//                       key={todo.id}
//                       todo={todo}
//                       onUpdate={handleUpdateTodo}
//                       onDelete={handleDeleteTodo}
//                     />
//                   ))}
//                 </ul>

//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPageChange={(page) => fetchTodos(page)}
//                 />
//               </>
//             )}
//           </CardContent>
//         </Card>

//         {/* Create */}
//         <Card className="border-white/10 bg-background/60 backdrop-blur">
//           <CardHeader className="pb-2">
//             <CardTitle>Create</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="rounded-xl border border-white/10 bg-white/5 p-4">
//               <p className="text-sm font-medium">Add a new todo</p>
//               <p className="mt-1 text-xs text-muted-foreground">
//                 Keep titles short + actionable. You can mark complete later.
//               </p>
//               <div className="mt-4">
//                 <TodoForm onSubmit={(title) => handleAddTodo(title)} />
//               </div>
//             </div>

//             <div className="rounded-xl border border-white/10 bg-white/5 p-4">
//               <p className="text-sm font-medium">Subscription</p>
//               <p className="mt-1 text-xs text-muted-foreground">
//                 {isSubscribed
//                   ? "You’re subscribed ✅"
//                   : "Free plan (3 todos max) ⚠️"}
//               </p>
//               <Link
//                 href="/subscribe"
//                 className="mt-3 inline-flex rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 px-3 py-2 text-sm font-semibold text-black hover:opacity-95"
//               >
//                 Manage subscription
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

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
import { Shield, Search, Sparkles } from "lucide-react";

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
    <div className="relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/15 blur-[90px]" />
        <div className="absolute -top-10 right-[-120px] h-[520px] w-[520px] rounded-full bg-blue-500/15 blur-[90px]" />
        <div className="absolute bottom-[-160px] left-[-140px] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[90px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10 space-y-6">
        {/* Header */}
        <div className="rounded-3xl border border-white/10 bg-background/60 p-6 backdrop-blur sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            Admin Console
            <span className="mx-1 text-white/20">•</span>
            <Sparkles className="h-3.5 w-3.5" />
            Moderation
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Search users, manage subscriptions, and moderate todos.
          </p>
        </div>

        {/* Search */}
        <Card className="border-white/10 bg-background/60 backdrop-blur">
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
                  className="pl-9"
                  required
                />
              </div>
              <Button type="submit" className="h-11">
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        {isLoading ? (
          <Card className="border-white/10 bg-background/60 backdrop-blur">
            <CardContent className="py-10 text-center">
              <div className="mx-auto mb-3 h-10 w-10 animate-pulse rounded-2xl bg-white/10" />
              <p className="text-sm text-muted-foreground">
                Loading user data…
              </p>
            </CardContent>
          </Card>
        ) : user ? (
          <>
            <Card className="border-white/10 bg-background/60 backdrop-blur">
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

            <Card className="border-white/10 bg-background/60 backdrop-blur">
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
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-muted-foreground">
                    This user has no todos.
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : debouncedEmail ? (
          <Card className="border-white/10 bg-background/60 backdrop-blur">
            <CardContent className="py-10 text-center text-muted-foreground">
              No user found with this email.
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
