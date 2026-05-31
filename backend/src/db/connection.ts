import { remember } from "@epic-web/remember";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { isProd, env } from "../../env.ts";
import * as schema from "./schema.ts"

let client;
if (isProd()) {
  client = new Pool({ connectionString: env.DATABASE_CONNECTION_URL });
} else {
  client = remember(
    "dbPool",
    () => new Pool({ connectionString: env.DATABASE_CONNECTION_URL }),
  );
}

export const db = drizzle({ client, schema })
