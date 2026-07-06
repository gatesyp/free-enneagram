"use client";

import { useState } from "react";
import { ENNEAGRAM_TYPES, ALL_TYPE_IDS, type EnneagramTypeId } from "@/lib/types";
import { TypeProfile } from "./TypeProfile";

interface AllTypesGuideProps {
  tiedTypes: EnneagramTypeId[];
  wingTiedTypes: EnneagramTypeId[];
}

function getBadges(
  typeId: EnneagramTypeId,
  tiedTypes: EnneagramTypeId[],
  wingTiedTypes: EnneagramTypeId[]
): string[] {
  const badges: string[] = [];
  if (tiedTypes.includes(typeId)) badges.push("Your top score");
  if (wingTiedTypes.includes(typeId) && !tiedTypes.includes(typeId)) {
    badges.push("Possible wing");
  }
  return badges;
}

export function AllTypesGuide({ tiedTypes, wingTiedTypes }: AllTypesGuideProps) {
  const [expanded, setExpanded] = useState<EnneagramTypeId | null>(null);

  return (
    <div className="mb-10">
      <h2 className="font-display mb-2 text-2xl font-semibold text-stone-900">
        Explore All Nine Types
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-stone-600">
        Tap any type to read a full description. Types marked with a badge
        appeared prominently in your results.
      </p>
      <div className="flex flex-col gap-3">
        {ALL_TYPE_IDS.map((id) => {
          const type = ENNEAGRAM_TYPES[id];
          const badges = getBadges(id, tiedTypes, wingTiedTypes);
          const isOpen = expanded === id;

          return (
            <div
              key={id}
              className="overflow-hidden rounded-xl border border-stone-200 bg-white"
            >
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : id)}
                className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-stone-50"
              >
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: type.color }}
                >
                  {id}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-stone-900">{type.name}</span>
                    {badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <p className="mt-0.5 text-sm text-stone-500">{type.tagline}</p>
                  {!isOpen && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600">
                      {type.shortSummary}
                    </p>
                  )}
                </div>
                <span className="shrink-0 text-stone-400">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="border-t border-stone-100 px-4 pb-4 pt-2">
                  <TypeProfile typeId={id} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}