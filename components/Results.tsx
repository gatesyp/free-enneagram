"use client";

import { ENNEAGRAM_TYPES } from "@/lib/types";
import type { TestResult } from "@/lib/scoring";
import { ScoreChart } from "./ScoreChart";

interface ResultsProps {
  result: TestResult;
}

export function Results({ result }: ResultsProps) {
  const { primaryType, wing, scores, isTie, tiedTypes } = result;
  const type = ENNEAGRAM_TYPES[primaryType];
  const wingType = ENNEAGRAM_TYPES[wing];

  return (
    <div
      id="results-card"
      className="mx-auto w-full max-w-[390px] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg"
    >
      <div
        className="px-6 py-8 text-center text-white"
        style={{ backgroundColor: type.color }}
      >
        <p className="mb-1 text-sm font-medium uppercase tracking-widest opacity-80">
          Your Enneagram Type
        </p>
        <div className="font-display mb-2 text-6xl font-bold">{primaryType}</div>
        <h2 className="font-display mb-1 text-2xl font-semibold">{type.name}</h2>
        <p className="text-sm opacity-90">{type.tagline}</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
          <span>
            {primaryType}w{wing}
          </span>
          <span className="opacity-70">·</span>
          <span className="opacity-90">{wingType.name} wing</span>
        </div>
      </div>

      <div className="px-6 py-6">
        {isTie && (
          <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Close tie between types {tiedTypes.join(", ")}. Your top score is
            shown; read the breakdown below for more context.
          </p>
        )}
        <p className="mb-6 text-sm leading-relaxed text-stone-600">
          {type.shortSummary}
        </p>

        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
          Score Breakdown
        </h3>
        <ScoreChart
          scores={scores}
          primaryType={primaryType}
          wing={wing}
        />

        <p className="mt-6 text-center text-xs text-stone-400">
          free-enneagram.com
        </p>
      </div>
    </div>
  );
}