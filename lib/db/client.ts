import { neon } from "@neondatabase/serverless";

export function getSql() {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    throw new Error("POSTGRES_URL is not configured");
  }
  return neon(url);
}

export interface ResultRow {
  id: string;
  name: string | null;
  answers: (number | null)[];
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export const EMPTY_ANSWERS: (number | null)[] = Array(45).fill(null);