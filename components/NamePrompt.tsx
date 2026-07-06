"use client";

import { useState } from "react";

interface NamePromptProps {
  onContinue: (name: string | null) => void;
  isLoading?: boolean;
}

export function NamePrompt({ onContinue, isLoading }: NamePromptProps) {
  const [name, setName] = useState("");

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <h2 className="font-display mb-2 text-center text-3xl font-semibold text-stone-900">
          What&apos;s your name?
        </h2>
        <p className="mb-8 text-center text-sm text-stone-500">
          Optional — helps you find your results later.
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="mb-4 w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-stone-900 outline-none ring-indigo-600 focus:ring-2"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isLoading) {
              onContinue(name.trim() || null);
            }
          }}
        />
        <button
          type="button"
          onClick={() => onContinue(name.trim() || null)}
          disabled={isLoading}
          className="mb-3 w-full rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Starting..." : "Continue"}
        </button>
        <button
          type="button"
          onClick={() => onContinue(null)}
          disabled={isLoading}
          className="w-full rounded-xl border border-stone-300 bg-white px-6 py-3.5 font-medium text-stone-600 transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Skip
        </button>
      </div>
    </div>
  );
}