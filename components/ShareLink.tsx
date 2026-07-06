"use client";

import { useState } from "react";

interface ShareLinkProps {
  resultId: string;
}

export function ShareLink({ resultId }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/results/${resultId}`
      : `/results/${resultId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto mt-4 w-full max-w-[390px] rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <p className="mb-2 text-sm font-medium text-stone-800">
        Copy your link to revisit these results
      </p>
      <div className="flex gap-2">
        <input
          readOnly
          value={url}
          className="min-w-0 flex-1 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-600"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}