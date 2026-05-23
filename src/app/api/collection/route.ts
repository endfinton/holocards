import { and, desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db";
import { collectionCards } from "@/db/schema";
import { auth } from "@/lib/auth";

const saveCardSchema = z.object({
  scryfallId: z.string().min(1).max(48),
  name: z.string().min(1).max(255),
  rarity: z.string().min(1).max(32),
  imageUrl: z.string().url().max(1024).nullable(),
  isFoil: z.boolean().optional(),
});

const deleteCardSchema = z.object({
  scryfallId: z.string().min(1).max(48),
});

async function getCurrentUserId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user.id ?? null;
}

export async function GET() {
  const userId = await getCurrentUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cards = await db
    .select()
    .from(collectionCards)
    .where(eq(collectionCards.userId, userId))
    .orderBy(desc(collectionCards.createdAt));

  return NextResponse.json({ cards });
}

export async function POST(request: Request) {
  const userId = await getCurrentUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = saveCardSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid card payload" },
      { status: 400 },
    );
  }

  const card = parsed.data;
  const isFoil =
    card.isFoil ?? ["rare", "mythic"].includes(card.rarity.toLowerCase());

  await db
    .insert(collectionCards)
    .values({
      scryfallId: card.scryfallId,
      userId,
      name: card.name,
      rarity: card.rarity,
      imageUrl: card.imageUrl,
      isFoil,
    })
    .onConflictDoUpdate({
      target: [collectionCards.userId, collectionCards.scryfallId],
      set: {
        name: card.name,
        rarity: card.rarity,
        imageUrl: card.imageUrl,
        isFoil,
      },
    });

  const [savedCard] = await db
    .select()
    .from(collectionCards)
    .where(
      and(
        eq(collectionCards.userId, userId),
        eq(collectionCards.scryfallId, card.scryfallId),
      ),
    )
    .limit(1);

  return NextResponse.json({ card: savedCard }, { status: 201 });
}

export async function DELETE(request: Request) {
  const userId = await getCurrentUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = deleteCardSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid delete payload" },
      { status: 400 },
    );
  }

  await db
    .delete(collectionCards)
    .where(
      and(
        eq(collectionCards.userId, userId),
        eq(collectionCards.scryfallId, parsed.data.scryfallId),
      ),
    );

  return NextResponse.json({ success: true });
}
