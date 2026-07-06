import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.POSTGRES_URL;
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
  await sql(statement);
  console.log("OK:", statement.split("\n")[0]);
}

console.log("Migration complete");