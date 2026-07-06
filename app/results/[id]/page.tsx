"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SharedResultsView } from "@/components/SharedResultsView";
import { calculateResults } from "@/lib/scoring";
import { isComplete } from "@/lib/answers";

interface ResultRow {
  id: string;
  name: string | null;
  answers: (number | null)[];
  completed_at: string | null;
}

export default function SavedResultPage() {
  const params = useParams<{ id: string }>();
  const [row, setRow] = useState<ResultRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`/api/results/${params.id}`);
        if (!response.ok) {
          setError("Results not found.");
          return;
        }
        const data = await response.json();
        setRow(data);
      } catch {
        setError("Could not load results.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-16 text-stone-500">
        Loading results...
      </div>
    );
  }

  if (error || !row) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-4 text-stone-600">{error ?? "Results not found."}</p>
        <a
          href="/"
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Take the Test
        </a>
      </div>
    );
  }

  const complete = isComplete(row.answers);
  const heading = row.name?.trim()
    ? `Results for ${row.name.trim()}`
    : "Your Results";

  if (!complete) {
    const answered = row.answers.filter((a) => a !== null).length;
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="font-display mb-3 text-2xl font-semibold text-stone-900">
          {heading}
        </h1>
        <p className="mb-6 max-w-md text-stone-600">
          This test is still in progress ({answered} of {row.answers.length}{" "}
          questions answered). Check back once it&apos;s finished.
        </p>
        <a
          href="/"
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Take the Test
        </a>
      </div>
    );
  }

  const result = calculateResults(row.answers);

  return (
    <SharedResultsView
      result={result}
      heading={heading}
      showRetake={false}
    />
  );
}