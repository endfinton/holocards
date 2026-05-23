import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { CollectionGrid } from "@/components/collection/CollectionGrid";
import { db } from "@/db";
import { collectionCards } from "@/db/schema";
import { auth } from "@/lib/auth";

export default async function CollectionPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const cards = await db
    .select()
    .from(collectionCards)
    .where(eq(collectionCards.userId, session.user.id))
    .orderBy(desc(collectionCards.createdAt));

  const previewCards = cards.map((card) => ({
    id: card.scryfallId,
    name: card.name,
    imageUrl: card.imageUrl,
    rarity: card.rarity,
    isFoil: card.isFoil,
  }));

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-300">
              Tu bóveda
            </p>
            <h1 className="mt-3 text-4xl font-black">Colección guardada</h1>
            <p className="mt-2 text-zinc-400">
              {cards.length} {cards.length === 1 ? "carta guardada" : "cartas guardadas"}
            </p>
          </div>
          <nav className="flex gap-3 text-sm font-bold">
            <Link
              className="rounded-full border border-white/15 px-5 py-2 transition hover:border-fuchsia-300 hover:text-fuchsia-200"
              href="/search"
            >
              Buscar cartas
            </Link>
            <Link
              className="rounded-full bg-white px-5 py-2 text-zinc-950 transition hover:bg-fuchsia-200"
              href="/"
            >
              Inicio
            </Link>
          </nav>
        </header>

        {cards.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 text-center">
            <h2 className="text-2xl font-bold">Todavía no hay cartas aquí.</h2>
            <p className="mt-3 text-zinc-400">
              Busca una carta y pulsa “Guardar en bóveda” para empezar tu colección.
            </p>
            <Link
              className="mt-6 inline-flex rounded-full bg-fuchsia-300 px-6 py-3 font-bold text-zinc-950 transition hover:bg-fuchsia-200"
              href="/search"
            >
              Ir a búsqueda
            </Link>
          </div>
        ) : (
          <CollectionGrid cards={previewCards} />
        )}
      </section>
    </main>
  );
}
