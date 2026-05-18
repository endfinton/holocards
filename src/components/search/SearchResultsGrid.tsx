"use client";

import { useState } from "react";

import type { CardSearchResult } from "@/services/scryfall";
import { CardPreviewModal } from "@/components/3d/CardPreviewModal";

type SearchResultsGridProps = {
  cards: CardSearchResult[];
};

export function SearchResultsGrid({ cards }: SearchResultsGridProps) {
  const [selectedCard, setSelectedCard] = useState<CardSearchResult | null>(
    null,
  );

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const canPreview = Boolean(card.imageUrl);

          return (
            <li key={card.id}>
              <button
                type="button"
                onClick={() => canPreview && setSelectedCard(card)}
                disabled={!canPreview}
              >
                {card.imageUrl ? (
                  <img src={card.imageUrl} alt={card.name} />
                ) : (
                  <div>Imagen no disponible</div>
                )}
                <p>{card.name}</p>
                <p>Rareza: {card.rarity}</p>
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
