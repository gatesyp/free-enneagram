import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isValidAdminToken } from "@/lib/auth";
import { isComplete } from "@/lib/answers";
import { displayName, listResults } from "@/lib/db/results";
import { calculateResults } from "@/lib/scoring";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!isValidAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = await listResults();
    const results = rows.map((row) => {
      const complete = isComplete(row.answers);
      const computed = complete ? calculateResults(row.answers) : null;

      return {
        id: row.id,
        name: displayName(row),
        rawName: row.name,
        status: complete ? "complete" : "in_progress",
        answeredCount: row.answers.filter((a) => a !== null).length,
        primaryType: computed?.primaryType ?? null,
        wing: computed?.wing ?? null,
        isTie: computed?.isTie ?? false,
        tiedTypes: computed?.tiedTypes ?? [],
        createdAt: row.created_at,
        completedAt: row.completed_at,
        url: `/results/${row.id}`,
      };
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Failed to list results", error);
    return NextResponse.json({ error: "Failed to list results" }, { status: 500 });
  }
}