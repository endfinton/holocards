import { defineConfig } from "drizzle-kit";
import { existsSync, readFileSync } from "node:fs";

function readLocalDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if (!existsSync(".env.local")) {
    return "";
  }

  const envFile = readFileSync(".env.local", "utf8");
  const databaseUrlLine = envFile
    .split(/\r?\n/)
    .find((line) => line.startsWith("DATABASE_URL="));

  return databaseUrlLine?.replace("DATABASE_URL=", "").trim() ?? "";
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: readLocalDatabaseUrl(),
  },
  strict: true,
  verbose: true,
});
