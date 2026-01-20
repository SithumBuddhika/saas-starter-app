// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { CheckCircle, AlertTriangle } from "lucide-react";
// import { BackButton } from "@/components/BackButton";
// import { useToast } from "@/hooks/use-toast";

// export default function SubscribePage() {
//   const router = useRouter();
//   const { toast } = useToast();
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [subscriptionEnds, setSubscriptionEnds] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchSubscriptionStatus = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("/api/subscription");
//       if (response.ok) {
//         const data = await response.json();
//         setIsSubscribed(data.isSubscribed);
//         setSubscriptionEnds(data.subscriptionEnds);
//       } else {
//         throw new Error("Failed to fetch subscription status");
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch subscription status. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [toast]);

//   useEffect(() => {
//     fetchSubscriptionStatus();
//   }, [fetchSubscriptionStatus]);

//   const handleSubscribe = async () => {
//     try {
//       const response = await fetch("/api/subscription", { method: "POST" });
//       if (response.ok) {
//         const data = await response.json();
//         setIsSubscribed(true);
//         setSubscriptionEnds(data.subscriptionEnds);
//         router.refresh();
//         toast({
//           title: "Success",
//           description: "You have successfully subscribed!",
//         });
//       } else {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to subscribe");
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description:
//           error instanceof Error
//             ? error.message
//             : "An error occurred while subscribing. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   if (isLoading) {
//     return <div className="flex justify-center items-center">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-3xl">
//       <BackButton />
//       <h1 className="text-3xl font-bold mb-8 text-center">Subscription</h1>
//       <Card>
//         <CardHeader>
//           <CardTitle>Your Subscription Status</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {isSubscribed ? (
//             <Alert>
//               <CheckCircle className="h-4 w-4" />
//               <AlertDescription>
//                 You are a subscribed user. Subscription ends on{" "}
//                 {new Date(subscriptionEnds!).toLocaleDateString()}
//               </AlertDescription>
//             </Alert>
//           ) : (
//             <>
//               <Alert variant="destructive">
//                 <AlertTriangle className="h-4 w-4" />
//                 <AlertDescription>
//                   You are not currently subscribed. Subscribe now to unlock all
//                   features!
//                 </AlertDescription>
//               </Alert>
//               <Button onClick={handleSubscribe} className="mt-4">
//                 Subscribe Now
//               </Button>
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Sparkles } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";

export default function SubscribePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEnds, setSubscriptionEnds] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscriptionStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/subscription");
      if (response.ok) {
        const data = await response.json();
        setIsSubscribed(data.isSubscribed);
        setSubscriptionEnds(data.subscriptionEnds);
      } else {
        throw new Error("Failed to fetch subscription status");
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch subscription status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchSubscriptionStatus();
  }, [fetchSubscriptionStatus]);

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/subscription", { method: "POST" });
      if (response.ok) {
        const data = await response.json();
        setIsSubscribed(true);
        setSubscriptionEnds(data.subscriptionEnds);
        router.refresh();
        toast({ title: "Success", description: "Subscription activated!" });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to subscribe");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to subscribe.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="h-10 w-24 rounded-lg bg-white/5" />
        <div className="mt-6 h-40 rounded-2xl bg-white/5" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <BackButton />

      <div className="rounded-2xl border border-white/10 bg-background/60 p-6 backdrop-blur">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Upgrade your workspace
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Subscription
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Unlock unlimited todos and premium experience.
        </p>
      </div>

      <Card className="border-white/10 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle>Your Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSubscribed ? (
            <Alert className="border-emerald-500/30 bg-emerald-500/10">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Active ✅{" "}
                {subscriptionEnds ? (
                  <>
                    {" "}
                    — Ends on{" "}
                    <b>{new Date(subscriptionEnds).toLocaleDateString()}</b>
                  </>
                ) : null}
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <Alert
                variant="destructive"
                className="border-red-500/30 bg-red-500/10"
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Free plan is limited. Subscribe to unlock all features.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleSubscribe}
                className="w-full bg-gradient-to-r from-violet-500 to-cyan-400 text-black hover:opacity-95"
              >
                Subscribe Now
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
