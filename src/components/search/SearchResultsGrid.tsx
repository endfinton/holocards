"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { CardPreviewModal } from "@/components/3d/CardPreviewModal";
import type { CardSearchResult } from "@/services/scryfall";

type SaveStatus = "idle" | "saving" | "saved" | "error";

type SearchResultsGridProps = {
  cards: CardSearchResult[];
};

export function SearchResultsGrid({ cards }: SearchResultsGridProps) {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<CardSearchResult | null>(
    null,
  );
  const [saveStatusByCardId, setSaveStatusByCardId] = useState<
    Record<string, SaveStatus>
  >({});

  async function handleSave(card: CardSearchResult) {
    setSaveStatusByCardId((current) => ({
      ...current,
      [card.id]: "saving",
    }));

    const response = await fetch("/api/collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scryfallId: card.id,
        name: card.name,
        rarity: card.rarity,
        imageUrl: card.imageUrl,
      }),
    });

    if (response.status === 401) {
      router.push("/login");
      return;
    }

    setSaveStatusByCardId((current) => ({
      ...current,
      [card.id]: response.ok ? "saved" : "error",
    }));
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const canPreview = Boolean(card.imageUrl);
          const saveStatus = saveStatusByCardId[card.id] ?? "idle";

          return (
            <li
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/30"
              key={card.id}
            >
              <button
                className="block w-full text-left disabled:cursor-not-allowed disabled:opacity-70"
                type="button"
                onClick={() => canPreview && setSelectedCard(card)}
                disabled={!canPreview}
              >
                {card.imageUrl ? (
                  <img
                    className="w-full rounded-2xl transition hover:scale-[1.02]"
                    src={card.imageUrl}
                    alt={card.name}
                  />
                ) : (
                  <div className="flex aspect-[5/7] items-center justify-center rounded-2xl bg-black/30 text-sm text-zinc-500">
                    Imagen no disponible
                  </div>
                )}
                <div className="mt-4 space-y-1">
                  <p className="font-bold leading-snug">{card.name}</p>
                  <p className="text-sm capitalize text-zinc-400">
                    Rareza: {card.rarity}
                  </p>
                </div>
              </button>

              <button
                className="mt-4 w-full rounded-2xl bg-fuchsia-300 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-fuchsia-200 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={saveStatus === "saving" || saveStatus === "saved"}
                onClick={() => handleSave(card)}
                type="button"
              >
                {saveStatus === "saving" && "Guardando..."}
                {saveStatus === "saved" && "Guardada"}
                {saveStatus === "error" && "Error, reintentar"}
                {saveStatus === "idle" && "Guardar en bóveda"}
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
