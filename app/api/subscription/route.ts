// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// export async function POST() {
//   const { userId } = await auth();

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const user = await prisma.user.findUnique({ where: { id: userId } });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const subscriptionEnds = new Date();
//     subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);

//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         isSubscribed: true,
//         subscriptionEnds,
//       },
//     });

//     return NextResponse.json({
//       message: "Subscription successful",
//       isSubscribed: updatedUser.isSubscribed,
//       subscriptionEnds: updatedUser.subscriptionEnds,
//     });
//   } catch (error) {
//     console.error("Error updating subscription:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }

// export async function GET() {
//   const { userId } = await auth();

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       select: { isSubscribed: true, subscriptionEnds: true },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const now = new Date();

//     // auto-expire
//     if (user.subscriptionEnds && user.subscriptionEnds < now) {
//       await prisma.user.update({
//         where: { id: userId },
//         data: { isSubscribed: false, subscriptionEnds: null },
//       });

//       return NextResponse.json({ isSubscribed: false, subscriptionEnds: null });
//     }

//     return NextResponse.json({
//       isSubscribed: user.isSubscribed,
//       subscriptionEnds: user.subscriptionEnds,
//     });
//   } catch (error) {
//     console.error("Error fetching subscription:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

async function ensureDbUser(userId: string) {
  const existing = await prisma.user.findUnique({ where: { id: userId } });
  if (existing) return existing;

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress;

  if (!email) return null;

  return prisma.user.create({
    data: {
      id: userId,
      email,
      isSubscribed: false,
    },
  });
}

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await ensureDbUser(userId);

    if (!user) {
      return NextResponse.json(
        { error: "User not found (no email available from Clerk)" },
        { status: 404 },
      );
    }

    const subscriptionEnds = new Date();
    subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isSubscribed: true, subscriptionEnds },
    });

    return NextResponse.json({
      message: "Subscription successful",
      isSubscribed: updatedUser.isSubscribed,
      subscriptionEnds: updatedUser.subscriptionEnds,
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await ensureDbUser(userId);

    if (!user) {
      return NextResponse.json(
        { error: "User not found (no email available from Clerk)" },
        { status: 404 },
      );
    }

    const fresh = await prisma.user.findUnique({
      where: { id: userId },
      select: { isSubscribed: true, subscriptionEnds: true },
    });

    if (!fresh) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const now = new Date();

    if (fresh.subscriptionEnds && fresh.subscriptionEnds < now) {
      await prisma.user.update({
        where: { id: userId },
        data: { isSubscribed: false, subscriptionEnds: null },
      });

      return NextResponse.json({ isSubscribed: false, subscriptionEnds: null });
    }

    return NextResponse.json({
      isSubscribed: fresh.isSubscribed,
      subscriptionEnds: fresh.subscriptionEnds,
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
