"use client";

import { QUESTIONS_PER_PAGE } from "@/lib/questions";

interface ProgressBarProps {
  page: number;
  totalPages: number;
}

export function ProgressBar({ page, totalPages }: ProgressBarProps) {
  const startQuestion = page * QUESTIONS_PER_PAGE + 1;
  const endQuestion = Math.min((page + 1) * QUESTIONS_PER_PAGE, totalPages * QUESTIONS_PER_PAGE);
  const totalQuestions = totalPages * QUESTIONS_PER_PAGE;
  const progress = ((page + 1) / totalPages) * 100;

  return (
    <div className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/95 px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto max-w-lg">
        <div className="mb-2 flex items-center justify-between text-sm text-stone-500">
          <span>
            Questions {startQuestion}–{endQuestion} of {totalQuestions}
          </span>
          <span>
            Page {page + 1} of {totalPages}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}