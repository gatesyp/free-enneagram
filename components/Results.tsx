"use client";

import { ENNEAGRAM_TYPES } from "@/lib/types";
import type { TestResult } from "@/lib/scoring";
import { ScoreChart } from "./ScoreChart";

interface ResultsProps {
  result: TestResult;
}

function formatTypeList(types: number[]): string {
  if (types.length === 1) return String(types[0]);
  if (types.length === 2) return `${types[0]} & ${types[1]}`;
  return `${types.slice(0, -1).join(", ")} & ${types[types.length - 1]}`;
}

export function Results({ result }: ResultsProps) {
  const {
    primaryType,
    wing,
    scores,
    isTie,
    tiedTypes,
    isWingTie,
    wingTiedTypes,
    topScore,
  } = result;

  const heroColor = isTie
    ? "#6366f1"
    : ENNEAGRAM_TYPES[primaryType].color;

  return (
    <div
      id="results-card"
      className="mx-auto w-full max-w-[390px] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg"
    >
      <div
        className="px-6 py-8 text-center text-white"
        style={{ backgroundColor: heroColor }}
      >
        <p className="mb-1 text-sm font-medium uppercase tracking-widest opacity-80">
          {isTie ? "Your Top Types" : "Your Enneagram Type"}
        </p>

        {isTie ? (
          <>
            <div className="font-display mb-2 text-4xl font-bold">
              {formatTypeList(tiedTypes)}
            </div>
            <div className="flex flex-col gap-2">
              {tiedTypes.map((id) => {
                const t = ENNEAGRAM_TYPES[id];
                return (
                  <p key={id} className="text-sm opacity-90">
                    <span className="font-semibold">Type {id}</span> — {t.name}
                  </p>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="font-display mb-2 text-6xl font-bold">
              {primaryType}
            </div>
            <h2 className="font-display mb-1 text-2xl font-semibold">
              {ENNEAGRAM_TYPES[primaryType].name}
            </h2>
            <p className="text-sm opacity-90">
              {ENNEAGRAM_TYPES[primaryType].tagline}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              {isWingTie ? (
                <>
                  <span>
                    {primaryType}w{wingTiedTypes[0]} or {primaryType}w
                    {wingTiedTypes[1]}
                  </span>
                  <span className="opacity-70">·</span>
                  <span className="opacity-90">tied wings</span>
                </>
              ) : (
                <>
                  <span>
                    {primaryType}w{wing}
                  </span>
                  <span className="opacity-70">·</span>
                  <span className="opacity-90">
                    {ENNEAGRAM_TYPES[wing].name} wing
                  </span>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div className="px-6 py-6">
        {isTie ? (
          <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Types {formatTypeList(tiedTypes)} scored equally at {topScore}{" "}
            points. This test can&apos;t pick one for you — explore both
            profiles below.
          </p>
        ) : isWingTie ? (
          <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Your adjacent wings (Types {wingTiedTypes[0]} and {wingTiedTypes[1]}
            ) scored equally. Read about both below.
          </p>
        ) : null}

        {!isTie && (
          <p className="mb-6 text-sm leading-relaxed text-stone-600">
            {ENNEAGRAM_TYPES[primaryType].shortSummary}
          </p>
        )}

        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
          Score Breakdown
        </h3>
        <ScoreChart
          scores={scores}
          tiedTypes={tiedTypes}
          wingTiedTypes={isTie ? [] : wingTiedTypes}
        />

        <p className="mt-6 text-center text-xs text-stone-400">
          free-enneagram.com
        </p>
      </div>
    </div>
  );
}