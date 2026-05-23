"use client";

import { useState } from "react";

import { CardPreviewModal } from "@/components/3d/CardPreviewModal";
import type { CardSearchResult } from "@/services/scryfall";

type CollectionCard = CardSearchResult & {
  isFoil: boolean;
};

type CollectionGridProps = {
  cards: CollectionCard[];
};

export function CollectionGrid({ cards }: CollectionGridProps) {
  const [selectedCard, setSelectedCard] = useState<CollectionCard | null>(null);

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const canPreview = Boolean(card.imageUrl);

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
