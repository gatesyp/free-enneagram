"use client";

import { LikertScale } from "./LikertScale";

interface QuestionRowProps {
  number: number;
  text: string;
  value: number | null;
  onChange: (value: number) => void;
}

export function QuestionRow({ number, text, value, onChange }: QuestionRowProps) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm leading-relaxed text-stone-800">
        <span className="mr-2 font-semibold text-indigo-600">{number}.</span>
        {text}
      </p>
      <LikertScale value={value} onChange={onChange} compact />
    </div>
  );
}