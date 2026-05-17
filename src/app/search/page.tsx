import { searchCards } from "@/services/scryfall";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  let cards = [];
  let hasError = false;

  if (query) {
    try {
      cards = await searchCards(query, fetch, {
        limit: 12,
      });
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
        <ul>
          {cards.map((card) => (
            <li key={card.id}>
              {card.name} — rareza: {card.rarity}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
