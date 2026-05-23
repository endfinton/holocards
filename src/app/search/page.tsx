import { searchCards, type CardSearchResult } from "@/services/scryfall";
import { SearchResultsGrid } from "@/components/search/SearchResultsGrid";

const searchPageLinks = [
  { href: "/", label: "Inicio" },
  { href: "/collection", label: "Mi bóveda" },
  { href: "/login", label: "Entrar" },
];

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
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-300">
              Scryfall Search
            </p>
            <h1 className="mt-3 text-4xl font-black">Buscar cartas</h1>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm font-bold">
            {searchPageLinks.map((link) => (
              <a
                className="rounded-full border border-white/15 px-5 py-2 transition hover:border-fuchsia-300 hover:text-fuchsia-200"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </header>

        <form action="/search" className="flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="q">
            Nombre de la carta
          </label>
          <input
            className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 text-zinc-50 outline-none transition placeholder:text-zinc-600 focus:border-fuchsia-300"
            id="q"
            name="q"
            placeholder="Ej: Black Lotus, Sol Ring..."
            defaultValue={query}
          />
          <button
            className="rounded-2xl bg-fuchsia-300 px-6 py-3 font-bold text-zinc-950 transition hover:bg-fuchsia-200"
            type="submit"
          >
            Buscar
          </button>
        </form>

        {!query && <p className="text-zinc-400">Escribe el nombre de una carta para empezar.</p>}

        {hasError && (
          <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-200">
            No se pudo completar la búsqueda. Inténtalo de nuevo.
          </p>
        )}

        {query && !hasError && cards.length === 0 && (
          <p className="text-zinc-400">No se encontraron cartas para “{query}”.</p>
        )}

        {cards.length > 0 && (
          <>
            <p className="text-zinc-400">
              {cards.length} {cards.length === 1 ? "carta encontrada" : "cartas encontradas"}
            </p>
            <SearchResultsGrid cards={cards} />
          </>
        )}
      </section>
    </main>
  );
}
