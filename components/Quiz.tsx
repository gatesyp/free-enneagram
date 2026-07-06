"use client";

import { useEffect, useRef } from "react";
import { getQuestionsForPage, QUESTIONS_PER_PAGE, TOTAL_PAGES } from "@/lib/questions";
import { scrollToTop } from "@/lib/scroll";
import { ProgressBar } from "./ProgressBar";
import { QuestionRow } from "./QuestionRow";

interface QuizProps {
  page: number;
  answers: (number | null)[];
  onAnswer: (questionIndex: number, value: number) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function Quiz({
  page,
  answers,
  onAnswer,
  onContinue,
  onBack,
}: QuizProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const questions = getQuestionsForPage(page);
  const startIndex = page * QUESTIONS_PER_PAGE;
  const pageAnswers = questions.map((_, i) => answers[startIndex + i]);
  const allAnswered = pageAnswers.every((a) => a !== null);
  const isLastPage = page === TOTAL_PAGES - 1;

  useEffect(() => {
    scrollToTop();
    topRef.current?.scrollIntoView({ block: "start" });
  }, [page]);

  return (
    <div className="flex flex-1 flex-col">
      <div ref={topRef} className="scroll-mt-0" />
      <ProgressBar page={page} totalPages={TOTAL_PAGES} />
      <div className="mx-auto w-full max-w-lg flex-1 px-4 py-6">
        <h2 className="font-display mb-6 text-xl font-semibold text-stone-900">
          How much do you agree with each statement?
        </h2>
        <div className="flex flex-col gap-4">
          {questions.map((question, i) => (
            <QuestionRow
              key={question.id}
              number={startIndex + i + 1}
              text={question.text}
              value={answers[startIndex + i]}
              onChange={(value) => onAnswer(startIndex + i, value)}
            />
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          {page > 0 && (
            <button
              type="button"
              onClick={onBack}
              className="flex-1 rounded-xl border border-stone-300 bg-white px-4 py-3.5 font-medium text-stone-700 transition-colors hover:bg-stone-50"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={onContinue}
            disabled={!allAnswered}
            className={`flex-1 rounded-xl px-4 py-3.5 font-semibold transition-colors ${
              allAnswered
                ? "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
                : "cursor-not-allowed bg-stone-200 text-stone-400"
            }`}
          >
            {isLastPage ? "See Results" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}