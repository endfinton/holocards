"use client";

import { useEffect } from "react";

import type { CardSearchResult } from "@/services/scryfall";
import { CardScene } from "@/components/3d/CardScene";

type CardPreviewModalProps = {
  card: CardSearchResult;
  onClose: () => void;
};

export function CardPreviewModal({ card, onClose }: CardPreviewModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-label={`Vista 3D de ${card.name}`}
    >
      <button
        type="button"
        aria-label="Cerrar vista 3D"
        className="absolute right-4 top-4 z-10 text-5xl leading-none"
        onClick={onClose}
      >
        ×
      </button>

      <div className="h-full w-full">
        <CardScene
          imageUrl={card.imageUrl}
          cardName={card.name}
          rarity={card.rarity}
        />
      </div>
    </div>
  );
}
