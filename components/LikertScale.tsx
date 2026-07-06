"use client";

const LABELS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
] as const;

const SHORT_LABELS = ["SD", "D", "N", "A", "SA"] as const;

interface LikertScaleProps {
  value: number | null;
  onChange: (value: number) => void;
  compact?: boolean;
}

export function LikertScale({ value, onChange, compact }: LikertScaleProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 sm:gap-2">
        {[1, 2, 3, 4, 5].map((score) => {
          const isSelected = value === score;
          return (
            <button
              key={score}
              type="button"
              onClick={() => onChange(score)}
              aria-label={LABELS[score - 1]}
              className={`flex-1 rounded-lg border px-1 py-2.5 text-xs font-medium transition-all sm:px-2 sm:py-3 sm:text-sm ${
                isSelected
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                  : "border-stone-200 bg-white text-stone-600 hover:border-indigo-300 hover:bg-indigo-50"
              }`}
            >
              {compact ? SHORT_LABELS[score - 1] : score}
            </button>
          );
        })}
      </div>
      {!compact && (
        <div className="flex justify-between text-xs text-stone-400">
          <span>Disagree</span>
          <span>Agree</span>
        </div>
      )}
    </div>
  );
}