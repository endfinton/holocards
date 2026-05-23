import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

function cleanEnvValue(value: string) {
  return value.trim().replace(/^([\"\'])(.*)\1$/, "$2");
}

function normalizeTursoUrl(url: string) {
  return cleanEnvValue(url).replace(/^libsql:\/\//, "https://");
}

const rawUrl = process.env.TURSO_DATABASE_URL ?? process.env.llex_TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN ?? process.env.llex_TURSO_AUTH_TOKEN;

if (!rawUrl) {
  throw new Error("TURSO_DATABASE_URL is required");
}

if (!authToken) {
  throw new Error("TURSO_AUTH_TOKEN is required");
}

const client = createClient({
  url: normalizeTursoUrl(rawUrl),
  authToken: cleanEnvValue(authToken),
});

export const db = drizzle(client, { schema });
