"use client";

const LABELS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
] as const;

const ANCHOR_LABELS: Partial<Record<number, string>> = {
  1: "Strongly Disagree",
  3: "Neutral",
  5: "Strongly Agree",
};

interface LikertScaleProps {
  value: number | null;
  onChange: (value: number) => void;
}

export function LikertScale({ value, onChange }: LikertScaleProps) {
  return (
    <div className="flex gap-1 sm:gap-2">
      {[1, 2, 3, 4, 5].map((score) => {
        const isSelected = value === score;
        const anchorLabel = ANCHOR_LABELS[score];

        return (
          <div key={score} className="flex flex-1 flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => onChange(score)}
              aria-label={LABELS[score - 1]}
              className={`w-full rounded-lg border py-2.5 text-sm font-semibold transition-all sm:py-3 sm:text-base ${
                isSelected
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                  : "border-stone-200 bg-white text-stone-700 hover:border-indigo-300 hover:bg-indigo-50"
              }`}
            >
              {score}
            </button>
            {anchorLabel ? (
              <span className="px-0.5 text-center text-[10px] leading-tight text-stone-400 sm:text-xs">
                {anchorLabel}
              </span>
            ) : (
              <span className="h-[26px] sm:h-[30px]" aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );
}