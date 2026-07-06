"use client";

import { ENNEAGRAM_TYPES } from "@/lib/types";
import type { TestResult } from "@/lib/scoring";
import { getAdjacentTypes } from "@/lib/scoring";
import { AllTypesGuide } from "./AllTypesGuide";
import { TypeProfile } from "./TypeProfile";

interface ResultsDetailsProps {
  result: TestResult;
  onRetake: () => void;
  showRetake?: boolean;
}

function formatTypeList(types: number[]): string {
  if (types.length === 1) return `Type ${types[0]}`;
  if (types.length === 2) return `Types ${types[0]} and ${types[1]}`;
  return `Types ${types.slice(0, -1).join(", ")} and ${types[types.length - 1]}`;
}

export function ResultsDetails({
  result,
  onRetake,
  showRetake = true,
}: ResultsDetailsProps) {
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

  const sortedTypes = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as const)
    .map((id) => ({ id, score: scores[id] }))
    .sort((a, b) => b.score - a.score);

  const profileTypes = isTie ? tiedTypes : [primaryType];
  const [leftWing, rightWing] = getAdjacentTypes(primaryType);

  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-16 pt-10">
      {isTie && (
        <div className="mb-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-display mb-3 text-xl font-semibold text-amber-900">
            When types tie
          </h2>
          <p className="text-sm leading-relaxed text-amber-800">
            {formatTypeList(tiedTypes)} all scored {topScore} points — the
            highest on your test. Equal scores mean this test is inconclusive
            between them. We show every tied type rather than picking one. Wing
            type also depends on your primary, so no wing is shown until you
            identify which type resonates most.
          </p>
        </div>
      )}

      {profileTypes.map((typeId) => {
        const type = ENNEAGRAM_TYPES[typeId];
        const [lw, rw] = getAdjacentTypes(typeId);

        return (
          <div key={typeId} className="mb-10 border-t border-stone-200 pt-10">
            <h2 className="font-display mb-4 text-2xl font-semibold text-stone-900">
              About Type {typeId}: {type.name}
              {isTie && (
                <span className="ml-2 text-base font-normal text-indigo-600">
                  (tied)
                </span>
              )}
            </h2>
            <TypeProfile typeId={typeId} />
            {isTie && (
              <p className="mt-4 text-sm text-stone-500">
                If Type {typeId} is your primary, your possible wings are Type{" "}
                {lw} ({ENNEAGRAM_TYPES[lw].name}) and Type {rw} (
                {ENNEAGRAM_TYPES[rw].name}) — scored {scores[lw]} and{" "}
                {scores[rw]} respectively.
              </p>
            )}
          </div>
        );
      })}

      {!isTie && (
        <div className="mb-10">
          <h2 className="font-display mb-4 text-2xl font-semibold text-stone-900">
            Your Wing
            {isWingTie
              ? `: ${primaryType}w${wingTiedTypes[0]} or ${primaryType}w${wingTiedTypes[1]}`
              : `: ${primaryType}w${wing}`}
          </h2>
          {isWingTie ? (
            <>
              <p className="mb-4 leading-relaxed text-stone-600">
                Your wing is one of the two types adjacent to your primary type
                on the Enneagram circle. For Type {primaryType}, those are Type{" "}
                {leftWing} ({ENNEAGRAM_TYPES[leftWing].name}) and Type {rightWing}{" "}
                ({ENNEAGRAM_TYPES[rightWing].name}). Both scored{" "}
                {scores[wingTiedTypes[0]]} points — a tie — so either could be
                your wing.
              </p>
              {wingTiedTypes.map((wingId) => {
                const wt = ENNEAGRAM_TYPES[wingId];
                return (
                  <div
                    key={wingId}
                    className="mb-4 rounded-xl border border-stone-200 bg-white p-4"
                  >
                    <h3 className="mb-1 font-semibold text-stone-800">
                      {primaryType}w{wingId} — {wt.name} wing
                    </h3>
                    <p className="text-sm leading-relaxed text-stone-600">
                      The {wt.name} wing adds {wt.tagline.toLowerCase()}{" "}
                      qualities to your core Type {primaryType} motivation.
                    </p>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <p className="mb-4 leading-relaxed text-stone-600">
                Your wing is the neighboring type on the Enneagram circle that
                influences your primary type. For Type {primaryType}, the
                possible wings are Type {leftWing} (scored {scores[leftWing]})
                and Type {rightWing} (scored {scores[rightWing]}). Your scores
                favored Type {wing} ({ENNEAGRAM_TYPES[wing].name}), giving you
                a {primaryType}w{wing} profile.
              </p>
              <p className="leading-relaxed text-stone-600">
                The {ENNEAGRAM_TYPES[wing].name} wing adds{" "}
                {ENNEAGRAM_TYPES[wing].tagline.toLowerCase()} qualities to your
                core Type {primaryType} motivation.
              </p>
            </>
          )}
        </div>
      )}

      <div className="mb-10">
        <h2 className="font-display mb-4 text-2xl font-semibold text-stone-900">
          Reading Your Scores
        </h2>
        <p className="mb-4 leading-relaxed text-stone-600">
          Each statement maps to one of the nine types. Your agreement level
          (1–5) was added to that type&apos;s total. The type with the highest
          score is your likely primary type — unless multiple types tie, in
          which case you should read about each. It is normal to score across
          several types; no test is definitive.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-stone-700">
            Your ranking
          </h3>
          <ol className="flex flex-col gap-2">
            {sortedTypes.map(({ id, score }, index) => {
              const t = ENNEAGRAM_TYPES[id];
              const isTied = tiedTypes.includes(id);
              return (
                <li
                  key={id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-stone-600">
                    <span className="mr-2 font-medium text-stone-400">
                      {index + 1}.
                    </span>
                    Type {id} — {t.name}
                    {isTied && (
                      <span className="ml-1 text-indigo-600">(tied)</span>
                    )}
                  </span>
                  <span className="font-semibold tabular-nums text-stone-800">
                    {score}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <AllTypesGuide tiedTypes={tiedTypes} wingTiedTypes={isTie ? [] : wingTiedTypes} />

      <div className="mb-10">
        <h2 className="font-display mb-4 text-2xl font-semibold text-stone-900">
          Glossary
        </h2>
        <dl className="flex flex-col gap-4">
          <div>
            <dt className="mb-1 font-semibold text-stone-800">Primary type</dt>
            <dd className="text-sm leading-relaxed text-stone-600">
              Your dominant personality pattern — the type whose motivations
              feel most central. When two or more types tie, read about each
              and see which resonates.
            </dd>
          </div>
          <div>
            <dt className="mb-1 font-semibold text-stone-800">Wing</dt>
            <dd className="text-sm leading-relaxed text-stone-600">
              One of the two types adjacent to your primary on the Enneagram
              circle. It flavors your core type. Only meaningful once your
              primary type is clear.
            </dd>
          </div>
          <div>
            <dt className="mb-1 font-semibold text-stone-800">
              Enneagram circle
            </dt>
            <dd className="text-sm leading-relaxed text-stone-600">
              The nine types arranged in a circle: 9–1–2–3–4–5–6–7–8–9.
              Neighbors are wings.
            </dd>
          </div>
        </dl>
      </div>

      {showRetake ? (
        <button
          type="button"
          onClick={onRetake}
          className="w-full rounded-xl border border-stone-300 bg-white px-6 py-4 font-semibold text-stone-700 transition-colors hover:bg-stone-50"
        >
          Retake Test
        </button>
      ) : (
        <a
          href="/"
          className="block w-full rounded-xl border border-stone-300 bg-white px-6 py-4 text-center font-semibold text-stone-700 transition-colors hover:bg-stone-50"
        >
          Take the Test
        </a>
      )}
    </div>
  );
}