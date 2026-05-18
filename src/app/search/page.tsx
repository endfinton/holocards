import { searchCards, type CardSearchResult } from "@/services/scryfall";
import { SearchResultsGrid } from "@/components/search/SearchResultsGrid";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  let cards: CardSearchResult[] = [];
  let hasError = false;

  if (query) {
    try {
      cards = await searchCards(query, fetch);
    } catch {
      hasError = true;
    }
  }

  return (
    <main>
      <h1>Buscar cartas</h1>

      <form action="/search">
        <label htmlFor="q">Nombre de la carta</label>
        <input id="q" name="q" defaultValue={query} />
        <button type="submit">Buscar</button>
      </form>

      {!query && <p>Escribe el nombre de una carta para empezar.</p>}

      {hasError && <p>No se pudo completar la búsqueda. Inténtalo de nuevo.</p>}

      {query && !hasError && cards.length === 0 && (
        <p>No se encontraron cartas para “{query}”.</p>
      )}

      {cards.length > 0 && (
        <>
          <p>
            {cards.length} {cards.length === 1 ? "carta encontrada" : "cartas encontradas"}
          </p>
          <SearchResultsGrid cards={cards} />
        </>
      )}
    </main>
  );
}
