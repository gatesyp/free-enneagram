import { readFileSync } from "fs";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local" });

const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
if (!url) {
  console.error("POSTGRES_URL is required");
  process.exit(1);
}

const sql = neon(url);
const schema = readFileSync(new URL("../lib/db/schema.sql", import.meta.url), "utf8");

const statements = schema
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
  console.log("OK:", statement.split("\n")[0]);
}

console.log("Migration complete");