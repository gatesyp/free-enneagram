export async function createTestSession(name: string | null): Promise<string> {
  const response = await fetch("/api/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Failed to start test session");
  }

  const data = await response.json();
  return data.id as string;
}

export async function syncAnswers(
  resultId: string,
  answers: (number | null)[]
): Promise<void> {
  const response = await fetch(`/api/results/${resultId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    throw new Error("Failed to sync answers");
  }
}