"use client";

import type { TestResult } from "@/lib/scoring";
import { Results } from "./Results";
import { ResultsDetails } from "./ResultsDetails";

interface SharedResultsViewProps {
  result: TestResult;
  heading: string;
  showRetake?: boolean;
  onRetake?: () => void;
}

export function SharedResultsView({
  result,
  heading,
  showRetake = false,
  onRetake,
}: SharedResultsViewProps) {
  return (
    <div className="flex flex-1 flex-col bg-stone-100">
      <div className="px-4 pb-4 pt-8">
        <p className="mx-auto mb-4 max-w-[390px] text-center text-sm font-medium text-stone-600">
          {heading}
        </p>
        <Results result={result} />
      </div>
      <ResultsDetails
        result={result}
        onRetake={onRetake ?? (() => (window.location.href = "/"))}
        showRetake={showRetake}
      />
    </div>
  );
}