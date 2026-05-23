import { defineConfig } from "drizzle-kit";
import { existsSync, readFileSync } from "node:fs";

type EnvMap = Record<string, string>;

function readEnvFile(): EnvMap {
  if (!existsSync(".env.local")) {
    return {};
  }

  return readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .reduce<EnvMap>((env, line) => {
      const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);

      if (!match) {
        return env;
      }

      env[match[1]] = match[2].trim();
      return env;
    }, {});
}

function cleanEnvValue(value: string) {
  return value.trim().replace(/^([\"\'])(.*)\1$/, "$2");
}

function normalizeTursoUrl(url: string) {
  return cleanEnvValue(url).replace(/^libsql:\/\//, "https://");
}

const localEnv = readEnvFile();
const rawUrl =
  process.env.TURSO_DATABASE_URL ??
  process.env.llex_TURSO_DATABASE_URL ??
  localEnv.TURSO_DATABASE_URL ??
  localEnv.llex_TURSO_DATABASE_URL ??
  "";
const rawAuthToken =
  process.env.TURSO_AUTH_TOKEN ??
  process.env.llex_TURSO_AUTH_TOKEN ??
  localEnv.TURSO_AUTH_TOKEN ??
  localEnv.llex_TURSO_AUTH_TOKEN ??
  "";
const authToken = cleanEnvValue(rawAuthToken);

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle-turso",
  dialect: "turso",
  dbCredentials: {
    url: normalizeTursoUrl(rawUrl),
    authToken,
  },
  strict: true,
  verbose: true,
});
