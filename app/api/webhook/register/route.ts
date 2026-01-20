import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  // ✅ match YOUR .env.local key name
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing WEBHOOK_SECRET in env");
    return new Response("Missing WEBHOOK_SECRET", { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  // ✅ only handle user.created
  if (eventType !== "user.created") {
    return new Response("Ignored", { status: 200 });
  }

  const userId = (evt.data as any)?.id as string | undefined;
  if (!userId || !userId.startsWith("user_")) {
    console.log("Ignored (no valid user id)");
    return new Response("Ignored", { status: 200 });
  }

  console.log(`Webhook type: ${eventType} | userId: ${userId}`);

  try {
    // 1) Try email from webhook payload first
    let email: string | undefined;

    const email_addresses = (evt.data as any)?.email_addresses as
      | Array<{ id: string; email_address: string }>
      | undefined;

    const primary_email_address_id = (evt.data as any)
      ?.primary_email_address_id as string | undefined;

    if (Array.isArray(email_addresses) && email_addresses.length > 0) {
      const primaryEmail =
        email_addresses.find((e) => e.id === primary_email_address_id) ??
        email_addresses[0];

      email = primaryEmail?.email_address;
    }

    // 2) If missing (sometimes), fetch from Clerk API
    if (!email) {
      try {
        const client = await clerkClient();
        const clerkUser = await client.users.getUser(userId);

        const primary = clerkUser.emailAddresses?.find(
          (e: { id: string; emailAddress: string }) =>
            e.id === clerkUser.primaryEmailAddressId,
        );

        email =
          primary?.emailAddress ?? clerkUser.emailAddresses?.[0]?.emailAddress;
      } catch (e) {
        console.error("Clerk getUser failed:", e);
        // If Clerk can't find this user (often from "example payload"), skip
        return new Response("Skipped (Clerk user not found)", { status: 200 });
      }
    }

    if (!email) {
      console.log("Skipped (no email)");
      return new Response("Skipped (no email)", { status: 200 });
    }

    // ✅ THIS is the important part that fixes your todo/subscription 404
    await prisma.user.upsert({
      where: { id: userId },
      update: { email },
      create: {
        id: userId,
        email,
        isSubscribed: false,
        subscriptionEnds: null,
      },
    });

    console.log("User upserted into Neon:", { userId, email });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Webhook handled with error", { status: 200 });
  }
}
