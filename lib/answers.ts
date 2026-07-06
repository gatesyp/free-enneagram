import { QUESTIONS } from "./questions";

export function isComplete(answers: (number | null)[]): boolean {
  return (
    answers.length === QUESTIONS.length && answers.every((a) => a !== null)
  );
}