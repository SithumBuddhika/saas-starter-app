"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";
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
        setIsSubscribed(Boolean(data.isSubscribed));
        setSubscriptionEnds(data.subscriptionEnds ?? null);
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
        setSubscriptionEnds(data.subscriptionEnds ?? null);
        router.refresh();
        toast({ title: "Success", description: "Subscription activated!" });
      } else {
        const errorData = await response.json().catch(() => ({}));
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
        <div className="h-9 w-24 rounded-lg bg-muted/40 animate-pulse" />
        <div className="mt-6 h-44 rounded-2xl border border-border bg-muted/30 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:py-10 space-y-6">
        <BackButton />

        {/* Header */}
        <Card className="border-border bg-card">
          <CardContent className="p-5 sm:p-6">
            <p className="text-xs font-medium text-muted-foreground">
              Billing & Plan
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Subscription
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your plan to unlock unlimited todos.
            </p>
          </CardContent>
        </Card>

        {/* Plan Card */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Your Plan</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {isSubscribed ? (
              <>
                <Alert className="border-emerald-500/30 bg-emerald-500/10">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <span className="font-medium">Active</span>{" "}
                    {subscriptionEnds ? (
                      <>
                        — ends on{" "}
                        <b>{new Date(subscriptionEnds).toLocaleDateString()}</b>
                      </>
                    ) : null}
                  </AlertDescription>
                </Alert>

                <div className="rounded-xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                  You’re on the subscribed plan. You can create unlimited todos.
                </div>
              </>
            ) : (
              <>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Free plan is limited to <b>3 todos</b>. Subscribe to unlock
                    unlimited todos.
                  </AlertDescription>
                </Alert>

                <Button onClick={handleSubscribe} className="w-full">
                  Subscribe now
                </Button>

                <p className="text-xs text-muted-foreground">
                  Note: This is a demo subscription flow (no payment gateway
                  yet).
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
