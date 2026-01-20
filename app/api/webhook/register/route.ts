// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { WebhookEvent } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   const WHEBHOOK_SECRET = process.env.WEBOOK_SECRET;

//   if (!WHEBHOOK_SECRET) {
//     throw new Error("Please add webhook secret in env");
//   }

//   const headerPayload = await headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Error occured", { status: 400 });
//   }

//   // ✅ IMPORTANT: use raw body for signature verification
//   const body = await req.text();
//   const payload = JSON.parse(body);

//   const wh = new Webhook(WHEBHOOK_SECRET);

//   let evt: WebhookEvent;

//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;
//   } catch (err) {
//     console.error("Error verifying webhook", err);
//     return new Response("Error occured", { status: 400 });
//   }

//   const { id } = evt.data;
//   const eventType = evt.type;

//   console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
//   console.log("Webhook body:", body);

//   if (eventType === "user.created") {
//     try {
//       const { email_addresses, primary_email_address_id } = payload.data;

//       const primaryEmail =
//         email_addresses?.find(
//           (email: any) => email.id === primary_email_address_id,
//         ) ?? email_addresses?.[0];

//       // ✅ Don't fail the webhook if Clerk test payload has no email
//       if (!primaryEmail?.email_address) {
//         console.warn("No email found in webhook payload. Skipping DB insert.");
//         return new Response("Skipped (no email in payload)", { status: 200 });
//       }

//       const newUser = await prisma.user.create({
//         data: {
//           id: payload.data.id,
//           email: primaryEmail.email_address,
//           isSubscribed: false,
//         },
//       });

//       console.log("New user created:", newUser);
//     } catch (error) {
//       console.error("Error creating user in database:", error);
//       return new Response("Error creating user", { status: 500 });
//     }
//   }

//   return new Response("Webhook received successfully", { status: 200 });
// }

// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import type { WebhookEvent } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   const WEBHOOK_SECRET = process.env.WEBOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     throw new Error("Please add WEBHOOK_SECRET in env");
//   }

//   const headerPayload = await headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Missing Svix headers", { status: 400 });
//   }

//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   const wh = new Webhook(WEBHOOK_SECRET);

//   let evt: WebhookEvent;

//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;
//   } catch (err) {
//     console.error("Error verifying webhook", err);
//     return new Response("Invalid signature", { status: 400 });
//   }

//   const eventType = evt.type;
//   const userId = (evt.data as any)?.id as string | undefined;

//   console.log(`Webhook type: ${eventType} | userId: ${userId}`);

//   if (eventType !== "user.created" || !userId) {
//     return new Response("Ignored", { status: 200 });
//   }

//   // 1) Try email from webhook payload
//   const data = evt.data as any;
//   let email: string | undefined;

//   const email_addresses = data.email_addresses as Array<any> | undefined;
//   const primary_email_address_id = data.primary_email_address_id as
//     | string
//     | undefined;

//   if (Array.isArray(email_addresses) && email_addresses.length > 0) {
//     const primary = email_addresses.find(
//       (e) => e.id === primary_email_address_id,
//     );
//     email = primary?.email_address;
//   }

//   // 2) Fallback: fetch from Clerk (works even if test payload has no email_addresses)
//   if (!email) {
//     const client = await clerkClient();
//     const clerkUser = await client.users.getUser(userId);

//     const primaryEmailId = clerkUser.primaryEmailAddressId;
//     email =
//       clerkUser.emailAddresses.find((e) => e.id === primaryEmailId)
//         ?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress;
//   }

//   if (!email) {
//     console.error("No email found (webhook + Clerk fallback).");
//     return new Response("No email found", { status: 400 });
//   }

//   // Create in DB if not exists
//   await prisma.user.upsert({
//     where: { id: userId },
//     update: { email },
//     create: {
//       id: userId,
//       email,
//       isSubscribed: false,
//     },
//   });

//   return new Response("OK", { status: 200 });
// }
//////////////////////////

// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import type { WebhookEvent } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     throw new Error("Please add WEBHOOK_SECRET in env");
//   }

//   const headerPayload = await headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Missing Svix headers", { status: 400 });
//   }

//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   const wh = new Webhook(WEBHOOK_SECRET);

//   let evt: WebhookEvent;

//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;
//   } catch (err) {
//     console.error("Error verifying webhook", err);
//     return new Response("Invalid signature", { status: 400 });
//   }

//   const userId = (evt.data as any)?.id as string | undefined;
//   const eventType = evt.type;

//   console.log(`Webhook type: ${eventType} | userId: ${userId}`);

//   if (eventType !== "user.created" || !userId) {
//     return new Response("Ignored", { status: 200 });
//   }

//   try {
//     // 1) Try to read from webhook payload first
//     let email: string | undefined;

//     const email_addresses = (evt.data as any)?.email_addresses as
//       | any[]
//       | undefined;
//     const primary_email_address_id = (evt.data as any)
//       ?.primary_email_address_id as string | undefined;

//     if (Array.isArray(email_addresses) && email_addresses.length > 0) {
//       const primaryEmail =
//         email_addresses.find((e) => e.id === primary_email_address_id) ??
//         email_addresses[0];
//       email = primaryEmail?.email_address;
//     }

//     // 2) If payload doesn't include email (common for "Send example"), fetch from Clerk API
//     if (!email) {
//       const clerkUser = await clerkClient.users.getUser(userId);
//       email = clerkUser.emailAddresses?.find(
//         (e) => e.id === clerkUser.primaryEmailAddressId,
//       )?.emailAddress;
//     }

//     if (!email) {
//       console.log("Skipped (no email in payload or Clerk user)");
//       return new Response("Skipped (no email in payload)", { status: 200 });
//     }

//     await prisma.user.upsert({
//       where: { id: userId },
//       update: { email },
//       create: {
//         id: userId,
//         email,
//         isSubscribed: false,
//       },
//     });

//     return new Response("Webhook received successfully", { status: 200 });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     // Return 200 to prevent Clerk retry spam while you debug
//     return new Response("Webhook handled with error", { status: 200 });
//   }
// }

/////////////

import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET in env");
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

  const userId = (evt.data as any)?.id as string | undefined;
  const eventType = evt.type;

  console.log(`Webhook type: ${eventType} | userId: ${userId}`);

  if (eventType !== "user.created" || !userId) {
    return new Response("Ignored", { status: 200 });
  }

  try {
    // 1) Try to read from webhook payload first
    let email: string | undefined;

    const email_addresses = (evt.data as any)?.email_addresses as
      | Array<{ id: string; email_address?: string }>
      | undefined;

    const primary_email_address_id = (evt.data as any)
      ?.primary_email_address_id as string | undefined;

    if (Array.isArray(email_addresses) && email_addresses.length > 0) {
      const primaryEmail =
        email_addresses.find(
          (e: { id: string; email_address?: string }) =>
            e.id === primary_email_address_id,
        ) ?? email_addresses[0];

      email = primaryEmail?.email_address;
    }

    // 2) If payload doesn't include email (common for "Send example"), fetch from Clerk API
    if (!email) {
      const client = await clerkClient();
      const clerkUser = await client.users.getUser(userId);

      email = clerkUser.emailAddresses?.find(
        (e: { id: string; emailAddress: string }) =>
          e.id === clerkUser.primaryEmailAddressId,
      )?.emailAddress;
    }

    if (!email) {
      console.log("Skipped (no email in payload or Clerk user)");
      return new Response("Skipped (no email in payload)", { status: 200 });
    }

    await prisma.user.upsert({
      where: { id: userId },
      update: { email },
      create: {
        id: userId,
        email,
        isSubscribed: false,
      },
    });

    return new Response("Webhook received successfully", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    // Return 200 to prevent Clerk retry spam while you debug
    return new Response("Webhook handled with error", { status: 200 });
  }
}
