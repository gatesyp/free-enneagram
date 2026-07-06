"use client";

import { useState } from "react";
import { Landing } from "@/components/Landing";
import { Quiz } from "@/components/Quiz";
import { Results } from "@/components/Results";
import { ResultsDetails } from "@/components/ResultsDetails";
import { QUESTIONS, TOTAL_PAGES } from "@/lib/questions";
import { calculateResults } from "@/lib/scoring";

type Step = "landing" | "quiz" | "results";

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );

  const handleStart = () => {
    setStep("quiz");
    setPage(0);
  };

  const handleAnswer = (questionIndex: number, value: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = value;
      return next;
    });
  };

  const handleContinue = () => {
    if (page < TOTAL_PAGES - 1) {
      setPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setStep("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (page > 0) {
      setPage((p) => p - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRetake = () => {
    setStep("landing");
    setPage(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (step === "landing") {
    return <Landing onStart={handleStart} />;
  }

  if (step === "quiz") {
    return (
      <Quiz
        page={page}
        answers={answers}
        onAnswer={handleAnswer}
        onContinue={handleContinue}
        onBack={handleBack}
      />
    );
  }

  const result = calculateResults(answers);

  return (
    <div className="flex flex-1 flex-col bg-stone-100">
      <div className="px-4 pb-4 pt-8">
        <Results result={result} />
        <p className="mx-auto mt-4 max-w-[390px] text-center text-xs text-stone-400">
          Screenshot the card above to share your result
        </p>
      </div>
      <ResultsDetails result={result} onRetake={handleRetake} />
    </div>
  );
}