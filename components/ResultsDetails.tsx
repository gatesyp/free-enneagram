"use client";

import { ENNEAGRAM_TYPES } from "@/lib/types";
import type { TestResult } from "@/lib/scoring";

interface ResultsDetailsProps {
  result: TestResult;
  onRetake: () => void;
}

export function ResultsDetails({ result, onRetake }: ResultsDetailsProps) {
  const { primaryType, wing, scores } = result;
  const type = ENNEAGRAM_TYPES[primaryType];
  const wingType = ENNEAGRAM_TYPES[wing];

  const sortedTypes = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as const)
    .map((id) => ({ id, score: scores[id] }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-16 pt-10">
      <div className="mb-10 border-t border-stone-200 pt-10">
        <h2 className="font-display mb-4 text-2xl font-semibold text-stone-900">
          About Type {primaryType}: {type.name}
        </h2>
        <p className="mb-6 leading-relaxed text-stone-600">
          {type.longDescription}
        </p>
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
          <h3 className="mb-1 text-sm font-semibold text-stone-700">
            Growth edge
          </h3>
          <p className="text-sm leading-relaxed text-stone-600">
            {type.growthEdge}
          </p>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="font-display mb-4 text-2xl font-semibold text-stone-900">
          Your Wing: {primaryType}w{wing}
        </h2>
        <p className="mb-4 leading-relaxed text-stone-600">
          Your wing is the neighboring type on the Enneagram circle that
          influences your primary type. For Type {primaryType}, the possible
          wings are the types on either side. Your scores favored Type {wing} (
          {wingType.name}), giving you a {primaryType}w{wing} profile.
        </p>
        <p className="leading-relaxed text-stone-600">
          The {wingType.name} wing adds {wingType.tagline.toLowerCase()}{" "}
          qualities to your core Type {primaryType} motivation. This blend
          makes your personality richer and more nuanced than either type alone.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="font-display mb-4 text-2xl font-semibold text-stone-900">
          Reading Your Scores
        </h2>
        <p className="mb-4 leading-relaxed text-stone-600">
          Each statement in the test maps to one of the nine types. Your
          agreement level (1–5) was added to that type&apos;s total. The type
          with the highest score is your likely primary type. It is normal to
          score moderately across several types — personality is complex, and
          no test is definitive.
        </p>
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-stone-700">
            Your ranking
          </h3>
          <ol className="flex flex-col gap-2">
            {sortedTypes.map(({ id, score }, index) => {
              const t = ENNEAGRAM_TYPES[id];
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

      <div className="mb-10">
        <h2 className="font-display mb-4 text-2xl font-semibold text-stone-900">
          Glossary
        </h2>
        <dl className="flex flex-col gap-4">
          <div>
            <dt className="mb-1 font-semibold text-stone-800">Primary type</dt>
            <dd className="text-sm leading-relaxed text-stone-600">
              Your dominant personality pattern — the type whose motivations
              and fears feel most central to who you are.
            </dd>
          </div>
          <div>
            <dt className="mb-1 font-semibold text-stone-800">Wing</dt>
            <dd className="text-sm leading-relaxed text-stone-600">
              One of the two types adjacent to your primary type on the
              Enneagram circle. It flavors your core type with additional
              traits.
            </dd>
          </div>
          <div>
            <dt className="mb-1 font-semibold text-stone-800">
              Enneagram circle
            </dt>
            <dd className="text-sm leading-relaxed text-stone-600">
              The nine types are arranged in a circle: 9–1–2–3–4–5–6–7–8–9.
              Neighbors on this circle are wings; lines connecting types
              represent paths of growth and stress.
            </dd>
          </div>
        </dl>
      </div>

      <button
        type="button"
        onClick={onRetake}
        className="w-full rounded-xl border border-stone-300 bg-white px-6 py-4 font-semibold text-stone-700 transition-colors hover:bg-stone-50"
      >
        Retake Test
      </button>
    </div>
  );
}