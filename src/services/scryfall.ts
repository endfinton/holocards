export type CardSearchResult = {
  id: string;
  name: string;
  imageUrl: string | null;
  rarity: string;
};

type ScryfallCard = {
  id: string;
  name: string;
  rarity: string;
  image_uris?: {
    normal?: string;
  };
  card_faces?: Array<{
    image_uris?: {
      normal?: string;
    };
  }>;
};

type ScryfallSearchResponse = {
  data: ScryfallCard[];
};

type FetchLike = typeof fetch;

type SearchCardsOptions = {
  limit?: number;
};

export function mapScryfallCards(cards: ScryfallCard[]): CardSearchResult[] {
  return cards.map((card) => ({
    id: card.id,
    name: card.name,
    imageUrl:
      card.image_uris?.normal ??
      card.card_faces?.find((face) => face.image_uris?.normal)?.image_uris
        ?.normal ??
      null,
    rarity: card.rarity,
  }));
}

export async function searchCards(
  query: string,
  fetcher: FetchLike = fetch,
  options: SearchCardsOptions = {},
): Promise<CardSearchResult[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const response = await fetcher(
    `https://api.scryfall.com/cards/search?q=${encodeURIComponent(normalizedQuery)}`,
  );

  if (!response.ok) {
    throw new Error(`Scryfall request failed with status ${response.status}`);
  }

  const data = (await response.json()) as ScryfallSearchResponse;
  const cards = mapScryfallCards(data.data ?? []);

  return options.limit ? cards.slice(0, options.limit) : cards;
}
