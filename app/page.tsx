"use client";

import { useState } from "react";
import { Landing } from "@/components/Landing";
import { NamePrompt } from "@/components/NamePrompt";
import { Quiz } from "@/components/Quiz";
import { Results } from "@/components/Results";
import { ResultsDetails } from "@/components/ResultsDetails";
import { ShareLink } from "@/components/ShareLink";
import { QUESTIONS, TOTAL_PAGES } from "@/lib/questions";
import { calculateResults } from "@/lib/scoring";
import { createTestSession, syncAnswers } from "@/lib/sync";

type Step = "landing" | "name" | "quiz" | "results";

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [page, setPage] = useState(0);
  const [resultId, setResultId] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );

  const handleStart = () => {
    setStep("name");
  };

  const handleNameContinue = async (name: string | null) => {
    setIsStarting(true);
    try {
      const id = await createTestSession(name);
      setResultId(id);
      setStep("quiz");
      setPage(0);
    } catch {
      alert("Could not start the test. Please try again.");
    } finally {
      setIsStarting(false);
    }
  };

  const persistAnswers = async (nextAnswers: (number | null)[]) => {
    if (!resultId) return;
    try {
      await syncAnswers(resultId, nextAnswers);
    } catch {
      // Non-blocking — answers remain in local state
    }
  };

  const handleAnswer = (questionIndex: number, value: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = value;
      return next;
    });
  };

  const handleContinue = async () => {
    if (page < TOTAL_PAGES - 1) {
      await persistAnswers(answers);
      setPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      await persistAnswers(answers);
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
    setResultId(null);
    setAnswers(Array(QUESTIONS.length).fill(null));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (step === "landing") {
    return <Landing onStart={handleStart} />;
  }

  if (step === "name") {
    return (
      <NamePrompt onContinue={handleNameContinue} isLoading={isStarting} />
    );
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
        {resultId && <ShareLink resultId={resultId} />}
      </div>
      <ResultsDetails result={result} onRetake={handleRetake} />
    </div>
  );
}