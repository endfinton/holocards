"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { signOut } from "@/lib/auth-client";

type SessionGreetingProps = {
  name: string;
};

export function SessionGreeting({ name }: SessionGreetingProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);

    await signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm text-zinc-200 shadow-xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between">
      <p>
        Hola! <span className="font-bold text-fuchsia-200">{name}</span>
      </p>
      <button
        className="rounded-full border border-white/15 px-4 py-2 font-bold text-zinc-50 transition hover:border-fuchsia-300 hover:text-fuchsia-200 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSigningOut}
        onClick={handleSignOut}
        type="button"
      >
        {isSigningOut ? "Cerrando..." : "Logout"}
      </button>
    </div>
  );
}
