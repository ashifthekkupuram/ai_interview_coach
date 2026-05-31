import { defineConfig } from "drizzle-kit";
import { env } from "./env.ts";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: env.DATABASE_CONNECTION_URL,
  },
});
