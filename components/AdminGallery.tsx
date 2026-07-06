"use client";

import { useEffect, useState } from "react";
import { ENNEAGRAM_TYPES } from "@/lib/types";

interface AdminResult {
  id: string;
  name: string;
  status: "complete" | "in_progress";
  answeredCount: number;
  primaryType: number | null;
  wing: number | null;
  isTie: boolean;
  tiedTypes: number[];
  createdAt: string;
  completedAt: string | null;
  url: string;
}

interface AdminGalleryProps {
  authed: boolean;
}

export function AdminGallery({ authed }: AdminGalleryProps) {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(authed);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AdminResult[]>([]);
  const [loading, setLoading] = useState(false);

  const loadResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/results", {
        credentials: "include",
      });
      if (!response.ok) {
        setLoggedIn(false);
        setError("Could not load results. Please log in again.");
        return;
      }
      const data = await response.json();
      setResults(data.results);
    } catch {
      setError("Failed to load results.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      loadResults();
    }
  }, [loggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(
          data.error === "Admin access is not configured"
            ? "Admin is not configured on the server."
            : "Invalid password."
        );
        return;
      }
      setLoggedIn(true);
      setPassword("");
    } catch {
      setError("Login failed.");
    }
  };

  if (!loggedIn) {
    return (
      <div className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center px-6 py-16">
        <h1 className="font-display mb-6 text-3xl font-semibold text-stone-900">
          Admin
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-xl border border-stone-300 px-4 py-3"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Log in
          </button>
        </form>
      </div>
    );
  }

  function formatType(result: AdminResult): string {
    if (result.status !== "complete" || result.primaryType == null) {
      return "—";
    }
    if (result.isTie && result.tiedTypes.length > 1) {
      return result.tiedTypes
        .map((id) => `${id} (${ENNEAGRAM_TYPES[id as 1].name})`)
        .join(" / ");
    }
    const wing = result.wing ? `w${result.wing}` : "";
    return `${result.primaryType}${wing} — ${ENNEAGRAM_TYPES[result.primaryType as 1].name}`;
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-stone-900">
          All Results
        </h1>
        <button
          type="button"
          onClick={loadResults}
          className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="text-stone-500">Loading...</p>}
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Link</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="border-b border-stone-100">
                <td className="px-4 py-3 font-medium text-stone-800">
                  {result.name}
                </td>
                <td className="px-4 py-3 text-stone-600">{formatType(result)}</td>
                <td className="px-4 py-3 text-stone-600">
                  {result.status === "complete"
                    ? "Complete"
                    : `${result.answeredCount}/45`}
                </td>
                <td className="px-4 py-3 text-stone-500">
                  {new Date(result.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <a
                    href={result.url}
                    className="text-indigo-600 hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
            {!loading && results.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-stone-500">
                  No results yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}