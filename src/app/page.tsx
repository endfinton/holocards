import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-16 text-zinc-50">
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-fuchsia-300">
          HoloCard Vault
        </p>
        <h1 className="max-w-3xl text-5xl font-black tracking-tight sm:text-6xl">
          Busca, mira y guarda tus cartas de Magic en una bóveda 3D.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-zinc-400">
          La búsqueda usa Scryfall, el visor 3D tiene zoom y foil, y la bóveda
          ya puede guardar cartas por usuario.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            className="rounded-full bg-fuchsia-300 px-7 py-3 font-bold text-zinc-950 transition hover:bg-fuchsia-200"
            href="/search"
          >
            Buscar cartas
          </Link>
          <Link
            className="rounded-full border border-white/15 px-7 py-3 font-bold text-zinc-50 transition hover:border-fuchsia-300 hover:text-fuchsia-200"
            href="/collection"
          >
            Mi bóveda
          </Link>
          <Link
            className="rounded-full border border-white/15 px-7 py-3 font-bold text-zinc-50 transition hover:border-fuchsia-300 hover:text-fuchsia-200"
            href="/login"
          >
            Entrar / crear cuenta
          </Link>
        </div>
      </section>
    </main>
  );
}
