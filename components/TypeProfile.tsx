"use client";

import { ENNEAGRAM_TYPES, type EnneagramTypeId } from "@/lib/types";

interface TypeProfileProps {
  typeId: EnneagramTypeId;
}

export function TypeProfile({ typeId }: TypeProfileProps) {
  const type = ENNEAGRAM_TYPES[typeId];

  return (
    <>
      <p className="mb-6 leading-relaxed text-stone-600">{type.longDescription}</p>
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-stone-400">
          Strengths
        </h3>
        <div className="flex flex-wrap gap-2">
          {type.strengths.map((strength) => (
            <span
              key={strength}
              className="rounded-full px-3 py-1 text-sm font-medium text-white"
              style={{ backgroundColor: type.color }}
            >
              {strength}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
        <h3 className="mb-1 text-sm font-semibold text-stone-700">Growth edge</h3>
        <p className="text-sm leading-relaxed text-stone-600">{type.growthEdge}</p>
      </div>
    </>
  );
}