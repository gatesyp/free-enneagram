"use client";

import { ENNEAGRAM_TYPES, type EnneagramTypeId } from "@/lib/types";

interface ScoreChartProps {
  scores: Record<EnneagramTypeId, number>;
  tiedTypes: EnneagramTypeId[];
  wingTiedTypes: EnneagramTypeId[];
}

export function ScoreChart({ scores, tiedTypes, wingTiedTypes }: ScoreChartProps) {
  const maxScore = Math.max(...Object.values(scores));
  const tiedSet = new Set(tiedTypes);
  const wingSet = new Set(wingTiedTypes);

  return (
    <div className="flex flex-col gap-2.5">
      {([1, 2, 3, 4, 5, 6, 7, 8, 9] as EnneagramTypeId[]).map((id) => {
        const type = ENNEAGRAM_TYPES[id];
        const score = scores[id];
        const width = maxScore > 0 ? (score / maxScore) * 100 : 0;
        const isPrimary = tiedSet.has(id);
        const isWing = wingSet.has(id) && !isPrimary;

        return (
          <div key={id} className="flex items-center gap-2">
            <span
              className={`w-5 text-right text-xs font-semibold ${
                isPrimary ? "text-stone-900" : "text-stone-500"
              }`}
            >
              {id}
            </span>
            <div className="relative h-5 flex-1 overflow-hidden rounded-md bg-stone-100">
              <div
                className="h-full rounded-md transition-all"
                style={{
                  width: `${width}%`,
                  backgroundColor: type.color,
                  opacity: isPrimary ? 1 : isWing ? 0.75 : 0.45,
                }}
              />
            </div>
            <span
              className={`w-6 text-right text-xs tabular-nums ${
                isPrimary ? "font-semibold text-stone-800" : "text-stone-400"
              }`}
            >
              {score}
            </span>
          </div>
        );
      })}
    </div>
  );
}