"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signIn, signUp } from "@/lib/auth-client";

type AuthMode = "sign-in" | "sign-up";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignUp = mode === "sign-up";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const response = isSignUp
      ? await signUp.email({
          name,
          email,
          password,
        })
      : await signIn.email({
          email,
          password,
        });

    setIsSubmitting(false);

    if (response.error) {
      setError(response.error.message ?? "No se pudo completar la acción.");
      return;
    }

    router.push("/search");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12 text-zinc-50">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-fuchsia-300">
            HoloCard Vault
          </p>
          <h1 className="text-3xl font-bold">
            {isSignUp ? "Crea tu cuenta" : "Entra en tu bóveda"}
          </h1>
          <p className="text-sm text-zinc-400">
            {isSignUp
              ? "Preparamos tu usuario para guardar cartas en la próxima fase."
              : "Accede para empezar a conectar tu colección privada."}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-full bg-black/30 p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setMode("sign-in")}
            className={`rounded-full px-4 py-2 transition ${
              !isSignUp ? "bg-white text-zinc-950" : "text-zinc-400"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => setMode("sign-up")}
            className={`rounded-full px-4 py-2 transition ${
              isSignUp ? "bg-white text-zinc-950" : "text-zinc-400"
            }`}
          >
            Crear cuenta
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {isSignUp && (
            <label className="block space-y-2 text-sm font-medium text-zinc-200">
              <span>Nombre</span>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-50 outline-none transition placeholder:text-zinc-600 focus:border-fuchsia-300"
                placeholder="Tu nombre"
                type="text"
              />
            </label>
          )}

          <label className="block space-y-2 text-sm font-medium text-zinc-200">
            <span>Email</span>
            <input
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-50 outline-none transition placeholder:text-zinc-600 focus:border-fuchsia-300"
              placeholder="tu@email.com"
              type="email"
            />
          </label>

          <label className="block space-y-2 text-sm font-medium text-zinc-200">
            <span>Contraseña</span>
            <input
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-zinc-50 outline-none transition placeholder:text-zinc-600 focus:border-fuchsia-300"
              placeholder="Mínimo 8 caracteres"
              type="password"
            />
          </label>

          {error && (
            <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}

          <button
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-fuchsia-300 px-5 py-3 font-bold text-zinc-950 transition hover:bg-fuchsia-200 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
          >
            {isSubmitting
              ? "Procesando..."
              : isSignUp
                ? "Crear cuenta"
                : "Entrar"}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between text-sm text-zinc-400">
          <Link className="transition hover:text-zinc-50" href="/">
            Inicio
          </Link>
          <Link className="transition hover:text-zinc-50" href="/search">
            Ir a búsqueda
          </Link>
        </div>
      </section>
    </main>
  );
}
