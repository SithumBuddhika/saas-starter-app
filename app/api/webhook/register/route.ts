import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const WHEBHOOK_SECRET = process.env.WEBOOK_SECRET;

  if (!WHEBHOOK_SECRET) {
    throw new Error("Please add webhook secret in env");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured", { status: 400 });
  }

  // ✅ IMPORTANT: use raw body for signature verification
  const body = await req.text();
  const payload = JSON.parse(body);

  const wh = new Webhook(WHEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook", err);
    return new Response("Error occured", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  if (eventType === "user.created") {
    try {
      const { email_addresses, primary_email_address_id } = payload.data;

      const primaryEmail =
        email_addresses?.find(
          (email: any) => email.id === primary_email_address_id,
        ) ?? email_addresses?.[0];

      // ✅ Don't fail the webhook if Clerk test payload has no email
      if (!primaryEmail?.email_address) {
        console.warn("No email found in webhook payload. Skipping DB insert.");
        return new Response("Skipped (no email in payload)", { status: 200 });
      }

      const newUser = await prisma.user.create({
        data: {
          id: payload.data.id,
          email: primaryEmail.email_address,
          isSubscribed: false,
        },
      });

      console.log("New user created:", newUser);
    } catch (error) {
      console.error("Error creating user in database:", error);
      return new Response("Error creating user", { status: 500 });
    }
  }

  return new Response("Webhook received successfully", { status: 200 });
}
