"use client";

interface LandingProps {
  onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-2xl font-bold text-indigo-700">
          9
        </div>
        <h1 className="font-display mb-4 text-4xl font-semibold tracking-tight text-stone-900">
          Free Enneagram Test
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-stone-600">
          Discover your Enneagram type, wing, and how you compare across all
          nine types.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="w-full rounded-xl bg-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-md transition-colors hover:bg-indigo-700 active:bg-indigo-800"
        >
          Start Test
        </button>
      </div>
    </div>
  );
}