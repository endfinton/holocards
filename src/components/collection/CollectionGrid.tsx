"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { CardPreviewModal } from "@/components/3d/CardPreviewModal";
import type { CardSearchResult } from "@/services/scryfall";

type CollectionCard = CardSearchResult & {
  isFoil: boolean;
};

type DeleteStatus = "idle" | "deleting" | "error";

type CollectionGridProps = {
  cards: CollectionCard[];
};

export function CollectionGrid({ cards }: CollectionGridProps) {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<CollectionCard | null>(null);
  const [visibleCards, setVisibleCards] = useState(cards);
  const [deleteStatusByCardId, setDeleteStatusByCardId] = useState<
    Record<string, DeleteStatus>
  >({});

  async function handleDelete(card: CollectionCard) {
    setDeleteStatusByCardId((current) => ({
      ...current,
      [card.id]: "deleting",
    }));

    const response = await fetch("/api/collection", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scryfallId: card.id,
      }),
    });

    if (response.status === 401) {
      router.push("/login");
      return;
    }

    if (!response.ok) {
      setDeleteStatusByCardId((current) => ({
        ...current,
        [card.id]: "error",
      }));
      return;
    }

    setVisibleCards((current) => current.filter((item) => item.id !== card.id));
    setSelectedCard((current) => (current?.id === card.id ? null : current));
    router.refresh();
  }

  if (visibleCards.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 text-center">
        <h2 className="text-2xl font-bold">Boveda vacia.</h2>
        <p className="mt-3 text-zinc-400">
          Todas las cartas guardadas se han eliminado de esta vista.
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleCards.map((card) => {
          const canPreview = Boolean(card.imageUrl);
          const deleteStatus = deleteStatusByCardId[card.id] ?? "idle";

          return (
            <li
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/30"
              key={card.id}
            >
              <button
                className="block w-full text-left disabled:cursor-not-allowed disabled:opacity-70"
                disabled={!canPreview}
                onClick={() => canPreview && setSelectedCard(card)}
                type="button"
              >
                {card.imageUrl ? (
                  <img
                    alt={card.name}
                    className="w-full rounded-2xl transition hover:scale-[1.02]"
                    src={card.imageUrl}
                  />
                ) : (
                  <div className="flex aspect-[5/7] items-center justify-center rounded-2xl bg-black/30 text-sm text-zinc-500">
                    Imagen no disponible
                  </div>
                )}
                <div className="mt-4 space-y-1">
                  <h2 className="font-bold leading-snug">{card.name}</h2>
                  <p className="text-sm capitalize text-zinc-400">
                    Rareza: {card.rarity}
                  </p>
                  {card.isFoil && (
                    <p className="text-sm font-semibold text-fuchsia-300">Foil</p>
                  )}
                </div>
              </button>

              <button
                className="mt-4 rounded-full border border-red-300/30 px-3 py-1 text-xs font-bold text-red-200 transition hover:border-red-300 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={deleteStatus === "deleting"}
                onClick={() => handleDelete(card)}
                type="button"
              >
                {deleteStatus === "deleting" && "Eliminando..."}
                {deleteStatus === "error" && "Reintentar eliminar"}
                {deleteStatus === "idle" && "Eliminar"}
              </button>
            </li>
          );
        })}
      </ul>

      {selectedCard && (
        <CardPreviewModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </>
  );
}
