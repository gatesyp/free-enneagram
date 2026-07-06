import { isComplete } from "@/lib/answers";
import { EMPTY_ANSWERS, getSql, type ResultRow } from "./client";

function normalizeAnswers(raw: unknown): (number | null)[] {
  if (!Array.isArray(raw)) return [...EMPTY_ANSWERS];
  const answers = [...EMPTY_ANSWERS];
  for (let i = 0; i < Math.min(raw.length, EMPTY_ANSWERS.length); i++) {
    const value = raw[i];
    answers[i] = typeof value === "number" ? value : null;
  }
  return answers;
}

function rowFromRecord(record: Record<string, unknown>): ResultRow {
  return {
    id: String(record.id),
    name: record.name == null ? null : String(record.name),
    answers: normalizeAnswers(record.answers),
    completed_at: record.completed_at == null ? null : String(record.completed_at),
    created_at: String(record.created_at),
    updated_at: String(record.updated_at),
  };
}

export async function createResult(name: string | null): Promise<ResultRow> {
  const sql = getSql();
  const trimmedName = name?.trim() || null;
  const rows = await sql`
    INSERT INTO results (name, answers)
    VALUES (${trimmedName}, ${JSON.stringify(EMPTY_ANSWERS)}::jsonb)
    RETURNING id, name, answers, completed_at, created_at, updated_at
  `;
  return rowFromRecord(rows[0] as Record<string, unknown>);
}

export async function getResult(id: string): Promise<ResultRow | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, answers, completed_at, created_at, updated_at
    FROM results
    WHERE id = ${id}
  `;
  if (rows.length === 0) return null;
  return rowFromRecord(rows[0] as Record<string, unknown>);
}

export async function updateResult(
  id: string,
  answers: (number | null)[]
): Promise<ResultRow | null> {
  const sql = getSql();
  const completed = isComplete(answers);
  const rows = await sql`
    UPDATE results
    SET
      answers = ${JSON.stringify(answers)}::jsonb,
      completed_at = CASE WHEN ${completed} THEN now() ELSE completed_at END,
      updated_at = now()
    WHERE id = ${id}
    RETURNING id, name, answers, completed_at, created_at, updated_at
  `;
  if (rows.length === 0) return null;
  return rowFromRecord(rows[0] as Record<string, unknown>);
}

export async function listResults(): Promise<ResultRow[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, answers, completed_at, created_at, updated_at
    FROM results
    ORDER BY created_at DESC
  `;
  return rows.map((row) => rowFromRecord(row as Record<string, unknown>));
}

export function displayName(row: ResultRow): string {
  if (row.name?.trim()) return row.name.trim();
  return row.id.slice(0, 8);
}